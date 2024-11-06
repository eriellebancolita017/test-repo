"use client";
import MediumSizeModal from "@/components/common/modal/mediumSizeModal";
import ModalAction from "@/components/modal-action";
import Image from "next/image";
import React, { useState } from "react";
import WithdrawSchedule from "./withdrawSchedule";
import GetPaidNow from "./getPaidNow";
import EditPaymentMethod from "./editPaymentMethod";
import SetupPaymentMethod from "./setupPaymentMethod";
import StripSetup from "./stripSetup";
import PayPalSetup from "./paypalSetup";
import { useRouter } from "next/navigation";
import RecentActivityCard from "./component/recentActivityCard";
import { GetPaidCard } from "@/components/common/card/getPaidCard";

export default function GetPaid() {
  const router = useRouter();
  const [addPaymentMethodOpen, setAddPaymentMethodOpen] =
    useState<boolean>(false);

  const [withdrawlScheduleOpen, setWithdrawlScheduleOpen] =
    useState<boolean>(false);
  const [getPaidNowModalOpen, setGetPaidNowModalOpen] =
    useState<boolean>(false);
  const [editPaymentModalOpen, setEditPaymentModalOpen] =
    useState<boolean>(false);
  const [setupPaymentModalOpen, setSetupPaymentModalOpen] =
    useState<boolean>(false);

  const [stripSetupModalOpen, setStripSetupModalOpen] =
    useState<boolean>(false);
  const [paypalSetupModalOpen, setPaypalSetupModalOpen] =
    useState<boolean>(false);

  const activities = [
    {
      date: "Jun 12, 2024",
      time: "08:26:57 AM",
      paymentAmount: 45.65,
      description: "2006 - 2014 Honda TRX450r Terring Hole Plugs....",
      status: "process" as const, // Explicitly cast to 'process'
      price: 11.91,
      estimatedDate: "22 July 2024",
      transactionId: "#12345654AS",
    },
    {
      date: "Jun 01, 2024",
      time: "10:15:30 AM",
      paymentAmount: 48.43,
      description: "Funds sents Funds usually arrive in 1-3 business days",
      status: "success" as const, // Explicitly cast to 'success'
      price: -15.99,
      estimatedDate: "12 June 2024",
      transactionId: "#12345654AS",
    },
    {
      date: "Jun 23, 2024",
      time: "11:26:57 PM",
      paymentAmount: 55.99,
      description: "2005 - 2009 Honda TRX450r Terring Hole Plugs....",
      status: "process" as const, // Explicitly cast to 'process'
      price: 13.12,
      estimatedDate: "30 June 2024",
      transactionId: "#12345654AS",
    },
    {
      date: "Jun 28, 2024",
      time: "06:23:12 PM",
      paymentAmount: 88.22,
      description: "2007 - 2016 Hero TRX450r Terring Hole Plugs....",
      status: "success" as const, // Explicitly cast to 'process'
      price: -25.91,
      estimatedDate: "02 July 2024",
      transactionId: "#12345654AS",
    },
    // Add more activities as needed
  ];
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className=" flex items-center text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
            Get Paid
            <svg
              className="shrink-0 h-6 w-6 ms-2"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm47.7-395.2l-25.4-5.9V348.6c38 5.2 61.5 29 65.5 58.2.5 4 3.9 6.9 7.9 6.9h44.9c4.7 0 8.4-4.1 8-8.8-6.1-62.3-57.4-102.3-125.9-109.2V263c0-4.4-3.6-8-8-8h-28.1c-4.4 0-8 3.6-8 8v33c-70.8 6.9-126.2 46-126.2 119 0 67.6 49.8 100.2 102.1 112.7l24.7 6.3v142.7c-44.2-5.9-69-29.5-74.1-61.3-.6-3.8-4-6.6-7.9-6.6H363c-4.7 0-8.4 4-8 8.7 4.5 55 46.2 105.6 135.2 112.1V761c0 4.4 3.6 8 8 8h28.4c4.4 0 8-3.6 8-8.1l-.2-31.7c78.3-6.9 134.3-48.8 134.3-124-.1-69.4-44.2-100.4-109-116.4zm-68.6-16.2c-5.6-1.6-10.3-3.1-15-5-33.8-12.2-49.5-31.9-49.5-57.3 0-36.3 27.5-57 64.5-61.7v124zM534.3 677V543.3c3.1.9 5.9 1.6 8.8 2.2 47.3 14.4 63.2 34.4 63.2 65.1 0 39.1-29.4 62.6-72 66.4z"></path>
            </svg>
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Delete button */}
        </div>
      </div>
      <div className="p-5 mb-4  flex gap-5  items-center bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
        {/* <h4 className="text-slate-950 text-xl font-semibold">
          Available Balance
        </h4>
        <p className="text-green-500 text-xl font-semibold">$2.80</p>
        <p className="text-xs flex items-center text-bold">
          +$0.00 pending{" "}
          <svg
            className="ms-2"
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M235.4 172.2c0-11.4 9.3-19.9 20.5-19.9 11.4 0 20.7 8.5 20.7 19.9s-9.3 20-20.7 20c-11.2 0-20.5-8.6-20.5-20zm1.4 35.7H275V352h-38.2V207.9z"></path>
            <path d="M256 76c48.1 0 93.3 18.7 127.3 52.7S436 207.9 436 256s-18.7 93.3-52.7 127.3S304.1 436 256 436c-48.1 0-93.3-18.7-127.3-52.7S76 304.1 76 256s18.7-93.3 52.7-127.3S207.9 76 256 76m0-28C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z"></path>
          </svg>
        </p>

        <button
          className="btn bg-primaryMain hover:bg-blueTwo text-white mt-4"
          onClick={() => setGetPaidNowModalOpen(true)}
          // onClick={() => router.push("/add-products")}
        >
          {" "}
          <span className="hidden xs:block ">Get paid now</span>
        </button> */}

        <div className=" w-4/12 mr-10 ">
          <GetPaidCard
            // className="h-56"
            availableAmount={234.5}
            pendingAmount={5434.0}
            onGetPaid={() => setGetPaidNowModalOpen(true)}
          />
        </div>
        <div className="w-8/12">
          {" "}
          <div className="mt-4 py-4 h-48 px-4 mb-4 bg-white dark:bg-slate-800 rounded-sm border border-slate-200 dark:border-slate-700 relative">
            <div className="flex justify-between">
              <h4 className="text-slate-950 text-xl font-semibold">
                Withdrawal Methods
              </h4>

              <button
                className="btn bg-transparent text-primaryMain font-semibold hover:text-white hover:bg-blueTwo  border border-primaryMain"
                // onClick={() => router.push("/add-products")}
              >
                {" "}
                <span
                  className="hidden xs:block"
                  onClick={() => setAddPaymentMethodOpen(true)}
                >
                  Add a Method
                </span>
              </button>
            </div>

            <div className="mt-6 flex justify-between">
              {" "}
              <p className="text-sm font-semibold flex items-center">
                <svg
                  className="mr-2 h-8 w-8  text-lg"
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  version="1"
                  viewBox="0 0 48 48"
                  enableBackground="new 0 0 48 48"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#7CB342"
                    d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z"
                  ></path>
                  <path
                    fill="#0277BD"
                    d="M45,24c0,11.7-9.5,21-21,21S3,35.7,3,24S12.3,3,24,3S45,12.3,45,24z M23.8,33.7c0-0.4-0.2-0.6-0.6-0.8 c-1.3-0.4-2.5-0.4-3.6-1.5c-0.2-0.4-0.2-0.8-0.4-1.3c-0.4-0.4-1.5-0.6-2.1-0.8c-0.8,0-1.7,0-2.7,0c-0.4,0-1.1,0-1.5,0 c-0.6-0.2-1.1-1.1-1.5-1.7c0-0.2,0-0.6-0.4-0.6c-0.4-0.2-0.8,0.2-1.3,0c-0.2-0.2-0.2-0.4-0.2-0.6c0-0.6,0.4-1.3,0.8-1.7 c0.6-0.4,1.3,0.2,1.9,0.2c0.2,0,0.2,0,0.4,0.2c0.6,0.2,0.8,1,0.8,1.7c0,0.2,0,0.4,0,0.4c0,0.2,0.2,0.2,0.4,0.2 c0.2-1.1,0.2-2.1,0.4-3.2c0-1.3,1.3-2.5,2.3-2.9c0.4-0.2,0.6,0.2,1.1,0c1.3-0.4,4.4-1.7,3.8-3.4c-0.4-1.5-1.7-2.9-3.4-2.7 c-0.4,0.2-0.6,0.4-1,0.6c-0.6,0.4-1.9,1.7-2.5,1.7c-1.1-0.2-1.1-1.7-0.8-2.3c0.2-0.8,2.1-3.6,3.4-3.1c0.2,0.2,0.6,0.6,0.8,0.8 c0.4,0.2,1.1,0.2,1.7,0.2c0.2,0,0.4,0,0.6-0.2c0.2-0.2,0.2-0.2,0.2-0.4c0-0.6-0.6-1.3-1-1.7c-0.4-0.4-1.1-0.8-1.7-1.1 c-2.1-0.6-5.5,0.2-7.1,1.7s-2.9,4-3.8,6.1c-0.4,1.3-0.8,2.9-1,4.4c-0.2,1-0.4,1.9,0.2,2.9c0.6,1.3,1.9,2.5,3.2,3.4 c0.8,0.6,2.5,0.6,3.4,1.7c0.6,0.8,0.4,1.9,0.4,2.9c0,1.3,0.8,2.3,1.3,3.4c0.2,0.6,0.4,1.5,0.6,2.1c0,0.2,0.2,1.5,0.2,1.7 c1.3,0.6,2.3,1.3,3.8,1.7c0.2,0,1-1.3,1-1.5c0.6-0.6,1.1-1.5,1.7-1.9c0.4-0.2,0.8-0.4,1.3-0.8c0.4-0.4,0.6-1.3,0.8-1.9 C23.8,35.1,24,34.3,23.8,33.7z M24.2,14.3c0.2,0,0.4-0.2,0.8-0.4c0.6-0.4,1.3-1.1,1.9-1.5c0.6-0.4,1.3-1.1,1.7-1.5 c0.6-0.4,1.1-1.3,1.3-1.9c0.2-0.4,0.8-1.3,0.6-1.9c-0.2-0.4-1.3-0.6-1.7-0.8c-1.7-0.4-3.1-0.6-4.8-0.6c-0.6,0-1.5,0.2-1.7,0.8 c-0.2,1.1,0.6,0.8,1.5,1.1c0,0,0.2,1.7,0.2,1.9c0.2,1-0.4,1.7-0.4,2.7c0,0.6,0,1.7,0.4,2.1L24.2,14.3z M41.8,29 c0.2-0.4,0.2-1.1,0.4-1.5c0.2-1,0.2-2.1,0.2-3.1c0-2.1-0.2-4.2-0.8-6.1c-0.4-0.6-0.6-1.3-0.8-1.9c-0.4-1.1-1-2.1-1.9-2.9 c-0.8-1.1-1.9-4-3.8-3.1c-0.6,0.2-1,1-1.5,1.5c-0.4,0.6-0.8,1.3-1.3,1.9c-0.2,0.2-0.4,0.6-0.2,0.8c0,0.2,0.2,0.2,0.4,0.2 c0.4,0.2,0.6,0.2,1,0.4c0.2,0,0.4,0.2,0.2,0.4c0,0,0,0.2-0.2,0.2c-1,1.1-2.1,1.9-3.1,2.9c-0.2,0.2-0.4,0.6-0.4,0.8 c0,0.2,0.2,0.2,0.2,0.4c0,0.2-0.2,0.2-0.4,0.4c-0.4,0.2-0.8,0.4-1.1,0.6c-0.2,0.4,0,1.1-0.2,1.5c-0.2,1.1-0.8,1.9-1.3,2.9 c-0.4,0.6-0.6,1.3-1,1.9c0,0.8-0.2,1.5,0.2,2.1c1,1.5,2.9,0.6,4.4,1.3c0.4,0.2,0.8,0.2,1.1,0.6c0.6,0.6,0.6,1.7,0.8,2.3 c0.2,0.8,0.4,1.7,0.8,2.5c0.2,1,0.6,2.1,0.8,2.9c1.9-1.5,3.6-3.1,4.8-5.2C40.6,32.4,41.2,30.7,41.8,29z"
                  ></path>
                </svg>{" "}
                Direct to Local Bank (USD)-Account ending in 4603
                <span className="py-0  px-2  border-gray-500 border rounded-full ml-2">
                  Preferred
                </span>
              </p>
              <div className="flex">
                <button
                  className=" text-sm bg-transparent font-semibold text-green-500 hover:underline mr-5"
                  onClick={() => setEditPaymentModalOpen(true)}
                >
                  Edit
                </button>
                <button className="text-sm bg-transparent font-semibold text-red-500 hover:underline">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-7 mt-7">
        <div className="py-4 px-4 mb-2 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
          <div className="flex justify-between">
            <h4 className="text-slate-950 text-xl font-semibold">
              Withdrawal Schedule
            </h4>
            <div
              className="border border-primaryMain p-1 rounded-full cursor-pointer h-7 w-7 flex items-center justify-center"
              onClick={() => setWithdrawlScheduleOpen(true)}
            >
              <svg
                className="text-primaryMain   "
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                <path d="m15 5 4 4"></path>
              </svg>
            </div>
          </div>

          <p className="font-semibold text-green-500">
            Quarterly (next on Jun 24)
          </p>
          <p className="text-xs text-slate-950 flex items-center ">
            Only when balance is $1000.00 or more.
            {/* <span className="text-green-600 underline bold ms-2">
              View payment calendar
            </span> */}
          </p>

          <p className=" font-semibold mt-4">
            Direct to Local Bank (USD) - Account ending in 4603
          </p>
        </div>
        <div className="py-4 px-4 mb-2 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
          <h4 className="text-slate-950 text-xl font-semibold">
            Last Withdrawal
          </h4>
          <p className=" font-semibold">
            $2,149,01 to Direct to Local Bank (USD)-Account ending in 4603
          </p>
          <p className="text-xs text-slate-950 flex items-center ">
            Mar 3, 2024
          </p>

          <p
            className="text-green-500 font-semibold underline mt-4 cursor-pointer"
            onClick={() => router.push("/seller/my-earnings")}
          >
            View transaction history
          </p>
        </div>
      </div>

      {/* <div className="mt-4 py-4 px-4 mb-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
        <div className="flex justify-between">
          <h4 className="text-slate-950 text-xl font-semibold">
            Withdrawal Methods
          </h4>

          <button
            className="btn bg-transparent text-primaryMain font-semibold hover:text-white hover:bg-blueTwo  border border-primaryMain"
            // onClick={() => router.push("/add-products")}
          >
            {" "}
            <span
              className="hidden xs:block"
              onClick={() => setAddPaymentMethodOpen(true)}
            >
              Add a Method
            </span>
          </button>
        </div>

        <div className="mt-6 flex justify-between">
          {" "}
          <p className=" font-semibold flex items-center">
            <svg
              className="mr-2 h-8 w-8  text-lg"
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              version="1"
              viewBox="0 0 48 48"
              enable-background="new 0 0 48 48"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#7CB342"
                d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z"
              ></path>
              <path
                fill="#0277BD"
                d="M45,24c0,11.7-9.5,21-21,21S3,35.7,3,24S12.3,3,24,3S45,12.3,45,24z M23.8,33.7c0-0.4-0.2-0.6-0.6-0.8 c-1.3-0.4-2.5-0.4-3.6-1.5c-0.2-0.4-0.2-0.8-0.4-1.3c-0.4-0.4-1.5-0.6-2.1-0.8c-0.8,0-1.7,0-2.7,0c-0.4,0-1.1,0-1.5,0 c-0.6-0.2-1.1-1.1-1.5-1.7c0-0.2,0-0.6-0.4-0.6c-0.4-0.2-0.8,0.2-1.3,0c-0.2-0.2-0.2-0.4-0.2-0.6c0-0.6,0.4-1.3,0.8-1.7 c0.6-0.4,1.3,0.2,1.9,0.2c0.2,0,0.2,0,0.4,0.2c0.6,0.2,0.8,1,0.8,1.7c0,0.2,0,0.4,0,0.4c0,0.2,0.2,0.2,0.4,0.2 c0.2-1.1,0.2-2.1,0.4-3.2c0-1.3,1.3-2.5,2.3-2.9c0.4-0.2,0.6,0.2,1.1,0c1.3-0.4,4.4-1.7,3.8-3.4c-0.4-1.5-1.7-2.9-3.4-2.7 c-0.4,0.2-0.6,0.4-1,0.6c-0.6,0.4-1.9,1.7-2.5,1.7c-1.1-0.2-1.1-1.7-0.8-2.3c0.2-0.8,2.1-3.6,3.4-3.1c0.2,0.2,0.6,0.6,0.8,0.8 c0.4,0.2,1.1,0.2,1.7,0.2c0.2,0,0.4,0,0.6-0.2c0.2-0.2,0.2-0.2,0.2-0.4c0-0.6-0.6-1.3-1-1.7c-0.4-0.4-1.1-0.8-1.7-1.1 c-2.1-0.6-5.5,0.2-7.1,1.7s-2.9,4-3.8,6.1c-0.4,1.3-0.8,2.9-1,4.4c-0.2,1-0.4,1.9,0.2,2.9c0.6,1.3,1.9,2.5,3.2,3.4 c0.8,0.6,2.5,0.6,3.4,1.7c0.6,0.8,0.4,1.9,0.4,2.9c0,1.3,0.8,2.3,1.3,3.4c0.2,0.6,0.4,1.5,0.6,2.1c0,0.2,0.2,1.5,0.2,1.7 c1.3,0.6,2.3,1.3,3.8,1.7c0.2,0,1-1.3,1-1.5c0.6-0.6,1.1-1.5,1.7-1.9c0.4-0.2,0.8-0.4,1.3-0.8c0.4-0.4,0.6-1.3,0.8-1.9 C23.8,35.1,24,34.3,23.8,33.7z M24.2,14.3c0.2,0,0.4-0.2,0.8-0.4c0.6-0.4,1.3-1.1,1.9-1.5c0.6-0.4,1.3-1.1,1.7-1.5 c0.6-0.4,1.1-1.3,1.3-1.9c0.2-0.4,0.8-1.3,0.6-1.9c-0.2-0.4-1.3-0.6-1.7-0.8c-1.7-0.4-3.1-0.6-4.8-0.6c-0.6,0-1.5,0.2-1.7,0.8 c-0.2,1.1,0.6,0.8,1.5,1.1c0,0,0.2,1.7,0.2,1.9c0.2,1-0.4,1.7-0.4,2.7c0,0.6,0,1.7,0.4,2.1L24.2,14.3z M41.8,29 c0.2-0.4,0.2-1.1,0.4-1.5c0.2-1,0.2-2.1,0.2-3.1c0-2.1-0.2-4.2-0.8-6.1c-0.4-0.6-0.6-1.3-0.8-1.9c-0.4-1.1-1-2.1-1.9-2.9 c-0.8-1.1-1.9-4-3.8-3.1c-0.6,0.2-1,1-1.5,1.5c-0.4,0.6-0.8,1.3-1.3,1.9c-0.2,0.2-0.4,0.6-0.2,0.8c0,0.2,0.2,0.2,0.4,0.2 c0.4,0.2,0.6,0.2,1,0.4c0.2,0,0.4,0.2,0.2,0.4c0,0,0,0.2-0.2,0.2c-1,1.1-2.1,1.9-3.1,2.9c-0.2,0.2-0.4,0.6-0.4,0.8 c0,0.2,0.2,0.2,0.2,0.4c0,0.2-0.2,0.2-0.4,0.4c-0.4,0.2-0.8,0.4-1.1,0.6c-0.2,0.4,0,1.1-0.2,1.5c-0.2,1.1-0.8,1.9-1.3,2.9 c-0.4,0.6-0.6,1.3-1,1.9c0,0.8-0.2,1.5,0.2,2.1c1,1.5,2.9,0.6,4.4,1.3c0.4,0.2,0.8,0.2,1.1,0.6c0.6,0.6,0.6,1.7,0.8,2.3 c0.2,0.8,0.4,1.7,0.8,2.5c0.2,1,0.6,2.1,0.8,2.9c1.9-1.5,3.6-3.1,4.8-5.2C40.6,32.4,41.2,30.7,41.8,29z"
              ></path>
            </svg>{" "}
            Direct to Local Bank (USD)-Account ending in 4603
            <span className="py-1  px-2  border-gray-500 border rounded-full ms-4">
              Preferred
            </span>
          </p>
          <div className="flex">
            <button
              className="bg-transparent font-semibold text-green-500 hover:underline mr-5"
              onClick={() => setEditPaymentModalOpen(true)}
            >
              Edit
            </button>
            <button className="bg-transparent font-semibold text-red-500 hover:underline">
              Remove
            </button>
          </div>
        </div>
      </div> */}

      <div className="mt-2  mb-2  dark:bg-slate-800 relative">
        <div className="flex justify-between  py-4 px-1">
          <h4 className="text-slate-950 text-xl font-semibold">
            Recent Activity
          </h4>

          <button
            className=" bg-transparent text-primaryMain font-semibold"
            // onClick={() => router.push("/add-products")}
          >
            {" "}
            <span
              className="hidden xs:block"
              onClick={() => setAddPaymentMethodOpen(true)}
            >
              See all
            </span>
          </button>
        </div>
      </div>
      {activities.map((activity, index) => (
        <RecentActivityCard
          key={index}
          date={activity.date}
          time={activity.time}
          paymentAmount={activity.paymentAmount}
          description={activity.description}
          status={activity.status}
          price={activity.price}
          estimatedDate={activity.estimatedDate}
          transactionId={activity.transactionId}
        />
      ))}

      <MediumSizeModal
        isOpen={addPaymentMethodOpen}
        setIsOpen={setAddPaymentMethodOpen}
      >
        {/* Modal header */}
        <div className="mb-2 text-center ">
          {/* Icon */}
          <div className=" text-left font-semibold rounded-full text-2xl text-slate-950 from-slate-100 to-slate-200 dark:from-slate-700/30 dark:to-slate-700 mb-2">
            Add a Withdrawal Method
          </div>
          <p className="text-slate-900 font-semibold text-left">
            Tell us how you want to get your funds. For all account types. It
            may take up to 3 days to activate.
          </p>
          <div className="text-xl font-semibold text-left text-slate-800 dark:text-slate-100 mt-5">
            Recommended
          </div>
          <div className="mt-2 flex justify-between">
            {" "}
            <div className=" font-semibold flex items-center justify-between w-9/12">
              <p className="flex items-center">
                <svg
                  className="mr-2 h-8 w-8  text-lg"
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  version="1"
                  viewBox="0 0 48 48"
                  enableBackground="new 0 0 48 48"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#7CB342"
                    d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z"
                  ></path>
                  <path
                    fill="#0277BD"
                    d="M45,24c0,11.7-9.5,21-21,21S3,35.7,3,24S12.3,3,24,3S45,12.3,45,24z M23.8,33.7c0-0.4-0.2-0.6-0.6-0.8 c-1.3-0.4-2.5-0.4-3.6-1.5c-0.2-0.4-0.2-0.8-0.4-1.3c-0.4-0.4-1.5-0.6-2.1-0.8c-0.8,0-1.7,0-2.7,0c-0.4,0-1.1,0-1.5,0 c-0.6-0.2-1.1-1.1-1.5-1.7c0-0.2,0-0.6-0.4-0.6c-0.4-0.2-0.8,0.2-1.3,0c-0.2-0.2-0.2-0.4-0.2-0.6c0-0.6,0.4-1.3,0.8-1.7 c0.6-0.4,1.3,0.2,1.9,0.2c0.2,0,0.2,0,0.4,0.2c0.6,0.2,0.8,1,0.8,1.7c0,0.2,0,0.4,0,0.4c0,0.2,0.2,0.2,0.4,0.2 c0.2-1.1,0.2-2.1,0.4-3.2c0-1.3,1.3-2.5,2.3-2.9c0.4-0.2,0.6,0.2,1.1,0c1.3-0.4,4.4-1.7,3.8-3.4c-0.4-1.5-1.7-2.9-3.4-2.7 c-0.4,0.2-0.6,0.4-1,0.6c-0.6,0.4-1.9,1.7-2.5,1.7c-1.1-0.2-1.1-1.7-0.8-2.3c0.2-0.8,2.1-3.6,3.4-3.1c0.2,0.2,0.6,0.6,0.8,0.8 c0.4,0.2,1.1,0.2,1.7,0.2c0.2,0,0.4,0,0.6-0.2c0.2-0.2,0.2-0.2,0.2-0.4c0-0.6-0.6-1.3-1-1.7c-0.4-0.4-1.1-0.8-1.7-1.1 c-2.1-0.6-5.5,0.2-7.1,1.7s-2.9,4-3.8,6.1c-0.4,1.3-0.8,2.9-1,4.4c-0.2,1-0.4,1.9,0.2,2.9c0.6,1.3,1.9,2.5,3.2,3.4 c0.8,0.6,2.5,0.6,3.4,1.7c0.6,0.8,0.4,1.9,0.4,2.9c0,1.3,0.8,2.3,1.3,3.4c0.2,0.6,0.4,1.5,0.6,2.1c0,0.2,0.2,1.5,0.2,1.7 c1.3,0.6,2.3,1.3,3.8,1.7c0.2,0,1-1.3,1-1.5c0.6-0.6,1.1-1.5,1.7-1.9c0.4-0.2,0.8-0.4,1.3-0.8c0.4-0.4,0.6-1.3,0.8-1.9 C23.8,35.1,24,34.3,23.8,33.7z M24.2,14.3c0.2,0,0.4-0.2,0.8-0.4c0.6-0.4,1.3-1.1,1.9-1.5c0.6-0.4,1.3-1.1,1.7-1.5 c0.6-0.4,1.1-1.3,1.3-1.9c0.2-0.4,0.8-1.3,0.6-1.9c-0.2-0.4-1.3-0.6-1.7-0.8c-1.7-0.4-3.1-0.6-4.8-0.6c-0.6,0-1.5,0.2-1.7,0.8 c-0.2,1.1,0.6,0.8,1.5,1.1c0,0,0.2,1.7,0.2,1.9c0.2,1-0.4,1.7-0.4,2.7c0,0.6,0,1.7,0.4,2.1L24.2,14.3z M41.8,29 c0.2-0.4,0.2-1.1,0.4-1.5c0.2-1,0.2-2.1,0.2-3.1c0-2.1-0.2-4.2-0.8-6.1c-0.4-0.6-0.6-1.3-0.8-1.9c-0.4-1.1-1-2.1-1.9-2.9 c-0.8-1.1-1.9-4-3.8-3.1c-0.6,0.2-1,1-1.5,1.5c-0.4,0.6-0.8,1.3-1.3,1.9c-0.2,0.2-0.4,0.6-0.2,0.8c0,0.2,0.2,0.2,0.4,0.2 c0.4,0.2,0.6,0.2,1,0.4c0.2,0,0.4,0.2,0.2,0.4c0,0,0,0.2-0.2,0.2c-1,1.1-2.1,1.9-3.1,2.9c-0.2,0.2-0.4,0.6-0.4,0.8 c0,0.2,0.2,0.2,0.2,0.4c0,0.2-0.2,0.2-0.4,0.4c-0.4,0.2-0.8,0.4-1.1,0.6c-0.2,0.4,0,1.1-0.2,1.5c-0.2,1.1-0.8,1.9-1.3,2.9 c-0.4,0.6-0.6,1.3-1,1.9c0,0.8-0.2,1.5,0.2,2.1c1,1.5,2.9,0.6,4.4,1.3c0.4,0.2,0.8,0.2,1.1,0.6c0.6,0.6,0.6,1.7,0.8,2.3 c0.2,0.8,0.4,1.7,0.8,2.5c0.2,1,0.6,2.1,0.8,2.9c1.9-1.5,3.6-3.1,4.8-5.2C40.6,32.4,41.2,30.7,41.8,29z"
                  ></path>
                </svg>{" "}
                Direct to Local Bank (USD)-Account ending in 4603
              </p>
              <span className="py-1  px-2  border-gray-500 border rounded-full ms-4 bg-primaryMain text-white cursor-pointer">
                Preferred
              </span>
            </div>
            <div className="flex">
              <button
                className="bg-primaryMain font-semibold text-white hover:bg-blueTwo py-2 px-4 rounded-md"
                onClick={() => {
                  setAddPaymentMethodOpen(false),
                    setSetupPaymentModalOpen(true);
                }}
              >
                Set up
              </button>
            </div>
          </div>

          <div className="text-xl font-semibold text-left text-slate-800 dark:text-slate-100 mt-5">
            Also Available
          </div>
          <div className="mt-2 flex justify-between">
            <div className=" font-semibold flex items-center justify-between  w-9/12">
              <p className="flex items-center">
                {" "}
                <Image
                  src="/images/paypal.png"
                  alt=""
                  width={50}
                  height={20}
                  className="mr-2"
                />
                PayPal{" "}
              </p>
              <span className="py-1  px-2  border-gray-500 border rounded-full ms-4  cursor-pointer">
                Preferred
              </span>
            </div>
            <div className="flex">
              <button
                className="btn bg-transparent text-primaryMain font-semibold hover:text-white hover:bg-blueTwo  border border-primaryMain py-2 px-4"
                onClick={() => {
                  setAddPaymentMethodOpen(false), setPaypalSetupModalOpen(true);
                }}
              >
                {" "}
                <span className="hidden xs:block">Set up</span>
              </button>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            {" "}
            <div className=" font-semibold flex items-center justify-between w-9/12">
              <p className="flex items-center">
                <Image
                  src="/images/strip.png"
                  alt=""
                  width={50}
                  height={20}
                  className="mr-2"
                />
                Strip Transfer
              </p>{" "}
              <span className="py-1  px-2  border-gray-500 border rounded-full ms-4 cursor-pointer">
                Preferred
              </span>
            </div>
            <div className="flex">
              <button
                className="btn bg-transparent text-primaryMain font-semibold hover:text-white hover:bg-blueTwo  border border-primaryMain py-2 px-4"
                onClick={() => {
                  setAddPaymentMethodOpen(false), setStripSetupModalOpen(true);
                }}
              >
                {" "}
                <span className="hidden xs:block">Set up</span>
              </button>
            </div>
          </div>
        </div>
      </MediumSizeModal>

      <MediumSizeModal
        isOpen={withdrawlScheduleOpen}
        setIsOpen={setWithdrawlScheduleOpen}
      >
        <WithdrawSchedule setWithdrawlScheduleOpen={setWithdrawlScheduleOpen} />
      </MediumSizeModal>

      <MediumSizeModal
        className="get-paid-now-modal"
        isOpen={getPaidNowModalOpen}
        setIsOpen={setGetPaidNowModalOpen}
      >
        <GetPaidNow setGetPaidNowModalOpen={setGetPaidNowModalOpen} />
      </MediumSizeModal>

      <MediumSizeModal
        isOpen={editPaymentModalOpen}
        setIsOpen={setEditPaymentModalOpen}
      >
        <EditPaymentMethod setEditPaymentModalOpen={setEditPaymentModalOpen} />
      </MediumSizeModal>
      <MediumSizeModal
        isOpen={setupPaymentModalOpen}
        setIsOpen={setSetupPaymentModalOpen}
      >
        <SetupPaymentMethod
          setSetupPaymentModalOpen={setSetupPaymentModalOpen}
        />
      </MediumSizeModal>
      <ModalAction
        isOpen={stripSetupModalOpen}
        setIsOpen={setStripSetupModalOpen}
      >
        <StripSetup setStripSetupModalOpen={setStripSetupModalOpen} />
      </ModalAction>
      <ModalAction
        isOpen={paypalSetupModalOpen}
        setIsOpen={setPaypalSetupModalOpen}
      >
        <PayPalSetup setPaypalSetupModalOpen={setPaypalSetupModalOpen} />
      </ModalAction>
    </div>
  );
}
