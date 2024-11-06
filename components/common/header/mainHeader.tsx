"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Logo from "@/assets/images/output-onlinepngtools-2.png";
import LocationIcon from "@/assets/svg/akar-icons_location.svg";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchDropdown from "./searchDropdown";
import { CategoryDropdown } from "@/components/dropdown/categoryDropdown";
import { categoriesService } from "@fizno/api-client/src/apis/catergory";
import { debounce } from "@/components/utils/debounce";
import { tokens } from "@/helpers/jwtTokenFunction";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  globalCacheStateSelector,
  setDeliveryLocation,
  setUser,
} from "@/redux/slices/globaCache.slice";
import {
  productStateSelector,
  setCartCount,
} from "@/redux/slices/product.slice";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import Link from "next/link";
import Cookies from "js-cookie";
import { Avatar, Drawer } from "@mui/material";
import { SVGIcon } from "@/assets/svg";
import SkeletonLoader from "@/components/loader/skeletonLoader";
import { AdminApi } from "@fizno/api-client/src/apis/AdminApi";

import DeliveryLocationModal from "../modal/deliveryLocationModal";

import { IconButton } from "@mui/material";

export default function MainHeader() {
  /**
   * router
   */

  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const pathname = usePathname();

  /**
   * redux
   */

  const dispatch = useAppDispatch();
  const { user, deliveryLocation } = useAppSelector(globalCacheStateSelector);
  const { cartCount } = useAppSelector(productStateSelector);

  /**
   * state management
   */
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [profileMenu, setProfileMenu] = useState(false);
  const [showDeliveryLocationModal, setShowDeliveryLocationModal] =
    useState(false);
  const [navSetting, setNavSetting] = useState<{
    size?: number;
    spacing?: number;
    color?: string;
    back_color?: string;
  }>({});
  const [userData, setUserData] = useState<{
    userName: string;
    userRole: string;
    userProfileImage: string;
  }>({
    userName: "",
    userRole: "",
    userProfileImage: "",
  });
  const [unreadMsgs, setUnreadMessageCount] = useState<number>(0);
  const [searchLoader, setSearchLoader] = useState<boolean>(false);

  /**
   * refs
   */
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleShowMenuDropdown = () => {
    setShowDropdownMenu((prevState) => !prevState);
    // alert("showdropdown");
  };

  const handleInputChange = async (e: any) => {
    const inputValue = e.target.value;

    if (inputValue !== "") {
      const data = {
        keyword: inputValue,
        pageSize: 10,
        pageIndex: 1,
      };
      setSearchLoader(true);
      const response = await categoriesService.searchProductsByKeyword(data);
      if (response.remote === "success") {
        setSearchLoader(false);
        const mappedData = response.data.data.updateData.map((product: any) => {
          const postmeta = product.wp_nepaz2_postmeta.reduce(
            (acc: any, meta: any) => {
              acc[meta.meta_key] = meta.meta_value;
              return acc;
            },
            {},
          );
          return {
            id: product.ID,
            image: postmeta._ebay_product_featured_image
              ? postmeta._ebay_product_featured_image.img_url
              : product.attachment
                ? product.attachment?.guid.includes("http")
                  ? product.attachment?.guid
                  : `${process.env.NEXT_PUBLIC_API_BASE_URL}${product.attachment?.guid}`
                : "",
            title: product.post_title,
            price: postmeta._price
              ? `$${postmeta._price}`
              : `$${(Math.random() * 100).toFixed(2)}`,
          };
        });
        setSearchResults(mappedData);
        setShowSearchDropdown(true);
      }
    } else {
      setSearchLoader(false);
      setShowSearchDropdown(false);
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node) &&
      inputRef.current &&
      !inputRef.current.contains(e.target as Node)
    ) {
      setShowSearchDropdown(false);
      setShowDropdownMenu(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const fetchNavSettingByCategory = async (categoryId: string) => {
    const response = await AdminApi.getNavSetting(parseInt(categoryId));
    if (response.remote === "success") {
      const config = response.data?.data;
      if (!config) {
        setNavSetting({});
        return;
      }
      setNavSetting({
        size: config?.size,
        color: config?.color,
        back_color: config?.back_color,
        spacing: config?.spacing,
      });
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchNavSettingByCategory(categoryId);
    }
  }, [categoryId]);

  const fetchCatgories = async () => {
    const data = {
      pageSize: 1000000,
      pageIndex: 1,
      query: "",
      search: "",
    };
    const response = await categoriesService.getCategories(data);
    groupData(response?.data?.data?.updatedData);
    // if (response.remote === "success") {
    //   setAllCategories(response.data);
    // }
  };

  const groupData = (data: any) => {
    const map = new Map();
    data?.forEach((item: any) => {
      map.set(item.term_taxonomy_id, { ...item, children: [] });
    });

    // Step 2: Iterate through the array and assign children
    data.forEach((item: any) => {
      if (item.parent !== 0) {
        const parent = map.get(item.parent);
        if (parent) {
          parent.children.push(map.get(item.term_taxonomy_id));
        }
      }
    });

    // Step 3: Filter the array to include only top-level elements
    const result = data
      .filter((item: any) => item.parent === 0)
      .map((item: any) => map.get(item.term_taxonomy_id));

    setAllCategories(result);
  };

  const debounceSearch = useCallback(
    debounce((value: any) => {
      handleInputChange(value);
    }, 300),
    [],
  );

  /**
   * get all cart product list
   */

  const getAllCartProdList = async () => {
    const response = await UserApi.getAllCartProdAPI();
    if (response.remote === "success") {
      dispatch(setCartCount(response?.data?.data?.length || 0));
    }
  };

  /**
   * handle add bulk cart items
   */
  const handleAddBulkCart = async () => {
    if (typeof window !== "undefined") {
      const localCartData = localStorage.getItem("localCart");
      if (localCartData) {
        const parseData = JSON.parse(localCartData);

        const payload = parseData.map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity,
        }));

        const response = await UserApi.bulkCartAPI({ data: payload });

        if (response.remote === "success") {
          getAllCartProdList();
          localStorage.removeItem("localCart");
        }
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && tokens.getAccessToken()) {
      const localCartData = localStorage.getItem("localCart");
      if (localCartData) {
        const parseData = JSON.parse(localCartData);
        parseData.length === 0 ? getAllCartProdList() : handleAddBulkCart();
      } else {
        getAllCartProdList();
      }
    } else {
      if (typeof window !== "undefined") {
        const localCartData = localStorage.getItem("localCart");
        if (localCartData) {
          const parseData = JSON.parse(localCartData);
          dispatch(setCartCount(parseData?.length || 0));
        }
      }
    }
  }, []);

  useEffect(() => {
    fetchCatgories();
  }, [router]);
  const currentPath = usePathname();

  const hideSubheader =
    currentPath === "/contact-us" || currentPath === "/feedback-page";
  // const headerMenu =
  //   currentPath === "/seller/login" ||
  //   currentPath === "/login" ||
  //   currentPath === "/register" ||
  //   currentPath === "/forgot-password" ||
  //   currentPath === "/verification" ||
  //   currentPath === "/search-result" ||
  //   currentPath === "/search-detail" ||
  //   currentPath === "/shopping-cart" ||
  //   currentPath === "/home" ||
  //   currentPath === "/sell";

  const toggleProfileMenu = () => {
    setProfileMenu((prevState) => !prevState);
  };

  /**
   * handle sign out
   */
  const handleSignOut = async () => {
    if (typeof window !== "undefined") {
      localStorage?.removeItem("access-token");
      localStorage?.removeItem("refreshToken");
    }
    dispatch(setCartCount(0));
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("userRole");
    window.dispatchEvent(new Event("storage"));
    router.push("/signin");
  };

  /**
   * handle fetch user profile
   */
  const handleFetchUserProfile = async () => {
    if (tokens.getAccessTokenCookies()) {
      const response = await UserApi.getUserDetail();
      if (response.remote == "success") {
        dispatch(setUser(response.data));
      }
    }
  };

  useEffect(() => {
    handleFetchUserProfile();
  }, []);

  useEffect(() => {
    if (user && (user.display_name || user.role)) {
      setUserData({
        userName: user.display_name,
        userRole: user.role,
        userProfileImage: `${process.env.NEXT_PUBLIC_API_BASE_URL}${
          user?.avatar?.guid
        }`,
      });
    }
  }, [user, user?.display_name]);
  const toggleDrawer = (openState: boolean) => {
    setShowDropdownMenu(openState);
  };

  /**
   * handle fetch messages
   */
  const handleFetchMessages = async () => {
    if (tokens.getAccessTokenCookies()) {
      const response = await UserApi.getUnreadMessageAPI();
      if (response.remote == "success") {
        setUnreadMessageCount(response.data.data);
      }
    }
  };

  const closeDeliveryLocationPopUp = () => {
    setShowDeliveryLocationModal(false);
  };

  useEffect(() => {
    handleFetchMessages();
  }, []);

  /**
   * handle get all address
   */
  const handleGetAllAddress = async () => {
    const response = await UserApi.getAllAddressAPI();
    if (response.remote === "success") {
      const data = response.data.data;
      const addressList = data?.map((item: any) => ({
        id: item?.id,
        addressLineOne: item?.street1,
        addressLineTwo: item?.street2,
        country: item?.country,
        state: item?.state,
        city: item?.city,
        zipcode: item?.zipcode,
        isDefault: item?.default ? true : false,
      }));

      addressList.map((item: any) => {
        if (item.isDefault) {
          dispatch(setDeliveryLocation(`${item.city} ${item.zipcode}`));
        }
      });

      // If no default address is found, use geolocation
      if (!addressList.some((item: any) => item.isDefault)) {
        setGeolocationAddress();
      }
    } else {
      // If fetching addresses fails, use geolocation
      setGeolocationAddress();
    }
  };

  /**
   * set geolocation address
   */
  const setGeolocationAddress = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          )
            .then((response) => response.json())
            .then((data) => {
              console.log("Address fetched:", data);
              dispatch(
                setDeliveryLocation(
                  `${data.address?.city || data.address?.state || data.address?.town} ${data.address?.postcode || "000000"}`,
                ),
              );
            })
            .catch((error) => {
              console.error("Error fetching address:", error);
            });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        },
      );
    }
  };

  /**
   * fetch user address
   */
  useEffect(() => {
    if (userData) {
      handleGetAllAddress();
    } else {
      setGeolocationAddress();
    }
  }, [user]);

  if (pathname === "/login2" || pathname === "/register2") {
    return null;
  }

  return (
    <>
      <div className="main_header bg-white py-3 border-t border-primaryMain">
        <div className="mx-4 relative">
          <div className="flex justify-between items-center">
            {/*<div className={`${!headerMenu ? "w-2/12" : "w-1/5"}`}>*/}
            <div className="w-[18%]">
              <div className="header_left_section flex justify-start items-center">
                <Image
                  alt=""
                  height={30}
                  width={120}
                  src={Logo}
                  className="mr-4 cursor-pointer"
                  onClick={() => router.push("/home")}
                />
                <div
                  className="flex justify-center"
                  onClick={() => setShowDeliveryLocationModal(true)}
                >
                  <LocationIcon className="mr-1" />
                  <div className="flex flex-col justify-center items-start text-[12px] ">
                    <p className="text-[#252525] cursor-pointer">Deliver to</p>
                    <p className="text-[#252525] cursor-pointer">
                      {deliveryLocation || "Fetching location..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={` header_search_section ${tokens.getAccessTokenCookies() ? "w-[46%]" : "w-[43%]"}`}
            >
              <div className="relative">
                <div
                  onClick={handleShowMenuDropdown}
                  className="absolute font-sm flex justify-center items-center bg-[#F3F3F6] text-sm text-[#383839] cursor-pointer rounded-l-full border-r-2 border-r-[#CCCCCC] h-full left-0 px-3"
                >
                  Categories
                  <svg
                    className={`w-4 h-4 ml-2 transition-transform duration-500 ${
                      showDropdownMenu ? "rotate-90" : "rotate-0"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
                <input
                  className="pl-32 rounded-sm border-none text-sm text-[#757575] bg-[#F3F3F6] w-full dark:bg-[rgb(18,18,18)] dark:border-slate-700"
                  placeholder="Search Fizno"
                  value={keyword}
                  onChange={(e) => {
                    debounceSearch(e);
                    setKeyword(e.target.value);
                  }}
                />

                <div
                  onClick={() => {
                    router.push(`/search-result?keyword=${keyword}`);
                    setKeyword("");
                    setShowSearchDropdown(false);
                  }}
                  className="absolute top-[1px] right-[1px] text-[#737373] cursor-pointer rounded-r-full p-[9px]"
                >
                  <SVGIcon.SearchIcon2 />
                </div>
                {showSearchDropdown ? (
                  <SearchDropdown
                    keyword={keyword}
                    handleResetKeyword={() => {
                      setKeyword("");
                      setShowSearchDropdown(false);
                    }}
                    results={searchResults}
                  />
                ) : null}
                {searchLoader && (
                  <div className="absolute top-[3px] right-14 z-10 flex justify-center items-center h-10">
                    <div
                      className="w-5 h-5  rounded-full animate-spin"
                      style={{ animationDuration: "0.4s" }}
                    >
                      <div className="w-[19px] h-[19px] border-3  rounded-full border-blue-500 loader_search ">
                        &nbsp;
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div
              className={`${tokens.getAccessTokenCookies() ? "w-[33%]" : "w-[36%]"}`}
            >
              <div className="header_right_section">
                <ul className="flex items-center justify-end">
                  <div className="flex items-center justify-evenly">
                    <div className="flex items-center cursor-pointer mr-4">
                      <SVGIcon.GlobalIcon className="w-5 h-5" />
                      <p className="text-[14px] font-medium text-gray-700">
                        English
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 pr-3">
                      <p
                        onClick={() => router.push("/sell")}
                        className="text-[14px] font-medium text-gray-700 cursor-pointer"
                      >
                        What we offer
                      </p>
                      <p
                        onClick={() => router.push("/faq")}
                        className="text-[14px] font-medium text-gray-700 cursor-pointer"
                      >
                        Contact
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center border-[2px] border-[#E0E0E0] rounded-full mr-3 p-2.5">
                    <li
                      className="relative cursor-pointer"
                      onClick={() => router.push("/shopping-cart")}
                    >
                      <div className="flex justify-center items-center w-3.5 h-3.5 text-white bg-[#E54B4D] font-semibold text-[10px] absolute right-[-3px] top-[-3px] rounded-full">
                        {cartCount}
                      </div>
                      <SVGIcon.CartIcon />
                    </li>
                  </div>
                  {!tokens.getAccessTokenCookies() ? (
                    <li className="flex items-center text-[14px] mr-3">
                      <div className="flex justify-center items-center border-2 rounded-full px-4 py-2.5 border-[#5C34FC]">
                        <a
                          className="text-black font-semibold cursor-pointer"
                          onClick={() => router.push("/login2")}
                        >
                          Log In
                        </a>
                      </div>
                    </li>
                  ) : (
                    <li className="mr-4">
                      {!userData ? (
                        <div
                          className="flex cursor-pointer relative items-center"
                          onClick={toggleProfileMenu}
                        >
                          <div className="mr-2">
                            <SkeletonLoader
                              type="circular"
                              width={40}
                              height={40}
                            />
                          </div>
                          <div className="">
                            <span className="">
                              <SkeletonLoader
                                type="rectangular"
                                width={100}
                                height={18}
                              />
                            </span>
                            <p className="mt-1">
                              <SkeletonLoader
                                type="rectangular"
                                width={160}
                                height={25}
                              />
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="flex cursor-pointer relative items-center"
                          onClick={toggleProfileMenu}
                        >
                          <div className="">
                            <Avatar
                              src={userData.userProfileImage}
                              style={{
                                width: "43px",
                                height: "43px",
                                background: "#5C34FC",
                              }}
                            >
                              {userData.userName[0]?.toUpperCase()}
                            </Avatar>
                          </div>
                          {profileMenu && (
                            <div className="right-[0] top-[44px] min-w-[250px] main-menu absolute bg-white w-full border border-[#ccc] rounded-[10px] z-10 text-[#666] text-[14px]">
                              <ul className=" p-1 ">
                                <li className="text-[20px] py-[3px] px-[20px] mt-[16px] mb-[10px]">
                                  <div className="font-semibold text-black">
                                    Hello&nbsp;
                                    <span
                                      className="text-black"
                                      dangerouslySetInnerHTML={{
                                        __html: userData.userName,
                                      }}
                                    />
                                    !
                                  </div>
                                </li>
                                <li className="py-[3px] px-[20px]">
                                  <Link href={"/whats-new"}>
                                    Buyer Dashboard
                                  </Link>
                                </li>
                                {true && (
                                  <>
                                    <li className="py-[3px] px-[20px]">
                                      <Link href={"/seller/dashboard"}>
                                        Seller Dashboard
                                      </Link>
                                    </li>
                                    <li className="py-[3px] px-[20px]">
                                      <Link
                                        href={`/store-page?sellerId=${user?.id}`}
                                      >
                                        My Store
                                      </Link>
                                    </li>
                                  </>
                                )}
                                <li className="py-[3px] px-[20px]">
                                  <Link href={"/seller/messages"}>
                                    Messages{" "}
                                    {unreadMsgs > 0 ? (
                                      <span className="inline-block relative">
                                        <div className="animate-[pulsate_8s_ease-out_infinite] border border-[#e85656] rounded-full w-[40px] h-[40px] absolute top-[-12px] right-[-12px] opacity-0"></div>
                                        <span className="flex justify-center items-center w-4 h-4 text-white bg-[#E54B4D] text-semibold text-[10px] rounded-full">
                                          {unreadMsgs}
                                        </span>
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </Link>
                                </li>
                                <div className="pt-[16px]"></div>
                                <li
                                  className="mx-[-5px] border-[#ccc] border-t py-[10px] px-[25px] cursor-pointer"
                                  onClick={() => handleSignOut()}
                                >
                                  Logout
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </li>
                  )}
                  {!tokens.getAccessTokenCookies() ? (
                    <li className="flex items-center text-[14px]">
                      <div className="flex justify-center items-center bg-[#5C34FC] border-2 rounded-full px-4 py-3 border-[#5C34FC]">
                        <a
                          className="text-white font-semibold cursor-pointer"
                          onClick={() => router.push("/login2")}
                        >
                          Sell on Finzo
                        </a>
                      </div>
                    </li>
                  ) : (
                    <li className="flex items-center text-[14px] md:block">
                      <div className="flex justify-center items-center bg-[#5C34FC] border-2 rounded-full px-4 py-2.5 border-[#5C34FC]">
                        <a
                          className="text-white font-semibold cursor-pointer"
                          onClick={() => router.push("/login2")}
                        >
                          List Item
                        </a>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex item-center mx-4 mt-4 lg:hidden">
            <IconButton onClick={() => handleShowMenuDropdown()}>
              <SVGIcon.CategoryIcon />
            </IconButton>
            <div className={`header_search_section w-full`}>
              <div className="relative ">
                <input
                  className="h-10 px-3 rounded-sm border border-slate-200 w-full dark:bg-[rgb(18,18,18)] dark:border-slate-700"
                  placeholder="I'm searching for .."
                  value={keyword}
                  onChange={(e) => {
                    debounceSearch(e);
                    setKeyword(e.target.value);
                  }}
                />

                <div
                  onClick={() => {
                    router.push(`/search-result?keyword=${keyword}`);
                    setKeyword("");
                    setShowSearchDropdown(false);
                  }}
                  className="absolute top-[1px] right-[1px] cursor-pointer bg-blue-200 rounded-r-full p-[9px]"
                >
                  <SVGIcon.SearchIcon2 />
                </div>
                {showSearchDropdown ? (
                  <SearchDropdown
                    keyword={keyword}
                    handleResetKeyword={() => {
                      setKeyword("");
                      setShowSearchDropdown(false);
                    }}
                    results={searchResults}
                  />
                ) : null}
                {searchLoader && (
                  <div className="absolute top-[3px] right-14 z-10 flex justify-center items-center h-10">
                    <div
                      className="w-5 h-5  rounded-full animate-spin"
                      style={{ animationDuration: "0.4s" }}
                    >
                      <div className="w-[19px] h-[19px] border-3  rounded-full border-blue-500 loader_search ">
                        &nbsp;
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* {showDropdownMenu && ( */}
          <Drawer
            sx={{
              maxWidth: "1280px",
              mx: "0 auto",
              "@media (min-width: 1280px)": {
                left: "10%",
                // right: "-15%",
              },
              left: "0",
              right: "0",
            }}
            anchor="top"
            open={showDropdownMenu}
            onClose={() => toggleDrawer(false)}
            ModalProps={{
              keepMounted: true,
              BackdropProps: {
                sx: {
                  backgroundColor: "transparent", // Example of backdrop customization
                },
              },
              // Keep the drawer mounted for performance
            }}
            PaperProps={{
              sx: {
                backgroundColor: "transparent",
                position: "absolute",
                top: 84,
                height: "auto",
                // left: "10%",
                // right: "-10%",
                maxWidth: "1280px",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
              },
            }}
          >
            <div className="">
              <CategoryDropdown
                categories={allCategories.filter(
                  (item: any) => item.children.length > 0,
                )}
              />
            </div>
          </Drawer>
          {/* )} */}
        </div>
      </div>
      {!hideSubheader && (
        <div
          className="subHeader_section flex items-center justify-center mt-[85px] lg:mt-[88px]"
          style={{
            backgroundColor: navSetting?.back_color ?? "inherit",
          }}
        >
          {/* {allCategories.length === 0 && <CircularProgress />} bg-blue-100  */}
          <ul className="flex justify-center flex-wrap">
            {allCategories.length === 0 && (
              <>
                {[...Array(8)].map((_, index) => (
                  <li className="px-2 py-3" key={index}>
                    <SkeletonLoader
                      key={index}
                      type="rectangular"
                      width={100}
                      height={30}
                    />
                  </li>
                ))}
              </>
            )}
            {allCategories
              .filter((item: any) => item.children.length > 0)
              .map((item: any, index: number) => (
                <li
                  key={index}
                  className="px-5 py-3  cursor-pointer"
                  style={{
                    color: navSetting?.color ?? "inherit",
                    fontSize: navSetting?.size ?? "inherit",
                    letterSpacing: navSetting?.spacing ?? "normal",
                  }}
                  onClick={() =>
                    router.push(
                      `/search-result?category=${item.term_taxonomy_id}`,
                    )
                  }
                  dangerouslySetInnerHTML={{ __html: item?.term?.name }}
                />
              ))}
          </ul>

          <DeliveryLocationModal
            onClose={closeDeliveryLocationPopUp}
            open={showDeliveryLocationModal}
          />
        </div>
      )}

      {/* loader for whole frontend pages  */}
      {/* <div className="fixed w-full top-0 left-0 z-10">
        <LinearProgress value={80} sx={{ height: "6px" }} />
      </div> */}
    </>
  );
}
