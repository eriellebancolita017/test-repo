import { SVGIcon } from "@/assets/svg";
import { Avatar } from "@mui/material";
import React, { useState } from "react";

export const FollowerList = ({
  followerListData,
}: {
  followerListData: any;
}) => {
  /**
   * state management
   */

  const [searchText, setSearchText] = useState<string>("");

  return (
    <div className="follower_following_list">
      <h5 className="font-bold text-xl text-[#151515] border-b pb-2 border-[#DDDDDD]">
        Followers ({followerListData?.length || 0})
      </h5>
      <div className="mb-8 mt-4 gap-6">
        <div className="flex relative items-center border border-[#00000080] rounded-3xl ">
          <input
            className="h-12 w-full px-2 placeholder:text-[#999999] rounded-3xl border border-slate-200 dark:border-slate-700"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className="absolute top-[6px] right-2 cursor-pointer bg-blue-200 rounded-full p-2">
            <SVGIcon.SearchIcon />
          </div>
        </div>
      </div>
      <div className="">
        <ul>
          {searchText
            ? followerListData
                ?.filter((el: any) =>
                  el?.follower?.display_name
                    .toLowerCase()
                    .includes(searchText.toLowerCase()),
                )
                ?.map((item: any) => (
                  <li
                    key={item?.id}
                    className="py-2 flex justify-between w-full items-center border-b border-[#DDDDDD]"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar
                        src={
                          item?.avatar?.guid?.includes("http")
                            ? item?.avatar?.guid
                            : `${process.env.NEXT_PUBLIC_API_BASE_URL}${item?.avatar?.guid}`
                        }
                        className="mr-1"
                        style={{
                          width: "50px",
                          height: "50px",
                          background: "#306cb5",
                        }}
                      >
                        {item?.follower?.display_name[0]}
                      </Avatar>
                      <div className="">
                        <p className="font-semibold text-base leading-[9px] text-[#1D364D] mb-0">
                          {item?.follower?.display_name}
                        </p>
                        <span className="text-xs text-[#666666]">
                          {item?.follower?.user_nicename}
                        </span>
                      </div>
                    </div>
                    {/* <button className="btn h-[34px] text-base font-semibold rounded-md bg-primaryMain hover:bg-blueTwo text-white">
                      <span className="hidden xs:block ">Remove</span>
                    </button> */}
                  </li>
                ))
            : followerListData?.map((item: any) => (
                <li
                  key={item?.id}
                  className="py-2 flex justify-between w-full items-center border-b border-[#DDDDDD]"
                >
                  <div className="flex items-center gap-2">
                    <Avatar
                      src={
                        item?.avatar?.guid?.includes("http")
                          ? item?.avatar?.guid
                          : `${process.env.NEXT_PUBLIC_API_BASE_URL}${item?.avatar?.guid}`
                      }
                      className="mr-1"
                      style={{
                        width: "50px",
                        height: "50px",
                        background: "#306cb5",
                      }}
                    >
                      {item?.follower?.display_name[0]}
                    </Avatar>
                    <div className="">
                      <p className="font-semibold text-base leading-[9px] text-[#1D364D] mb-0">
                        {item?.follower?.display_name}
                      </p>
                      <span className="text-xs text-[#666666]">
                        {item?.follower?.user_nicename}
                      </span>
                    </div>
                  </div>
                  {/* <button className="btn h-[34px] text-base font-semibold rounded-md bg-primaryMain hover:bg-blueTwo text-white">
                    <span className="hidden xs:block ">Remove</span>
                  </button> */}
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};
