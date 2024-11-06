/* eslint-disable prettier/prettier */
"use client";
import React from "react";
import WelcomeBanner from "./welcome-banner";
import Datepicker from "@/components/datepicker";
import DashboardCard01 from "./dashboard-card-01";
import DashboardCard02 from "./dashboard-card-02";
import DashboardCard03 from "./dashboard-card-03";
import DashboardCard04 from "./dashboard-card-04";
import DashboardCard05 from "./dashboard-card-05";
import DashboardCard06 from "./dashboard-card-06";
import DashboardCard07 from "./dashboard-card-07";
import DashboardCard08 from "./dashboard-card-08";
import DashboardCard09 from "./dashboard-card-09";
import Followers from "./followers";
import Followings from "./followings";
function DashboardComponent() {
  return (
    <div className="px-4 sm:px-6 lg:px-6 py-6 w-full max-w-[96rem] mx-auto">
      <WelcomeBanner />
      {/* Dashboard actions */}
      <div className="sm:flex sm:justify-end sm:items-center mb-6">
        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Datepicker built with flatpickr */}
          <Datepicker align="right" />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-12 gap-6">
        {/* Line chart (Acme Plus) */}
        <DashboardCard01 />
        {/* Line chart (Acme Advanced) */}
        <DashboardCard02 />
        {/* Line chart (Acme Professional) */}
        <DashboardCard03 />
        {/* Bar chart (Direct vs Indirect) */}
        <DashboardCard04 />
        {/* Line chart (Real Time Value) */}
        <DashboardCard05 />
        {/* Doughnut chart (Top Countries) */}
        <DashboardCard06 />
        {/* Table (Top Channels) */}
        <DashboardCard07 />
        {/* Line chart (Sales Over Time) */}
        <DashboardCard08 />
        {/* Stacked bar chart (Sales VS Refunds) */}
        <DashboardCard09 />
        {/* Card (Recent Activity) */}
        <Followers />
        {/* Card (Income/Expenses) */}
        <Followings />
      </div>
    </div>
  );
}

export default DashboardComponent;
