/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CheckboxComponent from "@/components/common/checkboxField/checkboxField";
import InputComponent from "@/components/common/inputField/page";
import Link from "next/link";
import React, { useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { AuthApi } from "@fizno/api-client/src/apis/AuthApi";
import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/globaCache.slice";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import AppleSignin from "react-apple-signin-auth";
import SearchSingleSelect from "@/components/common/select/searchableSingleSelect";
import { SVGIcon } from "@/assets/svg";

interface SignUpValues {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  websiteUrl: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}
// import googleBtn from "@public/svg/mainpages/google.svg";
export default function FirstStep({
  handleNext,
}: {
  handleNext: () => void;
  currentStep?: number;
}) {
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "error";
    open: boolean;
  }>({ message: "", severity: "success", open: false });
  const [checked, setChecked] = useState(true);

  const dispatch = useAppDispatch();
  const formik = useFormik<SignUpValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      websiteUrl: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      userName: Yup.string().required("Required"),
      email: Yup.string().email().required("Required"),
      password: Yup.string()
        .required("Required")
        .min(8, "Password must be at least 8 characters"),
      confirmPassword: Yup.string().when("password", (password, field) =>
        password ? field.required().oneOf([Yup.ref("password")]) : field,
      ),
      phoneNumber: Yup.string()
        .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Phone number is not valid")
        .required("Phone number is required"),
    }),
    onSubmit: async (
      values: SignUpValues,
      { setSubmitting }: FormikHelpers<SignUpValues>,
    ) => {
      const response: any = await AuthApi.createUser(values);
      if (response.remote === "success") {
        setSnackbar({
          message: "create user successful!",
          severity: "success",
          open: true,
        });
        // Cookies.set("accessToken", response.data.accessToken);
        // Cookies.set("refreshToken", response.data.refreshToken);
        // localStorage.setItem("access-token", response.data.accessToken);
        // localStorage.setItem("refreshToken", response.data.refreshToken);
        dispatch(setUser(response.data.data));
        handleNext();
        // router.push("/dashboard");
      } else {
        setSnackbar({
          message: response.error.errors.message || "An error occurred!",
          severity: "error",
          open: true,
        });
      }
      setSubmitting(false);
    },
  });

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          },
        );

        const userInfo = await userInfoResponse.json();
        console.log(userInfo);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  const handleFacebookCallback = (response: any) => {
    if (response?.status === "unknown") {
      console.error("Sorry!", "Something went wrong with facebook Login.");
      return;
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };
  const countryCode = [{ value: "1", label: "+1" }];
  return (
    <>
      <div className="mt-5 text-center">
        <h1 className="heading_section_text font-bold">REGISTER</h1>
        <span className="text-[#525252] font-normal">
          SEARCH, SELL & BUY. WE KEEP IT SIMPLE.
        </span>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="relative md:flex items-center">
          {/* Content */}
          <div className="w-6/12">
            <div className="w-[500px] mx-auto">
              {" "}
              <p className="text-center font-normal mb-2 capitalize text-black">
                Register with
              </p>
              <button
                className="border text-black  border-primaryMain flex justify-center items-center w-full rounded-md py-3"
                type="button"
                onClick={() => {
                  handleGoogleLogin();
                }}
              >
                {" "}
                <span className="mr-1">
                  <SVGIcon.googleIcon />
                </span>
                Login With <b className="ml-2"> Google</b>
              </button>
              {/* <button className="mt-3 text-black border  border border-primaryMain flex justify-center items-center w-full rounded-md py-3">
                <SVGIcon.FacebookIcon />
                Login With <b className="ml-2"> Facebook</b>
              </button> */}
              <FacebookLogin
                appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID as string}
                fields="name,email,picture"
                autoLoad={false}
                callback={handleFacebookCallback}
                render={(renderProps) => (
                  <button
                    className="mt-3 text-black border  border-primaryMain flex justify-center items-center w-full rounded-md py-3"
                    type="button"
                    onClick={renderProps.onClick}
                  >
                    {" "}
                    <span className="mr-1">
                      <SVGIcon.FacebookSquareIcon />
                    </span>
                    Login With <b className="ml-2"> Facebook</b>
                  </button>
                )}
              />
              <AppleSignin
                authOptions={{
                  clientId: "com.example.web",
                  scope: "email name",
                  redirectURI: "http://localhost:3000",
                  state: "state",
                  usePopup: true,
                }}
                uiType="dark"
                onSuccess={(response: any) => console.log(response)}
                onError={(error: any) => console.error(error)}
                render={({ onClick }: { onClick: () => void }) => (
                  <button
                    className="mt-3 text-black border border-primaryMain flex justify-center items-center w-full rounded-md py-3"
                    type="button"
                    onClick={onClick}
                  >
                    {" "}
                    <span className="mr-1">
                      <SVGIcon.AppleIcon />
                    </span>
                    Login With <b className="ml-2"> Apple</b>
                  </button>
                )}
              />
              {/* <button className="mt-3 text-black border  border border-primaryMain flex justify-center items-center w-full rounded-md py-3">
                <SVGIcon.AppleIcon />
                Login With <b className="ml-2"> Apple</b>
              </button> */}
            </div>
          </div>
          <div className="md:w-6/12">
            <div className=" h-full flex flex-col after:flex-1">
              <div className=" mx-auto w-full px-6 py-8">
                {/* Form */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2    gap-4">
                    <div>
                      <InputComponent
                        className="capitalize font-medium text-[#000!important] "
                        label="First Name"
                        placeholder=""
                        mandatory={true}
                        {...formik.getFieldProps("firstName")}
                      />
                      {formik.touched.firstName && formik.errors.firstName ? (
                        <div className="text-red-600 text-sm">
                          {formik.errors.firstName}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <InputComponent
                        className="capitalize font-medium text-[#000!important]"
                        label="Last Name"
                        placeholder=""
                        mandatory={true}
                        {...formik.getFieldProps("lastName")}
                      />
                      {formik.touched.lastName && formik.errors.lastName ? (
                        <div className="text-red-600 text-sm">
                          {formik.errors.lastName}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="">
                    <div>
                      <InputComponent
                        className="capitalize font-medium text-[#000!important] "
                        label="Username"
                        placeholder=""
                        mandatory={true}
                        {...formik.getFieldProps("userName")}
                      />
                      {formik.touched.userName && formik.errors.userName ? (
                        <div className="text-red-600 text-sm">
                          {formik.errors.userName}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="">
                    <div>
                      <InputComponent
                        className="capitalize font-medium text-[#000!important] "
                        label="Email"
                        placeholder=""
                        mandatory={true}
                        {...formik.getFieldProps("email")}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-600 text-sm">
                          {formik.errors.email}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {/* <div className="">
                    <InputComponent
                      className="capitalize font-medium text-[#000!important] "
                      label="Website Url"
                      placeholder=""
                      mandatory={true}
                      {...formik.getFieldProps("websiteUrl")}
                    />
                  </div> */}
                  <div className="mt-4">
                    <label className=" normal-case text-black text-sm font-medium">
                      Phone Number <span className="text-red-500"> *</span>
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
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                      <div className="text-red-600 text-sm">
                        {formik.errors.phoneNumber}
                      </div>
                    ) : null}
                  </div>
                  <div className="">
                    <div>
                      <InputComponent
                        className="capitalize font-medium text-[#000!important] "
                        label="Password"
                        placeholder=""
                        mandatory={true}
                        type="password"
                        {...formik.getFieldProps("password")}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div className="text-red-600 text-sm">
                          {formik.errors.password}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="">
                    <div>
                      <InputComponent
                        className="capitalize font-medium text-[#000!important] "
                        label="Confirm Password"
                        placeholder=""
                        mandatory={true}
                        type="password"
                        {...formik.getFieldProps("confirmPassword")}
                      />
                      {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword ? (
                        <div className="text-red-600 text-sm">
                          {formik.errors.confirmPassword}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <CheckboxComponent
                    label={
                      <>
                        By checking this box you agree to our{" "}
                        <Link
                          href="/privacy-policy"
                          className="font-semibold text-primaryMain"
                        >
                          Privacy Policy
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/term-&-conditions"
                          className="font-semibold text-primaryMain"
                        >
                          Terms and Conditions
                        </Link>
                      </>
                    }
                    type="checkbox"
                    checked={checked}
                    onChange={(e: any) => setChecked(e)}
                    className="font-normal normal-case"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full stepper_next_btn mt-4">
          {/* <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button> */}
          <button
            // onClick={handleNext}
            type="submit"
            disabled={formik.isSubmitting}
            className="px-4 py-2 w-[500px] bg-primaryMain text-white rounded disabled:opacity-50"
          >
            {"Register"}
          </button>
        </div>
      </form>
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
    </>
  );
}
