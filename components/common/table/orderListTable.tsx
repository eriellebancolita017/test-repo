"use client";
import React from "react";
import { ProductShortCard } from "@/app/(buyer-area)/(default)/(order)/component/productShortCard";
import CustomTouchSpin from "@/app/(buyer-area)/(default)/(order)/component/customTouchSpin";

export const OrderListTable = ({ orderList }: { orderList: any }) => {
  return (
    <>
      <table className="w-full border-l border-r border-b">
        <thead className="border-b border-t">
          <tr>
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
          {orderList?.map((item: any) => (
            <tr key={item?.ID} className="border-b">
              <td className="px-3">
                <ProductShortCard
                  productId={item?.orderItem?.product?.ID}
                  sellerId={item?.orderItem?.product?.wp_nepaz2_users?.id}
                  title={item?.orderItem?.product?.post_name}
                  vendor={
                    item?.orderItem?.product?.wp_nepaz2_users?.display_name
                  }
                  price={Number(item?.orderItem?.product_net_revenue)?.toFixed(
                    2,
                  )}
                  ImageData={
                    item?.orderItem?.product?.attachments[0]?.guid
                      ? item?.orderItem?.product?.attachments[0]?.guid?.includes(
                          "http",
                        )
                        ? item?.orderItem?.product?.attachments[0]?.guid
                        : `${process.env.NEXT_PUBLIC_API_BASE_URL}${item?.orderItem?.product?.attachments[0]?.guid}`
                      : ""
                  }
                />
              </td>

              <td className="px-3">
                <CustomTouchSpin
                  isDisabled={true}
                  min={1}
                  max={10}
                  step={1}
                  initialValue={item?.orderItem?.product_qty}
                  onChange={() => {}}
                />
              </td>

              <td
                className="normal-case font-medium text-black px-3"
                align="center"
              >
                Free Shipping
              </td>
              <td className="font-bold text-black text-end px-3">
                ${Number(item?.orderItem?.product_net_revenue)?.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
