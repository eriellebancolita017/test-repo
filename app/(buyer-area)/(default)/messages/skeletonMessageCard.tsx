/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import SkeletonLoader from "@/components/loader/skeletonLoader";

const SkeletonMessageCard = () => {
  return (
    <div className="flex mt-4">
      <div className="flex items-center w-full border-b border-[#DDDDDD] pb-4 mx-4">
        {/* <input
          checked={isChecked}
          onClick={() => handleCheck && handleCheck(message.per_id)}
          type="checkbox"
          className="form-checkbox mr-4"
        /> */}
        <div className="cursor-pointer">
          <div className="flex mb-4 gap-4">
            <div className="relative ">
              {/* <Avatar src="" style={{ width: "50px", height: "50px" }}>
                {message?.user?.display_name[0]}
              </Avatar> */}
              <SkeletonLoader type="circular" width={50} height={50} />
            </div>
            <div className="mr-4 w-48">
              <p className="font-semibold leading-4 text-base text-[#1D364D] flex items-end">
                <SkeletonLoader type="text" height={30} width="200px" />

                <span className=" py-[2px] px-2 text-[8px] rounded-xl text-white font-normal ml-2">
                  <SkeletonLoader type="text" height={18} width="50px" />
                </span>
              </p>
              <span className="text-xs font-medium text-[#666666] flex items-center gap-2">
                <SkeletonLoader type="text" height={20} width="100px" />
                <SkeletonLoader type="text" height={20} width="50px" />
              </span>
            </div>
          </div>
          <div className="mr-4 ">
            <p className="font-semibold leading-4 mb-1 text-base cursor-pointer text-[#1D364D] hover:underline normal-case">
              <SkeletonLoader type="text" height={30} width="150px" />
            </p>

            <p className="text-sm text-[#666666] font-medium leading-4 cursor-pointer">
              <SkeletonLoader type="text" height={20} width="300px" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonMessageCard;
