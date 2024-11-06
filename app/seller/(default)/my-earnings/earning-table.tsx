"use client";
import { useItemSelection } from "@/components/utils/use-item-selection";
import EarningsTableItem from "./earning-table-item";
import RangeDatePicker from "@/components/common/datepicker/rangeDatePicker";
import EarningGraph from "./component/earningChart";
import React, { useState } from "react";
import { GetPaidCard } from "@/components/common/card/getPaidCard";
import MediumSizeModal from "@/components/common/modal/mediumSizeModal";
import GetPaidNow from "../get-paid/getPaidNow";
export interface Earning {
  id: number;
  orderId: string;
  transactionId: string;
  buyer: string;
  amount: string;
  netEarning: string;
  date: string;
  totalItems: number;
  salesTax: string;
  fiznoFees: string;
  processFees: string;
  orderTotal: string;
}

export default function EarningsTable({ earnings }: { earnings: Earning[] }) {
  const { selectedItems, handleCheckboxChange } = useItemSelection(earnings);
  const [getPaidNowModalOpen, setGetPaidNowModalOpen] =
    useState<boolean>(false);
  return (
    <>
      <div className="p-5 mb-4 flex gap-5  items-center bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
        <div className="w-4/12 mr-10 ">
          <GetPaidCard
            // className="h-56"
            availableAmount={234.5}
            pendingAmount={5434.0}
            onGetPaid={() => setGetPaidNowModalOpen(true)}
          />
        </div>
        <div className="w-8/12">
          {/* <h2 className="text-xl font-bold text-slate-950">
            Why do we have Fizno Balance?
          </h2>
          <p className="mt-4 text-slate-950 font-medium">
            Delaying the availbility of the funds is a common practice in online{" "}
            marketplaces. We implement this to help ensure that Fizno is safe
            and secure for both buyers and sellers.
          </p>
          <br></br>
          <p className="mt-3 text-slate-950 font-medium">
            With Fizno balance. if somethings goes wrong. we may refund the
            buyer, through u can mutually agree on a different resolution.
          </p> */}
          <EarningGraph />
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
        <header className="px-5 py-2">
          {/* <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          All Products{" "}
          <span className="text-slate-400 dark:text-slate-500 font-medium">
            248
          </span>
        </h2> */}
        </header>
        <div>
          {/* Table */}

          <div className="flex justify-between mb-4 px-4">
            <div className="flex items-center">
              <div className="flex items-center ">
                <span>Show</span>
                <select className=" h-9 w-20 mx-2 border-slate-200 border rounded-sm dark:bg-[rgb(18,18,18)] dark:border-slate-700">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option> <option>100</option>
                </select>
                <span>Entries</span>
              </div>
              <div className="ms-4">
                <RangeDatePicker />
              </div>
            </div>
            <div className="">
              <input
                type="text"
                className="h-9 px-2 rounded-sm border border-slate-200 dark:border-slate-700 dark:bg-[rgb(18,18,18)]"
                placeholder="search"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table-auto w-full dark:text-slate-300">
              {/* Table header */}
              <thead className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                    <div className="font-semibold">Transaction Id</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold">Order Id</div>
                  </th>{" "}
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Buyer</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-center">
                      Delivery Date
                    </div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Total Items</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Order Total</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Sales Tax</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Fizno Fees</div>
                  </th>
                  {/* <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Amount</div>
                  </th> */}
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-center">
                      Shipping Label
                    </div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Total Earning</div>
                  </th>
                  {/* <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Actions</div>
                  </th> */}
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-700">
                {earnings.map((earning) => (
                  <EarningsTableItem
                    key={earning.id}
                    earning={earning}
                    onCheckboxChange={handleCheckboxChange}
                    isSelected={selectedItems.includes(earning.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <MediumSizeModal
        isOpen={getPaidNowModalOpen}
        setIsOpen={setGetPaidNowModalOpen}
        className="get-paid-now-modal"
      >
        <GetPaidNow setGetPaidNowModalOpen={setGetPaidNowModalOpen} />
      </MediumSizeModal>
    </>
  );
}
