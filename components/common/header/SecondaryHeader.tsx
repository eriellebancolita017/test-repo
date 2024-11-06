"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import SearchDropdown from "./searchDropdown";
import { CategoryDropdown } from "@/components/dropdown/categoryDropdown";
import { categoriesService } from "@fizno/api-client/src/apis/catergory";
import { debounce } from "@/components/utils/debounce";
import { tokens } from "@/helpers/jwtTokenFunction";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import userIcon from "../../../assets/images/user-icon.png";
import {
  globalCacheStateSelector,
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

export default function MainHeader() {
  /**
   * router
   */

  // const pathname = usePathname();
  const router = useRouter();

  /**
   * redux
   */

  const dispatch = useAppDispatch();
  const { user } = useAppSelector(globalCacheStateSelector);
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

  const headerMenu =
    currentPath === "/seller/login" ||
    currentPath === "/login" ||
    currentPath === "/register" ||
    currentPath === "/forgot-password" ||
    currentPath === "/verification" ||
    currentPath === "/search-result" ||
    currentPath === "/search-detail" ||
    currentPath === "/shopping-cart" ||
    currentPath === "/home";

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

  useEffect(() => {
    handleFetchMessages();
  }, []);

  return (
    <>
      <div className="z-[9] bg-white py-3 px-8 max-w-[1200px] rounded-full mx-auto left-0 right-0 !top-[30px] !absolute">
        <div className="container relative">
          <div className="flex items-center">
            <div className={` ${!headerMenu ? "w-4/12" : "w-3/12"}`}>
              <div className="header_left_section flex items-center ">
                <div
                  className="mr-3 cursor-pointer"
                  onClick={() => router.push("/home")}
                >
                  <SVGIcon.fiznoLogoBlack />
                </div>
              </div>
            </div>
            <div className="w-6/12">
              <div className="relative ">
                <div
                  className="absolute flex items-center top-[0px] left-[0px] cursor-pointer border-r border-[#CCCCCC] text-black text-sm rounded-tl-md rounded-bl-md p-[9px] px-[16px]"
                  onClick={handleShowMenuDropdown}
                >
                  All
                  <span className="mt-[-6px] inline-block scale-x-[1.4] text-xs ml-1">
                    ⌄
                  </span>
                </div>
                <input
                  className="pl-[74px] h-10 px-3 rounded-md text-sm border border-[#CCCCCC] w-full dark:bg-[rgb(18,18,18)] dark:border-slate-700"
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
                  className="absolute top-[0px] right-[0px] cursor-pointer bg-[#5C34FC] text-white text-sm rounded-tr-md rounded-br-md p-[9px] px-[16px]"
                >
                  Search
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
            <div className={` ${!headerMenu ? "w-4/12" : "w-3/12"} `}>
              <div className="header_right_section">
                <ul className="flex items-center justify-end">
                  <li
                    className="text-blueTwo font-semibold cursor-pointer relative"
                    onClick={() => router.push("/shopping-cart")}
                  >
                    <div className="flex justify-center items-center w-4 h-4 text-white bg-[#E54B4D] text-semibold text-[10px] absolute right-[-5px] top-[-5px] rounded-full">
                      {cartCount}
                    </div>
                    <SVGIcon.CartIcon />
                  </li>
                  {!tokens.getAccessTokenCookies() && (
                    <li className="flex items-center text-[14px]">
                      <Image
                        className="mr-3 ml-7"
                        width="27"
                        height="22"
                        alt="Login"
                        src={userIcon}
                      />
                      <div>
                        <a
                          className="mb-[-4px] block text-black font-semibold cursor-pointer"
                          onClick={() => router.push("/login")}
                        >
                          Log in
                        </a>
                        <a
                          className="block text-black font-semibold cursor-pointer"
                          onClick={() => router.push("/sell")}
                        >
                          Sell
                        </a>
                      </div>
                    </li>
                  )}
                  {tokens.getAccessTokenCookies() && (
                    <li className="mr-3">
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
                          <svg
                            className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
                            viewBox="0 0 12 12"
                          >
                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                          </svg>
                        </div>
                      ) : (
                        <div
                          className="flex cursor-pointer relative items-center"
                          onClick={toggleProfileMenu}
                        >
                          <div className="ml-4">
                            <Avatar
                              src={userData.userProfileImage}
                              style={{
                                width: "32px",
                                height: "32px",
                                background: "#306cb5",
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
                                {userData.userRole === "seller" && (
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
                </ul>
              </div>
            </div>
          </div>
          {/* {showDropdownMenu && ( */}
          <Drawer
            sx={{ maxWidth: "1280px", mx: "0 auto" }}
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
                left: "10%",
                right: "-10%",
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
    </>
  );
}
