import InputComponent from "@/components/common/inputField/page";
import SearchSingleSelect from "@/components/common/select/searchableSingleSelect";
import React, { useState } from "react";

export default function Shipping({
  setWeight,
  setlength,
  setWidth,
  setHeight,
  setProccessTime,
  setFlatRate,
  weight,
  length,
  height,
  width,
  proccessTime,
  flatRate,
}: {
  setWeight: (e: any) => void;
  setlength: (e: any) => void;
  setWidth: (e: any) => void;
  setHeight: (e: any) => void;
  setProccessTime: (e: any) => void;
  setFlatRate: (e: any) => void;
  weight: string;
  length: string;
  height: string;
  width: string;
  proccessTime: string;
  flatRate: string;
}) {
  const timeArray = [
    { value: "ship_in", label: "Ready to Ship in.." },
    { value: "one_business_day", label: "1 business day" },
    { value: "one_two_business_day", label: "1-2 business day" },

    { value: "one_three_business_day", label: "1-3 business day" },

    { value: "three_five_business_day", label: "3-5 business day" },
  ];

  const [isShippingChecked] = useState(false);

  // const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setIsShippingChecked(event.target.checked); // Update the isChecked state based on the checkbox value
  // };

  return (
    <>
      {/* <div className="mt-4 flex items-center">
        <label
          className={`flex text-zinc-600 text-sm font-bold  mr-5 items-center `}
          htmlFor="disable_shipping"
        >
          Disable Shipping{" "}
          <TooltipCustom bg="light" className="ms-2 ">
            <div className="text-[10px] font-normal text-slate-900 min-w-52 ">
              Disable shipping for this product
            </div>
          </TooltipCustom>
        </label>

        <input
          type="checkbox"
          id="disable_shipping"
          className="rounded-sm border border-slate-200 h-6 w-6 rounded-sm"
          checked={isShippingChecked} // Bind the checked state to the checkbox
          onChange={handleCheckboxChange} // Bind the handleCheckboxChange function to handle checkbox changes
        />
      </div> */}
      <div
        className={`flex mt-4 mb-4 gap-5 ${
          isShippingChecked ? "pointer-events-none" : ""
        } `}
      >
        <div className="w-6/12">
          <div className=" ">
            <InputComponent
              className="w-[50%]"
              label="Weight (lbs)"
              onChange={(e: any) => setWeight(e.target.value)}
              value={weight}
              // disabled={isShippingChecked ? true : false}
            />
          </div>
          <label
            className={`mt-4 block text-zinc-600 text-sm font-bold  mr-5 items-center `}
            htmlFor="disable_shipping"
          >
            Dimensions (in)
          </label>
          <div className="flex gap-5">
            <div className="w-4/12 ">
              <InputComponent
                className="w-[50%]"
                label="Length"
                onChange={(e: any) => setlength(e.target.value)}
                value={length}
                // disabled={isShippingChecked ? true : false}
              />
            </div>
            <div className="w-4/12 ">
              <InputComponent
                className="w-[50%]"
                label="Width"
                onChange={(e: any) => setWidth(e.target.value)}
                value={width}
                // disabled={isShippingChecked ? true : false}
              />
            </div>
            <div className="w-4/12 ">
              <InputComponent
                className="w-[50%]"
                label="Height"
                onChange={(e: any) => setHeight(e.target.value)}
                value={height}
                // disabled={isShippingChecked ? true : false}
              />
            </div>
          </div>
        </div>
        <div className="w-6/12">
          <div className="">
            {" "}
            <SearchSingleSelect
              label="Processing Time"
              options={timeArray}
              onChange={(e) => setProccessTime(e.value)}
              value={timeArray.find((item) => item.value === proccessTime)}
              tooltipMessage="The time required before sending the product for delivery"
              showTooltip={true}
            />
          </div>
          <div className="mt-9 ">
            <InputComponent
              className="w-[80%]"
              label="Flat Rate Shipping"
              onChange={(e: any) => setFlatRate(e.target.value)}
              value={flatRate}
              // disabled={isShippingChecked ? true : false}
              tooltipMessage="Leave Blank for free shipping"
              showTooltip={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}
