import Image from "next/image";
import React from "react";
export default function Followers() {
  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Followers (1289)
        </h2>{" "}
        {/* <a
          className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
          href="#0"
        >
          View All
        </a> */}
      </header>
      <div className="px-5 pt-2">
        <input
          type="text"
          className="h-9 px-2 w-full rounded-sm border border-slate-200 dark:bg-[rgb(18,18,18)] dark:border-slate-700"
          placeholder="Search here.."
        />
      </div>
      <div className="p-3">
        {/* Card content */}
        {/* "Today" group */}
        <div>
          <header className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">
            Today
          </header>
          <ul className="my-1">
            {/* Item */}
            <li className="flex px-2">
              <div className="w-9 h-9 rounded-full shrink-0 bg-indigo-500 my-2 mr-3">
                <Image
                  src="/images/avatar-03.jpg"
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <div className="grow flex items-center border-b border-slate-100 dark:border-slate-700 text-sm py-2">
                <div className="grow flex justify-between">
                  <div className="self-center">
                    <a
                      className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white"
                      href="#0"
                    >
                      Ritika Singh
                    </a>{" "}
                    Follows{" "}
                    <a
                      className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white"
                      href="#0"
                    >
                      You.
                    </a>{" "}
                  </div>
                  <div className="shrink-0 self-end ml-2">
                    <a
                      className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                      href="#0"
                    >
                      View<span className="hidden sm:inline"> -&gt;</span>
                    </a>
                  </div>
                </div>
              </div>
            </li>
            {/* Item */}
            <li className="flex px-2">
              <div className="w-9 h-9 rounded-full shrink-0 bg-indigo-500 my-2 mr-3">
                <Image
                  src="/images/avatar-01.jpg"
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <div className="grow flex items-center border-b border-slate-100 dark:border-slate-700 text-sm py-2">
                <div className="grow flex justify-between">
                  <div className="self-center">
                    <a
                      className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white"
                      href="#0"
                    >
                      Akshay Singh
                    </a>{" "}
                    Follows{" "}
                    <a
                      className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white"
                      href="#0"
                    >
                      You.
                    </a>{" "}
                  </div>
                  <div className="shrink-0 self-end ml-2">
                    <a
                      className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                      href="#0"
                    >
                      View<span className="hidden sm:inline"> -&gt;</span>
                    </a>
                  </div>
                </div>
              </div>
            </li>
            {/* Item */}
            <li className="flex px-2">
              <div className="w-9 h-9 rounded-full shrink-0 bg-indigo-500 my-2 mr-3">
                <Image
                  src="/images/user-40-01.jpg"
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <div className="grow flex items-center border-b border-slate-100 dark:border-slate-700 text-sm py-2">
                <div className="grow flex justify-between">
                  <div className="self-center">
                    <a
                      className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white"
                      href="#0"
                    >
                      Monika Agrawal
                    </a>{" "}
                    Follows{" "}
                    <a
                      className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white"
                      href="#0"
                    >
                      You.
                    </a>{" "}
                  </div>
                  <div className="shrink-0 self-end ml-2">
                    <a
                      className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                      href="#0"
                    >
                      View<span className="hidden sm:inline"> -&gt;</span>
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        {/* "Yesterday" group */}
        <div>
          <header className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">
            Yesterday
          </header>
          <ul className="my-1">
            {/* Item */}
            <li className="flex px-2">
              <div className="w-9 h-9 rounded-full shrink-0 bg-indigo-500 my-2 mr-3">
                <Image
                  src="/images/user-64-14.jpg"
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <div className="grow flex items-center border-b border-slate-100 dark:border-slate-700 text-sm py-2">
                <div className="grow flex justify-between">
                  <div className="self-center">
                    <a
                      className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white"
                      href="#0"
                    >
                      Sara Smith
                    </a>{" "}
                    Follows{" "}
                    <a
                      className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white"
                      href="#0"
                    >
                      You.
                    </a>{" "}
                  </div>
                  <div className="shrink-0 self-end ml-2">
                    <a
                      className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                      href="#0"
                    >
                      View<span className="hidden sm:inline"> -&gt;</span>
                    </a>
                  </div>
                </div>
              </div>
            </li>
            {/* Item */}
            <li className="flex px-2">
              <div className="w-9 h-9 rounded-full shrink-0 bg-indigo-500 my-2 mr-3">
                <Image
                  src="/images/user-64-11.jpg"
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <div className="grow flex items-center border-b border-slate-100 dark:border-slate-700 text-sm py-2">
                <div className="grow flex justify-between">
                  <div className="self-center">
                    <a
                      className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white"
                      href="#0"
                    >
                      Patrick Sullivian
                    </a>{" "}
                    Follows{" "}
                    <a
                      className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white"
                      href="#0"
                    >
                      You.
                    </a>{" "}
                  </div>
                  <div className="shrink-0 self-end ml-2">
                    <a
                      className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                      href="#0"
                    >
                      View<span className="hidden sm:inline"> -&gt;</span>
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center pt-2 pb-4">
        <button className="btn bg-primaryMain hover:bg-blueTwo text-white">
          <span className="">Load More</span>
        </button>
      </div>
    </div>
  );
}
