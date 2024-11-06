"use client";
import React, { useEffect, useState } from "react";
import { SelectedItemsProvider } from "@/app/selected-items-context";
import PaginationClassic from "@/components/pagination-classic";
import { useRouter } from "next/navigation";
import OrderTable from "./order-table";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import moment from "moment";
import IMAGES from "@/public/images";

type sellerOrderType = {
  id: number;
  image: string;
  itemName: string;
  orderId: number;
  purchased: number;
  address: string;
  sales: string;
  earning: string;
  date: string;
  status: string;
  shippedDate: string;
  guest: string;
};

function OrderContent() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  /**
   * state management
   */
  const [sellerOrderList, setSellerOrderList] = useState<
    sellerOrderType[] | null
  >([]);

  /**
   * handle get all seller order
   */

  const handleGetAllSellerOrder = async () => {
    const response = await UserApi.getAllSellerOrderAPI({
      pageIndex: 1,
      pageSize: 10,
    });

    if (response.remote === "success") {
      const data = response.data.data;
      const formatedData = data?.map((item: any) => ({
        id: item?.ID,
        image: item?.wp_wc_order_product_lookup_order[0]?.product
          ?.attachments[0]?.guid
          ? item?.wp_wc_order_product_lookup_order[0]?.product?.attachments[0]?.guid.includes(
              "http",
            )
            ? item?.wp_wc_order_product_lookup_order[0]?.product?.attachments[0]
                ?.guid
            : `${process.env.NEXT_PUBLIC_API_BASE_URL}${item?.wp_wc_order_product_lookup_order[0]?.product?.attachments[0]?.guid}`
          : IMAGES.dummyProduct,
        itemName: item?.wp_wc_order_product_lookup_order[0]?.product?.post_name,
        orderId: item?.ID,
        purchased: item?.wp_wc_order_product_lookup_order?.length || 0,
        address: `${item?.wp_nepaz2_postmeta?.find((el: any) => el.meta_key === "_billing_address_1")?.meta_value}`,
        sales: `$${item?.wp_wc_order_product_lookup_order[0]?.product_gross_revenue || 0}`,
        earning: `$${item?.wp_wc_order_product_lookup_order[0]?.product_net_revenue || 0}`,
        date: moment(
          item?.wp_wc_order_product_lookup_order[0]?.date_created,
        ).format("MMMM D, YYYY"),
        status: "completed",
        shippedDate: "May 02, 2024",
        guest:
          item?.wp_wc_order_product_lookup_order[0]?.user?.display_name || "",
      }));

      setSellerOrderList(formatedData.length === 0 ? null : formatedData);
    }
  };

  useEffect(() => {
    handleGetAllSellerOrder();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className=" flex items-center text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
            Orders
            <svg
              className="shrink-0 h-6 w-6 ms-2"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M448 341.37V170.61A32 32 0 0 0 432.11 143l-152-88.46a47.94 47.94 0 0 0-48.24 0L79.89 143A32 32 0 0 0 64 170.61v170.76A32 32 0 0 0 79.89 369l152 88.46a48 48 0 0 0 48.24 0l152-88.46A32 32 0 0 0 448 341.37z"
              ></path>
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="m69 153.99 187 110 187-110m-187 310v-200"
              ></path>
            </svg>
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Delete button */}
          <button
            className="btn  bg-primaryMain hover:bg-blueTwo text-white mr-3"
            onClick={() => handleBack()}
          >
            <span className="flex items-center">
              <svg
                className="mr-2"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="48"
                  d="M244 400 100 256l144-144M120 256h292"
                ></path>
              </svg>
              Back
            </span>
          </button>
        </div>
      </div>

      {/* Table */}
      <OrderTable orders={sellerOrderList} />

      {/* Pagination */}
      <div className="mt-8">
        <PaginationClassic pageIndex={0} pageSize={0} totalResults={0} />
      </div>
    </div>
  );
}

export default function Orders() {
  return (
    <SelectedItemsProvider>
      <OrderContent />
    </SelectedItemsProvider>
  );
}
