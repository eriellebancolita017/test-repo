"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";
import { useAppSelector } from "@/redux/hooks";
import { globalCacheStateSelector } from "@/redux/slices/globaCache.slice";
import { Alert, Snackbar } from "@mui/material";
//import { useRouter } from "next/navigation";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /**
   * router
   */
  //const router = useRouter();

  /**
   * redux
   */

  const { user } = useAppSelector(globalCacheStateSelector);
  /**
   * state management
   */

  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "error";
    open: boolean;
  }>({ message: "", severity: "success", open: false });

  useEffect(() => {
    if (user && user.role === "customer") {
      setSnackbar({
        message: "You are not register as seller yet.",
        severity: "error",
        open: true,
      });
      //router.push("/whats-new");
    }
  }, [user]);

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header />

        <main className="grow [&>*:first-child]:scroll-mt-16">{children}</main>
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
    </div>
  );
}
