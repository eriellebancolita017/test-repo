"use client";
import React from "react";

export default function EbayImport() {
  return (
    <>
      {" "}
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          {/* Left: Title */}
          <div className="mb-4 sm:mb-0">
            <h1 className=" flex items-center text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
              eBay Store Settings
              <svg
                className="shrink-0 h-6 w-6 ms-2"
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
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
                <path d="M16 16h5v5"></path>
              </svg>
            </h1>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
          <div className="banner_ebay_import" role="alert">
            <div
              className={`px-4 py-2 rounded-sm text-sm border dark:bg-slate-600  dark:border-slate-700 bg-sky-100 text-slate-900`}
            >
              <div className="flex w-full justify-between items-start">
                <div className="flex">
                  <div>
                    <b> Are your listings from a US site?</b> At this time,
                    Fizno can only import items that are hosted on the US
                    version of eBay.
                  </div>
                </div>
                <button
                  className="opacity-70 hover:opacity-80 ml-3 mt-[3px]"
                  // onClick={() => setOpen(false)}
                >
                  <div className="sr-only">Close</div>
                  <svg className="w-4 h-4 fill-current">
                    <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <h4 className="mt-4 text-slate-800 text-lg font-semibold  ">
            ebay Account
          </h4>
          <div className="my-3">
            <table className="w-full border border-slate-300  dark:border-slate-700 text-xs">
              <tr>
                <td className="py-3 px-4 ">osbornem78</td>
                <td>expires Friday 29 Nov, 2024 01:39</td>
                <td>
                  <div className="flex  items-center font-bold">
                    <svg
                      className="mr-2"
                      stroke="currentColor"
                      fill="green"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                    </svg>{" "}
                    Account selected
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <button className="mt-2 rounded-md bg-transparent p-2 font-medium text-primaryMain border border-slate-300  dark:border-slate-700">
            Connect another eBay account
          </button>

          <h5 className="mt-4 text-slate-800 text-lg font-semibold  ">
            eBay Import Settings
          </h5>
          <div className="flex justify-between">
            <div className="flex">
              <div className="mt-3 mr-6 w-52">
                <p className="text-slate-900 font-semibold text-xs dark:text-zinc-500">
                  Remove items
                </p>
              </div>
              <div className="">
                <ul>
                  <li className="text-xs mb-2 text-slate-900 dark:text-zinc-500">
                    <input
                      type="radio"
                      name="remove_items"
                      className="mr-2 text-slate-900 dark:bg-[rgb(18,18,18)] dark:border-slate-700"
                    />
                    Remove all items that were removed, expired, or ended for
                    any reason on eBay
                  </li>
                  <li className="text-xs mb-2 text-slate-900 dark:text-zinc-500">
                    <input
                      type="radio"
                      name="remove_items"
                      className="mr-2 focus:border-none dark:bg-[rgb(18,18,18)] dark:border-slate-700"
                    />
                    Only remove items that were sold or ended on eBay (do not
                    remove when expired)
                  </li>
                  <li className="text-xs text-slate-900 dark:text-zinc-500">
                    <input
                      type="radio"
                      name="remove_items"
                      className="mr-2 dark:bg-[rgb(18,18,18)] dark:border-slate-700"
                    />
                    Never remove items
                  </li>
                </ul>
              </div>
            </div>
            <div className="">
              <span className="border-b text-primaryMain text-xs">
                more info
              </span>
            </div>
          </div>
          <div className="flex justify-between mt-10">
            <div className="flex">
              <div className="mt-3 mr-6 w-52">
                <p className="text-slate-900 font-semibold text-xs dark:text-zinc-500">
                  All, New, Used and revised items
                </p>
              </div>
              <div className="">
                <ul>
                  <li className="text-xs mb-2 flex text-slate-900 dark:text-zinc-500">
                    <input
                      type="radio"
                      name="revised_items"
                      className="mr-2 dark:bg-[rgb(18,18,18)] dark:border-slate-700"
                    />
                    Import new items only
                    <div className="flex ms-4 items-center italic">
                      <svg
                        className="mr-1 text-green-800"
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        height="14px"
                        width="14px"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"></path>
                      </svg>
                      Imports faster
                    </div>
                  </li>
                  <li className="text-xs mb-2 text-slate-900 dark:text-zinc-500">
                    <input
                      type="radio"
                      name="revised_items"
                      className="mr-2 focus:border-none dark:bg-[rgb(18,18,18)] dark:border-slate-700"
                    />
                    Import new and revised items (overwrite all existing items)
                    <div className="flex ms-4 items-center italic">
                      <svg
                        className="mr-1 text-red-400"
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 256 256"
                        height="16px"
                        width="16px"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M142,176a6,6,0,0,1-6,6,14,14,0,0,1-14-14V128a2,2,0,0,0-2-2,6,6,0,0,1,0-12,14,14,0,0,1,14,14v40a2,2,0,0,0,2,2A6,6,0,0,1,142,176ZM124,94a10,10,0,1,0-10-10A10,10,0,0,0,124,94Zm106,34A102,102,0,1,1,128,26,102.12,102.12,0,0,1,230,128Zm-12,0a90,90,0,1,0-90,90A90.1,90.1,0,0,0,218,128Z"></path>
                      </svg>{" "}
                      This is a one-time selection. It will only apply to your
                      next import
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="">
              <span className="border-b text-primaryMain text-xs">
                more info
              </span>
            </div>
          </div>

          <div className="flex justify-between mt-10">
            <div className="flex">
              <div className="mt-3 mr-6 w-52">
                <p className="text-slate-900 font-semibold text-xs dark:text-zinc-500">
                  Item price and item details
                </p>
              </div>
              <div className="">
                <ul>
                  <li className="text-xs mb-2 text-slate-900 dark:text-zinc-500">
                    <input
                      type="checkbox"
                      className="mr-2 dark:bg-[rgb(18,18,18)] dark:border-slate-700"
                    />
                    Discount prices by{" "}
                    <input
                      type="text"
                      className="h-5 mr-1 border border-slate-300 dark:bg-[rgb(18,18,18)] dark:border-slate-700 dark:text-zinc-400"
                    />
                    % saved on Fizno
                  </li>
                  <li className="text-xs mb-2 text-slate-900 dark:text-zinc-500">
                    <input
                      type="checkbox"
                      className="mr-2 focus:border-none dark:bg-[rgb(18,18,18)] dark:border-slate-700"
                    />
                    Only remove items that were sold or ended on eBay (do not
                    remove when expired)
                  </li>
                </ul>
              </div>
            </div>
            <div className="">
              <span className="border-b text-primaryMain text-xs">
                more info
              </span>
            </div>
          </div>
          <div className="mt-8 ">
            <button
              className="btn bg-primaryMain hover:bg-blueTwo text-white mr-3"
              // onClick={() => router.push("/add-products")}
            >
              <span className="hidden xs:block">Start your eBay import</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
