/* eslint-disable @typescript-eslint/no-explicit-any */
import InputComponent from "@/components/common/inputField/page";
import TooltipCustom from "@/components/common/tooltip/tooltip";
import React from "react";

export default function SEO({
  onMetaKeywordChange,
  onMetaDescriptionChange,
  metaDescription,
  metaKeyword,
}: {
  onMetaKeywordChange: any;
  onMetaDescriptionChange: any;
  metaDescription: string;
  metaKeyword: string;
}) {
  return (
    <>
      <div className=" mt-4 mb-4 gap-5">
        <div className="w-12/12">
          <div className=" ">
            <InputComponent
              className="w-[50%]"
              label="Enter focus keyword(s) comma separated"
              showTooltip={true}
              value={metaKeyword}
              tooltipMessage="It should appear in title and first paragraph of the copy."
              onChange={(e: any) => onMetaKeywordChange(e.target.value)}
            />
          </div>
        </div>
        <div className="w-12/12">
          <div className="mt-4">
            <label className="flex text-zinc-600 text-sm font-bold mb-1">
              Meta Description{" "}
              <TooltipCustom bg="light" className="ms-2 ">
                <div className="text-[10px] font-normal text-slate-900 min-w-52 ">
                  Most search engines use a maximum of 160 chars for the
                  description.
                </div>
              </TooltipCustom>
            </label>
            <textarea
              className="min-h-16 rounded-sm border border-slate-200 w-full"
              rows={3}
              value={metaDescription}
              onChange={(e: any) => onMetaDescriptionChange(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}
