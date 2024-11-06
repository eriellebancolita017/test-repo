"use client";

import React, { useState, useEffect } from "react";
import Tooltip from "@/components/tooltip";

// Import utilities
import { tailwindConfig, hexToRGB } from "@/components/utils/utils";
import RealtimeEarningChart from "./realtimeEarningChart";

export default function EarningGraph() {
  // IMPORTANT:
  // Code below is for demo purpose only, and it's not covered by support.
  // If you need to replace dummy data with real data,
  // refer to Chart.js documentation: https://www.chartjs.org/docs/latest

  // Fake real-time data
  const [counter, setCounter] = useState(0);
  const [increment, setIncrement] = useState(0);
  const [range, setRange] = useState(35);

  // Dummy data to be looped
  const data = [
    57.81, 57.75, 55.48, 54.28, 53.14, 52.25, 51.04, 52.49, 55.49, 56.87, 53.73,
    56.42, 58.06, 55.62, 58.16, 55.22, 58.67, 60.18, 61.31, 63.25, 65.91, 64.44,
    65.97, 62.27, 60.96, 59.34, 55.07, 59.85, 53.79, 51.92, 50.95, 49.65, 48.09,
    49.81, 47.85, 49.52, 50.21, 52.22, 54.42, 53.42, 50.91, 58.52, 53.37, 57.58,
    59.09, 59.36, 58.71, 59.42, 55.93, 57.71, 50.62, 56.28, 57.37, 53.08, 55.94,
    55.82, 53.94, 52.65, 50.25,
  ];

  const [, setSlicedData] = useState(data.slice(0, range));

  // Generate fake dates from now to back in time
  const generateDates = (): Date[] => {
    const now: Date = new Date();
    const dates: Date[] = [];

    data.forEach((v, i) => {
      dates.push(new Date(now.getTime() - 2000 - i * 2000));
    });

    return dates;
  };

  const [, setSlicedLabels] = useState(
    generateDates().slice(0, range).reverse(),
  );

  // Fake update every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(counter + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, [counter]);

  // Loop through data array and update
  useEffect(() => {
    setIncrement(increment + 1);
    if (increment + range < data.length) {
      setSlicedData(([...slicedData]) => [
        ...slicedData,
        data[increment + range],
      ]);
    } else {
      setIncrement(0);
      setRange(0);
    }
    setSlicedLabels(([...slicedLabels]) => [...slicedLabels, new Date()]);
    return () => setIncrement(0);
  }, [counter]);

  const chartData = {
    labels: [
      "2023-01-01",
      "2023-02-01",
      "2023-03-01",
      "2023-04-01",
      "2023-05-01",
      "2023-06-01",
      "2023-07-01",
      "2023-08-01",
      "2023-09-01",
      "2023-10-01",
      "2023-11-01",
      "2023-12-01",
    ],
    datasets: [
      {
        label: "Earnings",
        data: [30, 40, 50, 60, 70, 80, 90, 100, 80, 60, 40, 30],
        borderColor: tailwindConfig.theme.colors.indigo[500],
        backgroundColor: `rgba(${hexToRGB(
          tailwindConfig.theme.colors.blue[500],
        )}, 0.08)`,
        fill: true,
        pointRadius: 0, // Hide the markers
      },
    ],
  };

  // Usage
  <RealtimeEarningChart data={chartData} width={595} height={120} />;

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-2 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between ">
        <div className="flex w-full items-center">
          {" "}
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            Earning by Month
          </h2>
          <Tooltip className="ml-2">
            <div className="text-xs text-center whitespace-nowrap">
              Details of my earning
            </div>
          </Tooltip>
        </div>
        <select className="w-40 h-9  border-slate-200 border rounded-sm dark:bg-[rgb(18,18,18)] dark:border-slate-700">
          <option>All Months</option>
          <option>January</option>
          <option>February</option>
          <option>March</option>
          <option>April</option>
          <option>May</option>
          <option>June</option>
          <option>July</option>
          <option>August</option>
          <option>September</option>
          <option>October</option>
          <option>November</option>
          <option>December</option>
        </select>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <RealtimeEarningChart data={chartData} width={595} height={120} />
    </div>
  );
}
