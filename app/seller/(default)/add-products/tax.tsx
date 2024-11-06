/* eslint-disable @typescript-eslint/no-explicit-any */
import SearchSingleSelect from "@/components/common/select/searchableSingleSelect";
import React from "react";

export default function Tax({
  onStatusChange,
  onClassChange,
  taxStatus,
  taxClass,
}: {
  onStatusChange: any;
  onClassChange: any;
  taxStatus: string;
  taxClass: string;
}) {
  const statusArray = [
    { value: "none", label: "None" },
    { value: "shipping_only", label: "Shipping Only" },
    { value: "taxable", label: "Taxable" },
  ];

  const classArray = [
    { value: "standard", label: "Standard" },
    { value: "normal_rate", label: "Normal Rate" },
    { value: "reduced_rate", label: "Reduced Rate" },
    { value: "zero_rate", label: "Zero Rate" },
  ];
  return (
    <>
      <div className="flex mt-4 mb-4 gap-5">
        <div className="w-6/12">
          <div className="">
            {" "}
            <SearchSingleSelect
              label="Tax Status"
              options={statusArray}
              value={statusArray.find((item) => item.value === taxStatus)}
              tooltipMessage="Define whether or not the entire product is taxable, or just the cost of shipping it."
              showTooltip={true}
              onChange={onStatusChange}
            />
          </div>
        </div>
        <div className="w-6/12">
          <div className="">
            {" "}
            <SearchSingleSelect
              label="Tax Class"
              options={classArray}
              value={classArray.find((item) => item.value === taxClass)}
              tooltipMessage="Choose a tax class for this product. Tax classes are used to apply different tax rates specific to certain types of product"
              showTooltip={true}
              onChange={onClassChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
