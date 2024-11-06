import React from "react";
interface GetPaidProps {
  // Define the properties and their types
  setWithdrawlScheduleOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // Add more props as needed
}
const WithdrawSchedule: React.FC<GetPaidProps> = ({
  setWithdrawlScheduleOpen,
}) => {
  return (
    <div>
      {" "}
      <div className="mb-2 text-center ">
        <div className=" text-left font-semibold rounded-full text-2xl text-slate-950 from-slate-100 to-slate-200 dark:from-slate-700/30 dark:to-slate-700 mb-2">
          Edit Withdrawal Schedule
        </div>
        <p className="text-slate-900 text-lg font-semibold text-left mt-4">
          Preferred withdrawal method
        </p>
        <p className=" text-left text-slate-900 dark:text-slate-100 ">
          ICICI BANK LTD account ending in 4603(USD)
        </p>
        {/* <div className="mt-5">
          <p className="text-slate-900 text-lg font-semibold text-left mt-4">
            Preferred withdrawal schedule
          </p>
          <p className=" text-left text-slate-900 dark:text-slate-100  ">
            Earning will be released upon your request.{" "}
            <span className="text-green-500 underline cursor-pointer">
              Learn More
            </span>
          </p>
        </div> */}

        <div className="">
          <ul className="mt-5 text-left">
            <ul>
              <li className="text-md font-semibold mb-3 text-slate-900 text-left">
                <input
                  type="radio"
                  name="withdrawal_schedule"
                  className="mr-2 text-slate-900"
                />
                Quarterly{" "}
                <span className="text-sm font-normal">(Jun 24,2024)</span>
              </li>
              <li className="text-md font-semibold mb-3 text-slate-900 text-left">
                <input
                  type="radio"
                  name="withdrawal_schedule"
                  className="mr-2 focus:border-none "
                />
                Monthly{" "}
                <span className="text-sm font-normal">
                  (last Wednesday of each month)
                </span>
              </li>
              <li className="text-md font-semibold mb-3 text-slate-900 text-left">
                <input
                  type="radio"
                  name="withdrawal_schedule"
                  className="mr-2"
                />
                Twice per month{" "}
                <span className="text-sm font-normal">
                  {" "}
                  (last Wednesday of each month)
                </span>
              </li>
              <li className="text-md font-semibold mb-3 text-slate-900 text-left">
                <input
                  type="radio"
                  name="withdrawal_schedule"
                  className="mr-2"
                />
                Weekly
                <span className="text-sm font-normal"> (every Wednesday)</span>
              </li>
              <li className="text-md font-semibold mb-3 text-slate-900 text-left">
                <input
                  type="radio"
                  name="withdrawal_schedule"
                  className="mr-2"
                />
                Every 24 hours
                {/* <span className="text-sm font-normal"> (every Wednesday)</span> */}
              </li>
            </ul>
          </ul>
        </div>
      </div>
      <div className="flex justify-end mt-10">
        <button
          className="btn bg-transparent text-primaryMain font-semibold hover:text-white hover:bg-blueTwo  border border-primaryMain mr-4"
          onClick={() => setWithdrawlScheduleOpen(false)}
          // onClick={() => router.push("/add-products")}
        >
          {" "}
          <span className="hidden xs:block">Cancel</span>
        </button>
        <button
          className="btn bg-primaryMain text-white font-semibold hover:text-white hover:bg-blueTwo  border border-primaryMain"
          // onClick={() => router.push("/add-products")}
        >
          {" "}
          <span
            className="hidden xs:block"
            onClick={() => setWithdrawlScheduleOpen(false)}
          >
            Save Changes
          </span>
        </button>
      </div>
    </div>
  );
};

export default WithdrawSchedule;
