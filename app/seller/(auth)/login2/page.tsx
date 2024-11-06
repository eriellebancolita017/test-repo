"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setUser,
  globalCacheStateSelector,
} from "@/redux/slices/globaCache.slice";
import { setCartCount } from "@/redux/slices/product.slice";
import { AuthApi } from "@fizno/api-client/src/apis/AuthApi";
import Cookies from "js-cookie";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import SocialButtons from "@/components/social-buttons";

interface SignInValues {
  email: string;
  password: string;
}

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

  const formik = useFormik<SignInValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required."),
      password: Yup.string()
        .required("Password is required.")
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

  useEffect(() => {
    const mainContainer = document.getElementById("main_container");
    const bgVideo = document.getElementById("bg_video") as HTMLVideoElement;
    if (bgVideo) {
      bgVideo.playbackRate = 2;
    }
    if (mainContainer) {
      mainContainer.classList.remove("container");
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
            disabled={isLoading || formik.isSubmitting}
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
            <SocialButtons type="google" role="seller" screen="login" />
            <SocialButtons type="facebook" role="seller" screen="login" />
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
