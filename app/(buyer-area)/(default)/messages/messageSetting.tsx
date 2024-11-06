import React from "react";

export default function MessageSetting() {
  return (
    <>
      <h4 className="text-slate-950 font-semibold text-xl my-2">
        Set your prefrences below
      </h4>
      <ul>
        <li>
          {" "}
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="text-sm font-normal ml-2">
              Allow others to send me messages?
            </span>
          </label>
        </li>
        <li>
          {" "}
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="text-sm font-normal ml-2">
              Email me when I get new messages?
            </span>
          </label>
        </li>
        <li>
          {" "}
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="text-sm font-normal ml-2">
              Email me when new announcement is published?
            </span>
          </label>
        </li>
      </ul>
      <div className="mt-3">
        <button className="btn bg-primaryMain  hover:bg-blueTwo text-white">
          <span className="hidden xs:block">Save Changes</span>
        </button>
      </div>
    </>
  );
}
