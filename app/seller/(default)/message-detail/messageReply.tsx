/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  globalCacheStateSelector,
  setIsLoading,
} from "@/redux/slices/globaCache.slice";
import { Avatar } from "@mui/material";
import Image from "next/image";
import { SVGIcon } from "@/assets/svg";
import { decodeHtmlEntities } from "@/utils/commonFunction";
import { ButtonLoader } from "@/components/common/loader/buttonLoader";

export default function ReplyMessage({
  messages,
  handleRefresh,
}: {
  messages: any;
  handleRefresh: () => void;
}) {
  /**
   * router
   */

  const query = useSearchParams();

  const id = query.get("id");
  const toUserId = query.get("to");
  const subject = query.get("subject");

  /**
   * redux
   */

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(globalCacheStateSelector);

  /**
   * state management
   */

  const [fileData, setFileData] = useState<File | null>(null);

  /**
   * formik
   */

  const formik = useFormik<{ message: string }>({
    initialValues: {
      message: "",
    },
    validationSchema: Yup.object({
      message: Yup.string(),
    }),

    onSubmit: (values) => {
      handleSendMessage(values);
    },
  });

  /**
   * handle send message
   */
  const handleSendMessage = async (values: { message: string }) => {
    if (id && subject && toUserId) {
      const payload = {
        groupId: Number(id),
        subject,
        toUserId: Number(toUserId),
        message: values.message,
        fileData,
      };
      dispatch(setIsLoading(true));
      const response = await UserApi.sendReplyMessageAPI(payload);

      if (response.remote === "success") {
        dispatch(setIsLoading(false));
        handleRefresh();
        setFileData(null);
        formik.resetForm();
      } else {
        dispatch(setIsLoading(false));
      }
    }
  };

  return (
    <>
      <div className="flex gap-5 w-full">
        {" "}
        <div className="w-full ">
          <div className="main_reply_containt">
            <div className="border bg-white border-slate-200 dark:border-slate-700 py-4 px-8  mb-4">
              {/* <div className="border bg-white border-slate-200 dark:border-slate-700 py-4 px-8  mb-4">
                <div className="bg-sky-50 dark:bg-sky-200 p-4 rounded-md flex">
                  <div className="mr-4">
                    <Image
                      src="/images/mainpages/productPic.png"
                      alt=""
                      className="rounded-md"
                      width={90}
                      height={90}
                    />
                  </div>
                  <div className="w-3/12">
                    <h4 className="font-bold text-slate-950 text-[12px]">
                      HUSQVARNA FX 350 2022–2024 - Tusk Clutch Lever Brembo
                      Polished 1166230023
                    </h4>
                    <p className="text-gray-400 text-[12px]">Condition: New</p>
                    <div className="flex items-center">
                      {" "}
                      <h4 className="font-bold text-slate-950 text-lg ">
                        $23.99
                      </h4>
                      <p className="text-gray-500 text-[10px] font-bold ml-1">
                        Free Shipping
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="border border-slate-200 dark:border-slate-700 py-4 mb-4">
                {messages.map((dateGroup: any, index: any) => (
                  <div
                    key={index}
                    className="main_datewise_message mt-2 mx-4 mb-5"
                  >
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
                              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${message?.wp_nepaz2_users?.avatar?.guid}`}
                              style={{
                                width: "40px",
                                height: "40px",
                                background: "#306cb5",
                              }}
                            >
                              {message?.wp_nepaz2_users?.display_name[0]}
                            </Avatar>
                          </div>
                          <div>
                            <h5 className="font-bold text-xs text-black">
                              {decodeHtmlEntities(
                                message?.wp_nepaz2_users?.display_name,
                              )}
                              <span className="text-gray-500 text-[10px] font-normal ml-2">
                                {moment(message.mgs_created).format("HH:mm")}
                              </span>
                            </h5>
                            {message?.wp_fep_attachments[0]?.att_file && (
                              <Image
                                width={130}
                                height={130}
                                objectFit="contain"
                                alt="attachement"
                                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${message?.wp_fep_attachments[0]?.att_file}`}
                                className="rounded-md mt-1 border"
                              />
                            )}
                            <p
                              className="text-sm text-slate-950 font-medium"
                              dangerouslySetInnerHTML={{
                                __html: message.mgs_content,
                              }}
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
                      value={formik.values.message}
                      onChange={(vl) =>
                        formik.setFieldValue("message", vl.target.value)
                      }
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
                        onClick={() => formik.handleSubmit()}
                        className="btn bg-primaryMain relative px-8  hover:bg-blueTwo text-white"
                      >
                        {isLoading && (
                          <>
                            <span className="absolute left-[7%] top-[35%]">
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
                  value={formik.values.message}
                  onChange={(vl) => formik.setFieldValue("message", vl)}
                  label="Message:"
                />
              </div>
              <div className="mt-5 send_message_upload">
                <SingleUploadComponent type="edit " />
              </div>
              <div className="mt-3 text-end">
                <button
                  disabled={isLoading}
                  onClick={() => formik.handleSubmit()}
                  className="btn bg-primaryMain relative  hover:bg-blueTwo text-white"
                >
                           {isLoading && (
                <>
                  <span className="absolute left-[7%] top-[35%]">
                    <ButtonLoader />
                  </span>
                </>
              )}
                  <span className="hidden xs:block">
                    Send Message
                  </span>
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
