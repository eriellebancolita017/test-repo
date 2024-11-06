import SkeletonLoader from "@/components/loader/skeletonLoader";
import React from "react";
interface ProductCardProps {
  type?: "gridView" | "listView" | "w-full";
}
// Update the component to accept props
export default function SkeletonProductCard({ type }: ProductCardProps) {
  return (
    <div
      className={`product_card border-2 p-3 rounded-lg relative ${type === "listView" ? "flex w-full" : type === "w-full" ? "block w-full" : "block w-[243px]"}`}
    >
      <div className="absolute right-2">
        <span className="text-yellow-600 w-5 h-5 cursor-pointer">
          <SkeletonLoader type="rectangular" width="100%" height={10} />
        </span>
      </div>
      <div
        className={`${type === "listView" ? " border-r pr-3 mr-3" : "text-center"} `}
      >
        <div
          className={`${type === "listView" ? "pr-3" : "mx-auto text-center"} cursor-pointer `}
        >
          <SkeletonLoader
            imgPreview={true}
            type="rectangular"
            width="100%"
            height={199}
          />
        </div>
        <ul className="flex justify-between mt-3">
          <li className="text-gray-400 flex items-center text-xs">
            <SkeletonLoader type="rectangular" width={28} height={18} />
          </li>
          <li className="text-gray-400 flex items-center text-xs">
            <SkeletonLoader type="rectangular" width={28} height={18} />
          </li>
          <li className="text-gray-400 flex items-center text-xs">
            <SkeletonLoader type="rectangular" width={28} height={18} />
          </li>
        </ul>
      </div>
      <div className="py-2 w-full">
        <div
          className={` ${type === "listView" ? "flex w-full justify-between" : "block"}`}
        >
          <div className={`${type === "listView" ? "w-6/12" : "w-full"}`}>
            <h5 className="text-zinc-600 h-12 space-y-1 capitalize text-sm normal-case font-medium leading-4 cursor-pointer overflow-hidden text-ellipsis line-clamp-3">
              <SkeletonLoader type="rectangular" width="100%" height={10} />
              <SkeletonLoader type="rectangular" width="100%" height={10} />
              <SkeletonLoader type="rectangular" width="100%" height={10} />
            </h5>

            <p className="mt-2 mb-2  text-primaryMain font-medium text-xs">
              <SkeletonLoader type="rectangular" width={50} height={10} />
            </p>
            <div className="flex items-baseline gap-2">
              <h4 className="text-lg text-black font-bold">
                <SkeletonLoader type="rectangular" width={50} height={20} />
              </h4>
              <p className="text-zinc-400 text-[12px] normal-case">
                <SkeletonLoader type="rectangular" width={80} height={10} />
              </p>
            </div>
            <div className="flex justify-between items-center my-2 ">
              <div className="flex items-center">
                <SkeletonLoader type="circular" width={40} height={40} />

                <div className="ml-2 space-y-1">
                  <p className="text-black font-bold text-[12px] normal-case">
                    <SkeletonLoader type="rectangular" width={40} height={10} />
                  </p>
                  <p className="text-[10px] font-medium normal-case">
                    <SkeletonLoader type="rectangular" width={60} height={10} />
                  </p>
                </div>
              </div>
              <SkeletonLoader type="rectangular" width={50} height={28} />
            </div>
          </div>
          <div
            className={` mt-4 gap-3 ${type === "listView" ? "block text-end w-3/12" : "flex justify-between"}`}
          >
            <SkeletonLoader type="rectangular" width={72} height={36} />

            {/* <div className="flex justify-end"> */}
            <SkeletonLoader type="rectangular" width={72} height={36} />

            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
