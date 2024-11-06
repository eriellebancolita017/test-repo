import React, { useEffect, useState } from "react";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import moment from "moment";
import { Avatar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  globalCacheStateSelector,
  setIsLoading,
  setToastMessage,
} from "@/redux/slices/globaCache.slice";
import Image from "next/image";
import { SVGIcon } from "@/assets/svg";
import {
  containsEmail,
  containsPhoneNumber,
  decodeHtmlEntities,
} from "@/utils/commonFunction";
import { ButtonLoader } from "@/components/common/loader/buttonLoader";
// import { SVGIcon } from "@/assets/svg";

export default function ReplyMessage({
  groupId,
  subject,
  sendToUserId,
  handleRefresh,
}: {
  groupId: string;
  subject: string;
  sendToUserId: string;
  handleRefresh: () => void;
}) {
  /**
   * redux
   */

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(globalCacheStateSelector);

  /**
   * state management
   */
  const [messageList, setMessageList] = useState([]);
  const [messageText, setMessageText] = useState<string>("");
  const [fileData, setFileData] = useState<File | null>(null);

  /**
   * get all messages
   */
  const getAllMessageGroup = async () => {
    const response = await UserApi.getMessagesById(groupId);
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
      const filteredMessages = groupedMessages.map((item: any) => ({
        date: moment(item?.date).format("MMMM D, YYYY"),
        messages: item?.messages.map((el: any) => ({
          sender: el?.wp_nepaz2_users?.display_name,
          time: moment(el?.mgs_created).format("hh:mm a"),
          avatar: "/images/user-40-01.jpg",
          text: el?.mgs_content,
          attacements: {
            file: el?.wp_fep_attachments[0]?.att_file
              ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${el?.wp_fep_attachments[0]?.att_file}`
              : "",
            fileType: el?.wp_fep_attachments[0]?.att_mime,
          },
        })),
      }));
      setMessageList(filteredMessages);
    }
  };

  /**
   * handle send message
   */
  const handleSendMessage = async () => {
    if (groupId && subject && sendToUserId) {
      if (messageText === "" && !fileData) {
        dispatch(
          setToastMessage({
            message: "Please enter message or upload file to send.",
            status: "error",
            open: true,
          }),
        );
      } else if (containsEmail(messageText)) {
        dispatch(
          setToastMessage({
            message:
              "Message cannot contain email addresses for security reasons.",
            status: "error",
            open: true,
          }),
        );
      } else if (containsPhoneNumber(messageText)) {
        dispatch(
          setToastMessage({
            message:
              "Message cannot contain phone numbers for security reasons.",
            status: "error",
            open: true,
          }),
        );
      } else {
        const payload = {
          groupId: Number(groupId),
          subject,
          toUserId: Number(sendToUserId),
          message: messageText,
          fileData,
        };
        dispatch(setIsLoading(true));
        const response = await UserApi.sendReplyMessageAPI(payload);

        if (response.remote === "success") {
          dispatch(setIsLoading(false));
          handleRefresh();
          setFileData(null);
          getAllMessageGroup();
          setMessageText("");
        } else {
          dispatch(setIsLoading(false));
        }
      }
    }
  };

  useEffect(() => {
    if (groupId) {
      getAllMessageGroup();
    }
  }, [groupId]);

  return (
    <>
      <div className="flex gap-5 w-full normal-case">
        <div className="w-full ">
          <div className="main_reply_containt">
            <div className="border bg-white border-slate-200 dark:border-slate-700 py-4 px-8  mb-4">
              <div className="border border-slate-200 dark:border-slate-700 p-4 mb-4">
                {messageList.map((dateGroup: any, index) => (
                  <div key={index} className="main_datewise_message mt-2 mb-5">
                    <div className="relative border-t border-gray-300 h-3">
                      <div className="absolute py-1 px-2 bg-white text-[10px] top-[-11px] mx-auto text-center left-[45%]">
                        {dateGroup.date}
                      </div>
                    </div>
                    <div className="message_conversation_list mt-2">
                      {dateGroup.messages.map((message: any, idx: any) => (
                        <div
                          key={idx}
                          className="message_section-list flex mb-4"
                        >
                          <div className="mr-2">
                            <Avatar
                              style={{
                                width: "40px",
                                height: "40px",
                                background: "#306cb5",
                              }}
                            >
                              {message?.sender[0]?.toUpperCase()}
                            </Avatar>
                          </div>
                          <div>
                            <h5 className="font-bold text-xs text-black">
                              {decodeHtmlEntities(message.sender)}
                              <span className="text-gray-500 text-[10px] font-normal ml-2">
                                {message.time}
                              </span>
                            </h5>
                            {message?.attacements?.file && (
                              <Image
                                width={140}
                                height={160}
                                alt="attachment"
                                src={message?.attacements?.file}
                                // objectFit="contain"
                                className="rounded-md mt-1"
                              />
                            )}
                            <p
                              className="text-sm text-slate-950 font-medium"
                              dangerouslySetInnerHTML={{ __html: message.text }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="">
                  <div className="relative ">
                    <div className="border-t border-[#E2E8F0] w-[50%] py-4">
                      <label className="text-[13px] w-[400px] text-[#0F0F0F] font-bold px-4">
                        Message
                      </label>
                    </div>
                    <textarea
                      className="w-full border-t border-b border-[#E2E8F0]  outline-none"
                      rows={6}
                      value={messageText}
                      onChange={(vl) => setMessageText(vl.target.value)}
                    ></textarea>
                  </div>
                  <div className="flex justify-between px-4 mt-1 items-center">
                    <div className="flex gap-4 input-camera_small items-center">
                      <div className="relative">
                        <input
                          type="file"
                          className="absolute top-0 left-0 w-12 h-8 opacity-0 z-10 cursor-pointer"
                          onChange={(e) =>
                            e.target.files && setFileData(e.target.files[0])
                          }
                        />
                        <div className="cursor-pointer ">
                          <span>
                            <SVGIcon.cameraBlue />
                          </span>
                        </div>
                      </div>
                      <p>{fileData?.name}</p>
                    </div>
                    <div>
                      <button
                        disabled={isLoading}
                        onClick={() => handleSendMessage()}
                        className="btn relative px-8 bg-primaryMain  hover:bg-blueTwo text-white"
                      >
                        {isLoading && (
                          <>
                            <span className="absolute left-[7%] top-[32%]">
                              <ButtonLoader />
                            </span>
                          </>
                        )}
                        <span className="hidden xs:block">Send Message</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="mt-3">
                <TextEditor
                  value={messageText}
                  onChange={(vl) => setMessageText(vl)}
                  label="Message:"
                  className=""
                />
              </div>
              <div className="mt-5 send_message_upload">
                <SingleUploadComponent
                  type="edit"
                  handleImageChange={(e) => {
                    if (e.target.files) {
                      setFileData(e?.target?.files[0]);
                    }
                  }}
                  component={{
                    isUploaded: fileData ? true : false,
                    item: fileData,
                  }}
                />
              </div>
              <div className="mt-3 text-end">
                <button
                  onClick={handleSendMessage}
                  className="btn bg-primaryMain  hover:bg-blueTwo text-white"
                >
                  <span className="hidden xs:block">Send Message</span>
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
