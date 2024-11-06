import SkeletonLoader from "@/components/loader/skeletonLoader";
// import Image from "next/image";
import React from "react";

export default function SkeletonSellerCard() {
  return (
    <>
      <div className="border-primaryMain rounded-lg px-3 py-3 border space-y-1">
        <div className="flex justify-between items-center my-2  ">
          <div className="flex items-start">
            <SkeletonLoader type="circular" width={50} height={50} />

            <div className="ml-2">
              <p className="text-primaryMain font-semibold text-xl normal-case leading-6 ">
                <SkeletonLoader type="text" width="200px" height={30} />
              </p>
              <p className=" font-medium text-[12px] normal-case">
                <SkeletonLoader type="text" width="120px" height={10} />
              </p>
              <p className=" font-medium text-[12px] normal-case">
                <SkeletonLoader type="text" width="120px" height={10} />
              </p>
            </div>
          </div>
          <SkeletonLoader type="text" width="60px" height={30} />
        </div>
        <div className="bg-blue-100 flex justify-center items-center text-primaryMain font-semibold normal-case h-9 rounded-lg">
          <SkeletonLoader type="text" width="100%" height={40} />
        </div>
      </div>
    </>
  );
}
