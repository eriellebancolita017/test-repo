import InputComponent from "@/components/common/inputField/page";
import SearchSingleSelect from "@/components/common/select/searchableSingleSelect";
import React from "react";

export default function Restriction() {
  const productCategories = [
    { value: "product_one", label: "Air Filter Housings" },
    { value: "product_two", label: "Bars & Controls" },
  ];

  return (
    <>
      <div className="grid grid-cols-2 gap-5">
        <div className="mt-4 ">
          <InputComponent className="w-[50%]" label="Minimum spend" />
        </div>
        <div className="mt-4  ">
          <InputComponent className="w-[50%]" label="Maximum spend" />
        </div>
        {/* <div className="mt-4">
          <SearchSingleSelect
            label="Products"
            isSearchable={true}
            Options={productArray}
          />
        </div> */}
        {/* <div className="mt-4">
          <SearchSingleSelect
            label="Exclude Products"
            isSearchable={true}
            Options={excludeProductArray}
          />
        </div> */}
        <div className="">
          <SearchSingleSelect
            label="Products Categories"
            isSearchable={true}
            options={productCategories}
          />
        </div>
        {/* <div className="mt-4">
          <SearchSingleSelect
            label="Exclude Categories"
            isSearchable={true}
            Options={excludeProductCategories}
          />
        </div>{" "} */}
        {/* <div className="mt-4  ">
          <InputComponent className="w-[50%]" label="Email restrictions" />
        </div> */}
        {/* <div className="">
          <div className="mt-4 flex items-center">
            <label
              className={`block w-44 text-zinc-600 text-sm font-bold  mr-5 items-center `}
              htmlFor="disable_shipping"
            >
              Individual use only
            </label>
            <input
              type="checkbox"
              className=" rounded-sm border text-primaryMain border-slate-200 h-6 w-6 rounded-sm"
            />
          </div>
          <div className="mt-4 flex items-center">
            <label
              className={`block w-44 text-zinc-600 text-sm font-bold  mr-5 items-center `}
              htmlFor="disable_shipping"
            >
              Exclude sale items
            </label>
            <input
              type="checkbox"
              className=" rounded-sm border text-primaryMain border-slate-200 h-6 w-6 rounded-sm"
            />
          </div>
        </div> */}
      </div>
    </>
  );
}
