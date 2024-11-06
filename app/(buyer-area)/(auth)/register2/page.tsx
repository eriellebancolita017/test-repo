"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useFormik } from "formik";
import { buyerSignupPayloadType } from "@fizno/api-client/src/models/messageTypes";
import { buyerSignupValidationSchema } from "./buyerSignupvalidationSchema";
import { AuthApi } from "@fizno/api-client/src/apis/AuthApi";
import Cookies from "js-cookie";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  globalCacheStateSelector,
  setIsLoading,
} from "@/redux/slices/globaCache.slice";
import SocialButtons from "@/components/social-buttons";

export default function Component() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(globalCacheStateSelector);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "error";
    open: boolean;
  }>({ message: "", severity: "success", open: false });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

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
    onSubmit: async (values, { setFieldError }) => {
      if (!values.isAgree) {
        setFieldError(
          "isAgree",
          "Please agree to our privacy policy and terms and conditions",
        );
      } else {
        dispatch(setIsLoading(true));
        const response = await AuthApi.buyerSignupAPI(values);
        if (response.remote === "success") {
          Cookies.set("accessToken", response.data.data.accessToken);
          Cookies.set("refreshToken", response.data.data.refreshToken);
          Cookies.set("userRole", response.data.data?.user?.role);
          if (typeof window !== "undefined") {
            localStorage.setItem(
              "access-token",
              response.data.data.accessToken,
            );
            localStorage.setItem(
              "refreshToken",
              response.data.data.refreshToken,
            );
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
      }
    },
  });

  const handleOnLogoClick = () => {
    router.push("/");
  };

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
      <div className="w-full max-w-[600px] bg-white rounded-3xl p-8 md:p-8 z-[1]">
        <div className="mb-4">
          <h2
            className="text-2xl font-bold tracking-tight mb-2 cursor-pointer"
            onClick={handleOnLogoClick}
          >
            FI<span className="text-purple-600">Z</span>NO
          </h2>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-8">
          Create an account
        </h2>

        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                {...formik.getFieldProps("firstName")}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="text-red-500 text-sm">
                  {formik.errors.firstName}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                {...formik.getFieldProps("lastName")}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                {...formik.getFieldProps("userName")}
              />
              {formik.touched.userName && formik.errors.userName && (
                <p className="text-red-500 text-sm">{formik.errors.userName}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <input
              type="tel"
              placeholder="Phone"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              {...formik.getFieldProps("phoneNumber")}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <p className="text-red-500 text-sm">
                {formik.errors.phoneNumber}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                {...formik.getFieldProps("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                {...formik.getFieldProps("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>
          </div>

          <div className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 h-4 w-4 rounded border-gray-300 text-[#6C47FF] focus:ring-[#6C47FF]"
              checked={formik.values.isAgree}
              onChange={(e) =>
                formik.setFieldValue("isAgree", e.target.checked)
              }
            />
            <p className="text-gray-600">
              By checking this box you agree to our{" "}
              <Link href="/privacy" className="text-blue-500 hover:underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="text-blue-500 hover:underline">
                Terms and Conditions
              </Link>
            </p>
          </div>
          {formik.errors.isAgree && (
            <p className="text-red-500 text-sm">{formik.errors.isAgree}</p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            disabled={isLoading}
          >
            {isLoading && (
              <CircularProgress
                size="20px"
                sx={{
                  color: "#fff",
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            )}
            Register
          </button>

          <div className="grid grid-cols-2 gap-4 mx-0 md:mx-12 lg:mx-16">
            <SocialButtons type="google" role="customer" screen="register" />
            <SocialButtons type="facebook" role="customer" screen="register" />
          </div>
        </form>

        <div className="text-sm mt-4 text-center">
          <p className="text-gray-600 ">
            Already have an Account{" "}
            <Link
              href="/login2"
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
            >
              Login →
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
    </div>
  );
}
