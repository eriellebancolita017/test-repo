"use client";
import CheckboxComponent from "@/components/common/checkboxField/checkboxField";
import InputComponent from "@/components/common/inputField/page";
import SelectComponent from "@/components/common/select/page";
import React from "react";

const ShippingAddressForm = () => {
  const countryArray = [
    { value: "india", label: "India" },
    { value: "shrilanka", label: "Shrilanka" },
  ];
  const stateArray = [
    { value: "madhyaPradesh", label: "Madhya Pradesh" },
    { value: "delhi", label: "Delhi" },
  ];
  const cityArray = [
    { value: "gwalior", label: "Gwalior" },
    { value: "indore", label: "Indore" },
  ];
  return (
    <>
      <div className="mb-5">
        <div className="border-b mb-2">
          <h5 className="text-2xl text-primaryMain font-semibold mb-2 normal-case">
            Shipping address
          </h5>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-3">
          <div className="">
            <InputComponent placeholder="" label="First name" />
          </div>
          <div className="">
            <InputComponent placeholder="" label="Last name" />
          </div>
        </div>
        <div className="mt-4">
          <InputComponent placeholder="" label="Company (optional)" />
        </div>
        <div className="mt-4">
          <InputComponent
            placeholder=""
            label="Apartment, suit, etc. (optional)"
          />
        </div>
        <div className="grid grid-cols-4 gap-5 mt-4">
          <div className="">
            <SelectComponent
              placeholder="Select"
              label="Country"
              options={countryArray}
            />
          </div>
          <div className="">
            <SelectComponent
              placeholder="Select"
              label="State"
              options={stateArray}
            />
          </div>
          <div className="">
            <SelectComponent
              placeholder="Select"
              label="City"
              options={cityArray}
            />
          </div>
          <div className="">
            <InputComponent placeholder="Write here" label="Zip code" />
          </div>
        </div>
        <div className="mt-4">
          <InputComponent placeholder="Write here" label="Phone number" />
        </div>
        <div className="mt-4 mb-1">
          <CheckboxComponent
            label="This is also my billing address"
            type="checkbox"
          />
        </div>
        {/* <div className="mt-4">
          <InputComponent label="Email" value="scarlet@xyz.com" />
        </div>
        <div className="mt-4">
          <InputComponent value="**********" label="Password" />
        </div>
        <div className="mt-4">
          <InputComponent value="**********" label="Confirm Password" />
        </div> */}
      </div>
    </>
  );
};
export default ShippingAddressForm;
