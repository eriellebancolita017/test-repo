"use client";
import SVG from "@/public/svg";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface SidebarItem {
  id: string;
  title: string;
  url: string;
  icon: JSX.Element;
  count: number;
}

const BuyerSidebar: React.FC = () => {
  /**
   * router
   */

  const router = useRouter();

  /**
   * state management
   */
  const currentPath = usePathname();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [allFavList, setAllFavList] = useState<any>([]);

  const sidebarArray: SidebarItem[] = [
    {
      id: "1",
      title: "See what's new",
      url: "/whats-new",
      icon: <SVG.newIcon />,
      count: 0,
    },
    {
      id: "2",
      title: "My Profile",
      url: "/my-profile",
      icon: <SVG.profileIcon />,
      count: 0,
    },
    {
      id: "3",
      title: "Messages",
      url: "/messages",
      icon: <SVG.messageIcon />,
      count: 1,
    },
    {
      id: "4",
      title: "My liked products",
      url: "/liked-products",
      icon: <SVG.hurtBlue />,
      count: allFavList?.length || 0,
    },
    {
      id: "5",
      title: "My offers",
      url: "/my-offers",
      icon: <SVG.offerIcon />,
      count: 1,
    },
    {
      id: "6",
      title: "Order History",
      url: "/order-history",
      icon: <SVG.boxAddIcon />,
      count: 1,
    },
    {
      id: "7",
      title: "Recently viewed",
      url: "/recently-viewed",
      icon: <SVG.cubeIcon />,
      count: 0,
    },
    {
      id: "8",
      title: "Settings",
      url: "#",
      icon: <SVG.settingIcon />,
      count: 0,
    },
    {
      id: "9",
      title: "Help",
      url: "#",
      icon: <SVG.infoIcon />,
      count: 0,
    },
  ];

  const handleMenuClick = (id: string) => {
    setActiveMenu((prevActiveMenu) => (prevActiveMenu === id ? null : id));
  };

  /**
   * handle sign out
   */
  const handleSignOut = async () => {
    if (typeof window !== "undefined") {
      localStorage?.removeItem("access-token");
      localStorage?.removeItem("refreshToken");
    }
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("userRole");
    router.push("/signin");
  };

  /**
   * get add to fav list
   */

  const getFavList = async () => {
    const response = await UserApi.allFavoriteAPI();
    if (response.remote === "success") {
      setAllFavList(response.data.data);
    }
  };

  useEffect(() => {
    getFavList();
  }, []);

  return (
    <div className="px-5 border-r  min-h-full">
      <ul className="pt-5 flex lg:block overflow-x-auto justify-items-center md:justify-items-start lg:overflow-x-hidden">
        {sidebarArray.map((item, index) => (
          <li className="w-full mx-4 lg:mx-0" key={index}>
            <Link
              href={item.url}
              onClick={() => handleMenuClick(item.id)}
              className={`cursor-pointer flex items-center justify-between border rounded-md mb-2 p-3 ${
                (currentPath === item.url && activeMenu !== "8") ||
                activeMenu === item.id
                  ? "bg-primaryMain text-white active_menu_sidebar"
                  : "border-primaryMain text-primaryMain"
              }`}
            >
              <div className="flex items-center min-w-[200px] lg:min-w-full ">
                <span className="mr-4">{item.icon}</span>
                <span className="text-base font-medium normal-case">
                  {item.title}
                </span>
              </div>
              {/* {item.count > 0 && (
                <div className="bg-red-600 text-white h-5 w-5 rounded-full flex items-center justify-center font-medium text-xs border-2 border-white">
                  {item.count}
                </div>
              )} */}
            </Link>
            {item.id === "8" && activeMenu === item.id && (
              <div className="py-2 pl-6 rounded-md border-l mb-2">
                <ul className="normal-case ">
                  <li
                    className={`text-[#666666] normal-case font-medium text-sm px-3 py-1 rounded-md ${
                      currentPath === item.url
                        ? "bg-[#F0F8FC] text-primaryMain"
                        : ""
                    } `}
                  >
                    <Link href="#">Fizno feed data</Link>
                  </li>
                  <li
                    className={`text-[#666666] normal-case font-medium text-sm px-3 py-1 rounded-md  ${
                      currentPath === "/edit-profile"
                        ? "bg-[#F0F8FC] text-primaryMain"
                        : ""
                    } `}
                  >
                    <Link href="/edit-profile"> Edit Profile</Link>
                  </li>
                  <li
                    className={`text-[#666666] normal-case font-medium text-sm px-3 py-1 rounded-md  ${
                      currentPath === item.url
                        ? "bg-[#F0F8FC] text-primaryMain"
                        : ""
                    } `}
                  >
                    <Link href="#"> Blocked users</Link>
                  </li>
                  <li
                    className={`text-[#666666] normal-case font-medium text-sm px-3 py-1 rounded-md  ${
                      currentPath === "/manage-address" ||
                      currentPath === "/add-new-address"
                        ? "bg-[#F0F8FC] text-primaryMain"
                        : ""
                    } `}
                  >
                    <Link href="/manage-address"> Manage Address</Link>
                  </li>
                  <li
                    className={`text-[#666666] normal-case font-medium text-sm px-3 py-1 rounded-md  ${
                      currentPath === item.url
                        ? "bg-[#F0F8FC] text-primaryMain"
                        : ""
                    } `}
                  >
                    <Link href="#"> Manage Payments</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
        ))}
        <li className="">
          <button
            onClick={handleSignOut}
            className="flex items-center border border-primaryMain rounded-md mb-4 p-3 w-full"
          >
            <span className="mr-4">
              <SVG.logoutIcon />
            </span>
            <span className="text-base text-primaryMain font-medium normal-case">
              Logout
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default BuyerSidebar;
