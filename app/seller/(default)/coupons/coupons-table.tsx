import { useItemSelection } from "@/components/utils/use-item-selection";
import CouponsTableItem from "./coupons-table-item";
import React from "react";

export interface Coupon {
  id: number;
  code: string;
  type: string;
  usageLimit: string;
  amount: string;
  expiryDate: string;
}

export default function CouponsTable({
  coupons,
  handleRefresh,
}: {
  coupons: Coupon[];
  handleRefresh: () => void;
}) {
  const { selectedItems, handleCheckboxChange } = useItemSelection(coupons);

  return (
    <>
      <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
        <div className="py-4">
          {/* Table */}

          <div className="flex justify-between mb-4 px-4">
            <div className="flex items-center">
              {" "}
              <div className="flex items-center mr-4 ">
                <span>Show </span>
                <select className="w-20 h-9 mx-2 dark:bg-[rgb(18,18,18)] dark:border-slate-700">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option> <option>100</option>
                </select>
                <span>Entries</span>
              </div>
              <select className="w-64 mx-2 h-9 border border-slate-200 dark:bg-[rgb(18,18,18)] dark:border-slate-700">
                <option>Show All Types</option>
                <option>Percentage discount</option>
                <option>Fixed product discount</option>
              </select>
            </div>

            <div className="">
              <input
                type="text"
                className="h-9 px-2 rounded-sm border border-slate-200 dark:bg-[rgb(18,18,18)] dark:border-slate-700"
                placeholder="search"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table-auto w-full dark:text-slate-300">
              {/* Table header */}
              <thead className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Code</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Type</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Amount</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Usage Limit </div>
                  </th>

                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-center">Expiry Date</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Actions</div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-700">
                {coupons.map((coupon) => (
                  <CouponsTableItem
                    key={coupon.id}
                    coupon={coupon}
                    onCheckboxChange={handleCheckboxChange}
                    isSelected={selectedItems.includes(coupon.id)}
                    handleRefresh={() => handleRefresh()}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
