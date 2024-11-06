"use client";
import HeaderSectionCard from "@/components/common/header/headerSectionCard";
import InputComponent from "@/components/common/inputField/page";
import SearchSingleSelect from "@/components/common/select/searchableSingleSelect";
import React, { useEffect, useState } from "react";
import Countries from "@/helpers/countries.json";
import States from "@/helpers/states.json";
import { useFormik } from "formik";
import * as yup from "yup";
import ErrorText from "@/components/common/errorText";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import { useAppDispatch } from "@/redux/hooks";
import { setToastMessage } from "@/redux/slices/globaCache.slice";
import { useRouter } from "next/navigation";
import { ButtonLoader } from "@/components/common/loader/buttonLoader";

type addressType = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phoneNumber: string;
  addressLineOne: string;
  addressLineTwo: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
};

const AddNewAddress = () => {
  /**
   * router
   */
  const router = useRouter();

  /**
   * redux
   */

  const dispatch = useAppDispatch();

  /**
   * state managment
   */

  const [states, setStates] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * formik
   */
  const formik = useFormik<addressType>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      phoneNumber: "",
      addressLineOne: "",
      addressLineTwo: "",
      country: "United States",
      state: "",
      city: "",
      zipcode: "",
    },
    validationSchema: yup.object({
      firstName: yup.string().required("First Name is required."),
      lastName: yup.string().required("Last Name is required."),
      email: yup
        .string()
        .email("Please enter a valid.")
        .required("Email is required."),
      company: yup.string(),
      phoneNumber: yup
        .string()
        .matches(/^\+?\d{10,15}$/, "Invalid phone number format")
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number cannot exceed 15 digits")
        .required("Phone Number is required"),
      addressLineOne: yup.string().required("Address line one is required"),
      country: yup.string().required("Country is required"),
      state: yup.string().required("State is required"),
      city: yup.string().required("City is required"),
      zipcode: yup
        .string()
        .matches(/^\d{6}$/, "ZIP code must be exactly 6 digits")
        .required("ZIP code is required"),
    }),
    onSubmit: (values) => {
      handleAddAdress(values);
    },
  });

  /**
   * handle add address
   */

  const handleAddAdress = async (values: addressType) => {
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      company: values.company,
      phoneNumber: values.phoneNumber,
      street1: values.addressLineOne,
      street2: "",
      country: values.country,
      state: values.state,
      city: values.city,
      zipcode: values.zipcode,
    };
    setLoading(true);
    const response = await UserApi.addNewAddressAPI(payload);
    if (response.remote === "success") {
      setLoading(false);
      dispatch(
        setToastMessage({
          message: "New address added successfully.",
          status: "success",
          open: true,
        }),
      );
      router.push("/manage-address");
    } else {
      dispatch(
        setToastMessage({
          message: response.error.errors.message || "An error has occurs",
          status: "error",
          open: true,
        }),
      );
    }
  };

  const handleCountrySelect = (data: { label: string; value: string }) => {
    const stateFilter = States.filter(
      (item) => item.country_name == data.value,
    );
    setStates(stateFilter);
  };

  useEffect(() => {
    handleCountrySelect({ label: "United States", value: "United States" });
  }, []);

  return (
    <div className="">
      <div className="">
        <HeaderSectionCard title="Add New Address" />
      </div>
      <div className=" gap-6 mt-8">
        <div className="w-12/12">
          <div className="border border-[#F0F0F0] p-5 buyer_address_form">
            <h4 className="font-semibold text-[#121212] text-[28px] normal-case my-2">
              Add new address
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <InputComponent
                  className="capitalize font-medium text-[#000!important] "
                  label="First name"
                  placeholder="Write here"
                  mandatory={true}
                  {...formik.getFieldProps("firstName")}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <ErrorText>{formik.errors.firstName}</ErrorText>
                )}
              </div>
              <div>
                <InputComponent
                  className="capitalize font-medium text-[#000!important]"
                  label="Last name"
                  placeholder="Write here"
                  {...formik.getFieldProps("lastName")}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <ErrorText>{formik.errors.lastName}</ErrorText>
                )}
              </div>
            </div>
            <div className="mt-4">
              <InputComponent
                className="capitalize font-medium text-[#000!important] "
                label="Email"
                placeholder="Write here"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <ErrorText>{formik.errors.email}</ErrorText>
              )}
            </div>
            <div className="mt-4">
              <InputComponent
                className="capitalize font-medium text-[#000!important] "
                label="Company (Optional)"
                placeholder="Write here"
                {...formik.getFieldProps("company")}
              />
            </div>
            <div className="mt-4">
              <InputComponent
                className="capitalize font-medium text-[#000!important]"
                label="Apartment, suit, etc. (Optional)"
                placeholder="Write here"
                {...formik.getFieldProps("addressLineOne")}
              />
              {formik.touched.addressLineOne &&
                formik.errors.addressLineOne && (
                  <ErrorText>{formik.errors.addressLineOne}</ErrorText>
                )}
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4">
              <div className="">
                <SearchSingleSelect
                  options={Countries.filter((item) => item.iso2 === "US").map(
                    (item: any) => {
                      return { label: item.name, value: item.name };
                    },
                  )}
                  label="Country"
                  mandatory={true}
                  value={{ label: "United States", value: "United States" }}
                  onChange={(data) => handleCountrySelect(data)}
                />
              </div>
              <div className="">
                <SearchSingleSelect
                  options={states.map((item: any) => {
                    return { label: item.name, value: item.name };
                  })}
                  onChange={(data) => {
                    formik.setFieldValue("state", data.value);
                  }}
                  label="State"
                  mandatory={true}
                />
              </div>
              <div className="">
                <div>
                  <InputComponent
                    className="capitalize font-medium text-[#000!important] "
                    label="City"
                    placeholder="Write here"
                    mandatory={true}
                    {...formik.getFieldProps("city")}
                  />
                  {formik.touched.city && formik.errors.city && (
                    <ErrorText>{formik.errors.city}</ErrorText>
                  )}
                </div>
              </div>
              <div className="">
                <div>
                  <InputComponent
                    className="capitalize font-medium text-[#000!important] "
                    label="Zipcode"
                    placeholder="Write here"
                    mandatory={true}
                    {...formik.getFieldProps("zipcode")}
                  />
                  {formik.touched.zipcode && formik.errors.zipcode && (
                    <ErrorText>{formik.errors.zipcode}</ErrorText>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <InputComponent
                className="capitalize font-medium text-[#000!important]"
                label="Phone Number"
                placeholder="Write here"
                maxLength={10}
                {...formik.getFieldProps("phoneNumber")}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <ErrorText>{formik.errors.phoneNumber}</ErrorText>
              )}
            </div>
            {/* <div className="mt-4 normal-case">
              <div className="flex items-start">
                <input
                  className="mr-2 mt-1 h-4 w-4 focus:border-none dark:bg-[rgb(18,18,18)] dark:border-slate-700"
                  type="checkbox"
                  name="remove_items"
                />
                <label className="block text-zinc-600 text-sm mb-1  undefined">
                  This is also my billing address
                </label>
              </div>
            </div> */}
            <div className="mt-6">
              <button
                disabled={loading}
                onClick={() => formik.handleSubmit()}
                className="bg-primaryMain relative px-8 py-2 text-white font-medium rounded-md"
              >
                {loading && (
                  <>
                    <span className="absolute left-[8%] top-[33%]">
                      <ButtonLoader />
                    </span>
                  </>
                )}
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddNewAddress;
