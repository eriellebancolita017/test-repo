"use client";

// export const metadata = {
//   title: "Customers - Mosaic",
//   description: "Page description",
// };
import React from "react";
import { SelectedItemsProvider } from "@/app/selected-items-context";
import PaginationClassic from "@/components/pagination-classic";
import EarningsTable from "./earning-table";

function EarningsContent() {
  // Some dummy customers data
  const earnings = [
    {
      id: 0,
      orderId: "1001",
      transactionId: "1001",
      buyer: "Akshay",
      amount: "$1000.00",
      totalItems: 2,
      orderTotal: "52.96",
      processFees: "-44.43",
      fiznoFees: "-2.49",
      salesTax: "-2.98",
      netEarning: "41.23",
      date: "22/05/2024",
    },
    {
      id: 1,
      orderId: "NA",
      transactionId: "1002",
      buyer: "NA",
      amount: "-$1000.00",
      amountType: "Withdrawal",
      marketPlace: "NA",
      netEarning: "44.00",
      date: "XXXX",
      totalItems: 2,
      orderTotal: "52.96",
      processFees: "-44.43",
      fiznoFees: "-2.49",
      salesTax: "-2.98",
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className=" flex items-center text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
            My Earning
            <svg
              className="shrink-0 h-6 w-6 ms-2"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 576 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M112 112c0 35.3-28.7 64-64 64V336c35.3 0 64 28.7 64 64H464c0-35.3 28.7-64 64-64V176c-35.3 0-64-28.7-64-64H112zM0 128C0 92.7 28.7 64 64 64H512c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM176 256a112 112 0 1 1 224 0 112 112 0 1 1 -224 0zm80-48c0 8.8 7.2 16 16 16v64h-8c-8.8 0-16 7.2-16 16s7.2 16 16 16h24 24c8.8 0 16-7.2 16-16s-7.2-16-16-16h-8V208c0-8.8-7.2-16-16-16H272c-8.8 0-16 7.2-16 16z"></path>
            </svg>
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Delete button */}
        </div>
      </div>

      {/* Table */}
      <EarningsTable earnings={earnings} />

      {/* Pagination */}
      <div className="mt-8">
        <PaginationClassic pageIndex={0} pageSize={0} totalResults={0} />
      </div>
    </div>
  );
}

export default function MyEarnings() {
  return (
    <SelectedItemsProvider>
      <EarningsContent />
    </SelectedItemsProvider>
  );
}
