import SelectComponent from "@/components/common/select/page";
import React from "react";

export default function Linked() {
  const upSellsArray = [
    { label: "none", value: "None" },
    { label: "shipping_only", value: "Shipping Only" },
    { label: "taxable", value: "Taxable" },
  ];

  const crossSellsArray = [
    { label: "standard", value: "Standard" },
    { label: "normal_rate", value: "Normal Rate" },
    { label: "reduced_rate", value: "Reduced Rate" },
    { label: "zero_rate", value: "Zero Rate" },
  ];
  return (
    <>
      <div className="flex mt-4 mb-4 gap-5">
        <div className="w-6/12">
          <div className="">
            {" "}
            <SelectComponent label="Up-sells" options={upSellsArray} />
          </div>
        </div>
        <div className="w-6/12">
          <div className="">
            {" "}
            <SelectComponent label="Cross-sells" options={crossSellsArray} />
          </div>
        </div>
      </div>
    </>
  );
}
