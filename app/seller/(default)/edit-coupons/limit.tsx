import InputComponent from "@/components/common/inputField/page";
import React from "react";

export default function Limit() {
  return (
    <>
      <div className="grid grid-cols-2 gap-5">
        <div className="mt-4 mb-4 ">
          <InputComponent
            className="w-[50%]"
            label="Usage limit per coupon"
            type="number"
          />
        </div>
        <div className="mt-4 mb-4 ">
          <InputComponent
            className="w-[50%]"
            label="Limit usage to X items"
            type="number"
          />
        </div>
        <div className=" ">
          <InputComponent
            className="w-[50%]"
            label="Usage limit per user"
            type="number"
          />
        </div>
      </div>
    </>
  );
}
