import React from "react";

interface Message {
  messageOpen: boolean;
  //   handleMessageAccordian: any;
}
const MessageReplyAccordian: React.FC<Message> = ({
  messageOpen,
  //   handleMessageAccordian,
}) => {
  return (
    <>
      <div className="px-2 mt-2 py-2 rounded-sm dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <button
          className="flex items-center bg-sky-50 dark:bg-sky-200 justify-between w-full group mb-1 py-2 px-2"
          aria-expanded={messageOpen}
          //   onClick={handleMessageAccordian}
        >
          <div className="text-sm  w-full text-left font-semibold text-slate-950   dark:text-slate-700 ">
            Message Title
          </div>
          <span className="text-xs whitespace-nowrap dark:text-slate-700">
            October 24, 2023 11:49 pm
          </span>
        </button>
        <div className={`text-sm ${!messageOpen && "hidden"}`}>
          Message content
        </div>
      </div>
    </>
  );
};
export default MessageReplyAccordian;
