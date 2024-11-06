"use client";
import React, { useState } from "react";
import Link from "next/link";
import CheckboxComponent from "@/components/common/checkboxField/checkboxField";
import InputComponent from "@/components/common/inputField/page";
import { useRouter } from "next/navigation";
import SearchSingleSelect from "@/components/common/select/searchableSingleSelect";
import { useFormik } from "formik";
import { buyerSignupPayloadType } from "@fizno/api-client/src/models/messageTypes";
import { buyerSignupValidationSchema } from "./buyerSignupvalidationSchema";
import ErrorText from "@/components/common/errorText";
import { AuthApi } from "@fizno/api-client/src/apis/AuthApi";
import Cookies from "js-cookie";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  globalCacheStateSelector,
  setIsLoading,
} from "@/redux/slices/globaCache.slice";
import { SVGIcon } from "@/assets/svg";

const countryCode = [
  { value: "1", label: "+1" },
  { value: "91", label: "+91" },
  { value: "61", label: "+61" },
  { value: "275", label: "+275" },
];
const SellerRegister: React.FC = () => {
  /**
   * router
   */

  const router = useRouter();

  /**
   * redux
   */
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(globalCacheStateSelector);

  /**
   * state management
   */
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "error";
    open: boolean;
  }>({ message: "", severity: "success", open: false });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  /**
   * formik
   */

  const formik = useFormik<buyerSignupPayloadType>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      userName: "",
      password: "",
      confirmPassword: "",
      isAgree: true,
    },
    validationSchema: buyerSignupValidationSchema,
    onSubmit: (values, { setFieldError }) => {
      if (!values.isAgree) {
        setFieldError(
          "isAgree",
          "Please agree our privacy policy and term condition",
        );
      } else {
        handleRegisterBuyer(values);
      }
    },
  });

  /**
   * handle register buyer
   */

  const handleRegisterBuyer = async (values: buyerSignupPayloadType) => {
    dispatch(setIsLoading(true));
    const response = await AuthApi.buyerSignupAPI(values);
    if (response.remote === "success") {
      Cookies.set("accessToken", response.data.data.accessToken);
      Cookies.set("refreshToken", response.data.data.refreshToken);
      Cookies.set("userRole", response.data.data?.user?.role);
      if (typeof window !== "undefined") {
        localStorage.setItem("access-token", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        window.dispatchEvent(new Event("storage"));
      }
      dispatch(setIsLoading(false));
      router.push("/whats-new");
    } else {
      dispatch(setIsLoading(false));
      setSnackbar({
        message: response.error.errors.message || "An error occurred!",
        severity: "error",
        open: true,
      });
    }
  };

  return (
    <main className="bg-white dark:bg-slate-900">
      <div className="container">
        <div className="mt-8 mb-10">
          <div className="mt-5 text-center">
            <h1 className="heading_section_text font-bold uppercase">
              Register
            </h1>
            <span className="text-[#525252] font-normal">
              SEARCH, SELL & BUY. WE KEEP IT SIMPLE.
            </span>
          </div>
          <div className="relative md:flex items-center">
            {/* Content */}
            <div className="w-6/12">
              <div className="w-[500px] mx-auto">
                {" "}
                <p className="text-center font-normal mb-2 capitalize text-black">
                  Register with
                </p>
                <button className="border text-black  border-primaryMain flex justify-center items-center w-full rounded-md py-3">
                  <span className="mr-1">
                    {" "}
                    <SVGIcon.googleIcon />
                  </span>
                  Login With <b className="ml-1"> Google</b>
                </button>
                <button className="mt-3 text-black border border-primaryMain flex justify-center items-center w-full rounded-md py-3">
                  <span className="mr-1">
                    {" "}
                    <SVGIcon.FacebookSquareIcon />
                  </span>
                  Login With <b className="ml-1"> Facebook</b>
                </button>
                <button className="mt-3 text-black border border-primaryMain flex justify-center items-center w-full rounded-md py-3">
                  <span className="mr-1">
                    {" "}
                    <SVGIcon.AppleIcon />
                  </span>
                  Login With <b className="ml-1"> Apple</b>
                </button>
              </div>
            </div>
            <div className="md:w-6/12">
              <div className=" h-full flex flex-col after:flex-1">
                <div className=" mx-auto w-full px-6 py-8">
                  {/* Form */}
                  <form>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <InputComponent
                            className="capitalize font-medium text-[#000!important] "
                            label="First Name"
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
                            label="Last Name"
                            mandatory={true}
                            {...formik.getFieldProps("lastName")}
                          />
                          {formik.touched.lastName &&
                            formik.errors.lastName && (
                              <ErrorText>{formik.errors.lastName}</ErrorText>
                            )}
                        </div>
                      </div>
                      <div className="mb-4">
                        <InputComponent
                          className="capitalize font-medium text-[#000!important] "
                          label="Username"
                          mandatory={true}
                          {...formik.getFieldProps("userName")}
                        />
                        {formik.touched.userName && formik.errors.userName && (
                          <ErrorText>{formik.errors.userName}</ErrorText>
                        )}
                      </div>
                      <div className="mb-4">
                        <InputComponent
                          className="capitalize font-medium text-[#000!important] "
                          label="Email"
                          mandatory={true}
                          {...formik.getFieldProps("email")}
                        />
                        {formik.touched.email && formik.errors.email && (
                          <ErrorText>{formik.errors.email}</ErrorText>
                        )}
                      </div>
                      <div className="mt-4">
                        <label className=" normal-case text-black text-sm font-medium">
                          Phone Number <span className="text-red-500"> *</span>
                        </label>
                        <div
                          className="flex phone_input_code mt-0"
                          style={{ marginTop: "0!important" }}
                        >
                          <div className="w-2/12 mr-4">
                            <SearchSingleSelect
                              label=""
                              options={countryCode}
                              placeholder="+1"
                              isDisabled
                            />
                          </div>{" "}
                          <div className="w-10/12">
                            <InputComponent
                              className="capitalize font-medium text-[#000!important] "
                              label="Phone Number"
                              placeholder="XXXXXXXXXX"
                              mandatory={true}
                              maxLength={10}
                              {...formik.getFieldProps("phoneNumber")}
                            />
                          </div>
                        </div>
                        {formik.touched.phoneNumber &&
                          formik.errors.phoneNumber && (
                            <ErrorText>{formik.errors.phoneNumber}</ErrorText>
                          )}
                      </div>
                      <div className="">
                        <InputComponent
                          className="capitalize font-medium text-[#000!important] "
                          label="Password"
                          mandatory={true}
                          type="password"
                          {...formik.getFieldProps("password")}
                        />
                        {formik.touched.password && formik.errors.password && (
                          <ErrorText>{formik.errors.password}</ErrorText>
                        )}
                      </div>
                      <div className="">
                        <InputComponent
                          className="capitalize font-medium text-[#000!important] "
                          label="Confirm Password"
                          mandatory={true}
                          type="password"
                          {...formik.getFieldProps("confirmPassword")}
                        />
                        {formik.touched.confirmPassword &&
                          formik.errors.confirmPassword && (
                            <ErrorText>
                              {formik.errors.confirmPassword}
                            </ErrorText>
                          )}
                      </div>
                    </div>
                    <div className="mt-6">
                      <CheckboxComponent
                        label={
                          <>
                            By checking this box you agree to our{" "}
                            <Link
                              href=""
                              className="font-semibold text-primaryMain"
                            >
                              Privacy Policy
                            </Link>{" "}
                            and{" "}
                            <Link
                              href=""
                              className="font-semibold text-primaryMain"
                            >
                              Terms and Conditions
                            </Link>
                          </>
                        }
                        type="checkbox"
                        className="font-normal normal-case"
                        checked={formik.values.isAgree}
                        onChange={(vl) => {
                          formik.setFieldValue("isAgree", vl);
                        }}
                      />
                      {formik.errors.isAgree && (
                        <ErrorText>{formik.errors.isAgree}</ErrorText>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center w-full mt-4 gap-5">
            <button
              disabled={isLoading}
              onClick={() => formik.handleSubmit()}
              className="px-4 py-3 relative font-bold w-[500px] bg-primaryMain text-white rounded disabled:opacity-50"
            >
              {isLoading && (
                <>
                  <CircularProgress
                    size="20px"
                    sx={{
                      color: "#fff",
                      position: "absolute",
                      left: "37%",
                      top: "28%",
                    }}
                  />
                </>
              )}
              Register
            </button>
          </div>
          <p className="mt-3 normal-case text-center ">
            Already have an account ?
            <Link
              href="/login "
              className="font-semibold text-primaryMain ml-1"
            >
              Login Now
            </Link>
          </p>
        </div>
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </main>
  );
};

export default SellerRegister;
