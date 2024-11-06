/* eslint-disable prettier/prettier */
import InputComponent from "@/components/common/inputField/page";
import SelectComponent from "@/components/common/select/page";
import React, { useState } from "react";

export default function AddAttributeForm() {
  const [open, setOpen] = useState<boolean>(false);
  const attributeArray: { label: string; value: string }[] = [];
  return (
    <div>
      {" "}
      <div className="px-4 py-3 rounded-sm dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-3">
        {!open ? (
          <>
            {" "}
            <div
              className="flex items-center justify-between w-full group mb-1"
              aria-expanded={open}
            >
              <div className="w-5/12 text-left">
                <div className="text-md text-slate-800 dark:text-slate-100 font-semibold">
                  Active?
                </div>
              </div>{" "}
              <div className="w-7/12">
                <div className="flex justify-between">
                  <div className="ms-4 text-md text-slate-800 dark:text-slate-100 font-semibold">
                    <input
                      type="checkbox"
                      className="border border-slate-300 mr-3"
                      onClick={() => setOpen(!open)}
                    />
                    Name
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
                </div>
              </div>
            </div>
            <div className="flex mt-4">
              <div className="flex w-full">
                <input className="h-9 px-2 rounded-sm border border-slate-200 w-80 mr-3 " />
                <span className="text-md text-slate-800 dark:text-slate-100 font-semibold">
                  Value(s):
                </span>
              </div>
            </div>
            <div className="flex mt-4">
              <span className="text-md text-slate-800 dark:text-slate-100 font-semibold">
                Visible on the product page
              </span>
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="flex  justify-between w-full group mb-1 gap-5">
              <div className="w-5/12">
                {" "}
                <div className="text-md italic text-left text-slate-800 dark:text-slate-100 font-semibold">
                  Active?
                </div>
              </div>
              <div className="w-7/12">
                <div className="flex justify-between">
                  <div className="">
                    <input
                      type="checkbox"
                      className="border border-slate-300 mr-3"
                    />{" "}
                  </div>{" "}
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
                </div>
              </div>
            </div>
            <div className="flex  justify-between w-full group mb-1 gap-5">
              <div className="w-5/12">
                {" "}
                <div className="text-md italic text-left text-slate-800 dark:text-slate-100 font-semibold">
                  Name
                </div>
              </div>
              <div className="w-7/12">
                <div className="">
                  <InputComponent label="" />
                </div>
              </div>
            </div>
            <div className="flex  justify-between w-full group mb-1 gap-5">
              <div className="w-5/12">
                {" "}
                <div className="text-md italic text-left text-slate-800 dark:text-slate-100 font-semibold">
                  Values(s):
                </div>
              </div>
              <div className="w-7/12">
                <div className="mt-2">
                  <textarea
                    placeholder='Enter some text, some attributes by "|" separating values.'
                    className="min-h-16 rounded-sm border border-slate-200 w-full"
                    rows={3}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="flex  justify-between w-full group mb-1 gap-5">
              <div className="w-5/12">
                {" "}
                <div className="text-md italic text-left text-slate-800 dark:text-slate-100 font-semibold">
                  Visible on the product page
                </div>
              </div>
              <div className="w-7/12">
                <div className="">
                  <input
                    type="checkbox"
                    className="border border-slate-300 mr-3"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="w-6/12 mt-4">
        <div className="flex items-center">
          <div className="w-full">
            <SelectComponent label="" options={attributeArray} />
          </div>{" "}
          <span className="ms-3 bg-primaryMain hover:bg-blueTwo py-0 h-[35px] px-3 text-white rounded-md">
            Add{" "}
          </span>
        </div>
      </div>
    </div>
  );
}
