"use client";

import React, { useState } from "react";

export default function ProductAccordian({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="px-4 py-3 rounded-sm dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-3">
      {!open ? (
        <>
          {" "}
          <button
            className="flex items-center justify-between w-full group mb-1"
            aria-expanded={open}
          >
            <div className="text-md text-slate-800 dark:text-slate-100 font-semibold">
              <input
                type="checkbox"
                className="border border-slate-300 mr-3"
                onClick={() => setOpen(!open)}
              />
              {title}
            </div>

            <svg
              onClick={() => setOpen(!open)}
              className={`w-7 h-7 shrink-0 fill-current text-primaryMain dark:text-slate-500 hover:text-blueTwo dark:group-hover:text-slate-400 ml-3 ${
                open && "rotate-180"
              }`}
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
                strokeWidth="32"
                d="M176 262.62 256 342l80-79.38m-80 68.35V170"
              ></path>
              <path
                fill="none"
                strokeMiterlimit="10"
                strokeWidth="32"
                d="M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64z"
              ></path>
            </svg>
          </button>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between w-full group mb-1 gap-5">
            <div className="w-5/12">
              <div className="text-md italic text-left text-slate-800 dark:text-slate-100 font-semibold">
                Active?
              </div>
            </div>
            <div className="w-7/12">
              <div className="flex items-center justify-between">
                {" "}
                <input
                  type="checkbox"
                  className="border border-slate-300 mr-3"
                />
                <svg
                  onClick={() => setOpen(!open)}
                  className={`w-7 h-7 cursor-pointer shrink-0 fill-current text-primaryMain dark:text-slate-500 hover:text-blueTwo dark:group-hover:text-slate-400 ml-3 ${
                    open && "rotate-180"
                  }`}
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
                    strokeWidth="32"
                    d="M176 262.62 256 342l80-79.38m-80 68.35V170"
                  ></path>
                  <path
                    fill="none"
                    strokeMiterlimit="10"
                    strokeWidth="32"
                    d="M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div className={`text-sm ${!open && "hidden"}`}>{children}</div>
        </>
      )}
    </div>
  );
}
