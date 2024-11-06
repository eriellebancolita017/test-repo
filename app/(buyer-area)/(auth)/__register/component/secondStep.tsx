// components/SecondStep.tsx
"use client";
import InputComponent from "@/components/common/inputField/page";
import SearchSingleSelect from "@/components/common/select/searchableSingleSelect";
import Image from "next/image";
import React, { useState } from "react";

const SecondStep = () => {
  const subSteps = [
    { title: "Sub-Step 1", description: "First part of registration" },
    { title: "Sub-Step 2", description: "Second part of registration" },
    { title: "Sub-Step 3", description: "Third part of registration" },
  ];

  const [currentSubStep, setCurrentSubStep] = useState(0);
  const [sellerType, setSellerType] = useState<string | null>("business");

  const handleNextSubStep = () => {
    if (currentSubStep < subSteps.length - 1) {
      setCurrentSubStep(currentSubStep + 1);
    }
  };
  const handleSelectSellerType = (type: string) => {
    setSellerType(type);
  };

  const handlePreviousSubStep = () => {
    if (currentSubStep > 0) {
      setCurrentSubStep(currentSubStep - 1);
    }
  };

  const countryArray = [
    { value: "india", label: "India" },
    { value: "shrilanka", label: "Shrilanka" },
  ];

  const renderCurrentSubStep = () => {
    switch (currentSubStep) {
      case 0:
        return (
          <div className="md:w-6/12 mx-auto">
            <div className="mt-5 px-6">
              <div>
                <h1 className="text-center heading_section_text font-bold">
                  Welcome
                </h1>
                <span className="text-[#525252] font-normal capitalize text-base">
                  Choose a username or business name that others will know you
                  by.
                </span>
                <div className="mt-8">
                  <InputComponent
                    className="capitalize font-medium text-[#000!important]"
                    label="Username or business name"
                    placeholder="Write here"
                    mandatory={false}
                  />
                </div>

                <div className="mt-6">
                  {" "}
                  <span className="text-[#525252] font-normal capitalize text-sm">
                    After Choosing shop name, choose either business or an
                    individual seller
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="md:w-6/12 mx-auto">
            <div className="mt-5 px-6">
              <div className="text-center">
                <h1 className="text-center heading_section_text font-bold">
                  HELLO, John
                </h1>
                <span className="text-[#525252] font-normal capitalize text-base">
                  Are you a business or an individual seller
                </span>
                <div className="mt-8 flex justify-center gap-6">
                  <div
                    className={`cursor-pointer border border-gray-300 rounded-lg w-48 flex justify-center items-center h-52 ${
                      sellerType === "business"
                        ? "bg-primaryMain text-white"
                        : ""
                    }`}
                    onClick={() => handleSelectSellerType("business")}
                  >
                    {" "}
                    <div className="">
                      <Image
                        src="../svg/mainpages/business.svg"
                        alt=""
                        height={130}
                        width={100}
                      />
                      <p className="mt-2 mb-0 font-medium capitalize">
                        Business
                      </p>
                    </div>
                  </div>
                  <div
                    className={` cursor-pointer border border-gray-300 rounded-lg w-48 flex justify-center items-center h-52 ${
                      sellerType === "individual"
                        ? "bg-primaryMain text-white"
                        : ""
                    }`}
                    onClick={() => handleSelectSellerType("individual")}
                  >
                    {" "}
                    <div className="">
                      <Image
                        src="../svg/mainpages/individual.svg"
                        alt=""
                        height={130}
                        width={100}
                      />
                      <p className="mt-2 mb-0 font-medium capitalize">
                        Individual
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <div className="text-center">
              <h2 className="text-center heading_section_text font-bold">
                HELLO, John
              </h2>
              <span className="text-[#525252] font-normal capitalize text-base ">
                Please fill the business details
              </span>
            </div>
            <div className="px-8 grid grid-cols-2 gap-6 mt-5">
              {/* Content */}
              <div className="w-12/12">
                {" "}
                <InputComponent
                  className="capitalize font-medium text-[#000!important]"
                  label="Business Name"
                  placeholder="Write here"
                  mandatory={false}
                />
              </div>
              <div className="w-12/12">
                <InputComponent
                  className="capitalize font-medium text-[#000!important]"
                  label="Business Name"
                  placeholder="Write here"
                  mandatory={false}
                />
              </div>
              <div className="w-12/12">
                <div className=" country_select_label">
                  <SearchSingleSelect label="Country" options={countryArray} />
                </div>
              </div>
              <div className="w-12/12">
                <div className="">
                  <InputComponent
                    className="capitalize font-medium text-[#000!important]"
                    label="EIN"
                    placeholder="Write here"
                    mandatory={false}
                  />
                </div>
              </div>

              <div className="w-12/12">
                <div className="">
                  <InputComponent
                    className="capitalize font-medium text-[#000!important]"
                    label="Contact Business Phone Number"
                    placeholder="Write here"
                    mandatory={false}
                  />
                </div>
              </div>
              <div className="w-12/12">
                <div className="">
                  <InputComponent
                    className="capitalize font-medium text-[#000!important]"
                    label="Primary contact info"
                    placeholder="Write here"
                    mandatory={false}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div
      className={` ${
        currentSubStep === 0
          ? "secondStepOne"
          : currentSubStep === 1
            ? "secondStepTwo"
            : "secondStepThree"
      }`}
    >
      <div className="">
        {renderCurrentSubStep()}
        <div className="flex justify-center w-full mt-4 gap-5">
          <button
            onClick={handlePreviousSubStep}
            disabled={currentSubStep === 0}
            className="mt-6 px-4 py-2 bg-gray-300 rounded disabled:opacity-50 w-[250px]"
          >
            Previous
          </button>
          <button
            onClick={handleNextSubStep}
            disabled={currentSubStep === subSteps.length - 1}
            className="mt-6 px-4 py-2 w-[250px] bg-primaryMain text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>{" "}
      </div>
    </div>
  );
};

export default SecondStep;
