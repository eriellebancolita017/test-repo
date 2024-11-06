import { StaticImageData } from "next/image";
import { useItemSelection } from "@/components/utils/use-item-selection";
import OfferTableItem from "./offer-table-item";
import React from "react";
export interface Offer {
  id: number;
  image: StaticImageData;
  itemName: string;
  orderId: string;
  purchased: string;
  address: string;
  sales: string;
  earning: string;
  date: string;
  status: string;
  shippedDate: string;
}

export default function OfferTable({ offers }: { offers: Offer[] }) {
  const { selectedItems, handleCheckboxChange } = useItemSelection(offers);

  return (
    <>
      <div className="py-3 px-3 mb-4 flex justify-between items-center bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
        <div className="">
          {" "}
          <span className="text-sm text-primaryMain cursor-pointer mr-1">
            All
          </span>
          {""}|{""}
          <span className="ms-1 text-sm text-primaryMain cursor-pointer mr-1">
            Accept Offers
          </span>
          {""}|{" "}
          <span className="text-sm text-primaryMain cursor-pointer mr-1">
            Decline Offers
          </span>
          |{" "}
          <span className="text-sm text-primaryMain cursor-pointer">
            Counter Offers
          </span>
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
              {/* <button
                className="btn bg-primaryMain hover:bg-blueTwo text-white mr-3"
               
              >
                <span className="hidden xs:block ">Print</span>
              </button>
              <button
                className="btn bg-primaryMain hover:bg-blueTwo text-white mr-3"
         
              >
                <span className="hidden xs:block ">Pdf</span>
              </button>
              <button
                className="btn bg-primaryMain hover:bg-blueTwo text-white mr-3"
      
              >
                <span className="hidden xs:block ">Excel</span>
              </button> */}
            </div>
          </div>
          <div className="flex justify-between mb-4 px-4">
            <div className="flex items-center ">
              <span>Show</span>
              <select className="w-20 mx-2 dark:bg-slate-900 dark:border-slate-700">
                <option>10</option>
                <option>25</option>
                <option>50</option> <option>100</option>
              </select>
              <span>Entries</span>
            </div>
            <div className="">
              {/* <button className="btn bg-primaryMain hover:bg-blueTwo text-white mr-3">
                <span className="">CSV Export</span>
              </button> */}
              <input
                type="text"
                className="h-9 px-2 rounded-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-700"
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
                    <div className="font-semibold text-center">Item</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold">Offer</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-center">Date</div>
                  </th>

                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">
                      Shipping Address
                    </div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-center">Gross Sales</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Earning</div>
                  </th>

                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                    <div className="font-semibold">Status</div>
                  </th>
                  {/* <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Actions</div>
                  </th> */}
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-700">
                {offers.map((offer) => (
                  <OfferTableItem
                    key={offer.id}
                    offer={offer}
                    onCheckboxChange={handleCheckboxChange}
                    isSelected={selectedItems.includes(offer.id)}
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
