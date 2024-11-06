import InputComponent from "@/components/common/inputField/page";
import Image from "next/image";
import React from "react";

const ThirdStep = () => {
  return (
    <>
      <div className="px-8">
        <div className="text-center">
          <h2 className="text-center heading_section_text font-bold">
            Setup your Billing details
          </h2>
          <span className="text-[#525252] font-normal capitalize text-base">
            Verify payout information add CC for refunds and back payments
          </span>
        </div>
        <div className="py-7 mt-3 mb-2 px-8">
          <Image
            src="../svg/mainpages/bankDetail.svg"
            alt=""
            width={185}
            height={57}
          />
        </div>

        <div className="px-8 grid grid-cols-2 gap-6 mt-5 mb-8">
          <div className="w-12/12">
            <InputComponent
              className="capitalize font-medium text-[#000!important]"
              label="Bank Account Number"
              placeholder="Write here"
              mandatory={false}
            />
          </div>
          <div className="w-12/12">
            <InputComponent
              className="capitalize font-medium text-[#000!important]"
              label="Confirm Bank Account Number"
              placeholder="Write here"
              mandatory={false}
            />
          </div>
          <div className="w-12/12">
            <InputComponent
              className="capitalize font-medium text-[#000!important]"
              label="Bank Name"
              placeholder="Write here"
              mandatory={false}
            />
          </div>
          <div className="w-12/12">
            <InputComponent
              className="capitalize font-medium text-[#000!important]"
              label="Contact Business Phone Number"
              placeholder="IFSC Code"
              mandatory={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ThirdStep;
