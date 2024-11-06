import MultiselectDropdown from "@/components/common/multiselect/page";
import React from "react";
interface AccordianFormProps {
  title: string;
  options: { label: string; value: string }[]; // Define the type of options
}

const AccordianForm: React.FC<AccordianFormProps> = ({ title }) => {
  const colorArray = [
    { label: "red", value: "Red" },
    { label: "green", value: "Green" },
    { label: "red", value: "Red" },
    { label: "orange", value: "Orange" },
    { label: "black", value: "Black" },
    { label: "blue", value: "Blue" },
    { label: "red", value: "Red" },
    { label: "green", value: "Green" },
    { label: "red", value: "Red" },
    { label: "green", value: "Green" },
  ];
  return (
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
            <MultiselectDropdown label="" options={colorArray} />
          </div>
          <div className="flex my-3 justify-end">
            <button className="bg-primaryMain text-white hover:bg-blueTwo py-2 px-3 rounded-md mr-3">
              Select All
            </button>
            <button className="bg-primaryMain text-white hover:bg-blueTwo py-2 px-3 rounded-md mr-3">
              Select All
            </button>
            <button className="bg-primaryMain text-white hover:bg-blueTwo py-2 px-3 rounded-md">
              Select All
            </button>
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
            <input type="checkbox" className="border border-slate-300 mr-3" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AccordianForm;
