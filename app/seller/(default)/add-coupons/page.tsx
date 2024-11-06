"use client";
import TabComponent from "@/components/common/basicTab/page";
import InputComponent from "@/components/common/inputField/page";
import React, { useEffect, useState } from "react";
import DatePickerComponent from "@/components/common/datepicker/page";
import SearchSingleSelect from "@/components/common/select/searchableSingleSelect";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import ErrorText from "@/components/common/errorText";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import { setToastMessage } from "@/redux/slices/globaCache.slice";
import { useAppDispatch } from "@/redux/hooks";
import { ButtonLoader } from "@/components/common/loader/buttonLoader";

type DiscountCouponType = {
  code: string;
  discountType: { value: string; label: string };
  couponAmount: number;
  couponExpiry: Date;
  description: string;
  minSpend: number;
  maxSpend: number;
  limitPerCoupon: number;
  limitPerItem: number;
  limitPerUser: number;
};

export default function AddCoupons() {
  // const productCategories = [
  //   { value: "product_one", label: "Air Filter Housings" },
  //   { value: "product_two", label: "Bars & Controls" },
  // ];

  /**
   * redux
   */
  const dispatch = useAppDispatch();

  /**
   * state management
   */

  const [isDisabled] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * formik
   */
  const formik = useFormik<DiscountCouponType>({
    initialValues: {
      code: "",
      couponAmount: 0,
      couponExpiry: new Date(),
      description: "",
      discountType: { value: "", label: "" },
      limitPerCoupon: 0,
      limitPerItem: 0,
      limitPerUser: 0,
      maxSpend: 0,
      minSpend: 0,
    },
    validationSchema: yup.object({
      code: yup.string().required("Code is requied."),
      couponAmount: yup.number().required("Coupon Amount is required."),
      couponExpiry: yup.date().required("Coupon Expiry is required"),
      description: yup.string().required("Description is required"),
      limitPerCoupon: yup.number().required("Limit per coupon is required."),
      limitPerItem: yup.number().required("Limit usage to x item is required."),
      limitPerUser: yup.number().required("Limit per user is required"),
      maxSpend: yup.number().required("Maximum spend is required"),
      minSpend: yup.number().required("Minimum spend is required."),
    }),
    onSubmit: (values) => {
      handleAddDiscountCoupon(values);
    },
  });

  /**
   * handle add discount coupon
   */

  const handleAddDiscountCoupon = async (values: DiscountCouponType) => {
    const payload = {
      couponType: values.discountType.value,
      couponCode: values.code,
      couponAmount: Number(values.couponAmount),
      description: values.description,
      minimumSpent: Number(values.minSpend),
      maximumSpent: Number(values.maxSpend),
      limit: Number(values.limitPerCoupon),
      limitPerItem: Number(values.limitPerItem),
      limitPerUser: Number(values.limitPerUser),
      expireAt: values.couponExpiry,
    };

    setLoading(true);
    const response = await UserApi.addDiscountCouponAPI(payload);
    if (response.remote === "success") {
      dispatch(
        setToastMessage({
          message: "Coupon addedd successfully.",
          open: true,
          status: "success",
        }),
      );
      router.push("seller/coupons");
      setLoading(false);
    } else {
      setLoading(false);
      dispatch(
        setToastMessage({
          message: response.error.errors.message || "Error as occurs",
          open: true,
          status: "error",
        }),
      );
    }
  };

  const tabs = [
    {
      id: "tab1",
      label: "Restriction",
      content: (
        <div>
          <div className="grid grid-cols-2 gap-5">
            <div className="mt-4 ">
              <InputComponent
                className="w-[50%]"
                label="Minimum spend"
                {...formik.getFieldProps("minSpend")}
              />
              {formik.touched.minSpend && formik.errors.minSpend && (
                <ErrorText>{formik.errors.minSpend}</ErrorText>
              )}
            </div>
            <div className="mt-4  ">
              <InputComponent
                className="w-[50%]"
                label="Maximum spend"
                {...formik.getFieldProps("maxSpend")}
              />
              {formik.touched.maxSpend && formik.errors.maxSpend && (
                <ErrorText>{formik.errors.maxSpend}</ErrorText>
              )}
            </div>

            {/* <div className="">
              <SearchSingleSelect
                label="Products Categories"
                isSearchable={true}
                options={productCategories}
                value={formik.values.productCategory}
                onChange={function (data: any): void {
                  formik.setFieldValue("productCategory", data);
                }}
              />
             
            </div> */}
          </div>
        </div>
      ),
    },
    {
      id: "tab2",
      label: "Limit",
      content: (
        <div>
          <div className="grid grid-cols-2 gap-5">
            <div className="mt-4 mb-4 ">
              <InputComponent
                className="w-[50%]"
                label="Usage limit per coupon"
                type="number"
                {...formik.getFieldProps("limitPerCoupon")}
              />
              {formik.touched.limitPerCoupon &&
                formik.errors.limitPerCoupon && (
                  <ErrorText>{formik.errors.limitPerCoupon}</ErrorText>
                )}
            </div>
            <div className="mt-4 mb-4 ">
              <InputComponent
                className="w-[50%]"
                label="Limit usage to X items"
                type="number"
                {...formik.getFieldProps("limitPerItem")}
              />
              {formik.touched.limitPerItem && formik.errors.limitPerItem && (
                <ErrorText>{formik.errors.limitPerItem}</ErrorText>
              )}
            </div>
            <div className=" ">
              <InputComponent
                className="w-[50%]"
                label="Usage limit per user"
                type="number"
                {...formik.getFieldProps("limitPerUser")}
              />
              {formik.touched.limitPerUser && formik.errors.limitPerUser && (
                <ErrorText>{formik.errors.limitPerUser}</ErrorText>
              )}
            </div>
          </div>
        </div>
      ),
    },
  ];

  const discountTypeArray = [
    { value: "percentage_discount", label: "Percentage Discount" },
    { value: "fixed_product_discount", label: "Fixed Product Discount" },
  ];

  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    formik.setFieldValue("discountType", {
      value: "fixed_product_discount",
      label: "Fixed Product Discount",
    });
  }, []);

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          {/* Left: Title */}
          <div className="mb-4 sm:mb-0">
            <h1 className=" flex items-center text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
              Add Coupon
              <svg
                className="shrink-0 h-6 w-6 ms-2"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  strokeWidth="2"
                  d="M3,11 L21,11 L21,23 L3,23 L3,11 Z M2,11 L2,7 L22,7 L22,11 L2,11 Z M12,23 L12,7 L12,23 Z M7,7 L12,7 C12,7 10,2 7,2 C3.5,2 3,7 7,7 Z M17.1843819,7 L12.1843819,7 C12.1843819,7 14,2 17.1843819,2 C20.5,2 21.1843819,7 17.1843819,7 Z"
                ></path>
              </svg>
            </h1>
          </div>
          <button
            className="btn bg-primaryMain hover:bg-blueTwo text-white"
            onClick={() => handleBack()}
          >
            <span className="flex items-center">
              <svg
                className="mr-1"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
              </svg>
              Back
            </span>
          </button>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
          <div className="flex gap-5">
            <div className="w-6/12">
              <div className="">
                <InputComponent
                  className="w-[80%]"
                  label="Code"
                  {...formik.getFieldProps("code")}
                />
                {formik.touched.code && formik.errors.code && (
                  <ErrorText>{formik.errors.code}</ErrorText>
                )}
              </div>
              <div className="mt-4">
                <InputComponent
                  className="w-[80%]"
                  label="Coupon Amount"
                  {...formik.getFieldProps("couponAmount")}
                />
                {formik.touched.couponAmount && formik.errors.couponAmount && (
                  <ErrorText>{formik.errors.couponAmount}</ErrorText>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-zinc-600 text-sm font-bold mb-1">
                  Description
                </label>
                <textarea
                  value={formik.values.description}
                  onChange={(e) =>
                    formik.setFieldValue("description", e.target.value)
                  }
                  placeholder="Separate Product Tags with commas"
                  className="min-h-16 rounded-sm border border-slate-200 w-full dark:bg-[rgb(18,18,18)] dark:border-slate-700"
                  rows={3}
                ></textarea>
                {formik.touched.description && formik.errors.description && (
                  <ErrorText>{formik.errors.description}</ErrorText>
                )}
              </div>
            </div>
            <div className="w-6/12 ">
              <div className="">
                <SearchSingleSelect
                  label="Discount Type"
                  isSearchable={true}
                  isDisabled={isDisabled}
                  options={discountTypeArray}
                  value={formik.values.discountType}
                  onChange={function (data: any): void {
                    formik.setFieldValue("discountType", data);
                  }}
                />
                {/* {formik.touched.discountType && formik.errors.discountType && (
                  <ErrorText>Please select discount type</ErrorText>
                )} */}
              </div>
              <div className="mt-4">
                <label
                  className={`block text-zinc-600 text-sm font-bold mb-1`}
                  htmlFor="date"
                >
                  Coupon Expiry Date
                </label>
                <DatePickerComponent
                  dateValue={formik.values.couponExpiry}
                  handleChange={(vl) =>
                    formik.setFieldValue("couponExpiry", vl)
                  }
                />
                {formik.touched.couponExpiry && formik.errors.couponExpiry && (
                  <ErrorText>Please enter a valid expiry date</ErrorText>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
          <TabComponent tabs={tabs} />
          <div className="mt-4 text-end">
            <button
              disabled={loading}
              onClick={() => formik.handleSubmit()}
              className="btn relative px-6 bg-primaryMain hover:bg-blueTwo text-white"
            >
              <span className="">
                {" "}
                {loading && (
                  <>
                    <span className="absolute left-[4%] top-[28%] h-2 w-2">
                      <ButtonLoader />
                    </span>
                  </>
                )}{" "}
                Submit
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
