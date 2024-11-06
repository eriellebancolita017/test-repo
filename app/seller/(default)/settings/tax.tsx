import SelectComponent from "@/components/common/select/page";
import React from "react";

export default function Tax() {
  const statusArray = [
    { label: "none", value: "None" },
    { label: "shipping_only", value: "Shipping Only" },
    { label: "taxable", value: "Taxable" },
  ];

  const classArray = [
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
            <SelectComponent label="Tax Status" options={statusArray} />
          </div>
        </div>
        <div className="w-6/12">
          <div className="">
            {" "}
            <SelectComponent label="Tax Class" options={classArray} />
          </div>
        </div>
      </div>
    </>
  );
}
