"use client";
import React, { useEffect, useState } from "react";
import HeaderSectionCard from "@/components/common/header/headerSectionCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  globalCacheStateSelector,
  setUser,
} from "@/redux/slices/globaCache.slice";
import { Avatar } from "@mui/material";
import MediumSizeModal from "@/components/common/modal/mediumSizeModal";
import { FollowerList } from "@/components/common/listModal/followerList";
import { FollowingList } from "@/components/common/listModal/followingList";
import { tokens } from "@/helpers/jwtTokenFunction";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";

const MyProfile = () => {
  /**
   * redux
   */
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(globalCacheStateSelector);

  /**
   * state management
   */

  const [activeTab, setActiveTab] = useState("about");
  const [showingFollowingList, setShowingFollowingList] = useState(false);
  const [showingFollowerList, setShowingFollowerList] = useState(false);

  const [userData, setUserData] = useState<{
    userName: string;
    userRole: string;
    userProfileImage: string;
    follower: any;
    following: any;
    userDescription: string;
  }>({
    userName: "",
    userRole: "",
    userProfileImage: "",
    follower: [],
    following: [],
    userDescription: "",
  });

  const handleTabClick = (tabId: string) => {
    const section = document.getElementById(tabId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveTab(tabId);
    }
  };

  /**
   * handle fetch user profile
   */
  const handleFetchUserProfile = async () => {
    if (typeof window !== "undefined" && tokens.getAccessToken()) {
      const response = await UserApi.getUserDetail();
      if (response.remote == "success") {
        dispatch(setUser(response.data));
      }
    }
  };

  useEffect(() => {
    if (user && (user.display_name || user.role)) {
      setUserData({
        userName: user.display_name,
        userRole: user.role,
        userProfileImage: `${process.env.NEXT_PUBLIC_API_BASE_URL}${
          user?.avatar?.guid
        }`,
        follower: user?.follower,
        following: user?.following,
        userDescription: user?.wp_nepaz2_usermeta?.find(
          (el: any) => el.meta_key === "about",
        )?.meta_value,
      });
    }
  }, [user, user?.display_name]);

  return (
    <>
      <div className="store_page">
        <div className="">
          <HeaderSectionCard title="My Profile" />
        </div>
        <div className="bg-[#DFEDFF] py-4 px-8 mt-8">
          <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-between items-center ">
            <div className="">
              <div className="flex items-center">
                <Avatar
                  src={userData.userProfileImage}
                  style={{
                    width: "100px",
                    height: "100px",
                    background: "#306cb5",
                  }}
                >
                  {userData.userName[0]?.toUpperCase()}
                </Avatar>

                <div className="ml-3">
                  <p
                    className="text-primaryMain font-semibold text-2xl normal-case leading-6 whitespace-nowrap"
                    dangerouslySetInnerHTML={{ __html: userData.userName }}
                  />
                </div>
              </div>
            </div>
            <div className="">
              <ul className="flex">
                <li
                  onClick={() => setShowingFollowingList(true)}
                  className="border-r cursor-pointer border-[#898989] text-black text-xl font-semibold text-center px-3 leading-6 normal-case"
                >
                  <p>{userData.following?.length || 0}</p>
                  <p>Following</p>
                </li>

                <li
                  onClick={() => setShowingFollowerList(true)}
                  className="cursor-pointer text-black text-xl font-semibold text-center px-3 leading-6 normal-case"
                >
                  <p>{userData?.follower?.length || 0}</p>
                  <p>Followers</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Tabs Section */}
        <div className="container">
          <div className="mt-4 store__page__tab">
            <div className="relative main_tab_section">
              <div
                className="absolute showing_tab_border bottom-0 w-full h-px bg-slate-200 dark:bg-slate-700"
                aria-hidden="true"
              ></div>
              <ul className="flex ps-0">
                <li
                  className={`flex mr-6 last:mr-0 last:pr-4 sm:last:pr-6 lg:last:pr-8 ${
                    activeTab === "activity" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("activity")}
                >
                  <a
                    className={`block pb-3 whitespace-nowrap font-medium ${
                      activeTab === "activity"
                        ? "border-primaryMain border-b-2 text-primaryMain"
                        : ""
                    }`}
                    href="#activity"
                  >
                    Activity
                  </a>
                </li>
                <li
                  className={`flex mr-6 last:mr-0 last:pr-4 sm:last:pr-6 lg:last:pr-8 ${
                    activeTab === "gallery" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("gallery")}
                >
                  <a
                    className={`block pb-3 whitespace-nowrap font-medium ${
                      activeTab === "gallery"
                        ? "border-primaryMain border-b-2 text-primaryMain"
                        : ""
                    }`}
                    href="#gallery"
                  >
                    Gallery
                  </a>
                </li>
                <li
                  className={`flex mr-6 last:mr-0 last:pr-4 sm:last:pr-6 lg:last:pr-8 ${
                    activeTab === "about" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("about")}
                >
                  <a
                    className={`block pb-3 whitespace-nowrap font-medium ${
                      activeTab === "about"
                        ? "border-primaryMain border-b-2 text-primaryMain"
                        : ""
                    }`}
                    href="#about"
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="py-2 bg-[#DFEDFF] mt-4 px-4 mb-4" id="about">
          <div className="mx-auto pb-4">
            <div className="">
              <div className="flex my-2 items-center justify-center">
                <h4 className="heading_crm_pages text-black font-bold capitalize text-[40px]">
                  About Me
                </h4>
              </div>

              <div className=" py-5 normal-case ">
                <p className="text-lg font-medium text-black">
                  {userData.userDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MediumSizeModal
        isOpen={showingFollowerList}
        setIsOpen={setShowingFollowerList}
      >
        <FollowerList followerListData={userData.follower} />
      </MediumSizeModal>
      <MediumSizeModal
        isOpen={showingFollowingList}
        setIsOpen={setShowingFollowingList}
      >
        <FollowingList
          followingListData={userData?.following}
          handleRefresh={() => handleFetchUserProfile()}
        />
      </MediumSizeModal>
    </>
  );
};

export default MyProfile;
