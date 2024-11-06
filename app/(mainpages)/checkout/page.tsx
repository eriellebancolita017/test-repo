"use client";
import React, { useEffect, useState } from "react";
import BreadcrumbTwo from "@/components/common/breadcrumb/breadcrumbTwo";
import SummaryCard from "@/components/common/summary/summaryCard";
import SVG from "@/public/svg";
import DeliveryAddressForm from "./component/deliveryAddressForm";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductShortCard } from "./component/productShortCard";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCartCount } from "@/redux/slices/product.slice";
import { tokens } from "@/helpers/jwtTokenFunction";
import {
  globalCacheStateSelector,
  setToastMessage,
} from "@/redux/slices/globaCache.slice";
import { decodeHtmlEntities } from "@/utils/commonFunction";
import { useFormik } from "formik";
import * as yup from "yup";
import ErrorText from "@/components/common/errorText";
import InputComponent from "@/components/common/inputField/page";
import SearchSingleSelect from "@/components/common/select/searchableSingleSelect";
import Countries from "@/helpers/countries.json";
import States from "@/helpers/states.json";
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

export type allAddressType = {
  id: number;
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

export default function CheckoutPage() {
  /**
   * redux
   */
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(globalCacheStateSelector);

  console.log({ user });

  /**
   * state management
   */
  const [checkoutData, setCheckoutData] = useState<{
    subTotal: number;
    totalItems: number;
  }>({ subTotal: 0, totalItems: 0 });
  const [allCartProd, setAllCartProd] = useState<any>([]);
  const [allAddress, setAllAddress] = useState<allAddressType[]>([]);
  const [selectedCard, setSelectedCard] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [states, setStates] = useState<any[]>([]);
  const [discountData, setDiscountData] = useState<{
    cartTotal: number;
    discountTotal: number;
    totalAfterDiscount: number;
  }>({
    cartTotal: 0,
    discountTotal: 0,
    totalAfterDiscount: 0,
  });

  /**
   * router
   */
  const router = useRouter();
  const searchParams = useSearchParams();
  const coupon = searchParams.get("coupon");

  const breadcrumbItems = [
    { text: "Home", href: "/" },
    { text: "Shopping Cart", href: "/shopping-cart" },
    { text: "Checkout", href: "/checkout" },
  ];

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
      handleContinueToPayment(values);
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
    const response = await UserApi.addNewAddressAPI(payload);
    if (response.remote === "failure") {
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

  /**
   * get meta data
   */

  const handleGetMetaData = (arg: string) => {
    const result = user?.wp_nepaz2_usermeta?.find(
      (el: any) => el.meta_key === arg,
    )?.meta_value;

    return result;
  };

  useEffect(() => {
    handleCountrySelect({ label: "United States", value: "United States" });
    formik.setFieldValue("firstName", handleGetMetaData("first_name"));
    formik.setFieldValue("lastName", handleGetMetaData("last_name"));
    formik.setFieldValue("email", user?.user_email);
    formik.setFieldValue("phoneNumber", handleGetMetaData("billing_phone"));
  }, [user]);

  /**
   * get all cart product list
   */

  const getAllCartProdList = async () => {
    const response = await UserApi.getAllCartProdAPI();
    if (response.remote === "success") {
      setAllCartProd(response.data.data);
      dispatch(setCartCount(response?.data?.data?.length || 0));
      const total = response?.data?.data?.reduce(
        (accumulator: any, currentValue: any) =>
          accumulator +
          Number(
            currentValue?.product?.wp_nepaz2_postmeta?.find(
              (el: any) => el.meta_key == "sale_price",
            )?.meta_value
              ? currentValue?.product?.wp_nepaz2_postmeta?.find(
                  (el: any) => el.meta_key == "sale_price",
                )?.meta_value
              : currentValue?.product?.wp_nepaz2_postmeta?.find(
                  (el: any) => el.meta_key == "_price",
                )?.meta_value,
          ) *
            Number(currentValue?.quantity),
        0,
      );
      const data = {
        subTotal: total,
        totalItems: response?.data?.data?.length || 0,
      };
      setCheckoutData(data);
    }
  };

  const handleContinueToPayment = async (values: addressType) => {
    const payload = {
      shippingAddress: {
        firstName: values.firstName,
        lastName: values?.lastName,
        address: `${values?.addressLineOne} ${values?.addressLineTwo}`,
        city: values?.city,
        state: values?.state,
        zipcode: values?.zipcode,
        country: values?.country,
        email: values?.email,
        phoneNumber: values?.phoneNumber,
      },
      billingAddress: {
        firstName: values?.firstName,
        lastName: values?.lastName,
        address: `${values?.addressLineOne} ${values?.addressLineTwo}`,
        city: values?.city,
        state: values?.state,
        zipcode: values?.zipcode,
        country: values?.country,
        email: values?.email,
        phoneNumber: values?.phoneNumber,
      },
      total:
        discountData.discountTotal !== 0
          ? discountData.totalAfterDiscount
          : checkoutData?.subTotal,
      discount: discountData.discountTotal || 0,
      discountCoupon: coupon || "",
      taxes: 0,
      shipping: 0,
      paymentType: "paypal",
    };

    setIsLoading(true);
    const response = await UserApi.checkoutOrdersAPI({ data: payload });
    if (response.remote === "success") {
      setIsLoading(false);
      dispatch(
        setToastMessage({
          message: "Order has placed successfully.",
          status: "success",
          open: true,
        }),
      );
      getAllCartProdList();

      router.push(`/order-success?order=${response.data.data.orderId}`);
    } else {
      setIsLoading(false);
      dispatch(
        setToastMessage({
          message: response.error.errors.message || "An error has occurs",
          status: "error",
          open: true,
        }),
      );
    }
  };

  /**
   * handle get all address
   */

  const handleGetAllAddress = async () => {
    const response = await UserApi.getAllAddressAPI();
    if (response.remote === "success") {
      const data = response.data.data;
      const addressList = data?.map((item: any) => ({
        id: item?.id,
        addressLineOne: item?.street1,
        addressLineTwo: item?.street2,
        country: item?.country,
        state: item?.state,
        city: item?.city,
        zipcode: item?.zipcode,
        isDefault: item?.default ? true : false,
        firstName: item?.first_name,
        lastName: item?.last_name,
        email: item?.email,
        company: item?.company,
        phoneNumber: item?.phone_number,
      }));
      setSelectedCard(addressList.find((el: any) => el.isDefault)?.id);
      setAllAddress(addressList);
    }
  };

  useEffect(() => {
    handleGetAllAddress();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && tokens.getAccessToken()) {
      getAllCartProdList();
    }
  }, []);

  return (
    <div className="">
      <div className="container">
        <div className="w-3/5">
          <div className="my-4">
            <BreadcrumbTwo
              items={breadcrumbItems}
              className="rounded-lg px-2 py-1"
            />
          </div>
        </div>
        {/* <div className="flex my-5 items-center justify-between">
          <h4 className="heading_crm_pages text-black font-bold capitalize text-2xl flex items-start">
            Checkout
          </h4>
        </div> */}
        <div className="flex gap-7 mb-28">
          <div className="w-8/12 ">
            <div className="px-4 py-5 border checkout_page_forms rounded-2xl">
              {!showAddAddressForm && (
                <>
                  {allAddress.length === 0 ? (
                    // <div className="min-h-[450px] text-center mx-auto rounded-2xl">
                    //   <div className="mx-auto text-center flex justify-center w-full mt-2">
                    //     <SVG.noOffer />
                    //   </div>
                    //   <p className="text-black my-2 font-bold normal-case text-xl">
                    //     No Address Found
                    //   </p>

                    //   <p className="normal-case">
                    //     You don’t added any address please add your default
                    //     address
                    //   </p>
                    //   <p
                    //     className="underline text-primaryMain font-semibold mt-2 normal-case cursor-pointer"
                    //     onClick={() => setShowAddAddressForm(true)}
                    //   >
                    //     Add New Address
                    //   </p>
                    // </div>
                    <div className="mb-5">
                      <div className="border-b mb-2">
                        <h5 className="text-2xl text-primaryMain font-semibold mb-2 normal-case">
                          Shipping address
                        </h5>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <InputComponent
                            className="capitalize font-medium text-[#000!important] "
                            label="First name"
                            placeholder="Write here"
                            mandatory={true}
                            {...formik.getFieldProps("firstName")}
                          />
                          {formik.touched.firstName &&
                            formik.errors.firstName && (
                              <ErrorText>{formik.errors.firstName}</ErrorText>
                            )}
                        </div>
                        <div>
                          <InputComponent
                            className="capitalize font-medium text-[#000!important]"
                            label="Last name"
                            placeholder="Write here"
                            mandatory={true}
                            {...formik.getFieldProps("lastName")}
                          />
                          {formik.touched.lastName &&
                            formik.errors.lastName && (
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
                          mandatory={true}
                          {...formik.getFieldProps("addressLineOne")}
                        />
                        {formik.touched.addressLineOne &&
                          formik.errors.addressLineOne && (
                            <ErrorText>
                              {formik.errors.addressLineOne}
                            </ErrorText>
                          )}
                      </div>
                      <div className="mt-4 grid grid-cols-4 gap-4">
                        <div className="">
                          <SearchSingleSelect
                            options={Countries.filter(
                              (item) => item.iso2 === "US",
                            ).map((item: any) => {
                              return { label: item.name, value: item.name };
                            })}
                            label="Country"
                            mandatory={true}
                            value={{
                              label: "United States",
                              value: "United States",
                            }}
                            onChange={(data) => handleCountrySelect(data)}
                          />
                          {formik.touched.country && formik.errors.country && (
                            <ErrorText>{formik.errors.country}</ErrorText>
                          )}
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
                          {formik.touched.state && formik.errors.state && (
                            <ErrorText>{formik.errors.state}</ErrorText>
                          )}
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
                            {formik.touched.zipcode &&
                              formik.errors.zipcode && (
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
                          mandatory={true}
                          {...formik.getFieldProps("phoneNumber")}
                        />
                        {formik.touched.phoneNumber &&
                          formik.errors.phoneNumber && (
                            <ErrorText>{formik.errors.phoneNumber}</ErrorText>
                          )}
                      </div>
                    </div>
                  ) : (
                    <DeliveryAddressForm
                      handleNewAddress={() => setShowAddAddressForm(true)}
                      allAddress={allAddress}
                      selectedCard={selectedCard}
                      handleSelectCard={(vl) => setSelectedCard(vl)}
                    />
                  )}
                </>
              )}

              <div className="text-end">
                <button
                  disabled={isLoading}
                  onClick={() => {
                    // if (showAddAddressForm) {
                    formik.handleSubmit();
                    // } else {
                    //   const selectedAddress = allAddress?.find(
                    //     (el) => el.id === selectedCard,
                    //   );
                    //   const payload: addressType = {
                    //     firstName: selectedAddress?.firstName || "",
                    //     lastName: selectedAddress?.lastName || "",
                    //     email: selectedAddress?.email || "",
                    //     phoneNumber: selectedAddress?.phoneNumber || "",
                    //     company: selectedAddress?.company || "",
                    //     addressLineOne: selectedAddress?.addressLineOne || "",
                    //     addressLineTwo: selectedAddress?.addressLineTwo || "",
                    //     country: selectedAddress?.country || "",
                    //     state: selectedAddress?.state || "",
                    //     city: selectedAddress?.city || "",
                    //     zipcode: selectedAddress?.zipcode || "",
                    //   };
                    //   handleContinueToPayment(payload);
                    // }
                  }}
                  className="relative bg-primaryMain text-white w-4/12 h-10 font-normal rounded-lg"
                >
                  {isLoading && (
                    <>
                      <span className="absolute left-[7%] top-[35%]">
                        <ButtonLoader />
                      </span>
                    </>
                  )}
                  Continue to Payment
                </button>
                <div className="mt-6">
                  <ul className="flex justify-end gap-5 items-center">
                    <li>
                      <SVG.visaBlue />
                    </li>
                    <li>
                      <SVG.americanExpressBlue />
                    </li>
                    <li>
                      <SVG.masterCardBlue />
                    </li>
                    <li>
                      <SVG.stripeBlue />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="w-4/12 ">
            <div className="border px-3 py-4 mb-8 rounded-2xl">
              <h4 className="text-black text-base font-bold normal-case">
                Products
              </h4>
              {allCartProd?.map((el: any) => (
                <ProductShortCard
                  productId={el?.product?.ID}
                  sellerId={el?.product?.wp_nepaz2_users?.id}
                  key={el?.id}
                  productTitle={el?.product?.post_name}
                  productImage={
                    el?.product?.attachment[0]?.guid
                      ? el?.product?.attachment[0]?.guid?.includes("http")
                        ? el?.product?.attachment[0]?.guid
                        : `${process.env.NEXT_PUBLIC_API_BASE_URL}${el?.product?.attachment[0]?.guid}`
                      : ""
                  }
                  productPrice={
                    el?.product?.wp_nepaz2_postmeta?.find(
                      (el: any) => el.meta_key === "sale_price",
                    )?.meta_value
                      ? el?.product?.wp_nepaz2_postmeta?.find(
                          (el: any) => el.meta_key === "sale_price",
                        )?.meta_value
                      : el?.product?.wp_nepaz2_postmeta?.find(
                          (el: any) => el.meta_key === "_price",
                        )?.meta_value
                  }
                  storeName={decodeHtmlEntities(
                    el?.product?.wp_nepaz2_users?.display_name,
                  )}
                  condition={
                    el?.product?.wp_term_relationships?.find(
                      (el: any) =>
                        el?.term_taxonomy?.taxonomy === "pa_condition",
                    )?.term_taxonomy?.term?.name
                  }
                />
              ))}
            </div>
            <SummaryCard
              checkoutData={checkoutData}
              setDiscountCouponData={setDiscountData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
