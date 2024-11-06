"use client";

import EditMenu from "@/components/edit-menu";
import React from "react";
import SVG from "@/public/svg";

// Import utilities

export default function DashboardCard01() {
  return (
    <div className="flex pb-3 flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          {/* <Image src={Icon} width={32} height={32} alt="Icon 01" /> */}
          <SVG.iconPicOne />
          {/* Menu button */}
          <EditMenu align="right" />
        </header>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
          Lifetime Earning
        </h2>
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">
          Amount
        </div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">
            $24,780
          </div>
        </div>
      </div>

      <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]"></div>

      {/* <RoundedLoader /> */}
    </div>
  );
}
