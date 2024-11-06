import InputComponent from "@/components/common/inputField/page";
import React, { useState } from "react";

export default function PaymentSetting() {
  const [selectedSection, setSelectedSection] = useState<string>("bank");

  const handleCheckboxChange = (section: string) => {
    setSelectedSection((prevSection) =>
      prevSection === section ? "" : section,
    );
  };
  return (
    <>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <h5 className="text-slate-950 mt-4 font-semibold flex items-center">
            PayPal Details
            <input
              type="checkbox"
              className="text-primaryMain rounded-sm ms-1"
              checked={selectedSection === "paypal"}
              onChange={() => handleCheckboxChange("paypal")}
            />
          </h5>
          <div className="mt-4 mb-4 w-12/12">
            <InputComponent
              className="w-[50%]"
              label="PayPal Email"
              disabled={selectedSection !== "paypal"}
            />
          </div>
        </div>
        <div>
          <h5 className="text-slate-950 mt-4 font-semibold flex items-center">
            Stripe Details
            <input
              type="checkbox"
              className="text-primaryMain rounded-sm ms-1"
              checked={selectedSection === "stripe"}
              onChange={() => handleCheckboxChange("stripe")}
            />
          </h5>
          <div className="mt-4 mb-4 w-12/12">
            <InputComponent
              className="w-[50%]"
              label="Stripe Id"
              disabled={selectedSection !== "stripe"}
            />
          </div>
        </div>
      </div>
      <h5 className="text-slate-950 mt-4 font-semibold flex items-center">
        Bank Details
        <input
          type="checkbox"
          className="text-primaryMain rounded-sm ms-1"
          checked={selectedSection === "bank"}
          onChange={() => handleCheckboxChange("bank")}
        />
      </h5>
      <hr className="mt-2"></hr>
      <div className="grid-cols-2 grid gap-5">
        <div className="mt-4 w-12/12">
          <InputComponent
            className="w-[50%]"
            label="Bank Name"
            disabled={selectedSection !== "bank"}
          />
        </div>
        <div className="mt-4 w-12/12">
          <InputComponent
            className="w-[50%]"
            label="Account Number"
            disabled={selectedSection !== "bank"}
          />
        </div>
        <div className="mb-4 w-12/12">
          <InputComponent
            className="w-[50%]"
            label="Routing Number"
            disabled={selectedSection !== "bank"}
          />
        </div>
      </div>
    </>
  );
}
