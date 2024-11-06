/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import InputComponent from "@/components/common/inputField/page";
import MultiselectDropdown from "@/components/common/multiselect/page";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setHardReload } from "@/redux/slices/product.slice";
import { categoriesService } from "@fizno/api-client/src/apis/catergory";
import React, { useState } from "react";

interface ProductAccordianProps {
  title: string;
  options: { label: string; value: string }[]; // Define the type of options
  name: string;
  onSelect: (e: any) => void;
  attributes: any;
  id?: string;
}
const ProductAccordian: React.FC<ProductAccordianProps> = ({
  title,
  options,
  name,
  onSelect,
  attributes,
  id,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isVisible, setVisible] = useState(false);
  const [taxonomy, setTaxonomy] = useState("");
  const dispatch = useAppDispatch();
  const [showAddNew, setShowAddNew] = useState(false);
  const { hardReload } = useAppSelector((state) => state.products);
  const handleSelect = (data: any) => {
    if (data.length > 0) {
      const att = {
        name: `pa_${name}`,
        value: data,
        postion: 0,
        isVisible: isVisible ? 1 : 0,
        is_taxonomy: 1,
        active: true,
      };
      onSelect(att);
    } else {
      const att = {
        name: `pa_${name}`,
        value: data,
        postion: 0,
        isVisible: isVisible ? 1 : 0,
        is_taxonomy: 1,
        active: false,
      };
      onSelect(att);
    }
  };

  const selectAll = () => {
    const att = {
      name: `pa_${name}`,
      value: options,
      postion: 0,
      isVisible: isVisible ? 1 : 0,
      is_taxonomy: 1,
      active: true,
    };
    onSelect(att);
  };
  const selectNone = () => {
    const att = {
      name: `pa_${name}`,
      value: [],
      postion: 0,
      isVisible: isVisible ? 1 : 0,
      is_taxonomy: 1,
      active: false,
    };
    onSelect(att);
  };

  const addTaxonomy = async () => {
    const response = await categoriesService.addTaxonomyInAttribute(
      { taxonomy: taxonomy },
      id as string,
    );
    if (response.remote === "success") {
      dispatch(setHardReload(!hardReload));
      setTaxonomy("");
      setShowAddNew(false);
      // setSelectedData([...selectedData, { label: response.data.data.name, value: response.data.data.term_id }])
    }
  };

  return (
    <div className="px-4 py-3 rounded-sm dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-3">
      {!open ? (
        <>
          {" "}
          <div
            className="flex items-center justify-between w-full group mb-1"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <div className="text-md text-slate-800 dark:text-slate-100 font-semibold">
              <input
                type="checkbox"
                className="border border-slate-300 mr-3"
                checked={
                  attributes[`pa_${name}`]?.value &&
                  attributes[`pa_${name}`]?.value.length > 0
                }
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
          </div>
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
          {/* <div className={`text-sm ${!open && "hidden"}`}>{children}</div> */}

          <div>
            {" "}
            <div className="flex  justify-between w-full group mb-1 gap-5">
              <div className="w-5/12">
                {" "}
                <div className="text-md italic text-left text-slate-800 dark:text-slate-100 font-semibold">
                  {title}
                </div>
              </div>
              <div className="w-7/12">
                <div className="categories_dropdown">
                  <MultiselectDropdown
                    handleSelect={handleSelect}
                    handleRemove={handleSelect}
                    selectedValues={attributes[`pa_${name}`]?.value || []}
                    label=""
                    options={options}
                  />
                </div>
                {showAddNew ? (
                  <div className="mt-4 mb-5">
                    <InputComponent
                      value={taxonomy}
                      onChange={(e) => setTaxonomy(e.target.value)}
                      label=""
                    />
                    <div className="text-right">
                      {/* <button className="px-8 py-2 bg-primaryMain mt-4 text-white rounded-md">Remove</button> */}
                      <span
                        onClick={addTaxonomy}
                        className="px-8 py-2 bg-primaryMain mt-4 text-white rounded-md ml-3"
                      >
                        Submit
                      </span>
                    </div>
                  </div>
                ) : null}
                <div className="flex my-3 justify-end">
                  <span
                    onClick={selectAll}
                    className="bg-primaryMain text-white hover:bg-blueTwo py-2 px-3 rounded-md mr-3"
                  >
                    Select All
                  </span>
                  <span
                    onClick={selectNone}
                    className="bg-primaryMain text-white hover:bg-blueTwo py-2 px-3 rounded-md mr-3"
                  >
                    Select None
                  </span>
                  <span
                    onClick={() => setShowAddNew(true)}
                    className="bg-primaryMain text-white hover:bg-blueTwo py-2 px-3 rounded-md"
                  >
                    Add new
                  </span>
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
                    onChange={(e) => setVisible(e.target.checked)}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default ProductAccordian;
