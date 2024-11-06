"use client";
import { tokens } from "@/helpers/jwtTokenFunction";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  globalCacheStateSelector,
  setToastMessage,
  setUser,
} from "@/redux/slices/globaCache.slice";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import Cookies from "js-cookie";
import {
  Alert,
  Box,
  IconButton,
  LinearProgress,
  Snackbar,
} from "@mui/material";
import React, { useEffect } from "react";
import { SVGIcon } from "@/assets/svg";

interface AuthEventListnerI {
  children: React.ReactNode;
}

const AuthEventListner = ({ children }: AuthEventListnerI) => {
  // const [progress, setProgress] = React.useState(0);
  const [alertProgress, setAlertProgress] = React.useState(0);

  /**
   * redux
   */

  const dispatch = useAppDispatch();
  const { toastMessage, refreshProfile } = useAppSelector(
    globalCacheStateSelector,
  );

  /**
   * handle fetch user profile
   */
  const handleFetchUserProfile = async () => {
    if (typeof window !== "undefined" && tokens.getAccessToken()) {
      const response = await UserApi.getUserDetail();
      if (response.remote == "success") {
        dispatch(setUser(response.data));
      }
    }
  };

  useEffect(() => {
    if (tokens.getAccessToken()) {
      handleFetchUserProfile();
      Cookies.set("accessToken", tokens.getAccessToken() || "");
      Cookies.set("refreshToken", tokens.getRefreshToken() || "");
    }
  }, [refreshProfile]);

  useEffect(() => {
    window.addEventListener("storage", handleFetchUserProfile);
    return () => window.removeEventListener("storage", handleFetchUserProfile);
  }, []);

  // React.useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((oldProgress) => {
  //       if (oldProgress === 100) {
  //         return 0;
  //       }
  //       const diff = Math.random() * 10;
  //       return Math.min(oldProgress + diff, 100);
  //     });
  //   }, 500);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  useEffect(() => {
    if (toastMessage?.open) {
      setAlertProgress(0); // Reset progress
      const timer = setInterval(() => {
        setAlertProgress((oldProgress) => {
          if (oldProgress >= 100) {
            clearInterval(timer); // Clear interval if progress reaches 100
            return 100;
          }
          return Math.min(oldProgress + 10, 100); // Increase progress
        });
      }, 600); // Adjust interval timing as needed

      return () => clearInterval(timer); // Cleanup on unmount or Snackbar close
    }
  }, [toastMessage]);
  return (
    <>
      {/* <div className="absolute top-0 left-0 w-full z-10">
        <LinearProgress
          sx={{ height: "6px" }}
          variant="determinate"
          value={progress}
        />
      </div> */}
      {children}
      <Snackbar
        open={toastMessage?.open}
        autoHideDuration={6000}
        onClose={() =>
          dispatch(
            setToastMessage({ message: "", open: false, status: "error" }),
          )
        }
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() =>
            dispatch(
              setToastMessage({ message: "", open: false, status: "error" }),
            )
          }
          severity={toastMessage?.status}
          sx={{
            textTransform: "none",
            borderRadius: "30px", // Custom border radius
            padding: "16px", // Padding inside the Alert
            position: "relative", // To position the progress bar at the bottom
          }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() =>
                dispatch(
                  setToastMessage({
                    message: "",
                    open: false,
                    status: "error",
                  }),
                )
              }
            >
              <SVGIcon.crossIcon />
            </IconButton>
          }
        >
          {toastMessage?.message}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: "20px",
              right: "20px",
              height: "4px", // Height of the progress bar
            }}
          >
            {/* Progress bar at the bottom */}
            <LinearProgress
              color={toastMessage?.status}
              variant="determinate"
              value={alertProgress}
            />
          </Box>
        </Alert>
      </Snackbar>
    </>
  );
};

export default AuthEventListner;
