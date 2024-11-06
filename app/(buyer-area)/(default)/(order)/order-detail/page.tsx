"use client";
import React, { useEffect, useState } from "react";
import SVG from "@/public/svg";
import { useRouter, useSearchParams } from "next/navigation";
// import InputComponent from "@/components/common/inputField/page";
import SingleUploadComponent from "@/components/common/fileUpload/singleFileUpload";
import { BuyerOrderListTable } from "./component/buyerOrderTable";
import BuyerSummaryCard from "./component/buyerSummaryCard";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import moment from "moment";
import { useAppDispatch } from "@/redux/hooks";
import { setToastMessage } from "@/redux/slices/globaCache.slice";
import ErrorText from "@/components/common/errorText";
import { CircularProgress } from "@mui/material";

import Image from "next/image";
import { decodeHtmlEntities } from "@/utils/commonFunction";
const OrderDetail = () => {
  /**
   * router
   */
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  /**
   * redux
   */

  const dispatch = useAppDispatch();

  /**
   * state management
   */

  const [fileAttachement, setFileAttachement] = useState<File | string>("");
  const [noteText, setNoteText] = useState<string>("");
  const [errorData, setErrorData] = useState<{
    errorType: "CONTENT" | "FILE" | "";
    error: string;
  }>({ error: "", errorType: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * attachment card
   */

  // const AttachmentCard: React.FC<{ onRemove: () => void }> = ({ onRemove }) => {
  //   return (
  //     <div className="border border-slate-200 p-3 attachment_card relative mt-3  dark:border-slate-700">
  //       <div className="">
  //         <InputComponent label="Name" />
  //       </div>
  //       <div className="mt-4 ">
  //         <div className="">
  //           <label className="block text-zinc-600 text-sm font-bold">
  //             File
  //           </label>
  //           <SingleUploadComponent
  //             type="add"
  //             handleImageChange={(e) => {
  //               if (e.target.files) {
  //                 // setErrorData({ error: "", type: "" });
  //                 setFileAttachement(e?.target?.files[0]);
  //               }
  //             }}
  //             component={{
  //               isUploaded: fileAttachement !== "" ? true : false,
  //               item: fileAttachement,
  //             }}
  //           />
  //           <p className="mt-1 text-red-500 font-medium text-xs">
  //             Image size must be 160px * 160px
  //           </p>
  //         </div>
  //         <div className="absolute bottom-1 right-2">
  //           <button className="bg-transparent h-8 w-8" onClick={onRemove}>
  //             <svg
  //               className="w-7 h-7"
  //               stroke="#E54B4D"
  //               fill="#E54B4D"
  //               strokeWidth="0"
  //               viewBox="0 0 15 15"
  //               height="1em"
  //               width="1em"
  //               xmlns="http://www.w3.org/2000/svg"
  //             >
  //               <path
  //                 fillRule="evenodd"
  //                 clipRule="evenodd"
  //                 d="M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704ZM9.85358 5.14644C10.0488 5.3417 10.0488 5.65829 9.85358 5.85355L8.20713 7.49999L9.85358 9.14644C10.0488 9.3417 10.0488 9.65829 9.85358 9.85355C9.65832 10.0488 9.34173 10.0488 9.14647 9.85355L7.50002 8.2071L5.85358 9.85355C5.65832 10.0488 5.34173 10.0488 5.14647 9.85355C4.95121 9.65829 4.95121 9.3417 5.14647 9.14644L6.79292 7.49999L5.14647 5.85355C4.95121 5.65829 4.95121 5.3417 5.14647 5.14644C5.34173 4.95118 5.65832 4.95118 5.85358 5.14644L7.50002 6.79289L9.14647 5.14644C9.34173 4.95118 9.65832 4.95118 9.85358 5.14644Z"
  //                 fill="#E54B4D"
  //               ></path>
  //             </svg>
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  /**
   * state management
   */
  const [orderDetailData, setOrderDetailData] = useState<any>();
  const [orderNoteList, setOrderNoteList] = useState<
    {
      content: string;
      date: string;
      user: string;
      attachement: string;
    }[]
  >([]);
  // const [attachmentCards, setAttachmentCards] = useState<JSX.Element[]>([
  //   <AttachmentCard key={0} onRemove={() => removeAttachmentCard(0)} />,
  // ]);

  // // Function to add a new attachment card
  // const addAttachmentCard = () => {
  //   setAttachmentCards((prevCards) => [
  //     ...prevCards,
  //     <AttachmentCard
  //       key={prevCards.length}
  //       onRemove={() => removeAttachmentCard(prevCards.length)}
  //     />,
  //   ]);
  // };

  // Function to remove an attachment card
  // const removeAttachmentCard = (index: number) => {
  //   setAttachmentCards((prevCards) => prevCards.filter((_, i) => i !== index));
  // };

  /**
   * handle get order details
   */

  const handleGetOrderDetails = async () => {
    if (orderId) {
      const response = await UserApi.getOrderDetailsAPI({
        orderId: Number(orderId),
      });

      if (response.remote === "success") {
        setOrderDetailData(response.data.data);
      }
    }
  };

  /**
   * handle order notes
   */
  const handleOrderNotes = async () => {
    if (orderId) {
      if (noteText === "") {
        setErrorData({ error: "Please Enter Note.", errorType: "CONTENT" });
      } else if (fileAttachement === "") {
        setErrorData({ error: "Please add attachment.", errorType: "FILE" });
      } else {
        const payload = {
          orderId,
          content: noteText,
          attachment: fileAttachement,
        };
        setIsLoading(true);
        const response = await UserApi.addOrderNotesAPI(payload);

        if (response.remote === "success") {
          setIsLoading(false);
          setNoteText("");
          setFileAttachement("");
          handleGetOrderNotes();
          dispatch(
            setToastMessage({
              message: "Order notes added.",
              status: "success",
              open: true,
            }),
          );
        } else {
          setIsLoading(false);
          dispatch(
            setToastMessage({
              message: response.error.errors.message || "An erorr has occurs.",
              status: "error",
              open: true,
            }),
          );
        }
      }
    }
  };

  /**
   * handle get order notes
   */

  const handleGetOrderNotes = async () => {
    if (orderId) {
      const response = await UserApi.getOrderNotesAPI({ orderId });
      if (response.remote === "success") {
        const data = response.data.data.data;
        const result = data?.map((el: any) => ({
          content: el?.content,
          date: el?.comment_date,
          user: el?.user?.display_name,
          attachement: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${el?.attachment}`,
        }));

        setOrderNoteList(result);
      }
    }
  };

  useEffect(() => {
    if (orderId) {
      handleGetOrderDetails();
      handleGetOrderNotes();
    }
  }, [orderId]);

  return (
    <div className="mb-24 w-full">
      <div className="container">
        <div
          className="px-4 py-3 mt-8 bg-white"
          style={{ boxShadow: "1px 2px 26px 0px #C4C2C240" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h4 className="text-2xl text-primaryMain font-semibold normal-case flex ">
                <p className="font-semibold">Order Detail</p>
              </h4>
            </div>
            <button
              className="rounded-md bg-primaryMain text-white px-5 h-10 font-normal flex items-center"
              onClick={() => router.push("/order-history")}
            >
              <span className="mr-3">
                <SVG.leftArrowWhite />
              </span>{" "}
              Back to Order History
            </button>
          </div>
        </div>
        <div
          className="px-4 py-3 mt-8 bg-white flex items-center"
          style={{ boxShadow: "1px 2px 26px 0px #C4C2C240" }}
        >
          <h4 className="text-2xl text-primaryMain font-semibold normal-case">
            Order #{orderDetailData?.ID}
          </h4>
          <div className="bg-[#EF9644] font-semibold text-[12px] h-6  py-1 px-3 ml-5 normal-case text-white rounded-[2px]">
            Inprogress
          </div>
        </div>
        <div
          className="px-4 py-3 mt-8 bg-white "
          style={{ boxShadow: "1px 2px 26px 0px #C4C2C240" }}
        >
          <p className="text-sm normal-case">
            Order date:{" "}
            <span className="text-black font-semibold">
              {moment(orderDetailData?.post_date)?.format("ha D MMMM YYYY")}
            </span>
          </p>
          <p className="text-sm normal-case">
            Order Status:{" "}
            <span className="text-green-500 font-semibold">Order placed</span>
          </p>
          <p className="text-sm normal-case">
            Payment via
            <span className="text-green-500 font-semibold ml-1">
              {
                orderDetailData?.wp_nepaz2_postmeta?.find(
                  (el: any) => el.meta_key === "_payment_method",
                )?.meta_value
              }
            </span>
          </p>
          <h4 className="text-2xl my-2 text-primaryMain font-semibold normal-case">
            Shipping Detail
          </h4>
          <p className="text-sm normal-case">
            {
              orderDetailData?.wp_nepaz2_postmeta?.find(
                (el: any) => el.meta_key === "_billing_address_1",
              )?.meta_value
            }
          </p>
          <p className="text-sm normal-case">
            {
              orderDetailData?.wp_nepaz2_postmeta?.find(
                (el: any) => el.meta_key === "_billing_city",
              )?.meta_value
            }
          </p>

          <p className="text-sm normal-case">
            {
              orderDetailData?.wp_nepaz2_postmeta?.find(
                (el: any) => el.meta_key === "_billing_state",
              )?.meta_value
            }{" "}
            {
              orderDetailData?.wp_nepaz2_postmeta?.find(
                (el: any) => el.meta_key === "_billing_country",
              )?.meta_value
            }
            ,{" "}
            {
              orderDetailData?.wp_nepaz2_postmeta?.find(
                (el: any) => el.meta_key === "_billing_postcode",
              )?.meta_value
            }
          </p>
        </div>
        <div
          className="px-4 py-3 mt-8 bg-white "
          style={{ boxShadow: "1px 2px 26px 0px #C4C2C240" }}
        >
          <h4 className="text-2xl my-2 text-primaryMain font-semibold normal-case">
            Order Items
          </h4>

          <div className="flex gap-5">
            <div className="w-8/12">
              <div className="">
                <BuyerOrderListTable
                  orderProductList={
                    orderDetailData?.wp_wc_order_product_lookup_order[0]
                  }
                />
              </div>
            </div>
            <div className="w-4/12">
              <BuyerSummaryCard
                discountTotal={
                  Number(
                    orderDetailData?.wp_wc_order_product_lookup_order[0]
                      ?.coupon_amount,
                  ) || 0
                }
                subTotal={
                  orderDetailData?.wp_wc_order_product_lookup_order[0]
                    ?.product_net_revenue
                }
                grandTotal={
                  Number(
                    orderDetailData?.wp_wc_order_product_lookup_order[0]
                      ?.product_gross_revenue,
                  ) -
                  Number(
                    orderDetailData?.wp_wc_order_product_lookup_order[0]
                      ?.coupon_amount,
                  )
                }
                taxes={
                  Number(
                    orderDetailData?.wp_wc_order_product_lookup_order[0]
                      ?.tax_amount,
                  ).toFixed(2) || 0
                }
              />{" "}
            </div>
          </div>
        </div>
        <div
          className="px-4 py-3 mt-8 bg-white"
          style={{ boxShadow: "1px 2px 26px 0px #C4C2C240" }}
        >
          <h4 className="font-semibold text-xl text-[#1D2939] normal-case">
            Order Notes
          </h4>
          {orderNoteList?.map(
            (
              el: {
                content: string;
                date: string;
                user: string;
                attachement: string;
              },
              index: number,
            ) => (
              <div key={index} className="pb-1 border-b border-[#E1E1E1]">
                <p className="font-bold text-[17px] text-black normal-case">
                  {decodeHtmlEntities(el.user)}
                  <span className="text-[#4F547B] font-normal text-[13px] ml-1">
                    {moment(el.date)?.format("DD MMMM YYYY | hh:mm A")}
                  </span>
                </p>
                <p className="font-semibold text-primaryMain mt-1 normal-case text-[15px]">
                  {el.content}
                </p>

                <div className="my-2">
                  <ul className="flex flex-wrap gap-2">
                    <li>
                      <Image
                        src={el?.attachement}
                        alt=""
                        height={180}
                        width={180}
                        className="rounded-md"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            ),
          )}

          <div className=" mt-4 normal-case">
            <div className="">
              <label className="block text-primaryMain text-sm font-medium mb-1">
                Add Note
              </label>
              <textarea
                placeholder="Enter order notes"
                className="p-3 min-h-16 rounded-sm border border-slate-200 w-full dark:bg-slate-900 dark:border-slate-700"
                rows={3}
                value={noteText}
                onChange={(e) => {
                  setErrorData({ error: "", errorType: "" });
                  setNoteText(e.target.value);
                }}
              ></textarea>
              {errorData.errorType === "CONTENT" && (
                <ErrorText>{errorData.error}</ErrorText>
              )}
            </div>

            <label className="block text-zinc-600 text-sm font-bold my-2">
              Attachment
            </label>

            <div>
              <div className="border border-slate-200 p-3 attachment_card relative mt-3  dark:border-slate-700">
                {/* <div className="">
                  <InputComponent label="Name" />
                </div> */}
                <div className="mt-4 ">
                  <div className="">
                    <label className="block text-zinc-600 text-sm font-bold">
                      File
                    </label>
                    <SingleUploadComponent
                      type="add"
                      handleImageChange={(e) => {
                        if (e.target.files) {
                          setErrorData({ error: "", errorType: "" });
                          setFileAttachement(e?.target?.files[0]);
                        }
                      }}
                      component={{
                        isUploaded: fileAttachement !== "" ? true : false,
                        item: fileAttachement,
                      }}
                    />
                    {/* <p className="mt-1 text-red-500 font-medium text-xs">
                      Image size must be 160px * 160px
                    </p> */}
                    {errorData.errorType === "FILE" && (
                      <ErrorText>{errorData.error}</ErrorText>
                    )}
                  </div>
                  {/* <div className="absolute bottom-1 right-2">
                    <button
                      className="bg-transparent h-8 w-8"
                      onClick={onRemove}
                    >
                      <svg
                        className="w-7 h-7"
                        stroke="#E54B4D"
                        fill="#E54B4D"
                        strokeWidth="0"
                        viewBox="0 0 15 15"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704ZM9.85358 5.14644C10.0488 5.3417 10.0488 5.65829 9.85358 5.85355L8.20713 7.49999L9.85358 9.14644C10.0488 9.3417 10.0488 9.65829 9.85358 9.85355C9.65832 10.0488 9.34173 10.0488 9.14647 9.85355L7.50002 8.2071L5.85358 9.85355C5.65832 10.0488 5.34173 10.0488 5.14647 9.85355C4.95121 9.65829 4.95121 9.3417 5.14647 9.14644L6.79292 7.49999L5.14647 5.85355C4.95121 5.65829 4.95121 5.3417 5.14647 5.14644C5.34173 4.95118 5.65832 4.95118 5.85358 5.14644L7.50002 6.79289L9.14647 5.14644C9.34173 4.95118 9.65832 4.95118 9.85358 5.14644Z"
                          fill="#E54B4D"
                        ></path>
                      </svg>
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={() => handleOrderNotes()}
            className="px-8 text-white rounded-[5px] py-2 text-base font-bold bg-primaryMain"
          >
            {isLoading && (
              <CircularProgress
                size={14}
                sx={{ color: "#fff", marginRight: "4px" }}
              />
            )}
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
export default OrderDetail;
