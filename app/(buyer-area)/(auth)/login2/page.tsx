"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setIsLoading,
  globalCacheStateSelector,
} from "@/redux/slices/globaCache.slice";
import { setCartCount } from "@/redux/slices/product.slice";
import { AuthApi } from "@fizno/api-client/src/apis/AuthApi";
import Cookies from "js-cookie";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import SocialButtons from "@/components/social-buttons";

export default function Component() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(globalCacheStateSelector);

  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "error";
    open: boolean;
  }>({ message: "", severity: "success", open: false });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

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

  const handleSignIn = async (values: { email: string; password: string }) => {
    try {
      dispatch(setIsLoading(true));
      const response = await AuthApi.buyerSigninAPI(values);
      if (response.remote === "success") {
        const mainHeader = document.querySelectorAll(
          ".main_header",
        )?.[0] as HTMLElement;
        const subHeaderSection = document.querySelectorAll(
          ".subHeader_section",
        )?.[0] as HTMLElement;

        if (mainHeader) {
          mainHeader.style.display = "block";
        }

        if (subHeaderSection) {
          subHeaderSection.style.display = "block";
        }

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
    } catch (error) {
      console.log("ERROR", error);
      dispatch(setIsLoading(false));
      setSnackbar({
        message: "An error occurred!",
        severity: "error",
        open: true,
      });
    }
  };

  // const handleAppleSigninClick = (onClick: () => void) => {
  //   return (
  //     <button
  //       className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-black hover:bg-gray-900 text-white transition-colors"
  //       onClick={onClick}
  //     >
  //       <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
  //         <path d="M16.365 1.43c-.96.045-2.1.64-2.78 1.39-.61.67-1.14 1.75-.94 2.77.99.04 2.1-.63 2.77-1.38.62-.67 1.14-1.75.95-2.78zM12.79 6.75c-1.54 0-2.75.84-3.47.84-.74 0-1.88-.8-3.1-.78-1.6.02-3.08.93-3.91 2.36-1.68 2.9-.43 7.18 1.2 9.54.8 1.16 1.75 2.46 3.02 2.41 1.2-.05 1.65-.78 3.1-.78 1.45 0 1.85.78 3.1.76 1.28-.02 2.08-1.17 2.87-2.34.9-1.33 1.27-2.63 1.29-2.7-.03-.02-2.5-.96-2.52-3.77-.02-2.35 1.92-3.46 2-3.52-1.1-1.6-2.8-1.77-3.4-1.8-1.55-.12-2.85.9-3.6.9-.75 0-1.9-.88-3.1-.88z" />
  //       </svg>
  //     </button>
  //   );
  // };

  useEffect(() => {
    const mainContainer = document.getElementById("main_container");
    const bgVideo = document.getElementById("bg_video") as HTMLVideoElement;

    if (bgVideo) {
      bgVideo.playbackRate = 2;
    }

    if (mainContainer) {
      mainContainer.classList.remove("container");

      // Check if .main_header exists
      const mainHeader = document.querySelector(
        ".main_header",
      ) as HTMLElement | null;
      if (mainHeader) {
        mainHeader.style.display = "none";
      } else {
        console.warn("Element with class 'main_header' not found.");
      }

      // Check if .subHeader_section exists
      const subHeaderSection = document.querySelector(
        ".subHeader_section",
      ) as HTMLElement | null;
      if (subHeaderSection) {
        subHeaderSection.style.display = "none";
      } else {
        console.warn("Element with class 'subHeader_section' not found.");
      }
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 normal-case">
      <video
        id="bg_video"
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover z-[0]"
      >
        <source src="/videos/login_bg.mp4" type="video/mp4" />
        <p>Your browser does not support the video tag.</p>
      </video>
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl z-[1]">
        <div className="mb-8" onClick={() => router.push("/")}>
          <h1 className="text-2xl font-bold tracking-tight mb-2 cursor-pointer">
            FI<span className="text-purple-600">Z</span>NO
          </h1>
          <h2 className="text-xl font-semibold text-gray-900">Log In</h2>
        </div>

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="space-y-2">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              required
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 pr-10"
                required
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-600">Stay Logged In</span>
            </p>
            <Link
              href="#"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            disabled={isLoading}
          >
            {isLoading && (
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
            )}
            Login
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500 bg-white">or</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 ">
            <SocialButtons type="google" role="customer" screen="login" />
            <SocialButtons type="facebook" role="customer" screen="login" />
          </div>

          <div className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/register2"
              className="text-blue-600 hover:text-blue-700"
            >
              Create an Account
            </Link>
          </div>
        </form>
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
    </div>
  );
}
