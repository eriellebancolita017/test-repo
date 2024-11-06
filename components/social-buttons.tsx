import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLoginRender from "react-facebook-login/dist/facebook-login-render-props";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setIsLoading } from "@/redux/slices/globaCache.slice";
import { setCartCount } from "@/redux/slices/product.slice";
import { AuthApi } from "@fizno/api-client/src/apis/AuthApi";
import { Alert, Snackbar } from "@mui/material";

type SocialProps = {
  type: "google" | "facebook";
  role: "seller" | "customer";
  screen: "login" | "register";
};

const SocialButtons: React.FC<SocialProps> = ({ type, role, screen }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "error";
    open: boolean;
  }>({ message: "", severity: "success", open: false });

  const handleSocial = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (response) => {
      const { access_token } = response;
      try {
        dispatch(setIsLoading(true));
        const res = await AuthApi.socialAuth({
          token: access_token,
          role,
          provider: type,
        });
        dispatch(setIsLoading(false));

        if (res.remote === "success") {
          Cookies.set("accessToken", res.data.data.accessToken);
          Cookies.set("refreshToken", res.data.data.refreshToken);
          Cookies.set("userRole", res.data.data?.user?.role);
          localStorage.setItem("access-token", res.data.data.accessToken);
          localStorage.setItem("refreshToken", res.data.data.refreshToken);
          dispatch(setCartCount(0));

          res.data.data?.user?.role === "seller"
            ? router.push("/seller/dashboard")
            : router.push("/whats-new");

          setSnackbar({
            message:
              screen == "login" ? "Login successful!" : "Register successful!",
            severity: "success",
            open: true,
          });
        } else {
          setSnackbar({
            message: "An error occurred!",
            severity: "error",
            open: true,
          });
        }
      } catch (error) {
        dispatch(setIsLoading(false));
        console.error("Google Login Error:", error);
      }
    },
    onError: (error) => console.error("Login Failed:", error),
  });

  const responseFacebook = async (response: any) => {
    const accessToken = response.accessToken;
    if (accessToken) {
      dispatch(setIsLoading(true));
      try {
        const res = await AuthApi.socialAuth({
          token: accessToken,
          role,
          provider: type,
        });
        dispatch(setIsLoading(false));
        if (res.remote === "success") {
          dispatch(setIsLoading(false));
          dispatch(setCartCount(0));
          Cookies.set("accessToken", res.data.data.accessToken);
          Cookies.set("refreshToken", res.data.data.refreshToken);
          Cookies.set("userRole", res.data.data?.user?.role);
          if (typeof window !== "undefined") {
            localStorage.setItem("access-token", res.data.data.accessToken);
            localStorage.setItem("refreshToken", res.data.data.refreshToken);
            window.dispatchEvent(new Event("storage"));
          }
          dispatch(setIsLoading(false));
          res.data.data?.user?.role === "seller"
            ? router.push("/seller/dashboard")
            : router.push("/whats-new");
          return setSnackbar({
            message:
              screen == "login" ? "Login successful!" : "Register successful!",
            severity: "success",
            open: true,
          });
        } else {
          return setSnackbar({
            message: "An error occurred!",
            severity: "error",
            open: true,
          });
        }
      } catch (error) {
        dispatch(setIsLoading(false));
      }
    } else {
      return setSnackbar({
        message: "An error occurred!",
        severity: "error",
        open: true,
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };
  return (
    <>
      {type === "google" && (
        <button
          type="button"
          className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors"
          onClick={() => handleSocial()}
        >
          {/* Google Icon */}
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        </button>
      )}
      {type === "facebook" && (
        <FacebookLoginRender
          appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!}
          callback={responseFacebook}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              type="button"
              className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-[#1877F2] hover:bg-[#1864F2] text-white transition-colors"
            >
              {/* Facebook Icon */}
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
          )}
        />
      )}
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
};

export default SocialButtons;
