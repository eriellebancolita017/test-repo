"use client";
import SVG from "@/public/svg";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const BuyerSummaryCard = ({
  subTotal,
  grandTotal,
  taxes,
  discountTotal,
}: {
  subTotal: number;
  grandTotal: number;
  taxes: any;
  discountTotal: number;
}) => {
  const currentPath = usePathname();
  const router = useRouter();
  return (
    <>
      <div className="px-4 py-5 border ">
        <h5 className="font-bold normal-case text-black text-base">Summary</h5>
        <div className="flex justify-between mb-3 mt-3">
          <h4 className="flex font-normal text-base normal-case">Subtotal</h4>
          <h5 className=" font-bold text-black">
            ${Number(subTotal)?.toFixed(2)}
          </h5>
        </div>

        <div className="flex justify-between mb-3 normal-case">
          <h4 className="flex font-normal text-base">Shipping</h4>
          <h5 className=" font-bold text-black">Free</h5>
        </div>
        <div className="flex justify-between mb-3 normal-case">
          <h4 className="flex font-normal text-base">Discount</h4>
          <h5 className=" font-bold text-black">
            ${discountTotal?.toFixed(2) || "00.00"}
          </h5>
        </div>
        <div className="flex justify-between mb-3 normal-case">
          <h4 className="flex font-normal text-base">Taxes</h4>
          <h5 className=" font-bold text-black">${taxes}</h5>
        </div>

        <div className="py-5 mt-4 mb-4 border-t border-b border-gray-300"></div>

        <div className="flex justify-between mb-3 mt-3">
          <h4 className="flex font-normal text-base normal-case">Total</h4>
          <h5 className=" font-bold text-primaryMain text-2xl">
            ${Number(grandTotal)?.toFixed(2)}
          </h5>
        </div>
        {currentPath === "/shopping-cart" ? (
          <>
            <button
              onClick={() => router.push("/checkout")}
              className="rounded-md bg-primaryMain text-white w-full h-10 font-normal"
            >
              Proceed to Checkout
            </button>
            <div className="mt-6">
              <ul className="flex justify-center gap-5 items-center">
                <li>
                  <SVG.paypalBlue />
                </li>
                <li>
                  <SVG.visaBlue />
                </li>
                <li>
                  <SVG.americanExpressBlue />
                </li>
                <li>
                  <SVG.masterCardBlue />
                </li>
                <li>
                  <SVG.venmaBlue />
                </li>
              </ul>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default BuyerSummaryCard;
