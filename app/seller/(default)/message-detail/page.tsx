/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { SelectedItemsProvider } from "@/app/selected-items-context";
import SendMessage from "../messages/sendMessage";
import ReplyMessage from "./messageReply";
import { useRouter, useSearchParams } from "next/navigation";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
// import { useAppSelector } from "@/redux/hooks";
// import { globalCacheStateSelector } from "@/redux/slices/globaCache.slice";
// import { Avatar } from "@mui/material";

// type TabType =
//   | "newMessage"
//   | "messageBox"
//   | "archive"
//   | "settings";
// | "announcement";

export default function Messages() {
  /**
   * router
   */
  const router = useRouter();
  const query = useSearchParams();

  const id = query.get("id");

  /**
   * redux
   */

  // const { user } = useAppSelector(globalCacheStateSelector);

  /**
   * state management
   */

  // const [activeTab, setActiveTab] = useState<TabType>("messageBox");
  const [activeTab, setActiveTab] = useState<"messageBox" | "newMessage">(
    "messageBox",
  );
  const [messageList, setMessageList] = useState([]);
  const [, setUnreadMessageCount] = useState<number>(0);

  // Function to handle tab click
  useEffect(() => {
    // This ensures that the message box is open by default when the page loads
    setActiveTab("messageBox"); // Always use 'messages' or 'newMessage'
  }, []);
  const handleNewMessageClick = () => {
    setActiveTab("newMessage");
  };

  /**
   * get all messages
   */
  const getAllMessageGroup = async () => {
    const response = await UserApi.getMessagesById(id as string);
    if (response.remote === "success") {
      const groupedMessages = response.data.data.jsonMessage.reduce(
        (acc: any, message: any) => {
          const dateKey = message.mgs_created.split("T")[0]; // Extract date (yyyy-mm-dd)

          // Check if date entry already exists in the accumulator
          let dateEntry = acc.find((entry: any) => entry.date === dateKey);

          if (!dateEntry) {
            // If not, create a new entry
            dateEntry = { date: dateKey, messages: [] };
            acc.push(dateEntry);
          }

          // Add the message to the corresponding date entry
          dateEntry.messages.push(message);

          return acc;
        },
        [],
      );

      //   console.log({groupedMessages});

      //   console.log(groupedMessages);
      setMessageList(groupedMessages);
    }
    // console.log(response.data.data);
  };

  /**
   * handle get unread messages
   */
  const handleGetUnreadMessage = async () => {
    const response = await UserApi.getUnreadMessageAPI();

    if (response.remote === "success") {
      setUnreadMessageCount(response.data.data);
    }
  };
  const handleBack = () => {
    router.back();
  };
  useEffect(() => {
    handleGetUnreadMessage();
  }, []);

  useEffect(() => {
    if (id) {
      getAllMessageGroup();
    }
  }, [id]);

  // Function to render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "newMessage":
        return <SendMessage handleTabs={(vl) => console.log({ vl })} />;
      case "messageBox":
        return (
          <ReplyMessage
            messages={messageList}
            handleRefresh={() => getAllMessageGroup()}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <SelectedItemsProvider>
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
          <div className="sm:flex sm:justify-between sm:items-center mb-8">
            {/* Left: Title */}
            <div className="mb-4 sm:mb-0">
              <h1 className=" flex items-center text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
                Message Detail
                <svg
                  className="shrink-0 h-6 w-6 ms-2"
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                    d="M448 341.37V170.61A32 32 0 0 0 432.11 143l-152-88.46a47.94 47.94 0 0 0-48.24 0L79.89 143A32 32 0 0 0 64 170.61v170.76A32 32 0 0 0 79.89 369l152 88.46a48 48 0 0 0 48.24 0l152-88.46A32 32 0 0 0 448 341.37z"
                  ></path>
                  <path
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                    d="m69 153.99 187 110 187-110m-187 310v-200"
                  ></path>
                </svg>
              </h1>
            </div>
            <button
              className="btn bg-primaryMain hover:bg-blueTwo text-white"
              onClick={() => handleBack()}
            >
              <span className="flex items-center">
                <svg
                  className="mr-1"
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
                </svg>
                Back
              </span>
            </button>
          </div>

          {activeTab === "newMessage" && (
            <div className="flex items-center justify-between mb-4 ">
              <div className="flex items-center">
                <button
                  className={`btn ${
                    // @ts-expect-error msg tab
                    activeTab === "messageBox"
                      ? "bg-primaryMain text-white hover:bg-blueTwo"
                      : "bg-sky-200 text-slate-950 hover:bg-sky-500"
                  }   mr-3`}
                  // onClick={() => handleTabClick("messageBox")}
                  onClick={() => setActiveTab("messageBox")}
                >
                  Message Box
                </button>
                <button
                  className={`btn ${
                    activeTab === "newMessage"
                      ? "bg-primaryMain text-white hover:bg-blueTwo"
                      : "bg-sky-200 text-slate-950 hover:bg-sky-500"
                  }   mr-3`}
                  // onClick={() => handleTabClick("newMessage")}
                  onClick={handleNewMessageClick}
                >
                  <span className="hidden xs:block">New Message</span>
                </button>
              </div>
            </div>
          )}
          {/* Render content based on active tab */}
          <div className=" dark:bg-slate-800  rounded-sm  dark:border-slate-700 relative">
            {renderContent()}
          </div>
        </div>
      </SelectedItemsProvider>
    </>
  );
}

// Define separate components for different tabs
