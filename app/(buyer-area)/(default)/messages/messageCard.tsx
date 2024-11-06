import React from "react";
import { Avatar } from "@mui/material";
interface Message {
  senderName: string;
  date: string;
  title: string;
  description: string;
  handleMessageDetail: () => void;
  showMessageList: boolean;
  status: string;
}
const MessageCard: React.FC<Message> = ({
  senderName,
  date,
  title,
  description,
  status,
  handleMessageDetail,
}) => {
  return (
    <>
      <div className="mt-4 border-[#DDDDDD] border-b px-2 py-4">
        {" "}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => handleMessageDetail()}
        >
          {/* <input type="checkbox" className="form-checkbox mr-4" /> */}
          <div className="relative flex mr-4 items-center justify-center">
            <Avatar
              className="mr-3"
              style={{ width: "50px", height: "50px", background: "#306cb5" }}
            >
              {senderName[0].toUpperCase()}
            </Avatar>

            <div className="mr-4  normal-case">
              <p className="font-semibold leading-4 normal-case text-[#1D364D]">
                {senderName}{" "}
                {status === "Read" ? (
                  ""
                ) : (
                  <span className="bg-[#FF0000] py-[2px] px-2 text-[9px] rounded-xl text-white font-normal ml-2">
                    {status}
                  </span>
                )}
              </p>
              <span className="text-xs font-medium text-[#666666]">{date}</span>
            </div>
          </div>
        </div>
        <div className="mr-4 mt-3">
          <p className="font-semibold leading-4 cursor-pointer text-[#1D364D] hover:underline normal-case">
            {title}
          </p>
          <p
            className="text-sm leading-4 cursor-pointer normal-case font-medium text-[#666666]"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </>
  );
};
export default MessageCard;
