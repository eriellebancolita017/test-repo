"use client";
import React, { useEffect, useState } from "react";
import { SelectedItemsProvider } from "@/app/selected-items-context";
import PaginationClassic from "@/components/pagination-classic";
import { useRouter } from "next/navigation";
import CouponsTable from "./coupons-table";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import moment from "moment";

function CouponsContent() {
  /**
   * router
   */

  const router = useRouter();

  /**
   * state management
   */

  const [couponData, setCouponData] = useState<
    {
      id: number;
      code: string;
      type: string;
      amount: string;
      expiryDate: string;
      usageLimit: string;
    }[]
  >([]);

  /**
   * handle get all coupons
   */

  const handleGetAllCoupons = async () => {
    const response = await UserApi.getAllCouponAPI();

    if (response.remote === "success") {
      const data = response.data.data;
      const coupons = data.map((el: any) => ({
        id: el.id,
        code: el.code,
        type: el.coupon_type,
        amount: el.coupon_amount,
        expiryDate: moment(el.expire_at).format("MMMM D, YYYY"),
        usageLimit: `${el.uses}/${el.limit}`,
      }));

      setCouponData(coupons);
    }
  };

  useEffect(() => {
    handleGetAllCoupons();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className=" flex items-center text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
            Coupons
            <svg
              className="shrink-0 h-6 w-6 ms-2"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                strokeWidth="2"
                d="M3,11 L21,11 L21,23 L3,23 L3,11 Z M2,11 L2,7 L22,7 L22,11 L2,11 Z M12,23 L12,7 L12,23 Z M7,7 L12,7 C12,7 10,2 7,2 C3.5,2 3,7 7,7 Z M17.1843819,7 L12.1843819,7 C12.1843819,7 14,2 17.1843819,2 C20.5,2 21.1843819,7 17.1843819,7 Z"
              ></path>
            </svg>
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Delete button */}
          <button
            className="btn bg-primaryMain hover:bg-blueTwo text-white"
            onClick={() => router.push("/seller/add-coupons")}
          >
            <span className="hidden xs:block ">Add Coupon</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <CouponsTable
        coupons={couponData}
        handleRefresh={() => handleGetAllCoupons()}
      />

      {/* Pagination */}
      <div className="mt-8">
        <PaginationClassic pageIndex={0} pageSize={0} totalResults={0} />
      </div>
    </div>
  );
}

export default function Coupons() {
  return (
    <SelectedItemsProvider>
      <CouponsContent />
    </SelectedItemsProvider>
  );
}
