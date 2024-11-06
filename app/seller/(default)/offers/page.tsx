"use client";

// export const metadata = {
//   title: "Customers - Mosaic",
//   description: "Page description",
// };
import React from "react";
import { SelectedItemsProvider } from "@/app/selected-items-context";
import PaginationClassic from "@/components/pagination-classic";
import Image01 from "@/public/images/product1.png";
import Image02 from "@/public/images/product2.jpg";
import Image03 from "@/public/images/product3.jpg";
import { useRouter } from "next/navigation";
import OfferTable from "./offer-table";

function OfferContent() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  // Some dummy customers data
  const offers = [
    {
      id: 0,
      image: Image01,
      itemName: "YFZ 450R Shock 2014-2015",
      orderId: "4343",
      purchased: "1",
      address:
        "Angel Moraga Heritage 18883 Cypress View Dr Fort Myers, FL 33967-4824",
      sales: "$23.50",
      earning: "$17.43",
      date: "April 30, 2024",
      status: "Accept",
      shippedDate: "May 02, 2024",
    },
    {
      id: 1,
      image: Image02,
      itemName: "YFZ 450R Brake Caliper 2014-2015",
      orderId: "3453",
      purchased: "1",
      address:
        "Angel Moraga Heritage 18883 Cypress View Dr Fort Myers, FL 33967-4824",
      sales: "$23.55",
      earning: "$17.42",
      date: "April 30, 2024",
      status: "Decline",
      shippedDate: "May 12, 2024",
    },
    {
      id: 2,
      orderId: "87886",
      image: Image03,
      itemName: "YFZ 450R Shock 2014-2015",
      purchased: "1",
      address:
        "Angel Moraga Heritage 18883 Cypress View Dr Fort Myers, FL 33967-4824",
      sales: "$23.58",
      earning: "$17.44",
      date: "April 30, 2024",
      status: "Counter",
      shippedDate: "May 22, 2024",
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className=" flex items-center text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
            Offers
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
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="m21.41 11.58-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM13 20.01 4 11V4h7v-.01l9 9-7 7.02z"></path>
              <circle cx="6.5" cy="6.5" r="1.5"></circle>
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
      <OfferTable offers={offers} />

      {/* Pagination */}
      <div className="mt-8">
        <PaginationClassic pageIndex={0} pageSize={0} totalResults={0} />
      </div>
    </div>
  );
}

export default function Offers() {
  return (
    <SelectedItemsProvider>
      <OfferContent />
    </SelectedItemsProvider>
  );
}
