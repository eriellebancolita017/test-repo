import { useItemSelection } from "@/components/utils/use-item-selection";
// import { useRouter } from "next/navigation";
import React from "react";
// import { StaticImageData } from "next/image";
import EarningReportTableItem from "./earningReport-table-item";
export interface Product {
  id: number;
  amount: string;
  //   userDetail: { image: StaticImageData; title: string; subTitle: string }[];
  userDetail: any;
}

export default function EarningReportTable({
  products,
}: {
  products: Product[];
}) {
  const { selectedItems, handleCheckboxChange } = useItemSelection(products);

  //   const router = useRouter();
  return (
    <>
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
            <div className="flex items-center ">
              <span>Show</span>
              <select className="h-9 w-20 focus-visible:outline-none border-slate-200 mx-2 dark:bg-[rgb(18,18,18)] dark:border-slate-700">
                <option>10</option>
                <option>25</option>
                <option>50</option> <option>100</option>
              </select>
              <span>Entries</span>
            </div>
            <div className="">
              <input
                type="text"
                className="h-9 px-2 rounded-sm border border-slate-200 dark:bg-[rgb(18,18,18)] dark:border-slate-700"
                placeholder="Search user"
              />
              <select className="h-9 w-28 text-sm focus-visible:outline-none border-slate-200 mx-2 dark:bg-[rgb(18,18,18)] dark:border-slate-700">
                <option className="text-xs">Low to High</option>
                <option className="text-xs">High to Low</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table-auto w-full dark:text-slate-300">
              {/* Table header */}
              <thead className="hidden text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">userDetail</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 w-52">
                    <div className="font-semibold text-left">Amount</div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-700">
                {products.map((product) => (
                  <EarningReportTableItem
                    key={product.id}
                    product={product}
                    onCheckboxChange={handleCheckboxChange}
                    isSelected={selectedItems.includes(product.id)}
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
