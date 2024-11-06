/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ProductCard from "@/components/common/card/productCard";
import SkeletonProductCard from "@/components/common/card/skeletonProductCard";
import HeaderSectionCard from "@/components/common/header/headerSectionCard";
import SVG from "@/public/svg";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  productStateSelector,
  setAllCartProduct,
  setAllFavoriteProducts,
  setCartCount,
} from "@/redux/slices/product.slice";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import { Alert, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";

const LikedProducts = () => {
  /**
   * redux
   */
  const { allFavoriteProducts } = useAppSelector(productStateSelector);
  const dispatch = useAppDispatch();

  /**
   * state management
   */

  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "error";
    open: boolean;
  }>({ message: "", severity: "success", open: false });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

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

  /**
   * get add to fav list
   */

  const getFavList = async () => {
    const response = await UserApi.allFavoriteAPI();
    if (response.remote === "success") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = response.data.data.map((item: any) => {
        const getMetaValue = (key: string) => {
          const meta = item?.porduct?.wp_nepaz2_postmeta?.find(
            (item: any) => item.meta_key === key,
          )?.meta_value;
          return meta;
        };
        return {
          id: item.porduct.ID,
          image: item?.porduct?.attachment[0]?.guid
            ? item?.porduct?.attachment[0]?.guid?.includes("http")
              ? item?.porduct?.attachment[0]?.guid
              : `${process.env.NEXT_PUBLIC_API_BASE_URL}${item?.porduct?.attachment[0]?.guid}`
            : "",
          likes: item?.porduct?.wp_add_product_fav || 0,
          comments: item?.porduct?.comment_count || 0,
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
          title: item.porduct.post_title,
          condition: "New",
          price: `$${getMetaValue("sale_price") ? getMetaValue("_price") || 0 : 0}`,
          salePrice: `$${getMetaValue("sale_price") ? (Number(getMetaValue("sale_price")) === 0 ? getMetaValue("_price") : getMetaValue("sale_price")) : getMetaValue("_price") || 0}`,
          shipping: "Free Shipping",
          sellerImage: item?.porduct?.wp_nepaz2_users?.avatar?.guid,
          sellerName: item?.porduct?.wp_nepaz2_users?.display_name || "",
          location: `${item?.porduct?.wp_nepaz2_users?.store?.address?.city}, ${item?.porduct?.wp_nepaz2_users?.store?.address?.country}`,
          rating: item?.porduct?.wp_nepaz2_users?.totalReview || 0,
        };
      });

      data.length === 0
        ? dispatch(setAllFavoriteProducts(null))
        : dispatch(setAllFavoriteProducts(data));
    } else {
      dispatch(setAllFavoriteProducts(null));
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    getFavList();
    getAllCartProdList();
  }, []);

  return (
    <div className="">
      <div className="">
        <HeaderSectionCard title="My liked products" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 my-4 mx-4">
        {allFavoriteProducts?.map((product: any, index: any) => (
          <ProductCard
            key={index}
            type="gridView"
            product={product}
            handleRefreshCartList={() => getAllCartProdList()}
            handleRefreshFavList={() => getFavList()}
          />
        ))}
      </div>
      {allFavoriteProducts?.length === 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 my-4 mx-4">
          <>
            {[...Array(4)].map((index) => (
              <div className="" key={index}>
                <SkeletonProductCard type="w-full" />
              </div>
            ))}
          </>
        </div>
      )}
      {!allFavoriteProducts && (
        <div className="flex items-center justify-center w-full">
          <SVG.NoDataIcon />
        </div>
      )}
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
    </div>
  );
};
export default LikedProducts;
