"use client";
import { SelectedItemsProvider } from "@/app/selected-items-context";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import SearchSingleSelect from "@/components/common/select/searchableSingleSelect";
import SingleUploadComponent from "@/components/common/fileUpload/singleFileUpload";
import { UserApi } from "../../../../../api-client/src/apis/UserApi";
import moment from "moment";
import IMAGES from "@/public/images";
import { decodeHtmlEntities } from "@/utils/commonFunction";
import ErrorText from "@/components/common/errorText";
import { useAppDispatch } from "@/redux/hooks";
import { setToastMessage } from "@/redux/slices/globaCache.slice";
import { CircularProgress } from "@mui/material";

const OrderDetails: React.FC = () => {
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

  const [orderDetailData, setOrderDetailData] = useState<any>();

  const [orderImage, setOrderImage] = useState<any>(
    orderDetailData?.wp_wc_order_product_lookup_order[0]?.product
      ?.attachments[0]?.guid
      ? orderDetailData?.wp_wc_order_product_lookup_order[0]?.product?.attachments[0]?.guid?.includes(
          "http",
        )
        ? orderDetailData?.wp_wc_order_product_lookup_order[0]?.product
            ?.attachments[0]?.guid
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}${
            orderDetailData?.wp_wc_order_product_lookup_order[0]?.product
              ?.attachments[0]?.guid
          }`
      : IMAGES.dummyProduct,
  );
  const [orderNoteList, setOrderNoteList] = useState<
    {
      content: string;
      date: string;
      user: string;
      attachement: string;
    }[]
  >([]);
  const [fileAttachement, setFileAttachement] = useState<File | string>("");
  const [noteText, setNoteText] = useState<string>("");
  const [errorData, setErrorData] = useState<{
    errorType: "CONTENT" | "FILE" | "";
    error: string;
  }>({ error: "", errorType: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      handleGetOrderNotes();
    }
  }, [orderId]);

  const privatNoteArray = [
    { value: "private_note", label: "Private Note" },
    { value: "note_to_customer", label: "Note to Customer" },
  ];
  const handleBack = () => {
    router.back();
  };

  /**
   * handle get order details
   */

  const handleGetOrderDetails = async () => {
    const response = await UserApi.getOrderDetailsAPI({
      orderId: Number(orderId),
    });

    if (response.remote === "success") {
      setOrderDetailData(response.data.data);
    }
  };

  useEffect(() => {
    if (orderId) {
      handleGetOrderDetails();
    }
  }, [orderId]);

  console.log({ orderDetailData });

  return (
    <SelectedItemsProvider>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
        {/* Page header */}
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          {/* Left: Title */}
          <div className="mb-4 sm:mb-0">
            <h1 className="flex items-center text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
              Order Detail
              <svg
                className="shrink-0 h-6 w-6 ms-2"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"></path>
              </svg>
            </h1>
          </div>
          <button
            className="btn  bg-primaryMain hover:bg-blueTwo text-white mr-3"
            onClick={() => handleBack()}
          >
            <span className="flex items-center">
              <svg
                className="mr-2"
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
                  strokeWidth="48"
                  d="M244 400 100 256l144-144M120 256h292"
                ></path>
              </svg>
              Back
            </span>
          </button>
        </div>

        <div className="py-3 px-3 mb-4 flex justify-between items-center bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
          <div className="">
            <h3 className="text-slate-950 font-semibold">
              Order #{orderDetailData?.wp_dokan_orders[0]?.order_id}
              {/* <span className="bg-red-500 text-white p-1 text-xs ms-2 ">
                Cancelled
              </span> */}
            </h3>
          </div>
        </div>

        <div className="py-4 pb-8 px-4 mb-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
          <div className="">
            <p className="font-normal text-sm text-slate-950  mb-2  ">
              Order date :{" "}
              {moment(orderDetailData?.post_date)?.format("ha D MMMM YYYY")}
            </p>
            <p className="font-normal text-sm text-slate-950 mb-2">
              Order Status : {orderDetailData?.post_status}
            </p>
            <p className="font-normal text-sm text-slate-950 mb-2">
              Payment via{" "}
              {
                orderDetailData?.wp_nepaz2_postmeta?.find(
                  (el: any) => el.meta_key === "_payment_method_title",
                )?.meta_value
              }
              .
            </p>
          </div>
          <div className="mt-5">
            <label className="font-normal text-sm text-primaryMain ">
              Shipping Detail
            </label>
          </div>
          <hr className="my-3"></hr>
          <div className="">
            <p className="font-normal text-sm text-slate-950 mb-2">
              {
                orderDetailData?.wp_nepaz2_postmeta?.find(
                  (el: any) => el.meta_key === "_billing_address_1",
                )?.meta_value
              }
              <br />
              {
                orderDetailData?.wp_nepaz2_postmeta?.find(
                  (el: any) => el.meta_key === "_billing_city",
                )?.meta_value
              }
              <br />
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
        </div>
        <div className="bg-blueTwo rounded-sm text-white px-4 py-3">
          {" "}
          Order Items
        </div>
        <div className="py-4 pb-8 px-4 mb-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
          <div className="">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="w-[5%] text-center font-semibold text-primaryMain">
                    Img
                  </th>
                  <th className="w-[50%] text-left font-semibold text-primaryMain">
                    Item
                  </th>
                  <th className="w-[10%] font-semibold text-primaryMain">
                    Cost
                  </th>
                  <th className="w-[10%] font-semibold text-primaryMain">
                    Qty
                  </th>
                  <th className="w-[15%] font-semibold text-primaryMain">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center mx-auto">
                    <Image
                      src={orderImage}
                      width={30}
                      height={30}
                      alt=""
                      className="mx-auto"
                      onError={() => setOrderImage(IMAGES.dummyProduct)}
                    />
                  </td>
                  <td>
                    <div className="">
                      <p
                        className="text-primaryMain mb-1 text-sm"
                        // onClick={() => router.push("/seller/edit-product")}
                      >
                        {
                          orderDetailData?.wp_wc_order_product_lookup_order[0]
                            ?.product?.post_title
                        }
                      </p>
                      <p className="text-sm">
                        Vendor:{" "}
                        <span className="text-primaryMain text-sm">
                          {decodeHtmlEntities(
                            orderDetailData?.wp_wc_order_product_lookup_order[0]
                              ?.product?.wp_nepaz2_users?.display_name,
                          )}
                        </span>
                      </p>
                    </div>
                  </td>
                  <td className="text-center">
                    $
                    {
                      orderDetailData?.wp_wc_order_product_lookup_order[0]
                        ?.product_gross_revenue
                    }
                  </td>
                  <td className="text-center">
                    x{" "}
                    {
                      orderDetailData?.wp_wc_order_product_lookup_order[0]
                        ?.product_qty
                    }
                  </td>
                  <td className="text-center">
                    $
                    {
                      orderDetailData?.wp_wc_order_product_lookup_order[0]
                        ?.product_net_revenue
                    }
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="">
            <h5 className="text-slate-950 font-bold italic my-3">
              Shipping Items(s)
            </h5>

            <table className="w-full">
              <tbody>
                <tr>
                  <td className="text-center mx-auto w-[5%]">
                    <svg
                      className="text-center"
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="Delivery_Truck">
                        <g>
                          <path d="M21.47,11.185l-1.03-1.43a2.5,2.5,0,0,0-2.03-1.05H14.03V6.565a2.5,2.5,0,0,0-2.5-2.5H4.56a2.507,2.507,0,0,0-2.5,2.5v9.94a1.5,1.5,0,0,0,1.5,1.5H4.78a2.242,2.242,0,0,0,4.44,0h5.56a2.242,2.242,0,0,0,4.44,0h1.22a1.5,1.5,0,0,0,1.5-1.5v-3.87A2.508,2.508,0,0,0,21.47,11.185ZM7,18.935a1.25,1.25,0,1,1,1.25-1.25A1.25,1.25,0,0,1,7,18.935Zm6.03-1.93H9.15a2.257,2.257,0,0,0-4.3,0H3.56a.5.5,0,0,1-.5-.5V6.565a1.5,1.5,0,0,1,1.5-1.5h6.97a1.5,1.5,0,0,1,1.5,1.5ZM17,18.935a1.25,1.25,0,1,1,1.25-1.25A1.25,1.25,0,0,1,17,18.935Zm3.94-2.43a.5.5,0,0,1-.5.5H19.15a2.257,2.257,0,0,0-4.3,0h-.82v-7.3h4.38a1.516,1.516,0,0,1,1.22.63l1.03,1.43a1.527,1.527,0,0,1,.28.87Z"></path>
                          <path d="M18.029,12.205h-2a.5.5,0,0,1,0-1h2a.5.5,0,0,1,0,1Z"></path>
                        </g>
                      </g>
                    </svg>
                  </td>
                  <td colSpan={3} className="w-[80%]">
                    <div className="">
                      <p className=" mb-1 text-sm">Flat Shipping</p>
                      <p className="text-sm font-semibold">
                        <span className="font-normal text-sm">
                          {decodeHtmlEntities(
                            orderDetailData?.wp_wc_order_product_lookup_order[0]
                              ?.user?.display_name,
                          )}
                        </span>
                      </p>
                    </div>
                  </td>
                  <td className="text-center w-[15%]">
                    $
                    {
                      orderDetailData?.wp_wc_order_product_lookup_order[0]
                        ?.shipping_amount
                    }
                  </td>
                </tr>
                <tr>
                  <td colSpan={4} className="w-[85%]">
                    <div className="text-end mt-4">
                      <p className=" mb-1 font-semibold text-sm">Shipping</p>
                    </div>
                  </td>
                  <td className="text-center w-[15%]">
                    <div className="mt-4">
                      {" "}
                      $
                      {
                        orderDetailData?.wp_wc_order_product_lookup_order[0]
                          ?.shipping_amount
                      }
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={4} className="w-[85%]">
                    <div className="text-end mt-4">
                      <p className=" mb-1 font-semibold text-sm">Order Total</p>
                    </div>
                  </td>
                  <td className="text-center w-[15%]">
                    <div className="mt-4">
                      {" "}
                      $
                      {
                        orderDetailData?.wp_wc_order_product_lookup_order[0]
                          ?.product_gross_revenue
                      }
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={4} className="w-[85%]">
                    <div className="text-end mt-4">
                      <p className=" mb-1 font-normal text-sm">Total Earning</p>
                    </div>
                  </td>
                  <td className="text-center w-[15%]">
                    <div className="mt-4">
                      $
                      {
                        orderDetailData?.wp_wc_order_product_lookup_order[0]
                          ?.product_net_revenue
                      }
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-blueTwo rounded-sm text-white px-4 py-3">
          Order Notes
        </div>
        <div className="py-4 pb-8 px-4 mb-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
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
              <div key={index} className="pb-1 border-b border-[#E1E1E1] mb-2">
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

          <div className="mt-4">
            <label className="block text-zinc-600 text-sm font-bold mb-1">
              Add Note
            </label>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Separate Product Tags with commas"
              className="min-h-16 rounded-sm border border-slate-200 w-full dark:bg-slate-900 dark:border-slate-700"
              rows={3}
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
        <div className="flex justify-end mt-4">
          <div className="w-48">
            <SearchSingleSelect label="" options={privatNoteArray} />
          </div>
        </div>
        <div className="text-end mt-4">
          {" "}
          <button
            onClick={() => {
              console.log("clicked");

              handleOrderNotes();
            }}
            className="btn bg-primaryMain  hover:bg-blueTwo text-white"
          >
            {isLoading && (
              <CircularProgress
                size={14}
                sx={{ color: "#fff", marginRight: "4px" }}
              />
            )}
            <span className="hidden xs:block">Adds</span>
          </button>
        </div>
      </div>
    </SelectedItemsProvider>
  );
};

export default OrderDetails;
