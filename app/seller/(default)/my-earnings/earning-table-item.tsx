import React from "react";
import { Earning } from "./earning-table";

interface CustomersTableItemProps {
  earning: Earning;
  onCheckboxChange: (id: number, checked: boolean) => void;
  isSelected: boolean;
}

export default function EarningsTableItem({
  earning,
}: CustomersTableItemProps) {
  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <div className="font-medium text-slate-800 dark:text-slate-100">
            {earning.transactionId}
          </div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium text-slate-800 dark:text-slate-100 text-center">
          {earning.orderId}
        </div>
      </td>

      <td className="px-2 first:pl-5 last:pr-5 py-3 ">
        <div className="text-left font-medium ">{earning.buyer}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center font-medium ">{earning.date}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center font-medium ">{earning.totalItems}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center font-medium ">${earning.orderTotal}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center font-medium ">${earning.salesTax}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center font-medium ">${earning.fiznoFees}</div>
      </td>
      {/* <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap ">
        {earning.amountType === "Earning" ? (
          <>
            <div className="font-medium text-green-500 font-semibold">
              {earning.amount}
            </div>
            <span className="text-xs text-green-500 font-semibold">
              Earning
            </span>
          </>
        ) : (
          <>
            <div className="font-medium  text-red-500 font-semibold">
              {earning.amount}
            </div>
            <span className="text-xs text-red-500 font-semibold">
              Witdhrawal
            </span>
          </>
        )}
      </td> */}
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center font-medium">${earning.processFees}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium">${earning.netEarning}</div>
      </td>
      {/* <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
     

        <button
          className="ms-2 bg-primaryMain text-white p-1 hover:bg-blueTwo rounded-md shadow"
          onClick={() => router.push("/order-details")}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 576 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M288 144a110.94 110.94 0 0 0-31.24 5 55.4 55.4 0 0 1 7.24 27 56 56 0 0 1-56 56 55.4 55.4 0 0 1-27-7.24A111.71 111.71 0 1 0 288 144zm284.52 97.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400c-98.65 0-189.09-55-237.93-144C98.91 167 189.34 112 288 112s189.09 55 237.93 144C477.1 345 386.66 400 288 400z"></path>
          </svg>
        </button>
        <button className="ms-2 bg-primaryMain text-white p-1 hover:bg-blueTwo rounded-md shadow">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.0049 8V5H4.00488V8H20.0049ZM20.0049 10H4.00488V19H20.0049V10ZM3.00488 3H21.0049C21.5572 3 22.0049 3.44772 22.0049 4V20C22.0049 20.5523 21.5572 21 21.0049 21H3.00488C2.4526 21 2.00488 20.5523 2.00488 20V4C2.00488 3.44772 2.4526 3 3.00488 3ZM11.0049 14H17.0049V16H6.50488L11.0049 11.5V14Z"></path>
          </svg>
        </button>
      </td> */}
    </tr>
  );
}
