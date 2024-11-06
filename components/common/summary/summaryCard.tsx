"use client";
import SVG from "@/public/svg";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ErrorText from "../errorText";
import { setToastMessage } from "@/redux/slices/globaCache.slice";
import { useAppDispatch } from "@/redux/hooks";
import { tokens } from "@/helpers/jwtTokenFunction";
import { ButtonLoader } from "../loader/buttonLoader";

const SummaryCard = ({
  checkoutData,
  setDiscountCouponData,
  isDiscountCoupon = true,
  totalDisc = 0,
}: {
  checkoutData: { subTotal: number; totalItems: number };
  setDiscountCouponData?: (vl: any) => void;
  isDiscountCoupon?: boolean;
  totalDisc?: number;
}) => {
  /**
   * router
   */

  const currentPath = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const coupon = searchParams.get("coupon");

  /**
   * redux
   */
  const dispatch = useAppDispatch();

  /**
   * state management
   */
  const [discountCouponText, setDiscountCouponText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const [discountData, setDiscountData] = useState<{
    cartTotal: number;
    discountTotal: number;
    totalAfterDiscount: number;
  }>({
    cartTotal: 0,
    discountTotal: 0,
    totalAfterDiscount: 0,
  });

  /**
   * handle apply discount
   */

  const handleApplyDiscount = async () => {
    if (discountCouponText === "") {
      setErrorText("Please enter discount code.");
    } else {
      setLoading(true);
      const response = await UserApi.applyDiscountCouponAPI({
        couponCode: discountCouponText,
      });

      if (response.remote === "success") {
        setErrorText("");
        setDiscountData({
          cartTotal: response.data.data.cartTotal,
          discountTotal: response.data.data.discountTotal,
          totalAfterDiscount: response.data.data.totalAfterDiscount,
        });

        setLoading(false);
      } else {
        setLoading(false);
        dispatch(
          setToastMessage({
            message: response.error.errors.message || "An error has occurs.",
            status: "error",
            open: true,
          }),
        );
      }
    }
  };

  const handleDiscount = async (coupon: string) => {
    setLoading(true);
    const response = await UserApi.applyDiscountCouponAPI({
      couponCode: coupon,
    });

    if (response.remote === "success") {
      setErrorText("");
      setDiscountData({
        cartTotal: response.data.data.cartTotal,
        discountTotal: response.data.data.discountTotal,
        totalAfterDiscount: response.data.data.totalAfterDiscount,
      });
      setDiscountCouponData &&
        setDiscountCouponData({
          cartTotal: response.data.data.cartTotal,
          discountTotal: response.data.data.discountTotal,
          totalAfterDiscount: response.data.data.totalAfterDiscount,
        });
      setLoading(false);
    } else {
      setLoading(false);
      dispatch(
        setToastMessage({
          message: response.error.errors.message || "An error has occurs.",
          status: "error",
          open: true,
        }),
      );
    }
  };

  useEffect(() => {
    if (coupon) {
      setDiscountCouponText(coupon);
      handleDiscount(coupon);
    }
  }, [coupon]);

  return (
    <>
      <div className="px-4 py-5 border rounded-2xl">
        <h5 className="font-bold normal-case text-black text-base">Summary</h5>
        <div className="flex justify-between mb-3 mt-3">
          <h4 className="flex font-normal text-base normal-case">
            Subtotal
            <span className="ml-1 font-bold  text-primaryMain">
              ({checkoutData.totalItems} items)
            </span>
          </h4>
          <h5 className=" font-bold text-black">
            ${checkoutData.subTotal.toFixed(2)}
          </h5>
        </div>

        <div className="flex justify-between mb-3 normal-case">
          <h4 className="flex font-normal text-base">Shipping</h4>
          <h5 className=" font-bold text-black">Free</h5>
        </div>

        {currentPath === "/checkout" || currentPath === "/order-success" ? (
          <>
            {" "}
            <div className="flex justify-between mb-3 normal-case">
              <h4 className="flex font-normal text-base">Taxes</h4>
              <h5 className=" font-bold text-black">$00.00</h5>
            </div>
          </>
        ) : (
          ""
        )}
        {currentPath === "/order-success" ? (
          <>
            <div className="flex justify-between mb-3 normal-case">
              <h4 className="flex font-normal text-base">Discount</h4>
              <h5 className=" font-bold text-black">
                ${!isDiscountCoupon ? totalDisc.toFixed(2) : "00.00"}
              </h5>
            </div>
          </>
        ) : (
          ""
        )}
        {isDiscountCoupon && (
          <div className="py-4 mt-4 mb-4 border-t border-b border-gray-300">
            <h4 className="font-normal text-base normal-case mb-2">
              Discount Code
            </h4>
            <div className="flex gap-5 mb-2">
              <div className="w-8/12">
                <input
                  disabled={
                    checkoutData.totalItems !== 0
                      ? discountData.discountTotal !== 0
                      : true
                  }
                  className="rounded-md border h-10 w-full px-4"
                  placeholder="Enter coupon"
                  value={discountCouponText}
                  onChange={(e) => {
                    setErrorText("");
                    setDiscountCouponText(e.target.value);
                  }}
                />
                {errorText && <ErrorText>{errorText}</ErrorText>}
              </div>
              <button
                disabled={checkoutData.totalItems ? loading : true}
                onClick={() => {
                  if (discountData.discountTotal !== 0) {
                    setDiscountCouponText("");
                    setDiscountData({
                      cartTotal: 0,
                      discountTotal: 0,
                      totalAfterDiscount: 0,
                    });
                    coupon && router.replace("/checkout");
                  } else {
                    handleApplyDiscount();
                  }
                }}
                className="rounded-md relative bg-primaryMain h-10 text-white w-4/12 font-bold"
              >
                {loading && (
                  <>
                    <span className="absolute left-[7%] top-[32%]">
                      <ButtonLoader />
                    </span>
                  </>
                )}
                {discountData.discountTotal !== 0 ? "Remove" : "Apply"}
              </button>
            </div>
            {discountData.discountTotal !== 0 && (
              <span className="capitalize text-primaryMain font-semibold text-sm">
                ${discountData.discountTotal.toFixed(2)} discount applied
              </span>
            )}
          </div>
        )}

        <div className="flex justify-between mb-3 mt-3">
          <h4 className="flex font-normal text-base normal-case">Total</h4>
          {totalDisc === 0 ? (
            <h5 className=" font-bold text-primaryMain text-2xl">
              $
              {discountData.discountTotal !== 0
                ? discountData.totalAfterDiscount.toFixed(2)
                : checkoutData.subTotal.toFixed(2)}
            </h5>
          ) : (
            <h5 className=" font-bold text-primaryMain text-2xl">
              ${Number(checkoutData.subTotal) - Number(totalDisc)}
            </h5>
          )}
        </div>
        {currentPath === "/shopping-cart" ? (
          <>
            <button
              onClick={() =>
                tokens.getAccessTokenCookies()
                  ? discountCouponText && discountData.discountTotal !== 0
                    ? router.push(`/checkout?coupon=${discountCouponText}`)
                    : router.push("/checkout")
                  : dispatch(
                      setToastMessage({
                        message: "Please login to checkout",
                        status: "error",
                        open: true,
                      }),
                    )
              }
              className="rounded-md bg-primaryMain text-white w-full h-10 font-normal"
            >
              Proceed to Checkout
            </button>
            <div className="mt-6">
              <ul className="flex justify-center gap-5 items-center">
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
                  <SVG.stripeBlue />
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
export default SummaryCard;
