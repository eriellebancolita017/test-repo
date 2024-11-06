/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CheckboxComponent from "@/components/common/checkboxField/checkboxField";
import InputComponent from "@/components/common/inputField/page";
import Link from "next/link";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Cookies from "js-cookie";

import React, { useState } from "react";
import { AuthApi } from "@fizno/api-client/src/apis/AuthApi";
import { useRouter } from "next/navigation";
// import SVG from "@/public/svg";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/globaCache.slice";
// import { useGoogleLogin } from "@react-oauth/google";
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
// import AppleSignin from "react-apple-signin-auth";
import { setCartCount } from "@/redux/slices/product.slice";
// import FacebookLoginRender from "react-facebook-login/dist/facebook-login-render-props";
interface SignInValues {
  email: string;
  password: string;
}
export default function BuyerLogin() {
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
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "error";
    open: boolean;
  }>({ message: "", severity: "success", open: false });

  /**
   * formik
   */

  const formik = useFormik<SignInValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
      password: Yup.string()
        .required("Required")
        .min(8, "Password must be at least 8 characters"),
    }),
    onSubmit: async (
      values: SignInValues,
      { setSubmitting }: FormikHelpers<SignInValues>,
    ) => {
      const response: any = await AuthApi.loginUser(values);
      if (response.remote === "success") {
        setSnackbar({
          message: "Login successful!",
          severity: "success",
          open: true,
        });
        Cookies.set("accessToken", response.data.accessToken);
        Cookies.set("refreshToken", response.data.refreshToken);
        Cookies.set("userRole", response.data?.user?.role);
        dispatch(setCartCount(0));
        if (typeof window !== "undefined") {
          window.localStorage.setItem(
            "access-token",
            response.data.accessToken,
          );
          window.localStorage.setItem(
            "refreshToken",
            response.data.refreshToken,
          );
        }

        dispatch(setUser(response.data));
        router.push("/seller/dashboard");
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

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <main className="bg-white dark:bg-slate-900">
      <div className="container">
        <div className="pt-5 text-center">
          <h1 className="heading_section_text font-bold">Login</h1>
          <span className="text-[#525252] font-normal">
            SEARCH, SELL & BUY. WE KEEP IT SIMPLE.
          </span>
        </div>
        <div className="relative md:flex items-center justify-center">
          {/* Content */}

          <div className="md:w-5/12">
            <div className=" h-full flex flex-col after:flex-1">
              <div className=" mx-auto w-full px-6 py-8">
                {/* Form */}
                <form onSubmit={formik.handleSubmit}>
                  <div className="space-y-4">
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
                          <div className="text-red-600">
                            {formik.errors.email}
                          </div>
                        ) : null}
                      </div>
                      <div className="mt-5">
                        <InputComponent
                          className="capitalize font-medium text-[#000!important]"
                          label="Password"
                          placeholder=""
                          mandatory={true}
                          {...formik.getFieldProps("password")}
                        />
                        {formik.touched.password && formik.errors.password ? (
                          <div className="text-red-600">
                            {formik.errors.password}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <CheckboxComponent
                      label={<>Remember me</>}
                      type="checkbox"
                      className="font-normal normal-case"
                    />
                    <Link
                      href=""
                      className="text-primaryMain capitalize text-sm"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className=" my-4">
                    <button
                      disabled={formik.isSubmitting}
                      style={{
                        background: formik.isSubmitting ? "grey" : "",
                      }}
                      type="submit"
                      onClick={() => formik.handleSubmit()}
                      className="px-4 py-2 block text-center w-full bg-primaryMain text-white rounded disabled:opacity-50"
                    >
                      Login Now
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="mt-3 normal-case text-center text-black ">
                      Didnt have an account ?
                      <Link
                        href="/seller/register"
                        className="font-semibold text-primaryMain ml-1"
                      >
                        Register Now
                      </Link>
                    </p>{" "}
                    <p className="my-4 text-black">OR</p>{" "}
                    <p className="mt-3 normal-case text-center text-black ">
                      Login with
                    </p>
                  </div>
                  <div className="flex justify-center mt-4">
                    {/* <FacebookLogin
                      appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID as string}
                      autoLoad={false}
                      fields="name,email,picture"
                      callback={handleFacebookCallback}
                      render={(renderProps) => (
                        <button
                          className="bg-transparent border border-primaryMain rounded-md p-2 mx-3 "
                          type="button"
                          onClick={renderProps.onClick}
                        >
                          <SVG.FacebookIcon />
                        </button>
                      )}
                    /> */}
                    {/* <button className="bg-transparent border border-primaryMain rounded-md p-2 ">
                      <SVG.AppleIcon />
                    </button> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
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
}
