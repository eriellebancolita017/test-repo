/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import InputComponent from "@/components/common/inputField/page";

export default function Offers({
  offer,
  setOffer,
  setMinimumOffer,
  minimumOffer,
}: {
  offer: string;
  setOffer: any;
  setMinimumOffer: any;
  minimumOffer: string;
}) {
  // const [offer, setOffer] = useState("not-now");

  return (
    <>
      <div className="flex mt-4 mb-4 gap-5">
        <div className="w-6/12">
          <label className="block text-zinc-600 text-sm font-bold mr-2 items-center">
            Open to Offers
          </label>
          <div className="flex">
            <div className="mt-2 flex items-center">
              <label
                className="block text-zinc-600 text-sm font-bold mr-2 items-center"
                htmlFor="enable_vacation_mode"
              >
                Yes
              </label>
              <input
                name="offer"
                type="radio"
                className="rounded-sm text-primaryMain border border-slate-200 h-4 w-4 rounded-sm dark:bg-[rgb(18,18,18)] dark:border-slate-700"
                checked={offer === "yes"}
                onChange={() => setOffer("yes")}
              />
            </div>
            <div className="mt-2 flex items-center ml-5">
              <label
                className="block text-zinc-600 text-sm font-bold mr-2 items-center"
                htmlFor="disable_purchase_during_vacation"
              >
                Not Now
              </label>
              <input
                name="offer"
                type="radio"
                className="rounded-sm text-primaryMain border border-slate-200 h-4 w-4 rounded-sm dark:bg-[rgb(18,18,18)] dark:border-slate-700"
                checked={offer === "not-now"}
                onChange={() => setOffer("not-now")}
              />
            </div>
          </div>
          {offer === "yes" && (
            <div className="mt-6">
              <InputComponent
                label="Minimum Offer"
                showTooltip={true}
                value={minimumOffer}
                tooltipMessage="Leave blank if no minimum offer"
                onChange={(e: any) => setMinimumOffer(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
