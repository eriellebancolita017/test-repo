/* eslint-disable prettier/prettier */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import { setUser } from "@/redux/slices/globaCache.slice";
import { Avatar } from "@mui/material";

export default function DropdownProfile({
  align,
}: {
  align?: "left" | "right";
}) {
  /**
   * redux
   */
  const { user } = useAppSelector((state) => state.globalCache);

  const dispatch = useAppDispatch();

  /**
   * state management
   */
  const [userData, setUserData] = useState<{
    userName: string;
    userRole: string;
    userProfileImage: string;
  }>({
    userName: "",
    userRole: "",
    userProfileImage: "",
  });

  useEffect(() => {
    if (user && (user.display_name || user.role)) {
      setUserData({
        userName: user.display_name,
        userRole: user.role,
        userProfileImage: `${process.env.NEXT_PUBLIC_API_BASE_URL}${
          user?.wp_nepaz2_usermeta.find(
            (item: any) => item.meta_key === "dokan_profile_settings",
          )?.meta_value?.avatarImage?.guid
        }`,
      });
    }
  }, [user, user?.display_name]);

  useEffect(() => {
    fetchUserDetail();
  }, []);
  const fetchUserDetail = async () => {
    try {
      const response = await UserApi.getUserDetail();
      if (response.remote == "success") {
        dispatch(setUser(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const router = useRouter();
  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("userRole");
    if (typeof window !== "undefined") {
      localStorage.removeItem("access-token");
      localStorage.removeItem("refreshToken");
    }
    router.replace("/seller/login2");
  };
  return (
    <Menu as="div" className="relative inline-flex">
      <Menu.Button className="inline-flex justify-center items-center group">
        <Avatar
          src={userData.userProfileImage}
          style={{ width: "32px", height: "32px", background: "#306cb5" }}
        >
          {userData.userName[0]}
        </Avatar>

        <div className="flex items-center truncate">
          <span
            className="truncate ml-2 text-sm font-medium dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200"
            dangerouslySetInnerHTML={{ __html: userData?.userName }}
          />

          <svg
            className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </Menu.Button>
      <Transition
        as="div" // Specify the element to render
        className={`origin-top-right z-10 absolute top-full min-w-[11rem] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${
          align === "right" ? "right-0" : "left-0"
        }`}
        enter="transition ease-out duration-200 transform"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200 dark:border-slate-700">
          <div
            className="font-medium text-slate-800 dark:text-slate-100"
            dangerouslySetInnerHTML={{ __html: userData?.userName }}
          />

          <div className="text-xs text-slate-500 dark:text-slate-400 italic">
            Seller
          </div>
        </div>
        <Menu.Items as="ul" className="focus:outline-none">
          <Menu.Item as="li">
            {({ active }) => (
              <Link
                className={`font-medium text-sm flex items-center py-1 px-3 ${
                  active
                    ? "text-primaryMain dark:text-indigo-400"
                    : "text-primaryMain"
                }`}
                href="/seller/profile"
              >
                Profile
              </Link>
            )}
          </Menu.Item>
          <Menu.Item as="li">
            {({ active }) => (
              <Link
                className={`font-medium text-sm flex items-center py-1 px-3 ${
                  active
                    ? "text-primaryMain dark:text-indigo-400"
                    : "text-primaryMain"
                }`}
                href="/seller/settings"
              >
                Settings
              </Link>
            )}
          </Menu.Item>
          <Menu.Item as="li">
            {({ active }) => (
              <button
                className={`font-medium text-sm flex items-center py-1 px-3 ${
                  active
                    ? "text-primaryMain dark:text-indigo-400"
                    : "text-primaryMain"
                }`}
                onClick={logout}
              >
                Sign Out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
