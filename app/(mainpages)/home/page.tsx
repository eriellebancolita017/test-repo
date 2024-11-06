"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SellerCard from "@/components/common/card/sellerCard";
import ProductCard from "@/components/common/card/productCard";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import SVG from "@/public/svg";
import Link from "next/link";
import { HomeApi } from "@fizno/api-client/src/apis/HomeApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { globalCacheStateSelector } from "@/redux/slices/globaCache.slice";
import { Alert, Snackbar } from "@mui/material";
import { tokens } from "@/helpers/jwtTokenFunction";
import BannerSection from "./components/bannerSection";
import { useRouter } from "next/navigation";
import SkeletonLoader from "@/components/loader/skeletonLoader";
import SkeletonProductCard from "@/components/common/card/skeletonProductCard";
// import ImageLazyLoader from "@/components/loader/imageLazyLoader";
import SkeletonSellerCard from "@/components/common/card/skeletonSellerCard";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import {
  setAllCartProduct,
  setAllFavoriteProducts,
  setCartCount,
} from "@/redux/slices/product.slice";
import IMAGES from "@/public/images";
import { categoriesService } from "@fizno/api-client/src/apis/catergory";

export type FeaturedProductType = {
  id: number;
  image: string;
  likes: string;
  comments: string;
  shares: string;
  title: string;
  condition: string;
  price: string;
  salePrice: string;
  shipping: string;
  sellerImage: string;
  sellerName: string;
  sellerId: number;
  location: string;
  rating: string;
  stock: number;
};

export default function Home() {
  /**
   * rotuer
   */

  const router = useRouter();

  /**
   * redux
   */
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(globalCacheStateSelector);

  /**
   * state management
   */

  const [allBanners, setAllBanners] = useState<
    {
      id: number;
      image: string;
      title: string;
      category: number;
      size?: number;
      color?: string;
      spacing?: number;
    }[]
  >([]);
  const [allFeaturedProducts, setAllFeaturedProducts] = useState<
    FeaturedProductType[] | null
  >([]);
  const [allPrmProducts, setAllPrmProducts] = useState<
    FeaturedProductType[] | null
  >([]);
  const [newlyListedProducts, setNewlyListedProducts] = useState<
    FeaturedProductType[] | null
  >([]);
  const [popularCategory, setPopularCategory] = useState<
    { id: number; title: string; imageUrl: string }[]
  >([]);
  const [allRecentProducts, setAllRecentProducts] = useState<
    FeaturedProductType[] | null
  >([]);
  const [recommendedSellers, setRecommendedSellers] = useState<
    {
      id: number;
      name: string;
      address: string;
      image: string;
      followers: number;
      rating: string;
    }[]
  >([]);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "error";
    open: boolean;
  }>({ message: "", severity: "success", open: false });
  const [recentlyViewImageErrorList, setRecentlyViewImageErrorList] = useState<
    number[]
  >([]);
  const [pickedImageErrorList, setPickedImageErrorList] = useState<number[]>(
    [],
  );
  const { user: userData } = useAppSelector(globalCacheStateSelector);
  const [dealImageErrorList, setDealImageErrorList] = useState<number[]>([]);
  const [pickForUProduct, setPickForUProduct] = useState<any>([]);
  const [todayDealProduct, setTodayDealProduct] = useState<any>([]);

  /**
   * get all featured products
   */
  const getAllFeaturedProducts = async () => {
    const response = await HomeApi.getAllFeaturedProducts();
    if (response.remote === "success") {
      const data = response.data.data.data.updateData;

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
          likes: item?.wp_add_product_fav || 0,
          comments: item?.comment_count || 0,
          follower: (item?.wp_nepaz2_users?.follower || []).map(
            (user: {
              id: number;
              vendor_id?: number;
              follower_id?: number;
            }) => ({
              follower_id: user.follower_id || 0,
              id: user.id,
              vendor_id: user.vendor_id || 0,
            }),
          ),
          userId: userData?.id || "",
          shares: "0",
          title: item?.post_name,
          condition: "New",
          price: `$${getMetaValue("sale_price") ? getMetaValue("_price") || 0 : 0}`,
          salePrice: `$${getMetaValue("sale_price") ? (Number(getMetaValue("sale_price")) === 0 ? getMetaValue("_price") : getMetaValue("sale_price")) : getMetaValue("_price") || 0}`,
          shipping: "Free Shipping",
          sellerImage: item?.wp_nepaz2_users?.avatar?.guid,
          sellerName: item?.wp_nepaz2_users?.display_name,
          sellerId: item?.wp_nepaz2_users?.id,
          location: `${item?.wp_nepaz2_users?.store?.address?.city}, ${item?.wp_nepaz2_users?.store?.address?.country}`,
          rating: item?.wp_nepaz2_users?.avgRate || 0,
          stock: `${getMetaValue("_stock") || 0}`,
        };
      });
      productData.length === 0
        ? setAllFeaturedProducts(null)
        : setAllFeaturedProducts(productData);
    } else {
      setAllFeaturedProducts(null);
    }
  };
  /**
   * get all featured products
   */
  const getAllNewlyListedProducts = async () => {
    const response = await HomeApi.getAllNewlyListedProductsAPI();
    if (response.remote === "success") {
      const data = response.data.data.data.updateData;
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
          likes: item?.wp_add_product_fav || 0,
          comments: item?.post_comments || 0,
          shares: "0",
          title: item?.post_name,
          condition: "New",
          price: `$${getMetaValue("sale_price") ? getMetaValue("_price") || 0 : 0}`,
          salePrice: `$${getMetaValue("sale_price") ? (Number(getMetaValue("sale_price")) === 0 ? getMetaValue("_price") : getMetaValue("sale_price")) : getMetaValue("_price") || 0}`,
          shipping: "Free Shipping",
          sellerImage: item?.wp_nepaz2_users?.avatar?.guid,
          sellerName: item?.wp_nepaz2_users?.display_name,
          sellerId: item?.wp_nepaz2_users?.id,
          location: `${item?.wp_nepaz2_users?.store?.address?.city}, ${item?.wp_nepaz2_users?.store?.address?.country}`,
          rating: item?.wp_nepaz2_users?.avgRate || 0,
          stock: `${getMetaValue("_stock") || 0}`,
        };
      });
      productData.length === 0
        ? setNewlyListedProducts(null)
        : setNewlyListedProducts(productData);
    } else {
      setNewlyListedProducts(null);
    }
  };

  /**
   * get all prm products
   */
  const getAllPrmProducts = async () => {
    const response = await HomeApi.getAllPrmProducts();
    if (response.remote === "success") {
      const data = response.data.data.data.updateData;
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
          likes: item?.wp_add_product_fav || 0,
          comments: item?.comment_count || 0,
          shares: "0",
          title: item?.post_name,
          condition: "New",
          price: `$${getMetaValue("sale_price") ? getMetaValue("_price") || 0 : 0}`,
          salePrice: `$${getMetaValue("sale_price") ? (Number(getMetaValue("sale_price")) === 0 ? getMetaValue("_price") : getMetaValue("sale_price")) : getMetaValue("_price") || 0}`,
          shipping: "Free Shipping",
          sellerImage: item?.wp_nepaz2_users?.avatar?.guid,
          sellerName: item?.wp_nepaz2_users?.display_name,
          sellerId: item?.wp_nepaz2_users?.id,
          location: `${item?.wp_nepaz2_users?.store?.address?.city}, ${item?.wp_nepaz2_users?.store?.address?.country}`,
          rating: item?.wp_nepaz2_users?.avgRate || 0,
          stock: `${getMetaValue("_stock") || 0}`,
        };
      });

      productData.length === 0
        ? setAllPrmProducts(null)
        : setAllPrmProducts(productData);
    } else {
      setAllPrmProducts(null);
    }
  };

  /**
   * get all recently viewed products
   */
  const getAllRecentlyViewedProducts = async () => {
    const response = await HomeApi.getAllRecentlyViewedProducts();
    if (response.remote === "success") {
      const data = response.data.data.data;

      const productData: any = data?.map((item: any) => ({
        id: item?.product?.ID,
        image: item?.product?.attachment[0]?.guid.includes("http")
          ? item?.product?.attachment[0]?.guid
          : item?.product?.attachment[0]?.guid
            ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${item?.product?.attachment[0]?.guid}`
            : "",
        likes: "120",
        comments: "45",
        shares: "20",
        title: item?.post_name,
        condition: "New",
        price: "$99.99",
        shipping: "Free Shipping",
        sellerImage: "/images/avatar99.png",
        sellerName: item?.wp_nepaz2_users?.display_name,
        location: "New York, USA",
        rating: "4.5",
      }));

      productData.length === 0
        ? setAllRecentProducts(null)
        : setAllRecentProducts(productData);
    } else {
      setAllRecentProducts(null);
    }
  };

  /**
   * handle get all sellers
   */
  const handleGetAllSellers = async () => {
    const response = await HomeApi.getAllSellersAPI();

    if (response.remote === "success") {
      const data = response.data.data.data.newData;

      const userData = data.map((item: any) => ({
        id: item.id,
        name: item?.display_name,
        address: `${
          item?.wp_nepaz2_usermeta.find(
            (el: any) => el.meta_key === "dokan_profile_settings",
          )?.meta_value?.address?.city
        }, ${
          item?.wp_nepaz2_usermeta.find(
            (el: any) => el.meta_key === "dokan_profile_settings",
          )?.meta_value?.address?.country
        }`,
        image: item.avatar.guid,
        followers: item?.follower?.length || 0,
        rating: item.avgRate || 0,
      }));

      setRecommendedSellers(userData);
    }
  };

  /**
   * handle get all banners
   */
  const handleGetAllBanners = async () => {
    const response = await HomeApi.getAllHomeBanner();
    if (response.remote === "success") {
      setAllBanners(response.data.data.data);
    }
  };

  /**
   * handle get all popular category
   */
  const handleGetAllPopularCategory = async () => {
    const response = await HomeApi.getAllPopularCategoryAPI();

    if (response.remote === "success") {
      const data = response.data.data.data;
      const catData = data.map((item: any) => ({
        id: item.term.term_id,
        title: item.term.name,
        imageUrl: item?.attachment
          ? process.env.NEXT_PUBLIC_API_BASE_URL + item?.attachment?.guid
          : `${process.env.NEXT_PUBLIC_API_BASE_URL}/public/uploads/2024-09-28-14-11-38-404-def-638240706028967470.jpg`,
      }));

      setPopularCategory(catData);
    }
  };
  useEffect(() => {
    if (userData) {
      getAllFeaturedProducts();
    }
  }, [userData]);

  useEffect(() => {
    handleGetAllBanners();
    getAllFeaturedProducts();
    getAllPrmProducts();
    handleGetAllPopularCategory();
    getAllNewlyListedProducts();
    handleGetAllSellers();
    getAllRecentlyViewedProducts();
  }, []);

  // const popularCategoryCard = popularCategory.map((item) => (
  //   <div
  //     onClick={() => router.push(`/search-result?category=${item.id}`)}
  //     key={item.id}
  //     className="relative overlay_cards_div rounded-2xl h-80 mx-3"
  //     style={{
  //       // backgroundImage: `url(${item.imageUrl})`,
  //       // Dynamically set the background image
  //       backgroundSize: "100% 100%",
  //       backgroundRepeat: "no-repeat",
  //       cursor: "pointer",
  //     }}
  //   >
  //     <Image
  //       src={item.imageUrl}
  //       width={100}
  //       alt=""
  //       height={320}
  //       sizes="100wvh"
  //       className="w-full h-full rounded-2xl"
  //       loading="eager"
  //     />
  //     {/* <ImageLazyLoader alt="" height="320px" src={item.imageUrl} /> */}
  //     <div
  //       className="categories_section absolute bottom-0 p-3 text-2xl text-white font-semibold text-center w-full"
  //       dangerouslySetInnerHTML={{
  //         __html: item.title,
  //       }}
  //     />
  //   </div>
  // ));

  const popularCategoryCard = popularCategory.map((item) => (
    <div
      onClick={() => router.push(`/search-result?category=${item.id}`)}
      key={item.id}
      className="relative overlay_cards_div rounded-2xl h-80 mx-3"
      style={{
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        cursor: "pointer",
      }}
    >
      <Image
        src={item.imageUrl}
        width={100}
        alt=""
        height={320}
        sizes="100wvh"
        className="w-full h-full rounded-2xl object-cover"
        loading="eager"
      />
      <div
        className="categories_section absolute bottom-0 p-3 text-2xl text-white font-semibold text-center w-full"
        dangerouslySetInnerHTML={{
          __html: item.title,
        }}
      />
    </div>
  ));

  const productCategoryCard = popularCategory.map((item) => (
    <div
      onClick={() => router.push(`/search-result?category=${item.id}`)}
      key={item.id}
      className="relative overlay_cards_div rounded-2xl h-80 mx-3"
      style={{
        backgroundImage: `url(${item.imageUrl})`,
        // Dynamically set the background image
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        cursor: "pointer",
        background:
          "linear-gradient(90deg, rgb(208, 228, 247) 0%, rgb(208, 228, 247) 50%, rgb(208, 228, 247) 100%)",
      }}
    >
      {/* <Image src={item.imageUrl} width={100} alt="" height={320} sizes="100wvh" /> */}
      {/* <ImageLazyLoader alt="" height="320px" src={item.imageUrl} /> */}

      <div
        className="categories_section absolute bottom-0 p-3 text-2xl text-white font-semibold text-center w-full"
        dangerouslySetInnerHTML={{ __html: item.title }}
      />
    </div>
  ));

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  /**
   * get add to fav list
   */

  const getFavList = async () => {
    const response = await UserApi.allFavoriteAPI();
    if (response.remote === "success") {
      const data = response.data.data.map((item: any) => ({
        id: item.porduct.ID,
        image: item?.porduct?.attachment[0]?.guid,
        likes: "0",
        comments: "0",
        shares: "0",
        title: item.porduct.post_title,
        condition: "New",
        price: item?.wp_nepaz2_postmeta?.find(
          (el: any) => el.meta_key === "_price",
        ).meta_value,
        shipping: "Free Shipping",
        sellerImage: item?.wp_nepaz2_users?.avatar?.guid,
        sellerName: item?.wp_nepaz2_users?.display_name,
        location: `${item?.wp_nepaz2_users?.store?.address?.city}, ${item?.wp_nepaz2_users?.store?.address?.country}`,
        rating: item?.wp_nepaz2_users?.totalReview,
      }));
      dispatch(setAllFavoriteProducts(data));
    }
  };

  /**
   * get all cart product list
   */

  const getAllCartProdList = async () => {
    const response = await UserApi.getAllCartProdAPI();
    if (response.remote === "success") {
      dispatch(setAllCartProduct(response.data.data));
      dispatch(setCartCount(response?.data?.data?.length || 0));
    }
  };
  /* skeleton cards for categories */
  const skeletonCategoryCard = [...Array(12)].map((index) => (
    <div className="relative overlay_cards_div rounded-2xl  mx-3" key={index}>
      <SkeletonLoader type="text" imgPreview={true} width="100%" height={420} />
    </div>
  ));

  const getSearchProducts = async (
    category: number[],
    type: "Deal" | "Pick",
  ) => {
    const data = {
      keyword: "",
      condition: [],
      brand: [],
      category,
      pageIndex: 1,
      pageSize: 16,
      minPrice: 10,
      maxPrice: 1000,
      sort: "",
    };
    const response = await categoriesService.searchProducts(data);
    const mappedData = response?.data?.data?.updateData?.map((product: any) => {
      const postmeta = product.wp_nepaz2_postmeta.reduce(
        (acc: any, meta: any) => {
          acc[meta.meta_key] = meta.meta_value;
          return acc;
        },
        {},
      );
      const condition = product.wp_term_relationships.find(
        (item: any) => item.term_taxonomy.taxonomy === "pa_condition",
      )?.term_taxonomy.term.name;
      return {
        id: product.ID,
        image: postmeta._ebay_product_featured_image
          ? postmeta._ebay_product_featured_image.img_url
          : product.attachment.length > 0
            ? product.attachment[0]?.guid.includes("http")
              ? product.attachment[0]?.guid
              : `${process.env.NEXT_PUBLIC_API_BASE_URL}${product.attachment[0]?.guid}`
            : "",
        likes: "0",
        comments: "0",
        shares: "0",
        title: product.post_title,
        condition: condition,
        price: postmeta._price
          ? `$${postmeta._price}`
          : `$${(Math.random() * 100).toFixed(2)}`,
        shipping: "Free Shipping",
        sellerImage: product?.wp_nepaz2_users.avatar?.guid,
        sellerName: product?.wp_nepaz2_users?.display_name,
        location: `${product?.wp_nepaz2_users?.store?.address?.city}, ${product?.wp_nepaz2_users?.store?.address?.country}`,
        rating: product?.wp_nepaz2_users?.avgRate,
      };
    });
    type === "Deal"
      ? mappedData?.length === 0
        ? setTodayDealProduct(null)
        : setTodayDealProduct(mappedData)
      : mappedData?.length === 0
        ? setPickForUProduct(null)
        : setPickForUProduct(mappedData);
  };

  useEffect(() => {
    getSearchProducts(
      [1162, 1163, 1164, 1165, 1166, 1167, 1168, 1169, 1170, 1171, 1172],
      "Deal",
    );
    getSearchProducts(
      [
        134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 1123, 17918,
        17922,
      ],
      "Pick",
    );
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && tokens.getAccessToken()) {
      getAllCartProdList();
      getFavList();
    }
  }, []);
  return (
    <>
      <div className="">
        {/* ================ Banners ================= */}
        <div className="home_page_banner_slider">
          {allBanners.length === 0 ? (
            <div className="">
              <SkeletonLoader type="rectangular" width="100%" height={500} />
            </div>
          ) : (
            <BannerSection bannerData={allBanners} />
          )}
        </div>
        {/* ================ Featured Products =========== */}

        <div className="container">
          <div className="">
            <div className="flex my-5 pb-3 border-b-2 border-primaryMain items-center justify-between ml-2">
              <h4 className=" heading_crm_pages text-black font-bold capitalize text-2xl">
                Featured products
              </h4>
            </div>
            <div className="mt-5 mb-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 md:gap-x-6 gap-y-2 md:gap-y-6 mx-2">
              {/* <SlickSlider {...settings}> */}
              {allFeaturedProducts?.map((product, index) => (
                <ProductCard
                  key={index}
                  type="gridView"
                  product={product}
                  handleRefreshCartList={() => getAllCartProdList()}
                  handleRefreshFavList={() => {
                    getFavList();
                    getAllFeaturedProducts();
                    getAllNewlyListedProducts();
                    getAllPrmProducts();
                  }}
                />
              ))}
              {/* </SlickSlider> */}
            </div>
            <div className="w-full">
              <div className="mt-5 mb-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 md:gap-x-6 gap-y-2 md:gap-y-6 mx-2">
                {allFeaturedProducts?.length === 0 && (
                  <>
                    {[...Array(5)].map((index) => (
                      <div className="" key={index}>
                        <SkeletonProductCard type={"w-full"} />
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>

            {!allFeaturedProducts && (
              <div className="w-full h-[400px] flex items-center justify-center">
                <SVG.NoDataIcon />
              </div>
            )}
          </div>
        </div>

        {/* ============ Popular Categories ============= */}
        <div
          className="bg-blue-100 py-7 pl-[8%] lg:pl-[4%] 2xl:pl-[8%]"
          style={{ maxWidth: "1525px" }}
        >
          <div className=" flex flex-wrap md:flex-nowrap mt-5 mb-5 flex gap-4 items-center ">
            <div className="w-3/12">
              {" "}
              <h4 className=" heading_crm_pages text-black font-bold capitalize text-[40px] leading-[48px] mb-3">
                Our popular <br></br> Categories
              </h4>
              {/* <span className="text-primaryMain text-sm font-semibold normal-case border-b-2">
                See All
              </span> */}
            </div>
            {popularCategory.length !== 0 && (
              <div className="w-11/12 sm:w-9/12 category_slider_half relative ml-0 md:ml-48">
                <AliceCarousel
                  // ref={carouselRef}
                  mouseTracking
                  items={popularCategoryCard}
                  disableDotsControls={true}
                  responsive={{
                    0: { items: 1 },
                    640: { items: 2 },
                    1024: { items: 3 },
                  }}
                  disableButtonsControls={false}
                  autoPlay
                  infinite
                  autoPlayInterval={1500}
                />
              </div>
            )}
            {popularCategory.length === 0 && (
              <div className="w-11/12 sm:w-9/12 category_slider_half relative ml-0 md:ml-48">
                <AliceCarousel
                  // ref={carouselRef}
                  mouseTracking
                  items={skeletonCategoryCard}
                  disableDotsControls={true}
                  responsive={{
                    0: { items: 1 },
                    640: { items: 2 },
                    1024: { items: 3 },
                  }}
                  disableButtonsControls={false}
                  autoPlay
                  infinite
                  autoPlayInterval={2000}
                />
              </div>
            )}
          </div>
        </div>

        {/* ============ Newly Listed Items =========== */}

        <div className="container">
          <div className="">
            <div className="flex my-5 pb-3 border-b-2 border-primaryMain items-center justify-between ml-2">
              <h4 className=" heading_crm_pages text-black font-bold capitalize text-2xl">
                Newly Listed items
              </h4>
              {/* <span className="text-primaryMain text-sm font-semibold normal-case">
                See All
              </span> */}
            </div>
            <div className="mt-5 mb-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 md:gap-x-6 gap-y-2 md:gap-y-6 mx-2">
              {newlyListedProducts?.map((product, index) => (
                <ProductCard
                  key={index}
                  type="gridView"
                  product={product}
                  handleRefreshCartList={() => getAllCartProdList()}
                  handleRefreshFavList={() => {
                    getFavList();

                    getAllFeaturedProducts();
                    getAllNewlyListedProducts();
                    getAllPrmProducts();
                  }}
                />
              ))}
            </div>
            <div className="mt-5 mb-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 md:gap-x-6 gap-y-2 md:gap-y-6 mx-2">
              {newlyListedProducts?.length === 0 && (
                <>
                  {[...Array(5)].map((index) => (
                    <div className="" key={index}>
                      <SkeletonProductCard type={"w-full"} />
                    </div>
                  ))}
                </>
              )}
            </div>

            {!newlyListedProducts && (
              <div className="w-full h-[400px] flex items-center justify-center">
                <SVG.NoDataIcon />
              </div>
            )}
          </div>
        </div>

        {/* ============ PRM Products =============== */}

        <div className="container">
          <div className="">
            <div className="flex my-5 pb-3 border-b-2 border-primaryMain items-center justify-between ml-2">
              <h4 className=" heading_crm_pages text-black font-bold capitalize text-2xl">
                PRM Products
              </h4>
              {/* <span className="text-primaryMain text-sm font-semibold normal-case">
                See All
              </span> */}
            </div>
            <div className="mt-5 mb-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 md:gap-x-6 gap-y-2 md:gap-y-6 mx-2">
              {allPrmProducts?.map((product, index) => (
                <ProductCard
                  key={index}
                  type="gridView"
                  product={product}
                  handleRefreshCartList={() => getAllCartProdList()}
                  handleRefreshFavList={() => {
                    getFavList();

                    getAllFeaturedProducts();
                    getAllNewlyListedProducts();
                    getAllPrmProducts();
                  }}
                />
              ))}
            </div>
            <div className="mt-5 mb-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 md:gap-x-6 gap-y-2 md:gap-y-6 mx-2">
              {allPrmProducts?.length === 0 && (
                <>
                  {[...Array(5)].map((index) => (
                    <div className="" key={index}>
                      <SkeletonProductCard type={"w-full"} />
                    </div>
                  ))}
                </>
              )}
            </div>
            {!allPrmProducts && (
              <div className="w-full h-[400px] flex items-center justify-center">
                <SVG.NoDataIcon />
              </div>
            )}
          </div>
        </div>

        {/* ========= Summer Product Category ============ */}

        <div
          className="summer_specific_product py-9 pl-[8%] lg:pl-[4%] 2xl:pl-[8%]"
          style={{ maxWidth: "1525px" }}
        >
          <div className="flex flex-wrap md:flex-nowrap mt-5 mb-5 flex gap-4 items-center ">
            <div className="w-3/12">
              {" "}
              <h4 className=" heading_crm_pages text-black font-bold capitalize text-[35px] leading-[48px] mb-3">
                Summer <br></br>specific product<br></br> category
              </h4>
              {/* <span className="text-primaryMain text-sm font-semibold normal-case border-b-2">
                See All
              </span> */}
            </div>
            {popularCategory.length !== 0 && (
              <div className="w-11/12 sm:w-9/12 category_slider_half relative ml-0 md:ml-48">
                <AliceCarousel
                  // ref={carouselRef}
                  mouseTracking
                  items={productCategoryCard}
                  disableDotsControls={true}
                  responsive={{
                    0: { items: 1 },
                    640: { items: 2 },
                    1024: { items: 3 },
                  }}
                  disableButtonsControls={false}
                  autoPlay
                  infinite
                  autoPlayInterval={2000}
                />
              </div>
            )}
            {popularCategory.length === 0 && (
              <div className="w-11/12 sm:w-9/12 category_slider_half relative ml-0 md:ml-48">
                <AliceCarousel
                  // ref={carouselRef}
                  mouseTracking
                  items={skeletonCategoryCard}
                  disableDotsControls={true}
                  responsive={{
                    0: { items: 1 },
                    640: { items: 2 },
                    1024: { items: 3 },
                  }}
                  disableButtonsControls={false}
                  autoPlay
                  infinite
                  autoPlayInterval={2000}
                />
              </div>
            )}
          </div>
        </div>

        {/* ======== Recently Viewed ============ */}

        <div className="bg-blue-50 py-10">
          <div className="container">
            <div className=" grid grid-cols-1 md:grid-cols-3 gap-8 mx-2">
              <div className="border bg-white border-blue-400 rounded-2xl p-4">
                <div className="flex mb-4 justify-between items-center">
                  <p className="heading_crm_pages text-black font-bold capitalize text-lg">
                    Recently viewed
                  </p>
                  {/* <span className="text-primaryMain text-sm font-semibold normal-case">
                    See All
                  </span> */}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {allRecentProducts?.slice(0, 4)?.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="border-2 rounded-[20px] border-[#306CB580] cursor-pointer overflow-hidden w-full mx-auto"
                        onClick={() =>
                          router.push(`search-detail?id=${item.id}`)
                        }
                        style={{
                          background:
                            "linear-gradient(90deg, rgb(208, 228, 247) 0%, rgb(208, 228, 247) 50%, rgb(208, 228, 247) 100%)",
                        }}
                      >
                        <Image
                          src={
                            recentlyViewImageErrorList.includes(item.id)
                              ? IMAGES.dummyProduct
                              : item.image
                          }
                          alt=""
                          width={160}
                          height={160}
                          className="w-full"
                          onError={() => {
                            setRecentlyViewImageErrorList([
                              ...recentlyViewImageErrorList,
                              item.id,
                            ]);
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
                {allRecentProducts?.length === 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {[...Array(4)].map((index) => (
                      <div className="mx-auto" key={index}>
                        <SkeletonLoader
                          className="rounded-[20px]"
                          type="rectangular"
                          width={175}
                          height={175}
                        />
                      </div>
                    ))}
                  </div>
                )}
                {!allRecentProducts && (
                  <div className="w-full h-full flex items-center justify-center">
                    <SVG.NoDataIcon className="mb-4" />
                  </div>
                )}
              </div>
              <div className="border bg-white border-[#306CB580] rounded-2xl p-4">
                <div className="flex mb-4 justify-between items-center">
                  <p className="heading_crm_pages text-black font-bold capitalize text-lg">
                    Picks for you
                  </p>
                  {/* <span className="text-primaryMain text-sm font-semibold normal-case">
                    See All
                  </span> */}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {pickForUProduct?.slice(0, 4)?.map((item: any) => {
                    return (
                      <div
                        key={item.id}
                        className="border-2 rounded-[20px] border-[#306CB580]  cursor-pointer overflow-hidden w-full mx-auto"
                        onClick={() =>
                          router.push(`search-detail?id=${item.id}`)
                        }
                        style={{
                          background:
                            "linear-gradient(90deg, rgb(208, 228, 247) 0%, rgb(208, 228, 247) 50%, rgb(208, 228, 247) 100%)",
                        }}
                      >
                        <Image
                          src={
                            pickedImageErrorList.includes(item.id)
                              ? IMAGES.dummyProduct
                              : item.image
                          }
                          alt=""
                          width={160}
                          height={160}
                          className="w-full"
                          onError={() => {
                            setPickedImageErrorList([
                              ...pickedImageErrorList,
                              item.id,
                            ]);
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
                {pickForUProduct?.length === 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {[...Array(4)].map((index) => (
                      <div className="mx-auto" key={index}>
                        <SkeletonLoader
                          className="rounded-[20px]"
                          type="rectangular"
                          width={175}
                          height={175}
                        />
                      </div>
                    ))}
                  </div>
                )}
                {!pickForUProduct && (
                  <div className="w-full h-full flex items-center justify-center">
                    <SVG.NoDataIcon />
                  </div>
                )}
              </div>
              <div className="border bg-white border-[#306CB580] rounded-2xl p-4">
                <div className="flex mb-4 justify-between items-center">
                  <p className="heading_crm_pages text-black font-bold capitalize text-lg">
                    Today&apos;s deals
                  </p>
                  {/* <span className="text-primaryMain text-sm font-semibold normal-case">
                    See All
                  </span> */}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {todayDealProduct?.slice(0, 4)?.map((item: any) => {
                    return (
                      <div
                        key={item.id}
                        className="border-2 rounded-[20px] border-[#306CB580] cursor-pointer overflow-hidden w-full mx-auto"
                        onClick={() =>
                          router.push(`search-detail?id=${item.id}`)
                        }
                        style={{
                          background:
                            "linear-gradient(90deg, rgb(208, 228, 247) 0%, rgb(208, 228, 247) 50%, rgb(208, 228, 247) 100%)",
                        }}
                      >
                        <Image
                          src={
                            dealImageErrorList.includes(item.id)
                              ? IMAGES.dummyProduct
                              : item.image
                          }
                          alt=""
                          width={160}
                          height={160}
                          className="w-full"
                          onError={() => {
                            setDealImageErrorList([
                              ...dealImageErrorList,
                              item.id,
                            ]);
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
                {todayDealProduct?.length === 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {[...Array(4)].map((index) => (
                      <div className="mx-auto" key={index}>
                        <SkeletonLoader
                          className="rounded-[20px]"
                          type="rectangular"
                          width={175}
                          height={175}
                        />
                      </div>
                    ))}
                  </div>
                )}
                {!todayDealProduct && (
                  <div className="w-full h-full flex items-center justify-center">
                    <SVG.NoDataIcon />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =========== Recommended Sellers =========== */}

        <div className="container">
          <div className="flex my-6 pb-3 border-b-2 border-primaryMain items-center justify-between ml-2">
            <h4 className=" heading_crm_pages text-black font-bold capitalize text-2xl">
              Recommended Sellers
            </h4>
            {/* <span className="text-primaryMain text-sm font-semibold normal-case">
              See All
            </span> */}
          </div>
          <div className="mt-5 mb-5 grid grid-cols-1 md:grid-cols-3 gap-4 mx-2">
            {recommendedSellers?.slice(0, 3)?.map((item: any) => (
              <>
                <SellerCard
                  id={item.id}
                  image={item.image}
                  address={item.address}
                  followers={item.followers}
                  rating={item.rating}
                  name={item.name}
                  handleMessage={() =>
                    tokens.getAccessTokenCookies()
                      ? router.push(
                          `/messages?sendTo=${item?.id}&tab="newMessage"`,
                        )
                      : router.push("/register")
                  }
                />
              </>
            ))}
            {recommendedSellers?.length === 0 && (
              <>
                {[...Array(3)].map((index) => (
                  <div className="" key={index}>
                    <SkeletonSellerCard />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="bg-blue-100 py-10">
          <div className="flex justify-center">
            <div className="w-7/12">
              <h4 className=" heading_crm_pages text-black font-bold capitalize text-[40px] text-center">
                No Commissions. No Fees. No Worries.
              </h4>
              <p className="text-lg font-medium my-5 text-center normal-case px-10">
                Our goal is to help you do what you do best. We believe that
                every dollar earned <br></br> from selling on our platform
                should be yours to keep. That’s why when you sell<br></br> with
                Fizno, we never take any commissions or fees.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8">
                <div className="bg-white border border-[#217BF442] rounded-xl p-5 h-96 sm:p-3">
                  <div className="text-center">
                    <Image
                      sizes="(max-width: 150px) 100vw, 150px"
                      src="/images/mainpages/sell.png"
                      width={150}
                      height={80}
                      alt=""
                      className="mx-auto mb-5"
                      quality={75}
                    />
                    <p className="text-sm text-black font-semibold normal-case mb-4 sm:text-base">
                      Sell it
                    </p>
                    <p className="text-sm normal-case sm:text-base">
                      Search for the flight or hotel by
                      <br /> filling in the booking
                      <br /> and personal details.
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-[#217BF442] p-5 mt-0 lg:mt-20 h-96 sm:p-3">
                  <div className="text-center">
                    <Image
                      src="/images/mainpages/shipit.png"
                      sizes="(max-width: 150px) 100vw, 150px"
                      width={120}
                      height={80}
                      alt=""
                      className="mx-auto mb-5"
                      quality={75}
                    />
                    <p className="text-sm font-semibold text-black normal-case mb-4 sm:text-base">
                      Ship it
                    </p>
                    <p className="text-sm normal-case sm:text-base break-words">
                      View flight or hotel details or
                      <br /> directly select the desired
                      <br /> service.
                    </p>
                  </div>
                </div>
                <div className="bg-white border border-[#217BF442] rounded-xl p-5 h-96 sm:p-3">
                  <div className="text-center">
                    {" "}
                    <Image
                      src="/images/mainpages/getPaid.png"
                      width={150}
                      height={80}
                      alt=""
                      className="mx-auto mb-5"
                      sizes="(max-width: 150px) 100vw, 150px"
                      quality={75}
                    />
                    <p className="text-sm font-semibold text-black normal-case mb-4 sm:text-base">
                      Get Paid
                    </p>
                    <p className="text-sm normal-case sm:text-base">
                      Confirm your booking details<br></br> and pay for the
                      booking to get<br></br> your visa itinerary.
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-center mt-8">
                {" "}
                <button
                  className="btn h-11 font-semibold bg-yellow-500 hover:bg-yellow-600 text-black text-base px-16 rounded-[4px]"
                  onClick={() => {
                    if (
                      typeof window !== "undefined" &&
                      tokens.getAccessToken()
                    ) {
                      router.push(
                        user.role === "seller"
                          ? "/seller/dashboard"
                          : "/whats-new",
                      );
                    } else {
                      router.push("/sell");
                    }
                  }}
                >
                  <span className="hidden xs:block ">Start selling today!</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bg-white pl-8 shadow-lg top-[580px] fixed_feedback_btn">
        <Link href="/feedback-page" className="cursor-pointer">
          <SVG.feedbackIcon />
        </Link>
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
