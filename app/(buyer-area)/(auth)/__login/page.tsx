"use client";
import CheckboxComponent from "@/components/common/checkboxField/checkboxField";
import ErrorText from "@/components/common/errorText";
import InputComponent from "@/components/common/inputField/page";
import SVG from "@/public/svg";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  globalCacheStateSelector,
  setIsLoading,
} from "@/redux/slices/globaCache.slice";
import { setCartCount } from "@/redux/slices/product.slice";
import { AuthApi } from "@fizno/api-client/src/apis/AuthApi";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as Yup from "yup";

export default function BuyerLogin() {
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
  const formik = useFormik<{ email: string; password: string }>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required."),
      password: Yup.string().required("Password is required."),
    }),
    onSubmit: (values) => {
      handleSignIn(values);
    },
  });

  /**
   * handle sign in
   */

  const handleSignIn = async (values: { email: string; password: string }) => {
    dispatch(setIsLoading(true));
    const response = await AuthApi.buyerSigninAPI(values);
    if (response.remote === "success") {
      dispatch(setCartCount(0));
      Cookies.set("accessToken", response.data.data.accessToken);
      Cookies.set("refreshToken", response.data.data.refreshToken);
      Cookies.set("userRole", response.data.data?.user?.role);
      if (typeof window !== "undefined") {
        localStorage.setItem("access-token", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        window.dispatchEvent(new Event("storage"));
      }
      dispatch(setIsLoading(false));
      response.data.data?.user?.role === "seller"
        ? router.push("/seller/dashboard")
        : router.push("/whats-new");
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
        <div className="mt-5 text-center">
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
                <div>
                  <div className="space-y-4">
                    <div className="">
                      <div>
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
                      <div className="mt-5">
                        <InputComponent
                          className="capitalize font-medium text-[#000!important]"
                          label="Password"
                          mandatory={true}
                          {...formik.getFieldProps("password")}
                        />
                        {formik.touched.password && formik.errors.password && (
                          <ErrorText>{formik.errors.password}</ErrorText>
                        )}
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
                      href="/forgot-password"
                      className="text-primaryMain capitalize text-sm"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className=" my-4">
                    <button
                      disabled={isLoading}
                      onClick={() => formik.handleSubmit()}
                      className="px-4 py-2 relative text-center w-full bg-primaryMain text-white rounded disabled:opacity-50"
                    >
                      {isLoading && (
                        <>
                          <CircularProgress
                            size="20px"
                            sx={{
                              color: "#fff",
                              position: "absolute",
                              marginRight: "10px",
                              left: "35%",
                              top: "25%",
                            }}
                          />
                        </>
                      )}
                      Login Now
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="mt-3 normal-case text-center text-black ">
                      Didnt have an account ?
                      <Link
                        href="/register"
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
                    <button className="bg-transparent border border-primaryMain rounded-md p-3.5 ">
                      <SVG.googleIcon />
                    </button>
                    <button className="bg-transparent border border-primaryMain rounded-md p-2 mx-3 ">
                      <SVG.FacebookIcon />
                    </button>
                    <button className="bg-transparent border border-primaryMain rounded-md p-3.5 ">
                      <SVG.AppleIcon />
                    </button>
                  </div>
                </div>
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
