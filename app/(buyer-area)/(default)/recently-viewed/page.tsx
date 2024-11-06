"use client";
import { SVGIcon } from "@/assets/svg";
import ProductCard from "@/components/common/card/productCard";
import SkeletonProductCard from "@/components/common/card/skeletonProductCard";
// import SkeletonProductCard from "@/components/common/card/skeletonProductCard";
import HeaderSectionCard from "@/components/common/header/headerSectionCard";
import { tokens } from "@/helpers/jwtTokenFunction";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { globalCacheStateSelector } from "@/redux/slices/globaCache.slice";
import {
  setAllCartProduct,
  setAllFavoriteProducts,
  setCartCount,
} from "@/redux/slices/product.slice";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import React, { useEffect, useState } from "react";

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

const RecentlyViewed = () => {
  /**
   * redux
   */
  const dispatch = useAppDispatch();

  const { user } = useAppSelector(globalCacheStateSelector);

  /**
   * state management
   */

  const [allRecentlyProduct, setAllRecentlyProduct] = useState<
    FeaturedProductType[] | null
  >([]);

  /**
   * get all recently products
   */
  const getAllRecentlyProducts = async () => {
    if (user) {
      const response = await UserApi.getAllRecentlyViewedProducsAPI({
        userId: Number(user?.id),
      });
      if (response.remote === "success") {
        const data = response.data.data;

        const productData = data.map((item: any) => {
          const getMetaValue = (key: string) => {
            const meta = item?.product?.wp_nepaz2_postmeta?.find(
              (item: any) => item.meta_key === key,
            )?.meta_value;
            return meta;
          };
          const postmeta = item?.product?.wp_nepaz2_postmeta.reduce(
            (acc: any, meta: any) => {
              acc[meta.meta_key] = meta.meta_value;
              return acc;
            },
            {},
          );
          return {
            id: item?.product?.ID,
            image: postmeta._ebay_product_featured_image
              ? postmeta._ebay_product_featured_image.img_url
              : item?.product?.attachment.length > 0
                ? item?.product?.attachment[0]?.guid.includes("http")
                  ? item?.product?.attachment[0]?.guid
                  : `${process.env.NEXT_PUBLIC_API_BASE_URL}${item?.product?.attachment[0]?.guid}`
                : "",
            likes: item?.product?.wp_add_product_fav?.length || 0,
            comments: item?.product?.comment_count || 0,
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
            userId: "",
            shares: "0",
            title: item?.product?.post_name,
            condition: "New",
            price: `$${getMetaValue("sale_price") ? getMetaValue("_price") || 0 : 0}`,
            salePrice: `$${getMetaValue("sale_price") ? (Number(getMetaValue("sale_price")) === 0 ? getMetaValue("_price") : getMetaValue("sale_price")) : getMetaValue("_price") || 0}`,
            shipping: "Free Shipping",
            sellerImage: item?.product?.wp_nepaz2_users?.avatar?.guid,
            sellerName: item?.product?.wp_nepaz2_users?.display_name,
            sellerId: item?.product?.wp_nepaz2_users?.id,
            location: `${item?.product?.wp_nepaz2_users?.store?.address?.city}, ${item?.product?.wp_nepaz2_users?.store?.address?.country}`,
            rating: item?.product?.wp_nepaz2_users?.avgRate || 0,
            stock: `${getMetaValue("_stock") || 0}`,
          };
        });
        productData.length === 0
          ? setAllRecentlyProduct(null)
          : setAllRecentlyProduct(productData);
      } else {
        setAllRecentlyProduct(null);
      }
    }
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

  useEffect(() => {
    if (typeof window !== "undefined" && tokens.getAccessToken()) {
      getAllCartProdList();
      getFavList();
    }
  }, []);

  useEffect(() => {
    if (user) {
      getAllRecentlyProducts();
    }
  }, [user]);

  console.log({ allRecentlyProduct });

  return (
    <div className="">
      <div className="">
        <HeaderSectionCard title="Recently viewed" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 my-4 mx-4">
        {allRecentlyProduct?.map((product, index) => (
          <ProductCard
            key={index}
            type="gridView"
            product={product}
            handleRefreshCartList={() => getAllCartProdList()}
            handleRefreshFavList={() => getFavList()}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 my-4 mx-4">
        {allRecentlyProduct?.length === 0 && (
          <>
            {[...Array(4)].map((index) => (
              <div className="" key={index}>
                <SkeletonProductCard type="w-full" />
              </div>
            ))}
          </>
        )}
      </div>
      {!allRecentlyProduct && (
        <div className="flex items-center justify-center w-full">
          <SVGIcon.NoDataIcon />
        </div>
      )}
    </div>
  );
};
export default RecentlyViewed;
