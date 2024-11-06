"use client";
import SummaryCard from "@/components/common/summary/summaryCard";
import { OrderListTable } from "@/components/common/table/orderListTable";
import SVG from "@/public/svg";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const OrderSuccess = () => {
  /**
   * router
   */

  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");

  /**
   * state management
   */

  const [orderDetails, setOrderDetails] = useState<any>("");
  const [checkoutData, setCheckoutData] = useState<{
    subTotal: number;
    totalItems: number;
  }>({ subTotal: 0, totalItems: 0 });
  const [totalDiscount, setTotalDiscount] = useState<number>(0);

  /**
   * handle get order details
   */

  const handleGetOrderDetails = async () => {
    if (orderId) {
      const response = await UserApi.confirmOrderAPI({ orderId });
      if (response.remote === "success") {
        setOrderDetails(response.data.data);
        const total = response?.data?.data?.orderItem?.reduce(
          (accumulator: any, currentValue: any) =>
            accumulator +
            Number(currentValue?.orderItem?.product_net_revenue) *
              Number(currentValue?.orderItem?.product_qty),
          0,
        );
        const totalDisc = response?.data?.data?.orderItem?.reduce(
          (accumulator: any, currentValue: any) =>
            accumulator + Number(currentValue?.orderItem?.coupon_amount),
          0,
        );
        setTotalDiscount(totalDisc);
        const data = {
          subTotal: total,
          totalItems: response?.data?.data?.orderItem?.length || 0,
        };
        setCheckoutData(data);
      }
    }
  };

  useEffect(() => {
    if (orderId) {
      handleGetOrderDetails();
    }
  }, [orderId]);

  console.log({ totalDiscount });

  return (
    <div className="mb-24">
      <div className="container">
        <div
          className="px-4 py-3 mt-8 bg-white"
          style={{ boxShadow: "1px 2px 26px 0px #C4C2C240" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <SVG.shippingBox />
              <h4 className="text-2xl text-primaryMain font-bold normal-case flex ml-2 ">
                Thanks!{" "}
                <p className="font-medium ml-3">Your order has been placed</p>
              </h4>
            </div>
            <button
              onClick={() => router.replace("/home")}
              className="bg-primaryMain text-white px-5 h-10 font-normal rounded-lg flex items-center"
            >
              <span className="mr-3">
                <SVG.leftArrowWhite />
              </span>{" "}
              Back to purchases
            </button>
          </div>
        </div>
        <div
          className="px-4 py-3 mt-8 bg-white"
          style={{ boxShadow: "1px 2px 26px 0px #C4C2C240" }}
        >
          <h4 className="text-2xl text-primaryMain font-semibold normal-case">
            Order #{orderId}
          </h4>
        </div>
        <div
          className="px-4 py-3 mt-8 bg-white"
          style={{ boxShadow: "1px 2px 26px 0px #C4C2C240" }}
        >
          <p className="text-sm normal-case">
            Order date:{" "}
            <span className="text-black font-semibold">
              {moment(orderDetails?.createdAt).format("D MMMM YYYY, h:m A")}
            </span>
          </p>
          <p className="text-sm normal-case">
            Order Status:{" "}
            <span className="text-green-500 font-semibold">Order placed</span>
          </p>
          <p className="text-sm normal-case">
            Payment via
            <span className="ml-2 text-green-500 font-semibold">
              {orderDetails?.orderItem
                ? orderDetails?.orderItem[0]?.wp_nepaz2_postmeta?.find(
                    (el: any) => el?.meta_key === "_payment_method",
                  )?.meta_value
                : ""}
            </span>
          </p>
          <h4 className="text-2xl my-2 text-primaryMain font-semibold normal-case">
            Shipping Detail
          </h4>
          <p className="text-sm normal-case">
            {orderDetails?.shippingAddress?.address}
          </p>
          <p className="text-sm normal-case">
            {orderDetails?.shippingAddress?.city}{" "}
            {orderDetails?.shippingAddress?.state}
          </p>

          <p className="text-sm normal-case">
            {orderDetails?.shippingAddress?.country},{" "}
            {orderDetails?.shippingAddress?.zipcode}
          </p>
        </div>
        <div
          className="px-4 py-3 mt-8 bg-white"
          style={{ boxShadow: "1px 2px 26px 0px #C4C2C240" }}
        >
          <h4 className="text-2xl my-2 text-primaryMain font-semibold normal-case">
            Order Items
          </h4>

          <div className="flex gap-5">
            <div className="w-8/12">
              <div className="">
                <OrderListTable orderList={orderDetails?.orderItem} />
              </div>
            </div>
            <div className="w-4/12">
              <SummaryCard
                totalDisc={totalDiscount}
                checkoutData={checkoutData}
                isDiscountCoupon={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderSuccess;
