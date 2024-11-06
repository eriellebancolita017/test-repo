import React, { useEffect, useState } from "react";
import MessageCard from "./messageCard";
import ReplyMessage from "./messageReply";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import moment from "moment";
import { SVGIcon } from "@/assets/svg";
import SkeletonMessageCard from "./skeletonMessageCard";
import SVG from "@/public/svg";

interface MessageMainProps {
  activeTab: "messages" | "newMessage";
  onNewMessageClick: () => void;
}
const MessageMain: React.FC<MessageMainProps> = ({ onNewMessageClick }) => {
  /**
   * state manamgement
   */
  const [showMessageList, setShowMessageList] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const [messageList, setMessageList] = useState<any>([]);
  const [selectedGroup, setSelectedGroup] = useState<{
    groupId: string;
    subject: string;
    sendToUserId: string;
  }>({ groupId: "", subject: "", sendToUserId: "" });

  const handleMessageDetail = () => {
    setShowMessageList((prevState) => !prevState);
  };

  /**
   * get all message group
   */
  const getAllMessageGroup = async (
    type: "all" | "read" | "unread" | "archive",
  ) => {
    const response = await UserApi.getAllMessageGroup({
      type,
      keyword: searchText,
    });
    if (response.remote === "success") {
      const data = response.data.data;
      const messageData = data?.map((item: any) => ({
        id: item.mgs_id,
        senderName: item?.other_user[0]?.user?.display_name,
        date: moment(item?.wp_fep_messages?.mgs_last_reply_time).format(
          "MMMM, YYYY hh:mm a",
        ),
        title: item?.wp_fep_messages?.mgs_title,
        description: item?.wp_fep_messages?.mgs_content,
        status: item?.mgs_read === 0 ? "Unread" : "Read",
        sendToUserId: item?.other_user[0]?.user?.id,
      }));
      setMessageList(messageData.length === 0 ? null : messageData);
    }
  };

  useEffect(() => {
    getAllMessageGroup("all");
  }, []);

  return (
    <>
      {!showMessageList ? (
        <>
          <div className="mb-8 mt-8 gap-6 flex mx-4">
            <div className="flex relative items-center w-[95%] border border-[#00000080] rounded-3xl ">
              <input
                className="h-12 w-full px-2 placeholder:text-[#999999] rounded-3xl border border-slate-200 dark:border-slate-700"
                placeholder="Search Message"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "enter" || e.key === "Enter") {
                    getAllMessageGroup("all");
                  }
                }}
                onBlur={() => {
                  getAllMessageGroup("all");
                }}
              />
              <div
                // onClick={() => {
                //   router.push(`/search-result?keyword=${keyword}`);
                //   setKeyword("");
                //   setShowSearchDropdown(false);
                // }}
                className="absolute top-[6px] right-2 cursor-pointer bg-blue-200 rounded-full p-2"
              >
                <SVGIcon.SearchIcon />
              </div>
            </div>
            <div
              className="cursor-pointer plus_icon_active_tab"
              onClick={onNewMessageClick}
            >
              <span>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.99935 0.666687C4.40768 0.666687 0.666016 4.40835 0.666016 9.00002C0.666016 13.5917 4.40768 17.3334 8.99935 17.3334C13.591 17.3334 17.3327 13.5917 17.3327 9.00002C17.3327 4.40835 13.591 0.666687 8.99935 0.666687ZM12.3327 9.62502H9.62435V12.3334C9.62435 12.675 9.34102 12.9584 8.99935 12.9584C8.65768 12.9584 8.37435 12.675 8.37435 12.3334V9.62502H5.66602C5.32435 9.62502 5.04102 9.34169 5.04102 9.00002C5.04102 8.65835 5.32435 8.37502 5.66602 8.37502H8.37435V5.66669C8.37435 5.32502 8.65768 5.04169 8.99935 5.04169C9.34102 5.04169 9.62435 5.32502 9.62435 5.66669V8.37502H12.3327C12.6743 8.37502 12.9577 8.65835 12.9577 9.00002C12.9577 9.34169 12.6743 9.62502 12.3327 9.62502Z"
                    fill="#306CB5"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="">
            <div className="">
              {!messageList && (
                <div className="flex flex-col items-center justify-center">
                  <SVG.NoDataIcon />
                </div>
              )}
              {messageList?.length === 0 && (
                <>
                  {[...Array(5)].map((index) => (
                    <div className="mx-auto" key={index}>
                      <SkeletonMessageCard />
                    </div>
                  ))}
                </>
              )}
              {messageList?.map((msg: any) => (
                <MessageCard
                  key={msg.id}
                  handleMessageDetail={() => {
                    handleMessageDetail();

                    setSelectedGroup({
                      groupId: msg.id,
                      subject: msg.title,
                      sendToUserId: msg.sendToUserId,
                    });
                  }}
                  showMessageList={showMessageList}
                  senderName={msg.senderName}
                  date={msg.date}
                  title={msg.title}
                  description={msg.description}
                  status={msg.status}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <ReplyMessage
            groupId={selectedGroup.groupId}
            handleRefresh={() => getAllMessageGroup("all")}
            sendToUserId={selectedGroup.sendToUserId}
            subject={selectedGroup.subject}
          />
        </>
      )}
    </>
  );
};
export default MessageMain;
