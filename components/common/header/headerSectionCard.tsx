"use client";
import SVG from "@/public/svg";
import { useAppSelector } from "@/redux/hooks";
import { globalCacheStateSelector } from "@/redux/slices/globaCache.slice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface HeaderSectionCardProps {
  title: string;
}

const HeaderSectionCard: React.FC<HeaderSectionCardProps> = ({ title }) => {
  /**
   * redux
   */
  const { user } = useAppSelector(globalCacheStateSelector);

  /**
   * state management
   */

  const [userData, setUserData] = useState<{ userStoreName: string }>({
    userStoreName: "",
  });

  console.log({ userData });

  useEffect(() => {
    if (user) {
      setUserData({
        userStoreName:
          user?.wp_nepaz2_usermeta?.find(
            (el: any) => el.meta_key === "dokan_profile_settings",
          )?.meta_value?.store_name || "",
      });
    }
  }, [user]);

  const router = useRouter();
  return (
    <div className="bg-white p-6 shadow-lg">
      <div className="flex flex-wrap justify-between w-[90vw] lg:w-full items-center mx-4">
        <h4 className="text-lg font-bold text-primaryMain normal-case">
          {title}
        </h4>
        <div className="account_switch_btn bg-primaryMain rounded-3xl p-1 flex">
          <button className="bg-white text-primaryMain rounded-3xl py-2 px-3 w-48 flex items-center">
            <span className="mr-2">
              <SVG.accountIcon />
            </span>
            Buyer Account
          </button>
          <button
            className="flex items-center bg-primaryMain text-white rounded-3xl py-2 px-2 w-6/12"
            onClick={() =>
              userData?.userStoreName
                ? router.push("/seller/dashboard")
                : router.push("/seller/register?type=newSeller")
            }
          >
            <span className="mr-2">
              <SVG.accountIcon />
            </span>{" "}
            Seller Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderSectionCard;
