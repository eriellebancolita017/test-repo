/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import MessageCard from "./messageCard";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import { useRouter } from "next/navigation";
import { Alert, Snackbar } from "@mui/material";
// import { useAppDispatch } from "@/redux/hooks";
// import { setIsLoading } from "@/redux/slices/globaCache.slice";
import { SVGIcon } from "@/assets/svg";
import SVG from "@/public/svg";
import SkeletonMessageCard from "./skeletonMessageCard";

interface MessageMainProps {
  activeTab: "messages" | "newMessage";
  onNewMessageClick: () => void;
}
const MessageMain: React.FC<MessageMainProps> = ({ onNewMessageClick }) => {
  /**
   * router
   */

  const router = useRouter();

  /**
   * redux
   */
  // const dispatch = useAppDispatch();
  // const { isLoading } = useAppSelector(globalCacheStateSelector);

  /**
   * state management
   */
  const [showMessageList, setShowMessageList] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [checkedMsg, setCheckedMsg] = useState<number[]>([]);
  // const [selectedAction, setSelectedAction] = useState<{
  //   value: "read" | "unread" | "delete" | "archive" | "";
  //   label: string;
  // }>({ label: "", value: "" });
  // const [selectedFilter, setSelectedFilter] = useState<{
  //   value: string;
  //   label: string;
  // }>({ label: "", value: "" });
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "error";
    open: boolean;
  }>({ message: "", severity: "success", open: false });
  const [searchText, setSearchText] = useState<string>("");

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      setMessageList(
        response.data.data?.length === 0 ? null : response.data.data,
      );
    }
  };

  useEffect(() => {
    getAllMessageGroup("all");
  }, []);

  /**
   * handle check message
   */

  const handleCheckMessages = (msgId: number) => {
    const isExist = checkedMsg.includes(msgId);
    if (isExist) {
      const filteredList = checkedMsg.filter((el) => el !== msgId);
      setCheckedMsg(filteredList);
    } else {
      setCheckedMsg([...checkedMsg, msgId]);
    }
  };

  /**
   * handle apply action
   */

  // const handleApplyAction = async () => {
  //   if (selectedAction.value === "") {
  //     setSnackbar({
  //       message: "Please select Action!",
  //       severity: "error",
  //       open: true,
  //     });
  //   } else if (checkedMsg.length === 0) {
  //     setSnackbar({
  //       message: "Please select Message group!",
  //       severity: "error",
  //       open: true,
  //     });
  //   } else {
  //     dispatch(setIsLoading(true));
  //     const response = await UserApi.bulkActionAPI({
  //       msgIds: checkedMsg,
  //       type: selectedAction.value,
  //     });
  //     if (response.remote === "success") {
  //       dispatch(setIsLoading(false));
  //       getAllMessageGroup("all");
  //       setCheckedMsg([]);
  //       setSelectedAction({ value: "", label: "" });
  //     } else {
  //       dispatch(setIsLoading(false));
  //       setSnackbar({
  //         message: response.error.errors.message || "An error occurred!",
  //         severity: "error",
  //         open: true,
  //       });
  //     }
  //   }
  // };

  /**
   * handle filter
   */
  // const handleFilter = (filterType: "all" | "read" | "unread" | "archive") => {
  //   getAllMessageGroup(filterType);
  // };

  return (
    <>
      <div className="mb-8 mt-8 gap-6 flex">
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
      <div className="py-3 px-3 mb-4 bg-white shadow-lg border border-slate-200">
        <div className="">
          {/* <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              {" "}
              <div className="mr-8 w-52">
                <SearchSingleSelect
                  placeholder="Select Action"
                  label=""
                  options={bulkActionArray}
                  value={selectedAction}
                  onChange={(vl) => {
                    setSelectedAction(vl);
                  }}
                />
              </div>{" "}
              <button
                disabled={isLoading}
                onClick={handleApplyAction}
                className=" btn bg-primaryMain hover:bg-blueTwo text-white mr-3 "
              >
                Apply
              </button>
            </div>{" "}
            <div className="mr-3 w-40">
              <SearchSingleSelect
                label=""
                options={filterArray}
                value={selectedFilter}
                onChange={(vl) => {
                  setSelectedFilter(vl);

                  handleFilter(vl.value);
                }}
              />
            </div>
          </div> */}
        </div>
        {/* {!showMessageList && (
          <div className="">
            <label className="flex items-center">
              <input
                onClick={() => {
                  const msgIds = messageList.map((el: any) => el.mgs_id);
                  if (checkedMsg.length === msgIds.length) {
                    setCheckedMsg([]);
                  } else {
                    setCheckedMsg(msgIds);
                  }
                }}
                type="checkbox"
                className="form-checkbox"
              />
              <span className="text-sm ml-2">Check /Uncheck All</span>
            </label>
          </div>
        )} */}
        <div>
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
              key={msg.mgs_id}
              handleMessageDetail={() =>
                router.push(
                  `/seller/message-detail?id=${msg.mgs_id}&to=${msg?.other_user[0]?.user.id}&subject=${msg?.wp_fep_messages?.mgs_title}`,
                )
              }
              showMessageList={showMessageList}
              message={msg}
              isChecked={checkedMsg.includes(msg.per_id)}
              handleCheck={(vl: number) => handleCheckMessages(vl)}
            />
          ))}
        </div>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};
export default MessageMain;
