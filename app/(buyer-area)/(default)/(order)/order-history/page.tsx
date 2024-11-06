"use client";
import HeaderSectionCard from "@/components/common/header/headerSectionCard";
import InputComponent from "@/components/common/inputField/page";
import React, { useEffect, useState } from "react";
import OrderCard from "../component/orderCard";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import moment from "moment";
import { CircularProgress } from "@mui/material";
import SVG from "@/public/svg";
import IMAGES from "@/public/images";

type orderType = {
  orderNumber: number;
  total: string;
  itemsCount: number;
  arrivalDate: string;
  productDescription: string;
  productImageSrc: string;
  review: boolean;
  productId: number;
};

const OrderHistory = () => {
  /**
   * state manamgenet
   */

  const [orderList, setOrderList] = useState<orderType[] | null>([]);

  /**
   * handle get all order list
   */

  const handleGetAllOrderList = async () => {
    const response = await UserApi.getAllBuyerOrderAPI({
      pageIndex: 1,
      pageSize: 10,
    });

    if (response.remote === "success") {
      const data = response.data.data;

      const formatedData = data?.map((item: any) => ({
        orderNumber: item?.ID,
        total: `$${item?.wp_dokan_orders?.reduce(
          (accumulator: any, currentValue: any) => {
            return accumulator + Number(currentValue.net_amount);
          },
          0,
        )}`,
        itemsCount: item?.wp_woocommerce_order_items?.length,
        arrivalDate: moment(item?.post_date).format("ha, D MMMM YYYY"),
        productDescription:
          item?.wp_woocommerce_order_items[0]?.order_item_name,
        productImageSrc: item?.wp_wc_order_product_lookup_order[0]?.product
          ?.attachments[0]?.guid
          ? item?.wp_wc_order_product_lookup_order[0]?.product?.attachments[0]?.guid.includes(
              "http",
            )
            ? item?.wp_wc_order_product_lookup_order[0]?.product?.attachments[0]
                ?.guid
            : `${process.env.NEXT_PUBLIC_API_BASE_URL}${
                item?.wp_wc_order_product_lookup_order[0]?.product
                  ?.attachments[0]?.guid
              }`
          : IMAGES.dummyProduct,
        review: item?.avgRating,
        productId: item?.wp_wc_order_product_lookup_order[0]?.product?.ID,
      }));

      setOrderList(formatedData.length === 0 ? null : formatedData);
    }
  };

  useEffect(() => {
    handleGetAllOrderList();
  }, []);

  return (
    <div className="min-h-screen pb-16">
      <div className="">
        <HeaderSectionCard title="Order History" />
      </div>
      <div className="flex my-4 gap-4 items-center pr-1">
        <div className="w-11/12">
          <InputComponent label="" placeholder="Search" />
        </div>
        <div className="w-1/12">
          <button className="bg-primaryMain text-white px-4 py-2 rounded-md">
            Search
          </button>
        </div>
      </div>
      <div className="mt-6">
        {orderList?.length === 0 && (
          <div className="flex items-center justify-center">
            <CircularProgress />
          </div>
        )}
        {!orderList && (
          <div className="flex items-center justify-center">
            <SVG.NoDataIcon />
          </div>
        )}
        {orderList?.map((order) => (
          <OrderCard
            key={order?.orderNumber}
            orderNumber={order?.orderNumber?.toString()}
            total={order?.total}
            itemsCount={order?.itemsCount || 0}
            arrivalDate={order?.arrivalDate}
            productDescription={order?.productDescription}
            productImageSrc={order?.productImageSrc}
            review={Number(order?.review) || 0}
            productId={order?.productId}
            handleRefresh={() => handleGetAllOrderList()}
          />
        ))}
      </div>
    </div>
  );
};
export default OrderHistory;
