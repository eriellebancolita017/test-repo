"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AuthApi } from "@fizno/api-client/src/apis/AuthApi";
import { useRouter, useSearchParams } from "next/navigation";
import RoundedLoader from "@/components/common/loader/roundedLoader";
import MediumSizeModal from "@/components/common/modal/mediumSizeModal";
import { FollowerList } from "@/components/common/listModal/followerList";
import { FollowingList } from "@/components/common/listModal/followingList";
import { Avatar } from "@mui/material";
import { decodeHtmlEntities } from "@/utils/commonFunction";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import { useAppDispatch } from "@/redux/hooks";
import { setIsLoading, setToastMessage } from "@/redux/slices/globaCache.slice";
import { tokens } from "@/helpers/jwtTokenFunction";

const BuyerPage = () => {
  /**
   * router
   */
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  /**
   * redux
   */

  const dispatch = useAppDispatch();

  /**
   * state management
   */

  const [activeTab, setActiveTab] = useState("about_section");
  const [userDetail, setUserDetail] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [showingFollowingList, setShowingFollowingList] = useState(false);
  const [showingFollowerList, setShowingFollowerList] = useState(false);

  const handleTabClick = (tabId: string) => {
    const section = document.getElementById(tabId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveTab(tabId);
    }
  };

  /**
   * handle follow user
   */

  const handleFollowUser = async (userId: number) => {
    const payload = { userId };
    dispatch(setIsLoading(true));
    const response = await UserApi.followUserAPI(payload);

    if (response.remote === "success") {
      dispatch(setIsLoading(false));
      getUserById();
    } else {
      dispatch(setIsLoading(false));
      dispatch(
        setToastMessage({
          message: response.error.errors.message || "An error occurred!",
          open: true,
          status: "error",
        }),
      );
    }
  };

  /**
   * get user details
   */

  const getUserById = async () => {
    try {
      const response = await AuthApi.getUserById(id as string);
      if (response.remote === "success") {
        setUserDetail(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getUserById();
    }
  }, [id]);

  return loading ? (
    <RoundedLoader />
  ) : (
    <>
      <div className="store_page">
        <div className="bg-[#DFEDFF] py-8">
          <div className="container">
            <div className="flex justify-between items-center my-2  ">
              <div className="w-52">
                <div className="flex items-start">
                  <Avatar
                    sx={{
                      width: "50px",
                      height: "50px",
                      background: "#306cb5",
                    }}
                    src={
                      userDetail?.avatar?.guid.includes("http")
                        ? userDetail?.avatar?.guid
                        : `${process.env.NEXT_PUBLIC_API_BASE_URL}${userDetail?.avatar?.guid}`
                    }
                  >
                    {userDetail?.display_name[0]}
                  </Avatar>

                  <div className="ml-2">
                    <p className="text-primaryMain font-semibold text-base normal-case leading-6">
                      {decodeHtmlEntities(userDetail?.display_name)}
                    </p>
                    {/* <p className=" font-medium text-[12px] normal-case">
                      Newyork, USA
                    </p> */}
                    <p className=" font-medium text-[12px] normal-case">
                      {userDetail?.follower?.length} followers
                    </p>
                  </div>
                </div>{" "}
                <button
                  disabled={!tokens.getAccessTokenCookies()}
                  onClick={() => id && handleFollowUser(Number(id))}
                  className="w-full bg-primaryMain px-8 py-1 text-white font-semibold rounded-md mt-4"
                >
                  Follow
                </button>
              </div>
              <div className="">
                <ul className="flex">
                  <li
                    onClick={() => setShowingFollowingList(true)}
                    className="border-r cursor-pointer border-[#898989] text-black text-xl font-semibold text-center px-3 leading-6 normal-case"
                  >
                    <p>{userDetail?.following?.length}</p>
                    <p>Following</p>
                  </li>

                  <li
                    onClick={() => setShowingFollowerList(true)}
                    className="cursor-pointer text-black text-xl font-semibold text-center px-3 leading-6 normal-case"
                  >
                    <p>{userDetail?.follower?.length}</p>
                    <p>Followers</p>
                  </li>
                </ul>
              </div>
              <div className="w-52">
                <div
                  onClick={() =>
                    tokens.getAccessTokenCookies()
                      ? router.push(`/messages?sendTo=${id}&tab="newMessage"`)
                      : router.push("/register")
                  }
                  className="bg-[#B2D2F9] flex justify-center items-center text-primaryMain font-semibold normal-case h-9 px-5 rounded-lg cursor-pointer"
                >
                  <Image
                    src="/svg/mainpages/commentIcon.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="mr-2"
                  />{" "}
                  Message
                </div>
              </div>
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
                  className={`flex  mr-6 last:mr-0 last:pr-4 sm:last:pr-6 lg:last:pr-8 ${
                    activeTab === "about_section" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("about_section")}
                >
                  <a
                    className={`block px-5 pb-3 whitespace-nowrap font-medium ${
                      activeTab === "about_section"
                        ? "border-primaryMain border-b-2 text-primaryMain"
                        : ""
                    }`}
                    href="#0"
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-[#DFEDFF] py-6 mt-4" id="about_section">
          <div className="container">
            <div className="w-6/12 mx-auto pb-14">
              <div className="">
                <div className="flex my-6 pb-3  items-center justify-center">
                  <h4 className=" heading_crm_pages text-black font-bold capitalize text-[40px]">
                    About Me
                  </h4>
                </div>

                <div className=" py-5 normal-case ">
                  <p className="text-lg font-medium text-black">
                    {
                      userDetail?.wp_nepaz2_usermeta?.find(
                        (el: any) => el.meta_key === "description",
                      )?.meta_value
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MediumSizeModal
        isOpen={showingFollowerList}
        setIsOpen={setShowingFollowerList}
      >
        <FollowerList followerListData={userDetail?.follower} />
      </MediumSizeModal>
      <MediumSizeModal
        isOpen={showingFollowingList}
        setIsOpen={setShowingFollowingList}
      >
        <FollowingList
          followingListData={userDetail?.following}
          handleRefresh={() => getUserById()}
        />
      </MediumSizeModal>
    </>
  );
};
export default BuyerPage;
