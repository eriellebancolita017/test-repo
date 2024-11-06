/* eslint-disable @typescript-eslint/no-explicit-any */
import InputComponent from "@/components/common/inputField/page";
import React, { useState } from "react";

export default function Inventory() {
  const [tackOrder, setTrackOrder] = useState(false);
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackOrder(e.target.checked);
  };
  return (
    <>
      <div className="flex gap-5 mt-4">
        <div className="w-6/12">
          <div className="">
            <InputComponent
              className="w-[80%]"
              label="SKU (Stock Keeping Unit)"
            />
          </div>
        </div>
        <div className="w-6/12">
          <div className="">
            <InputComponent
              className="w-[80%]"
              label="Barcode (ISBN, UPC, GTIN, etc)"
            />
          </div>
        </div>
      </div>
      <div className="mt-4 text-sm mb-2 text-slate-900 dark:text-zinc-500 flex items-center">
        <input
          onChange={handleCheckboxChange}
          type="checkbox"
          className="mr-2 h-4 w-4 focus:border-none dark:bg-[rgb(18,18,18)] dark:border-slate-700"
        />
        Track quantity
      </div>
      {tackOrder ? (
        <>
          <div className="mt-2 text-sm mb-2 text-slate-900 dark:text-zinc-500 flex items-center">
            <input
              type="checkbox"
              className="mr-2 h-4 w-4 focus:border-none dark:bg-[rgb(18,18,18)] dark:border-slate-700"
            />
            Continue selling when out of stock
          </div>
          <hr className="my-2"></hr>
          <h5 className="font-bold mt-4">Quantity</h5>
          <div className="w-[50%] mt-4">
            <InputComponent
              className="w-[80%]"
              label="Available"
              type="number"
            />
          </div>{" "}
        </>
      ) : (
        <p className="text-sm">Not Tracked</p>
      )}
    </>
  );
}
