"use client";
import React from "react";
import { ProductShortCard } from "@/app/(buyer-area)/(default)/(order)/component/productShortCard";

export const BuyerOrderListTable = ({
  orderProductList,
}: {
  orderProductList: any;
}) => {
  console.log({ orderProductList });

  return (
    <>
      <table className="w-full border-l border-r border-b buyer_order_table">
        <thead className="border-b border-t">
          <tr>
            <th className="p-3 w-16"></th>
            <th className="p-3 font-semibold normal-case w-5/12" align="left">
              Products
            </th>
            <th className="p-3 font-semibold normal-case">Quantity</th>

            <th className="p-3 font-semibold normal-case">Shipping</th>

            <th className="p-3 font-semibold normal-case" align="right">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-3" align="center"></td>
            <td className="px-3 product_price">
              <ProductShortCard
                sellerId={orderProductList?.product?.wp_nepaz2_users?.id}
                productId={orderProductList?.product?.ID}
                ImageData=""
                price="40"
                title={orderProductList?.product?.post_name}
                vendor={
                  orderProductList?.product?.wp_nepaz2_users?.display_name
                }
              />
            </td>

            <td className="px-3">
              <div className="flex items-center justify-center border border-[#E3E3E3] h-12 w-20 rounded-3xl text-sm font-semibold text-[#5D5F5F]">
                {orderProductList?.product_qty}
              </div>
            </td>

            <td
              className="normal-case font-medium text-black px-3"
              align="center"
            >
              Free Shipping
            </td>
            <td className="font-bold text-black text-end px-3">
              ${Number(orderProductList?.product_gross_revenue)?.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
