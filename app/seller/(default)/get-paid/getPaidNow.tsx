import InputComponent from "@/components/common/inputField/page";
import React, { useState } from "react";
interface GetPaidProps {
  // Define the properties and their types
  setGetPaidNowModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // Add more props as needed
}
const GetPaidNow: React.FC<GetPaidProps> = ({ setGetPaidNowModalOpen }) => {
  // State to hold the selected amount
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);

  // Function to handle radio button change
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedAmount(value === "other" ? null : value);
  };

  return (
    <div className="bg-gray-100 m-[-22px] p-5">
      <div className="mb-2 text-center ">
        <div className=" text-left font-semibold rounded-full text-2xl text-slate-950 from-slate-100 to-slate-200 dark:from-slate-700/30 dark:to-slate-700 mb-2">
          Get Paid Now
        </div>
        <div className="bg-white shadow-lg p-3 mt-3 rounded-md">
          <p className="text-slate-900 text-lg font-semibold text-left ">
            Available balance
          </p>{" "}
          <p className="text-primaryMain text-4xl font-bold text-left">$2.80</p>
        </div>
        <div className="mt-5 bg-white p-3 mt-4 shadow-lg rounded-md ">
          <p className="text-primaryMain text-lg font-semibold text-left ">
            Withdrawal method
          </p>
          <p className=" text-left font-bold text-base text-slate-900 dark:text-slate-100  ">
            ICICI BANK LTD account ending in 4603 (USD)
          </p>
        </div>
        <div className="mt-5 bg-white p-3 mt-4 shadow-lg rounded-md ">
          {" "}
          <p className="text-primaryMain text-lg font-semibold text-left mb-3">
            Amount
          </p>
          <ul className=" text-left">
            <li className="text-md font-bold mb-3 text-slate-900 text-left flex items-center">
              <input
                type="radio"
                name="amount"
                className="w-4 h-4 mr-2 text-primaryMain bg-primaryMain text-primaryMain"
                value="2.80"
                checked={selectedAmount === "2.80"}
                onChange={handleAmountChange}
              />
              <span>$2.80</span>
            </li>
            <li className="text-md font-bold mb-3 text-slate-900 text-left flex items-center">
              <input
                type="radio"
                name="amount"
                className="h-4 w-4  mr-2 focus:border-none text-primaryMain"
                value="other"
                checked={selectedAmount === null}
                onChange={handleAmountChange}
              />
              Other amount
            </li>
          </ul>
        </div>
        {selectedAmount === "2.80" ? (
          <div className="h-11"></div>
        ) : (
          <div className="mt-2">
            <div className="w-64 h-11 flex items-center">
              <InputComponent
                label=""
                placeholder="$0.00"
                className="text-end shadow-lg"
              />{" "}
              <span className="ms-3">USD</span>
            </div>
          </div>
        )}
        <div className="bg-white shadow-lg p-3 mt-3 rounded-md">
          <p className="text-slate-900 text-lg font-semibold text-left ">
            Total amount
          </p>{" "}
          <p className="text-primaryMain text-4xl font-bold text-left">
            $50.00
          </p>
        </div>
      </div>
      <div className="flex justify-end mt-10">
        <button
          className="btn bg-transparent text-primaryMain font-semibold hover:text-white hover:bg-blueTwo  border border-primaryMain mr-4"
          onClick={() => setGetPaidNowModalOpen(false)}
          // onClick={() => router.push("/add-products")}
        >
          {" "}
          <span className="hidden xs:block">Cancel</span>
        </button>
        <button
          className="btn bg-primaryMain text-white font-semibold hover:text-white hover:bg-blueTwo  border border-primaryMain"
          // onClick={() => router.push("/add-products")}
        >
          {" "}
          <span
            className="hidden xs:block"
            onClick={() => setGetPaidNowModalOpen(false)}
          >
            Get Paid
          </span>
        </button>
      </div>
    </div>
  );
};

export default GetPaidNow;
