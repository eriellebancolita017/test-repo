"use client";
import BuyerSidebar from "@/components/common/sidebar/buyerSidebar";
import { usePathname } from "next/navigation";
import React from "react";
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentPath = usePathname();
  const hidesidebar = currentPath;

  return (
    <div className="flex overflow-hidden bg-white">
      {/* Sidebar */}

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-x-hidden">
        {/*  Site header */}
        <div className="container">
          <div className="flex flex-col lg:flex-row w-[100vw] md:w-full">
            <div
              className={` ${hidesidebar === "/order-detail" ? "hidden" : "w-[100vw]   lg:w-1/5"} `}
            >
              <BuyerSidebar />
            </div>
            <div
              className={` ${hidesidebar === "/order-detail" ? "w-12/12" : "w-[100vw] md:w-full"} `}
            >
              {/*<main*/}
              {/*  className={`grow [&>*:first-child]:scroll-mt-16 bg-white uppercase p-5  pr-0 pb-22 ${hidesidebar === "/order-detail" ? "pl-0" : ""}  `}*/}
              {/*>*/}
              {children}
              {/*</main>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
