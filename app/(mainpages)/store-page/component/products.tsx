import ProductCard from "@/components/common/card/productCard";
import { tokens } from "@/helpers/jwtTokenFunction";
import { useAppDispatch } from "@/redux/hooks";
import {
  setAllCartProduct,
  setAllFavoriteProducts,
  setCartCount,
} from "@/redux/slices/product.slice";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import React, { useEffect, useState } from "react";

const Products = ({
  products,
  storename,
}: {
  products: any;
  storename?: any;
}) => {
  /**
   * redux
   */

  const dispatch = useAppDispatch();

  /**
   * state management
   */

  const [searchText, setSearchText] = useState<string>("");

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

  useEffect(() => {
    if (typeof window !== "undefined" && tokens.getAccessToken()) {
      getAllCartProdList();
      getFavList();
    }
  }, []);

  return (
    <>
      <div className="">
        {/* <div className="flex mt-5 mb-7 pb-4 border-b-2 border-primaryMain items-center justify-start"> */}
        <div className="flex justify-between md:block relative mt-5 mb-7 pb-4 border-b-2 border-primaryMain">
          <h4 className="heading_crm_pages text-black font-bold capitalize text-2xl">
            My Products
          </h4>

          <div className="md:absolute left-0 right-0 -top-2 header_search_section">
            <div className="relative w-72 md:w-96 mx-auto">
              <input
                className="h-10 px-3 rounded-sm border border-slate-200 w-full dark:bg-[rgb(18,18,18)] dark:border-slate-700"
                placeholder={
                  "Search " + (storename ? storename : "") + " store"
                }
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />

              <div className="absolute top-[1px] right-[1px] bottom-[1px] bg-blue-200 rounded-r-full p-3">
                <span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.5 21.75C5.85 21.75 1.25 17.15 1.25 11.5C1.25 5.85 5.85 1.25 11.5 1.25C17.15 1.25 21.75 5.85 21.75 11.5C21.75 17.15 17.15 21.75 11.5 21.75ZM11.5 2.75C6.67 2.75 2.75 6.68 2.75 11.5C2.75 16.32 6.67 20.25 11.5 20.25C16.33 20.25 20.25 16.32 20.25 11.5C20.25 6.68 16.33 2.75 11.5 2.75Z"
                      fill="#000000"
                    />
                    <path
                      d="M21.9999 22.7495C21.8099 22.7495 21.6199 22.6795 21.4699 22.5295L19.4699 20.5295C19.1799 20.2395 19.1799 19.7595 19.4699 19.4695C19.7599 19.1795 20.2399 19.1795 20.5299 19.4695L22.5299 21.4695C22.8199 21.7595 22.8199 22.2395 22.5299 22.5295C22.3799 22.6795 22.1899 22.7495 21.9999 22.7495Z"
                      fill="#000000"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 mb-5 grid grid-cols-5 gap-6 ">
          {searchText
            ? products
                ?.filter((el: any) =>
                  el?.title?.toLowerCase()?.includes(searchText?.toLowerCase()),
                )
                ?.map((product: any, index: number) => (
                  <ProductCard
                    key={index}
                    type="gridView"
                    product={product}
                    handleRefreshCartList={() => getAllCartProdList()}
                    handleRefreshFavList={() => getFavList()}
                  />
                ))
            : products.map((product: any, index: number) => (
                <ProductCard
                  key={index}
                  type="gridView"
                  product={product}
                  handleRefreshCartList={() => getAllCartProdList()}
                  handleRefreshFavList={() => getFavList()}
                />
              ))}
        </div>
      </div>
    </>
  );
};
export default Products;
