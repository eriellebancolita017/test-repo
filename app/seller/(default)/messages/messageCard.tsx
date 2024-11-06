/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import moment from "moment";
import { Avatar } from "@mui/material";

interface Message {
  handleMessageDetail: () => void;
  message: any;
  showMessageList?: boolean;
  handleCheck?: (arg: number) => void;
  isChecked?: boolean;
}

const MessageCard: React.FC<Message> = ({ message, handleMessageDetail }) => {
  return (
    <div className="flex mt-4">
      <div className="flex items-center w-full border-b border-[#DDDDDD] pb-4 mx-4">
        {/* <input
          checked={isChecked}
          onClick={() => handleCheck && handleCheck(message.per_id)}
          type="checkbox"
          className="form-checkbox mr-4"
        /> */}
        <div onClick={handleMessageDetail} className="cursor-pointer   ">
          <div className="flex mb-4 gap-4">
            <div className="relative ">
              {/* <Avatar src="" style={{ width: "50px", height: "50px" }}>
                {message?.user?.display_name[0]}
              </Avatar> */}
              <Avatar
                src=""
                style={{ width: "50px", height: "50px", background: "#306cb5" }}
              >
                {message?.other_user[0].user?.display_name[0]}
              </Avatar>
            </div>
            <div className="mr-4 w-48">
              <p className="font-semibold leading-4 text-base text-[#1D364D]">
                {message?.other_user[0].user?.display_name}

                {message.mgs_read === 0 && (
                  <span className="bg-[#FF0000] py-[2px] px-2 text-[8px] rounded-xl text-white font-normal ml-2">
                    Unread
                  </span>
                )}
              </p>
              <span className="text-xs font-medium text-[#666666]">
                {moment(message.wp_fep_messages.mgs_last_reply_time).format(
                  "MMM DD, YYYY, HH:mm",
                )}
              </span>
            </div>
          </div>
          <div className="mr-4 ">
            <p
              className="font-semibold leading-4 mb-1 text-base cursor-pointer text-[#1D364D] hover:underline normal-case"
              dangerouslySetInnerHTML={{
                __html: message?.wp_fep_messages?.mgs_title,
              }}
            />

            <p
              className="text-sm text-[#666666] font-medium leading-4 cursor-pointer"
              onClick={handleMessageDetail}
              dangerouslySetInnerHTML={{
                __html: message.wp_fep_messages.mgs_last_reply_excerpt,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
