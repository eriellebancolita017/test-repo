import InputComponent from "@/components/common/inputField/page";
import React from "react";
interface GetPaidProps {
  setStripSetupModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const StripSetup: React.FC<GetPaidProps> = ({ setStripSetupModalOpen }) => {
  return (
    <>
      <div className=" text-left font-semibold rounded-full text-2xl text-slate-950 from-slate-100 to-slate-200 dark:from-slate-700/30 dark:to-slate-700 mb-2">
        Setup Payment Method
      </div>
      <p className="text-slate-900 text-md font-semibold text-left mt-4">
        Send funds directly by Stripe.
      </p>{" "}
      <div className={`grid grid-cols-1 mt-4 mb-4 gap-5`}>
        <div className="w-12/12">
          <div className=" ">
            <InputComponent className="w-[50%]" label="Stripe Id" />
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-10">
        <button
          className="btn bg-transparent text-primaryMain font-semibold hover:text-white hover:bg-blueTwo  border border-primaryMain mr-4"
          onClick={() => setStripSetupModalOpen(false)}
        >
          {" "}
          <span className="hidden xs:block">Cancel</span>
        </button>
        <button className="btn bg-primaryMain text-white font-semibold hover:text-white hover:bg-blueTwo  border border-primaryMain">
          {" "}
          <span
            className="hidden xs:block"
            onClick={() => setStripSetupModalOpen(false)}
          >
            Save
          </span>
        </button>
      </div>
    </>
  );
};

export default StripSetup;
