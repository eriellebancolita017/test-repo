"use client";
import React, { useEffect, useState } from "react";
import { SelectedItemsProvider } from "@/app/selected-items-context";
import SendMessage from "./sendMessage";
import MessageMain from "./messageMain";
import HeaderSectionCard from "@/components/common/header/headerSectionCard";
import { useSearchParams } from "next/navigation";

export type TabType = "messageBox" | "newMessage";

export default function Messages() {
  /**
   * router
   */
  const searchParams = useSearchParams();
  const sendToId: any = searchParams.get("sendTo");
  const tabData: any = searchParams.get("tab");
  // const productId = searchParams.get("productId");

  /**
   * state management
   */

  const [activeTab, setActiveTab] = useState<TabType>("messageBox"); // State to track active tab
  // Function to handle tab click
  // const handleTabClick = (tab: TabType) => {
  //   setActiveTab(tab);
  // };
  useEffect(() => {
    // This ensures that the message box is open by default when the page loads
    setActiveTab("messageBox"); // Always use 'messages' or 'newMessage'
  }, []);
  const handleNewMessageClick = () => {
    setActiveTab("newMessage");
  };

  // const user= useAppSelector((state) => state.globalCache.user);

  // Function to render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "newMessage":
        return (
          <SendMessage
            sendToId={sendToId}
            handleTabs={(vl: TabType) => setActiveTab(vl)}
          />
        );
      case "messageBox":
        return (
          <MessageMain // @ts-expect-error active tab
            activeTab={activeTab}
            onNewMessageClick={handleNewMessageClick}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (sendToId && tabData) {
      setActiveTab(JSON.parse(tabData));
    }
  }, [sendToId, tabData]);

  return (
    <>
      <SelectedItemsProvider>
        <div className=" w-full">
          <div className="">
            <HeaderSectionCard title="Messages" />
          </div>

          {activeTab === "newMessage" && (
            <div className="flex items-center justify-between mb-4 mt-4 ">
              <div className="flex items-center">
                <button
                  className={`btn ${
                    // @ts-expect-error active tab
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
          <div className=" mb-4 dark:bg-slate-800 rounded-sm  dark:border-slate-700 relative">
            {renderContent()}
          </div>
        </div>
      </SelectedItemsProvider>
    </>
  );
}
