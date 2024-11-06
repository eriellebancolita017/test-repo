"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Products from "./component/products";
import { Reviews } from "./component/review";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthApi } from "@fizno/api-client/src/apis/AuthApi";
// import RoundedLoader from "@/components/loader/roundedLoader";
import { categoriesService } from "@fizno/api-client/src/apis/catergory";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  globalCacheStateSelector,
  setIsLoading,
  setToastMessage,
} from "@/redux/slices/globaCache.slice";
import { tokens } from "@/helpers/jwtTokenFunction";
import SkeletonLoader from "@/components/loader/skeletonLoader";
import MediumSizeModal from "@/components/common/modal/mediumSizeModal";
import { FollowerList } from "@/components/common/listModal/followerList";
import { Avatar } from "@mui/material";

const StorePage = () => {
  /**
   * redux
   */

  const dispatch = useAppDispatch();
  const { user } = useAppSelector(globalCacheStateSelector);

  /**
   * router
   */

  const router = useRouter();

  /**
   * state management
   */

  const [activeTab, setActiveTab] = useState("Products");
  const [currentUserData, setCurrentUserData] = useState<{
    userName: string;
    userId: "";
  }>({ userName: "", userId: "" });
  const [userDetail, setUserDetail] = useState<any>();
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showingFollowerList, setShowingFollowerList] = useState(false);

  const [reviewCounts, setReviewCounts] = useState({
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
  });
  const [totalReviewCount, setTotalReviewCount] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  /**
   * router
   */

  const id = searchParams.get("sellerId");

  const handleTabClick = (tabId: string) => {
    const section = document.getElementById(tabId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveTab(tabId);
    }
  };

  const getUserById = async () => {
    try {
      const response = await AuthApi.getUserById(id as string);
      if (response.remote === "success") {
        setUserDetail(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    // setLoading(true);
    try {
      const response = await categoriesService.getAllProducts(1, 10, {
        seller: id,
        category: "",
        condition: "",
      });
      if (response.remote === "success") {
        const data = response.data.data.updateData;
        const productData = data.map((item: any) => {
          const getMetaValue = (key: string) => {
            const meta = item?.wp_nepaz2_postmeta?.find(
              (item: any) => item.meta_key === key,
            )?.meta_value;
            return meta;
          };
          const postmeta = item.wp_nepaz2_postmeta.reduce(
            (acc: any, meta: any) => {
              acc[meta.meta_key] = meta.meta_value;
              return acc;
            },
            {},
          );
          return {
            id: item?.ID,
            image: postmeta._ebay_product_featured_image
              ? postmeta._ebay_product_featured_image.img_url
              : item.attachment.length > 0
                ? item.attachment[0]?.guid.includes("http")
                  ? item.attachment[0]?.guid
                  : `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.attachment[0]?.guid}`
                : "",
            likes: item?.wp_add_product_fav.length || 0,
            comments: item?.comment_count || 0,
            shares: "0",
            title: item?.post_name,
            condition: "New",
            price: `$${getMetaValue("_price") || 0}`,
            shipping: "Free Shipping",
            sellerImage: item?.wp_nepaz2_users?.avatar?.guid,
            sellerName: item?.wp_nepaz2_users?.display_name,
            location: `${item?.wp_nepaz2_users?.store?.address?.city}, ${item?.wp_nepaz2_users?.store?.address?.country}`,
            rating: item?.wp_nepaz2_users?.avgRate || 0,
            stock: `${getMetaValue("_stock") || 0}`,
          };
        });
        setProducts(productData);
        setTotalProducts(response.data.data.totalResults);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      // setLoading(false);
    }
  };

  const getAllStoreReview = async () => {
    try {
      const response = await UserApi.getAllStoreReview(id as string);
      if (response.remote === "success") {
        const review = response.data.data.userReview.map((review: any) => {
          return {
            image: review.user.avatar.guid
              ? review.user.avatar.guid?.includes("http")
                ? review.user.avatar.guid
                : `${process.env.NEXT_PUBLIC_API_BASE_URL}${review.user.avatar.guid}`
              : "/images/avatar-06.jpg",
            name: review.user.display_name,
            title: review.post.post_title,
            content: review.post.post_content,
            time: moment(review.post.post_date).format("DD/MM/YYYY"),
            rating: review.post.wp_nepaz2_postmeta[0].meta_value,
          };
        });
        setReviews(review);
        setReviewCounts(response.data.data.ratingCounts);
        setTotalReviewCount(response.data.data.totalCount);
        setAvgRating(response.data.data.averageRating);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * handle follow user
   */

  const handleFollowUser = async (userId: number) => {
    const payload = { userId };
    dispatch(setIsLoading(true));
    const response = await UserApi.followUserAPI(payload);

    if (response.remote === "success") {
      dispatch(setIsLoading(false));
      getUserById();
    } else {
      dispatch(setIsLoading(false));
      dispatch(
        setToastMessage({
          message: response.error.errors.message || "An error occurred!",
          open: true,
          status: "error",
        }),
      );
    }
  };

  const isFollowingByMe = () => {
    return userDetail?.follower?.some(
      (el: any) => Number(el?.follower_id) === Number(currentUserData?.userId),
    );
  };

  const handleUnFollowUser = async (venderId: number) => {
    setIsLoading(true);
    const response = await UserApi.unFollowUserAPI({ venderId });
    if (response.remote === "success") {
      dispatch(setIsLoading(false));
      getUserById();
      /* dispatch(
        setToastMessage({
          message: "UnFollow successful.",
          status: "success",
          open: true,
        }),
      ); */
      //handleRefresh();
    } else {
      setIsLoading(false);
      dispatch(
        setToastMessage({
          message: response.error.errors.message || "An error has occurs",
          status: "error",
          open: true,
        }),
      );
    }
  };

  useEffect(() => {
    if (id) {
      getUserById();
      fetchProducts();
      getAllStoreReview();
    }
  }, [id]);

  useEffect(() => {
    if (user) {
      setCurrentUserData({
        userName: user?.display_name,
        userId: user?.id,
      });
    }
  }, [user]);

  const getMetavalue = (key: string) => {
    const meta = userDetail?.wp_nepaz2_usermeta.find(
      (item: any) => item.meta_key == key,
    );
    return meta?.meta_value;
  };
  return (
    //   (
    //   <RoundedLoader />
    // ) : (
    <>
      <div className="store_page">
        <div className="bg-[#DFEDFF] py-8">
          <div className="container">
            {loading ? (
              <>
                {" "}
                {/* skeleton seller detail card start */}
                <div className="my-2">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-start cursor-pointer">
                        <SkeletonLoader
                          type="circular"
                          width={50}
                          height={50}
                        />
                        <div className="ml-2 lg:ml-1 2xl:ml-2">
                          <p className="text-primaryMain font-semibold text-xl lg:text-sm normal-case leading-6">
                            <SkeletonLoader
                              type="text"
                              width={100}
                              height={22}
                            />
                          </p>
                          <p className="font-medium text-[12px] normal-case">
                            <SkeletonLoader
                              type="text"
                              width={120}
                              height={18}
                            />
                          </p>
                          <p className="font-medium text-[12px] normal-case">
                            <SkeletonLoader
                              type="text"
                              width={60}
                              height={18}
                            />
                          </p>
                        </div>
                      </div>
                      <button
                        className="w-full px-6 py-1 text-white font-semibold rounded-md mt-4"
                        style={{ background: "#306cb5" }}
                      >
                        Follow
                      </button>
                    </div>
                    <div className="w-full md:w-auto md:mr-1 2xl:mr-0 mb-4 md:mb-0">
                      <ul className="flex justify-between md:justify-start">
                        <li className="border-r border-black text-xs lg:text-[9px] 2xl:text-xs font-light text-center px-2 normal-case">
                          <div className="flex justify-center">
                            <SkeletonLoader
                              type="text"
                              width={30}
                              height={24}
                            />
                          </div>
                          <SkeletonLoader type="text" width={80} height={24} />
                        </li>
                        <li className="border-r border-black text-xs lg:text-[9px] 2xl:text-xs font-light text-center px-2 normal-case">
                          <div className="flex justify-center">
                            <SkeletonLoader
                              type="text"
                              width={30}
                              height={24}
                            />
                          </div>
                          <SkeletonLoader type="text" width={80} height={24} />
                        </li>
                        <li className="text-xs lg:text-[9px] 2xl:text-xs font-light text-center px-2 normal-case">
                          <div className="flex justify-center">
                            <SkeletonLoader
                              type="text"
                              width={30}
                              height={24}
                            />
                          </div>
                          <SkeletonLoader type="text" width={80} height={24} />
                        </li>
                      </ul>
                    </div>
                    <div className="w-full md:w-auto">
                      <div className="flex justify-between mb-4 gap-2">
                        <SkeletonLoader
                          type="rectangular"
                          width={45}
                          height={28}
                        />
                        <SkeletonLoader
                          type="rectangular"
                          width={120}
                          height={28}
                        />
                      </div>
                      <SkeletonLoader
                        type="rectangular"
                        width={120}
                        height={28}
                      />
                    </div>
                  </div>
                </div>
                {/* seller skeleton detail card ends */}
              </>
            ) : (
              <div className="flex flex-col md:flex-row justify-between items-center my-2">
                <div className="">
                  <div className="flex items-start">
                    <Avatar
                      src={
                        userDetail?.avatar?.guid?.includes("http")
                          ? userDetail?.avatar?.guid
                          : `${process.env.NEXT_PUBLIC_API_BASE_URL}${userDetail?.avatar?.guid}`
                      }
                      sx={{
                        width: "50px",
                        height: "50px",
                        background: "#306cb5",
                      }}
                    >
                      {getMetavalue("dokan_profile_settings")?.store_name[0]}
                    </Avatar>

                    <div className="ml-2">
                      <p
                        className="text-primaryMain font-semibold text-base normal-case leading-6"
                        dangerouslySetInnerHTML={{
                          __html: getMetavalue("dokan_profile_settings")
                            ?.store_name,
                        }}
                      />
                      <p className=" font-medium text-[12px] normal-case">
                        <span>
                          <img
                            className="w-[6px] mr-1"
                            src="data:image/png;base64,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"
                          />
                        </span>
                        {getMetavalue("dokan_profile_settings")?.address.city
                          ? getMetavalue("dokan_profile_settings")?.address
                              .city + ","
                          : ""}{" "}
                        {
                          getMetavalue("dokan_profile_settings")?.address
                            .country
                        }
                      </p>
                      <p className="cursor-pointer font-medium text-[12px] normal-case">
                        {userDetail?.follower.length} followers
                      </p>
                    </div>
                  </div>{" "}
                  <button
                    disabled={!tokens.getAccessToken()}
                    onClick={() =>
                      id &&
                      (isFollowingByMe()
                        ? handleUnFollowUser(Number(id))
                        : handleFollowUser(Number(id)))
                    }
                    className="w-full bg-primaryMain px-8 py-1 text-white font-semibold rounded-md mt-4"
                  >
                    {userDetail?.follower?.some(
                      (el: any) =>
                        Number(el?.follower_id) ===
                        Number(currentUserData?.userId),
                    )
                      ? "Followed"
                      : "Follow"}
                  </button>
                </div>
                <div className="my-4 md:my-0">
                  <ul className="flex">
                    <li className="border-r border-[#898989] text-black text-xl font-semibold text-center px-3 leading-6 normal-case">
                      <p>{totalProducts || 0}</p>
                      <p>Listings</p>
                    </li>
                    <li
                      onClick={() => setShowingFollowerList(true)}
                      className="cursor-pointer border-r border-[#898989] text-black text-xl font-semibold text-center leading-6 px-3 normal-case"
                    >
                      <p>{userDetail?.follower.length}</p>
                      <p>Followers</p>
                    </li>
                    <li className=" text-black text-xl font-semibold text-center px-3 leading-6 normal-case">
                      <p>0</p>
                      <p>Items Sold</p>
                    </li>
                  </ul>
                </div>
                <div className="">
                  <div className="flex justify-between mb-4 gap-4">
                    <div className="bg-[#FBF3EA] text-black font-semibold py-1 h-7 px-2 rounded-md flex items-center">
                      <svg
                        className="mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <path
                          d="M4.77249 1.1524C4.79097 1.10732 4.82244 1.06877 4.86289 1.04163C4.90335 1.01449 4.95096 1 4.99968 1C5.04839 1 5.096 1.01449 5.13646 1.04163C5.17691 1.06877 5.20838 1.10732 5.22686 1.1524L6.15524 3.38533C6.17262 3.42711 6.20119 3.46329 6.2378 3.48988C6.27442 3.51647 6.31766 3.53245 6.36276 3.53605L8.77351 3.72916C8.99152 3.74663 9.07977 4.01881 8.91375 4.1608L7.07707 5.73447C7.04276 5.76383 7.01719 5.80206 7.00316 5.84498C6.98914 5.88791 6.98744 5.93384 6.99813 5.97754L7.57088 8.34357C7.62322 8.5658 7.39147 8.74202 7.19762 8.62282L5.19173 7.39604C5.1511 7.37257 5.10625 7.35977 5.05968 7.35977C5.01311 7.35977 4.96826 7.37257 4.92763 7.39604L2.92174 8.62282C2.72789 8.74202 2.49614 8.5658 2.54848 8.34357L3.12123 5.97754C3.13191 5.93384 3.13021 5.88791 3.11619 5.84498C3.10216 5.80206 3.07659 5.76383 3.04228 5.73447L1.2056 4.1608C1.03958 4.01881 1.12783 3.74663 1.34585 3.72916L3.7566 3.53605C3.80169 3.53245 3.84493 3.51647 3.88154 3.48988C3.91815 3.46329 3.94672 3.42711 3.96411 3.38533L4.77249 1.1524Z"
                          fill="#F59E0B"
                          stroke="currentColor"
                          strokeWidth="0.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {userDetail?.avg_rate}
                    </div>
                    <div className="bg-[#FFFFFF] text-blueTwo font-semibold py-1 h-7 px-2 rounded-md flex items-center normal-case">
                      <Image
                        src="/svg/mainpages/commentIcon.svg"
                        alt=""
                        width={15}
                        height={15}
                        className="mr-2"
                      />{" "}
                      {userDetail?.userReview?.length} Reviews
                    </div>
                  </div>

                  <div
                    id="product_section"
                    className=" cursor-pointer  bg-[#B2D2F9] flex justify-center items-center text-primaryMain font-semibold normal-case h-9 rounded-lg"
                    onClick={() =>
                      tokens.getAccessTokenCookies()
                        ? router.push(`/messages?sendTo=${id}&tab="newMessage"`)
                        : router.push("/register")
                    }
                  >
                    <Image
                      src="/svg/mainpages/commentIcon.svg"
                      alt=""
                      width={20}
                      height={20}
                      className="mr-2"
                    />{" "}
                    Message seller
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Tabs Section */}
        <div className="container">
          <div className="mt-6 store__page__tab">
            <div className="relative main_tab_section">
              <div
                className="absolute showing_tab_border bottom-0 w-full h-px bg-slate-200 dark:bg-slate-700"
                aria-hidden="true"
              ></div>
              <ul className="flex ps-0 ">
                <li
                  className={`flex mr-6 last:mr-0 last:pr-4 sm:last:pr-6 lg:last:pr-8 ${
                    activeTab === "product_section" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("product_section")}
                >
                  <a
                    className={`block pb-3 whitespace-nowrap font-medium ${
                      activeTab === "product_section"
                        ? "border-primaryMain border-b-2 text-primaryMain"
                        : ""
                    }`}
                    href="#0"
                  >
                    Products
                  </a>
                </li>
                <li
                  className={`flex mr-6 last:mr-0 last:pr-4 sm:last:pr-6 lg:last:pr-8 ${
                    activeTab === "review_section" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("review_section")}
                >
                  <a
                    className={`block pb-3 whitespace-nowrap font-medium ${
                      activeTab === "review_section"
                        ? "border-primaryMain border-b-2 text-primaryMain"
                        : ""
                    }`}
                    href="#0"
                  >
                    Reviews
                  </a>
                </li>
                <li
                  className={`flex mr-6 last:mr-0 last:pr-4 sm:last:pr-6 lg:last:pr-8 ${
                    activeTab === "about_section" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("about_section")}
                >
                  <a
                    className={`block pb-3 whitespace-nowrap font-medium ${
                      activeTab === "about_section"
                        ? "border-primaryMain border-b-2 text-primaryMain"
                        : ""
                    }`}
                    href="#0"
                  >
                    About Me
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="mt-4">
            <Products
              products={products}
              storename={getMetavalue("dokan_profile_settings")?.store_name}
            />
          </div>
          <p id="about_section" className="pt-10 mb-5">
            &nbsp;
          </p>
        </div>
        <div className="bg-[#DFEDFF] py-6">
          <div className="container">
            <div className="">
              <div className="flex my-3 items-center justify-center">
                <h4 className="heading_crm_pages text-black font-bold capitalize text-[40px]">
                  About Me
                </h4>
              </div>

              <div className=" py-5 normal-case       ">
                <p className="text-lg font-medium text-black mt-4">
                  {getMetavalue("description")}
                </p>
                {/* <div className="space-y-2">
                  <SkeletonLoader type="rectangular" width="100%" height={20} />
                  <SkeletonLoader type="rectangular" width="100%" height={20} />
                  <SkeletonLoader type="rectangular" width="100%" height={20} />
                  <SkeletonLoader type="rectangular" width="100%" height={20} />
                  <SkeletonLoader type="rectangular" width={200} height={20} />
                </div> */}
                <div className="" id="review_section">
                  &nbsp;
                </div>
              </div>
              {/* <div className="py-5 normal-case">
                <h4 className="text-primaryMain text-2xl font-bold ">
                  Our Features
                </h4>
                <ul className="mt-4 space-y-2 pl-4">
                  <li className="text-lg font-medium text-black list-disc">
                    No additional monthly fees
                  </li>
                  <li className="text-lg font-medium text-black list-disc">
                    Loreum epsum
                  </li>
                  <li className="text-lg font-medium text-black list-disc">
                    Automatic deposits
                  </li>
                  <li className="text-lg font-medium text-black list-disc">
                    Loreum epsum
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
        <div className=" py-8">
          <div className="container">
            <Reviews
              reviews={reviews}
              reviewCounts={reviewCounts}
              totalReviewCount={totalReviewCount}
              avgRating={avgRating}
            />
          </div>
        </div>
      </div>
      <MediumSizeModal
        isOpen={showingFollowerList}
        setIsOpen={setShowingFollowerList}
      >
        <FollowerList followerListData={userDetail?.follower} />
      </MediumSizeModal>
    </>
  );
  // );
};
export default StorePage;
