/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
// components/SecondStep.tsx
"use client";
import InputComponent from "@/components/common/inputField/page";
import SearchSingleSelect from "@/components/common/select/searchableSingleSelect";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useState, useEffect } from "react";
import { setSecondStep } from "@/redux/slices/globaCache.slice";
import Countries from "../../../../../helpers/countries.json";
import States from "../../../../../helpers/states.json";
import SVG from "@/public/svg";
import { useFormik } from "formik";
import * as yup from "yup";

type businessDataType = {
  bussinessName: string;
  bussinessAddress: string;
  ein: string;
  street: string;
  streetTwo: string;
  city: string;
  zipCode: string;
  country: string;
  state: string;
  phoneNumber: string;
  primaryContact: string;
};

const SecondStep = ({
  handleNext,
}: {
  handleNext: () => void;
  currentStep?: number;
}) => {
  /**
   *
   */
  const subSteps = [
    { title: "Sub-Step 1", description: "First part of registration" },
    { title: "Sub-Step 2", description: "Second part of registration" },
    { title: "Sub-Step 3", description: "Third part of registration" },
  ];

  /**
   * redux
   */

  const dispatch = useAppDispatch();
  const { secondStep } = useAppSelector((state) => state.globalCache);

  /**
   * state management
   */
  const [states, setStates] = useState<any[]>([]);
  const [currentSubStep, setCurrentSubStep] = useState(0);
  const [errorData, setErrorData] = useState<{
    error: string;
    type: "USERNAME" | "";
  }>({
    error: "",
    type: "",
  });

  /**
   * handle next
   */

  const handleNextSubStep = () => {
    if (currentSubStep < subSteps.length - 1) {
      if (currentSubStep === 0 && secondStep.storeName === "") {
        setErrorData({
          error: "Please enter your Username or business name",
          type: "USERNAME",
        });
      } else {
        setCurrentSubStep(currentSubStep + 1);
      }
    } else {
      handleNext();
    }
  };

  const handlePreviousSubStep = () => {
    if (currentSubStep > 0) {
      setCurrentSubStep(currentSubStep - 1);
    }
  };

  /**
   * formik
   */
  const formik = useFormik<businessDataType>({
    initialValues: {
      bussinessName: "",
      bussinessAddress: "",
      ein: "",
      street: "",
      streetTwo: "",
      city: "",
      zipCode: "",
      country: "",
      state: "",
      phoneNumber: "",
      primaryContact: "",
    },
    validationSchema: yup.object({
      bussinessName: yup.string(),
      bussinessAddress: yup.string(),
      ein: yup.string(),
      street: yup.string(),
      streetTwo: yup.string(),
      city: yup.string(),
      zipCode: yup
        .string()
        .matches(/^\d{6}$/, "ZIP code must be exactly 6 digits")
        .required("ZIP code is required"),
      country: yup.string(),
      state: yup.string(),
      phoneNumber: yup
        .string()
        .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Phone number is not valid")
        .required("Phone number is required"),
      primaryContact: yup
        .string()
        .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Phone number is not valid")
        .required("Phone number is required"),
    }),
    onSubmit: (values) => {
      console.log({ values });
      handleNextSubStep();
    },
  });

  const handleCountrySelect = (data: { label: string; value: string }) => {
    const address = JSON.parse(JSON.stringify(secondStep.storeAddress));
    address.country = data.value;
    dispatch(setSecondStep({ ...secondStep, storeAddress: address }));
    const stateFilter = States.filter(
      (item) => item.country_name == data.value,
    );
    setStates(stateFilter);
  };

  useEffect(() => {
    handleCountrySelect({ label: "United States", value: "United States" });
  }, []);
  const countryCode = [{ value: "1", label: "+1" }];
  const renderCurrentSubStep = () => {
    switch (currentSubStep) {
      case 0:
        return (
          <div className="md:w-6/12 mx-auto">
            <div className="mt-5 px-6">
              <div>
                <h1 className="text-center heading_section_text font-bold">
                  WELCOME
                </h1>
                <span className="text-[#525252] font-normal normal-case text-base">
                  Choose a username or business name that others will know you
                  by.
                </span>
                <div className="mt-8">
                  <InputComponent
                    className="capitalize font-medium text-[#000!important]"
                    label="Username or business name"
                    placeholder="Write here"
                    mandatory={false}
                    value={secondStep.storeName}
                    onChange={(e: any) => {
                      setErrorData({ error: "", type: "" });
                      dispatch(
                        setSecondStep({
                          ...secondStep,
                          storeName: e.target.value,
                        }),
                      );
                      formik.setFieldValue("bussinessName", e.target.value);
                    }}
                  />
                  {errorData.type === "USERNAME" && (
                    <span className="text-sm text-red-500">
                      {errorData.error}
                    </span>
                  )}
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
                  HELLO, {secondStep.storeName}
                </h1>
                <span className="text-[#525252] font-normal normal-case text-base">
                  Are you a business or an individual seller
                </span>
                <div className="mt-8 flex justify-center gap-6">
                  <div
                    className={`cursor-pointer border border-gray-300 rounded-lg w-48 flex justify-center items-center h-52 ${
                      secondStep.sellerType === "business"
                        ? "bg-primaryMain text-white"
                        : ""
                    }`}
                    onClick={() =>
                      dispatch(
                        setSecondStep({
                          ...secondStep,
                          sellerType: "business",
                        }),
                      )
                    }
                  >
                    {" "}
                    <div className="">
                      <SVG.businessIcon />
                      <p className="mt-2 mb-0 font-medium capitalize">
                        Business
                      </p>
                    </div>
                  </div>
                  <div
                    className={` cursor-pointer border border-gray-300 rounded-lg w-48 flex justify-center items-center h-52 ${
                      secondStep.sellerType === "individual"
                        ? "bg-primaryMain text-white"
                        : ""
                    }`}
                    onClick={() =>
                      dispatch(
                        setSecondStep({
                          ...secondStep,
                          sellerType: "individual",
                        }),
                      )
                    }
                  >
                    {" "}
                    <div className="">
                      <SVG.individualIcon />
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
                HELLO, {secondStep.storeName}
              </h2>
              <span className="text-[#525252] font-normal normal-case text-base ">
                Please fill the business address
              </span>
            </div>
            <div className="px-8 grid grid-cols-2 gap-6 mt-5">
              {/* Content */}

              <div className="w-12/12">
                {" "}
                <InputComponent
                  disabled
                  className="capitalize font-medium text-[#000!important]"
                  label="Business Name"
                  placeholder="Write here"
                  mandatory={false}
                  {...formik.getFieldProps("bussinessName")}
                />
              </div>
              <div className="w-12/12">
                <InputComponent
                  className="capitalize font-medium text-[#000!important]"
                  label="Business Address"
                  placeholder="Write here"
                  mandatory={false}
                  {...formik.getFieldProps("bussinessAddress")}
                />
              </div>
              <div className="w-12/12">
                <div className="">
                  <InputComponent
                    className="capitalize font-medium text-[#000!important]"
                    label="EIN"
                    placeholder="Write here"
                    mandatory={false}
                    {...formik.getFieldProps("ein")}
                    value={formik.values.ein}
                    onChange={(e) => {
                      const address = JSON.parse(
                        JSON.stringify(secondStep.storeAddress),
                      );
                      address.ein = e.target.value;
                      dispatch(
                        setSecondStep({ ...secondStep, storeAddress: address }),
                      );
                      formik.setFieldValue("ein", e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="w-12/12">
                {" "}
                <InputComponent
                  className="capitalize font-medium text-[#000!important]"
                  label="Street"
                  placeholder="Write here"
                  mandatory={false}
                  value={formik.values.street}
                  onChange={(e) => {
                    const address = JSON.parse(
                      JSON.stringify(secondStep.storeAddress),
                    );
                    address.street = e.target.value;
                    dispatch(
                      setSecondStep({ ...secondStep, storeAddress: address }),
                    );
                    formik.setFieldValue("street", e.target.value);
                  }}
                />
              </div>
              {/* <div className="w-12/12">
                <InputComponent
                  className="capitalize font-medium text-[#000!important]"
                  label="Street 2"
                  placeholder="Write here"
                  mandatory={false}
                  value={formik.values.streetTwo}
                  onChange={(e) => {
                    const address = JSON.parse(
                      JSON.stringify(secondStep.storeAddress),
                    );
                    address.street2 = e.target.value;
                    dispatch(
                      setSecondStep({ ...secondStep, storeAddress: address }),
                    );
                    formik.setFieldValue("streetTwo", e.target.value);
                  }}
                />
              </div> */}
              <div className="w-12/12">
                {" "}
                <InputComponent
                  className="capitalize font-medium text-[#000!important]"
                  label="City/Town"
                  placeholder="Write here"
                  mandatory={false}
                  value={formik.values.city}
                  onChange={(e) => {
                    const address = JSON.parse(
                      JSON.stringify(secondStep.storeAddress),
                    );
                    address.city = e.target.value;
                    dispatch(
                      setSecondStep({ ...secondStep, storeAddress: address }),
                    );
                    formik.setFieldValue("city", e.target.value);
                  }}
                />
              </div>
              <div className="w-12/12">
                <InputComponent
                  className="capitalize font-medium text-[#000!important]"
                  label="Postcode/Zip"
                  placeholder="Write here"
                  mandatory={false}
                  value={formik.values.zipCode}
                  onChange={(e) => {
                    const address = JSON.parse(
                      JSON.stringify(secondStep.storeAddress),
                    );
                    address.postalCode = e.target.value;
                    dispatch(
                      setSecondStep({ ...secondStep, storeAddress: address }),
                    );
                    formik.setFieldValue("zipCode", e.target.value);
                  }}
                />
                {formik.touched.zipCode && formik.errors.zipCode && (
                  <span className="text-sm text-red-500">
                    {formik.errors.zipCode}
                  </span>
                )}
              </div>
              <div className="w-12/12">
                <div className=" country_select_label">
                  <SearchSingleSelect
                    label="Country"
                    options={Countries.filter((item) => item.iso2 === "US").map(
                      (item: any) => {
                        return { label: item.name, value: item.name };
                      },
                    )}
                    value={{ label: "United States", value: "United States" }}
                    onChange={(data) => handleCountrySelect(data)}
                  />
                </div>
              </div>
              <div className="w-12/12">
                <div className=" country_select_label">
                  <SearchSingleSelect
                    label="State"
                    options={states.map((item: any) => {
                      return { label: item.name, value: item.name };
                    })}
                    onChange={(data) => {
                      const address = JSON.parse(
                        JSON.stringify(secondStep.storeAddress),
                      );
                      address.state = data.value;
                      dispatch(
                        setSecondStep({ ...secondStep, storeAddress: address }),
                      );
                    }}
                  />
                </div>
              </div>

              <div className="w-12/12">
                <div className="">
                  <label className=" normal-case text-black text-sm font-medium">
                    Contact Business Phone Number
                  </label>
                  <div
                    className="flex phone_input_code mt-0"
                    style={{ marginTop: "0!important" }}
                  >
                    {" "}
                    <div className="w-2/12 mr-4">
                      <SearchSingleSelect
                        label=""
                        options={countryCode}
                        placeholder="+1"
                      />
                    </div>{" "}
                    <div className="w-10/12">
                      <InputComponent
                        className="capitalize font-medium text-[#000!important] "
                        label="Phone Number"
                        maxLength={10}
                        placeholder="XXXXXXXXXX"
                        mandatory={true}
                        value={formik.values.phoneNumber}
                        onChange={(e) => {
                          const address = JSON.parse(
                            JSON.stringify(secondStep.storeAddress),
                          );
                          address.businessContactNumber = e.target.value;
                          dispatch(
                            setSecondStep({
                              ...secondStep,
                              storeAddress: address,
                            }),
                          );
                          formik.setFieldValue("phoneNumber", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <span className="text-sm text-red-500">
                      {formik.errors.phoneNumber}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-12/12">
                <div className="">
                  <label className=" normal-case text-black text-sm font-medium">
                    Primary contact info
                  </label>
                  <div
                    className="flex phone_input_code mt-0"
                    style={{ marginTop: "0!important" }}
                  >
                    {" "}
                    <div className="w-2/12 mr-4">
                      <SearchSingleSelect
                        label=""
                        options={countryCode}
                        placeholder="+1"
                      />
                    </div>{" "}
                    <div className="w-10/12">
                      <InputComponent
                        className="capitalize font-medium text-[#000!important] "
                        label="Phone Number"
                        maxLength={10}
                        placeholder="XXXXXXXXXX"
                        mandatory={true}
                        {...formik.getFieldProps("primaryContact")}
                        value={formik.values.primaryContact}
                        onChange={(e) => {
                          const address = JSON.parse(
                            JSON.stringify(secondStep.storeAddress),
                          );
                          address.primaryPhoneNumber = e.target.value;
                          dispatch(
                            setSecondStep({
                              ...secondStep,
                              storeAddress: address,
                            }),
                          );
                          formik.setFieldValue(
                            "primaryContact",
                            e.target.value,
                          );
                        }}
                      />
                    </div>
                  </div>
                  {formik.touched.primaryContact &&
                    formik.errors.primaryContact && (
                      <span className="text-sm text-red-500">
                        {formik.errors.primaryContact}
                      </span>
                    )}
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
      className={` ${currentSubStep === 0 ? "secondStepOne" : currentSubStep === 1 ? "secondStepTwo" : ""}`}
    >
      <div className="">
        <form>{renderCurrentSubStep()}</form>
        <div className="flex justify-center w-full mt-4 gap-5">
          <button
            onClick={handlePreviousSubStep}
            disabled={currentSubStep === 0}
            className="mt-6 px-4 py-2 w-[250px] bg-gray-300 text-black rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => {
              currentSubStep === 2
                ? formik.handleSubmit()
                : handleNextSubStep();
            }}
            // disabled={currentSubStep === subSteps.length - 1}
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
