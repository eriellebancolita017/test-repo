import React from "react";
import Image from "next/image";
import { useState } from "react";
import MediumSizeModal from "@/components/common/modal/mediumSizeModal";
import OfferStatus from "./offerStatus";
import { Offer } from "./offer-table";

interface CustomersTableItemProps {
  offer: Offer;
  onCheckboxChange: (id: number, checked: boolean) => void;
  isSelected: boolean;
}

export default function OfferTableItem({ offer }: CustomersTableItemProps) {
  const [orderStatusModal, setOrderStatusModal] = useState<boolean>(false);

  return (
    <>
      <tr>
        {/* <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="flex items-center">
          {order.status === "completed" ? (
            <div className="text-white ">
              <svg
                className="bg-green-600 rounded-full h-5 w-5"
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"></path>
              </svg>
            </div>
          ) : order.status === "cancelled" ? (
            <div className="text-white ">
              <svg
                className="bg-red-600 rounded-full h-4 w-4"
                stroke="currentColor"
                fill="none"
                stroke-width="0"
                viewBox="0 0 15 15"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          ) : order.status === "refunded" ? (
            <div className="text-white ">
              <svg
                className="bg-pink-600 rounded-full h-4 w-4 p-[0.9]"
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
            </div>
          ) : (
            ""
          )}
        </div>
      </td>{" "} */}
        <td className="px-2 first:pl-5 last:pr-5 py-3   w-px">
          <div className="text-center">
            <Image
              className="rounded-full mx-auto"
              src={offer.image}
              width={50}
              height={50}
              alt=""
            />
            <div className=" w-40">{offer.itemName}</div>
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className=" text-center">
            <div className="font-medium text-slate-800 dark:text-slate-100">
              #{offer.orderId} by Guest
            </div>
            <div className="text-center font-medium text-fuchsia-500">
              {offer.purchased} item
            </div>
          </div>
        </td>{" "}
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-center">{offer.date}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 ">
          <div className="text-left w-40">{offer.address}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-center">
          <div className="">{offer.sales}</div>
          {/* <span className="text-xs">Via PayPal Adaptive</span> */}
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-left">{offer.earning}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <p
            className="underline text-primaryMain font-semibold cursor-pointer"
            // onClick={() => setOrderStatusModal(true)}
          >
            {offer.status}
          </p>
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
      <MediumSizeModal
        isOpen={orderStatusModal}
        setIsOpen={setOrderStatusModal}
      >
        <OfferStatus />
      </MediumSizeModal>
    </>
  );
}
