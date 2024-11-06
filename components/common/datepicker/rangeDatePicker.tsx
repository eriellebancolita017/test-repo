import React from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
// import "bootstrap/dist/css/bootstrap.css";
// you will also need the css that comes with bootstrap-daterangepicker
import "bootstrap-daterangepicker/daterangepicker.css";
export default function RangeDatePicker() {
  return (
    <div>
      <DateRangePicker
        initialSettings={{ startDate: "01/04/2024", endDate: "03/01/2024" }}
      >
        <input
          type="text"
          className="h-9 p-1 form-control rounded-sm border border-slate-200 dark:border-slate-700 dark:bg-[rgb(18,18,18)]"
        />
      </DateRangePicker>
    </div>
  );
}
