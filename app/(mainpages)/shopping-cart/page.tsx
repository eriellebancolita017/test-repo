"use client";
import BreadcrumbTwo from "@/components/common/breadcrumb/breadcrumbTwo";
import SummaryCard from "@/components/common/summary/summaryCard";
import React, { useState } from "react";
import OrderListTable from "../checkout/component/orderListTable";
// import { useAppSelector } from "@/redux/hooks";
// import { productStateSelector } from "@/redux/slices/product.slice";
import { useRouter } from "next/navigation";

export default function ShoppingCart() {
  const router = useRouter();

  const breadcrumbItems = [
    { text: "Home", href: "/" },
    { text: "Shopping Cart", href: "/shopping-cart" },
  ];

  /**
   * redux
   */

  // const { cartCount } = useAppSelector(productStateSelector);

  /**
   * state management
   */
  const [checkoutData, setCheckoutData] = useState<{
    subTotal: number;
    totalItems: number;
  }>({ subTotal: 0, totalItems: 0 });

  return (
    <>
      <div className="">
        <div className="container">
          <div className="w-3/5">
            <div className="my-4">
              <BreadcrumbTwo
                items={breadcrumbItems}
                className="rounded-lg px-2 py-1"
              />
            </div>
          </div>
          {/* <div className="flex my-5 items-center justify-between">
            <h4 className=" heading_crm_pages text-black font-bold capitalize text-2xl flex items-start mx-4">
              Shopping Cart
              <span className="text-sm font-medium ml-1">
                ({cartCount || 0})
              </span>
            </h4>
          </div> */}
          <div className="flex flex-wrap lg:flex-nowrap gap-7 mb-8">
            <div className="w-full lg:w-8/12">
              <OrderListTable
                handleCheckoutData={(value: any) => setCheckoutData(value)}
              />
              <div
                className="mt-4 normal-case text-sm cursor-pointer hover:text-primaryMain"
                onClick={() => router.push("/")}
              >
                <span className="text-base mr-2"> &#x2190;</span> Continue
                Shopping
              </div>
            </div>
            <div className="w-full lg:w-4/12 mx-4">
              <SummaryCard checkoutData={checkoutData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
