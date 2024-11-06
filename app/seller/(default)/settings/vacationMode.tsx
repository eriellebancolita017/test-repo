import SearchSingleSelect from "@/components/common/select/searchableSingleSelect";
import React from "react";

export default function VacationMode() {
  const timeArray = [
    { value: "instantly_close", label: "Instantly Close" },
    { value: "date_wise_close", label: "Date Wise Close" },
  ];
  return (
    <>
      {" "}
      <div className="flex mt-4 mb-4 gap-5">
        <div className="w-6/12">
          <div className="mt-4 flex items-center">
            <label
              className="block text-zinc-600 text-sm font-bold  mr-5 items-center "
              htmlFor="enable_vacation_mode"
            >
              Enable Vacation Mode
            </label>
            <input
              type="checkbox"
              className=" rounded-sm border border-slate-200 h-6 w-6 rounded-sm dark:bg-[rgb(18,18,18)]  dark:border-slate-700"
            />
          </div>
          <div className="mt-4 flex items-center">
            <label
              className="`block text-zinc-600 text-sm font-bold  mr-5 items-center "
              htmlFor="disable_purchase_during_vacation"
            >
              Disable Purchase During Vacation
            </label>
            <input
              type="checkbox"
              className=" rounded-sm border border-slate-200 h-6 w-6 rounded-sm dark:bg-[rgb(18,18,18)]  dark:border-slate-700"
            />
          </div>
          <div className="mt-4">
            {" "}
            <SearchSingleSelect label="Vacation Type" options={timeArray} />
          </div>
        </div>
        <div className="w-6/12">
          {" "}
          <div className=" mt-4 mb-4 gap-5">
            <div className="w-12/12">
              <div className="mt-4">
                <label className="block text-zinc-600 text-sm font-bold mb-1">
                  Vacation Message
                </label>
                <textarea
                  className="min-h-16 rounded-sm border border-slate-200 w-full dark:bg-[rgb(18,18,18)] dark:border-slate-700"
                  rows={4}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
