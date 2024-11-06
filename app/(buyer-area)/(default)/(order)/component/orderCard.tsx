import MediumSizeModal from "@/components/common/modal/mediumSizeModal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { OrderTrackComponent } from "./orderTrackComponent";
import IMAGES from "@/public/images";
import { tokens } from "@/helpers/jwtTokenFunction";
import { useAppDispatch } from "@/redux/hooks";
import { useFormik } from "formik";
import * as yup from "yup";
import { setToastMessage } from "@/redux/slices/globaCache.slice";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import { IconButton } from "@mui/material";
import SVG from "@/public/svg";
import { ButtonLoader } from "@/components/common/loader/buttonLoader";
import InputComponent from "@/components/common/inputField/page";

interface OrderCardProps {
  orderNumber: string;
  total: string;
  itemsCount: number;
  arrivalDate: string;
  productDescription: string;
  productImageSrc: string;
  review: number;
  productId: number;
  handleRefresh: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  orderNumber,
  total,
  itemsCount,
  arrivalDate,
  productDescription,
  productImageSrc,
  review,
  productId,
  handleRefresh,
}) => {
  /**
   * redux
   */

  const dispatch = useAppDispatch();

  /**
   * state management
   */
  const [postReview, setPostReview] = useState(false);
  const [trackOrderModal, setTrackOrderModal] = useState(false);
  const [orderImage, setOrderImage] = useState<any>(productImageSrc);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  /**
   * formik
   */
  const formik = useFormik<{ title: string; content: string; rating: number }>({
    initialValues: {
      title: "",
      content: "",
      rating: 0,
    },
    validationSchema: yup.object({
      title: yup.string().required("Title is required."),
      content: yup.string().required("Content is required."),
      rating: yup
        .number()
        .notOneOf([0], "Rating is required.")
        .required("Rating is required."),
    }),
    onSubmit: (values) => {
      handleSendReview(values);
    },
  });

  /**
   * handle send review
   */

  const handleSendReview = async (values: {
    title: string;
    content: string;
    rating: number;
  }) => {
    if (!tokens.getAccessToken()) {
      dispatch(
        setToastMessage({
          message: "Please login to review.",
          open: true,
          status: "error",
        }),
      );
    } else {
      const payload = {
        productId: productId.toString(),
        content: values.content,
        title: values.title,
        rating: values.rating,
      };
      setIsLoading(true);
      const response = await UserApi.sendProdReviewAPI(payload);
      if (response.remote === "success") {
        setIsLoading(false);
        // handleGetAllReview();
        formik.resetForm();
        handleRefresh();
        setPostReview(false);
        dispatch(
          setToastMessage({
            message: "Review posted successfully.",
            open: true,
            status: "success",
          }),
        );
      } else {
        setIsLoading(false);
        dispatch(
          setToastMessage({
            message: response.error.errors.message || "Error has occurs!",
            open: true,
            status: "success",
          }),
        );
      }
    }
  };

  return (
    <>
      <div className=" border-black order_card_main">
        <div className="bg-[#EDEFEF] py-3 px-4 flex justify-between items-center">
          <div className="normal-case">
            <h5 className="text-black font-semibold">Order #</h5>
            <p
              className="text-primaryMain font-semibold cursor-pointer"
              onClick={() =>
                router.push(`/order-detail?orderId=${orderNumber}`)
              }
            >
              {orderNumber}
            </p>
          </div>
          <div className="normal-case">
            <h5 className="text-black font-semibold">Total</h5>
            <p className="text-black font-bold">
              {total} <span className="text-[#00BB40]">{itemsCount} items</span>
            </p>
          </div>
          <div className="flex gap-2 rating_order items-center">
            {/* Ratings can be rendered dynamically if needed */}
            {new Array(review).fill(1)?.map((item, index) => (
              <span className="" key={index}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.5142 0.5L13.4041 7.35644L20.5 8.15523L15.1872 13.1621L16.6569 20.5L10.4837 16.7377L4.29626 20.4744L5.79371 13.1422L0.5 8.11351L7.59843 7.34429L10.5142 0.5Z"
                    fill="#FFB21C"
                  />
                </svg>
              </span>
            ))}
            {/* Additional rating stars... */}
          </div>
          <div>
            <p
              className="font-semibold text-primaryMain normal-case cursor-pointer"
              onClick={() =>
                router.push(`/order-detail?orderId=${orderNumber}`)
              }
            >
              View order details
            </p>
          </div>
        </div>
        <div className="py-3 px-4 flex items-center justify-between">
          <div className="flex items-center">
            <div
              className="mr-4 cursor-pointer"
              onClick={() => router.push(`/search-detail?id=${productId}`)}
            >
              <Image
                src={orderImage}
                width={68}
                height={68}
                alt=""
                className="p-2 border border-[#C7C7C7] rounded-[3px]"
                onError={() => setOrderImage(IMAGES.dummyProduct)}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-black normal-case">
                Arriving by {arrivalDate}
              </p>

              <p
                onClick={() => router.push(`/search-detail?id=${productId}`)}
                className="text-sm text-primaryMain font-semibold normal-case cursor-pointer"
              >
                {productDescription}
              </p>
              {review === 0 && (
                <button
                  onClick={() => setPostReview(true)}
                  className="bg-[#00BB40] h-6 text-white normal-case text-xs w-24 font-semibold rounded-[2px]"
                >
                  Post review
                </button>
              )}
            </div>
          </div>
          <div className="w-2/12">
            <button
              onClick={() => setTrackOrderModal(true)}
              className="h-9 mb-3 w-full bg-white text-primaryMain rounded-md border border-primaryMain"
            >
              Track package
            </button>
            <button
              onClick={() => router.push(`/search-detail?id=${productId}`)}
              className="h-9 w-full bg-primaryMain text-white rounded-md border border-primaryMain"
            >
              Buy again
            </button>
          </div>
        </div>
      </div>
      <MediumSizeModal isOpen={postReview} setIsOpen={setPostReview}>
        <h4 className="font-bold text-xl text-[#151515]">Post review </h4>
        <div className="mt-4">
          <div className="">
            <div className="mt-4">
              <div className="flex gap-1 my-1 mb-4">
                {[0, 1, 2, 3, 4].map((item) =>
                  item < formik.values.rating ? (
                    <IconButton
                      key={item}
                      onClick={() => formik.setFieldValue("rating", item + 1)}
                    >
                      <SVG.yellowStar />
                    </IconButton>
                  ) : (
                    <IconButton
                      key={item}
                      onClick={() => formik.setFieldValue("rating", item + 1)}
                    >
                      <SVG.GreyStar />
                    </IconButton>
                  ),
                )}
              </div>
              {formik.touched.rating && formik.errors.rating && (
                <span className="text-sm text-red-500">
                  {formik.errors.rating}
                </span>
              )}
              <div className="">
                <InputComponent
                  placeholder=""
                  label="Review Title"
                  className="normal-case text-lg rounded-md"
                  {...formik.getFieldProps("title")}
                />
                {formik.touched.title && formik.errors.title && (
                  <span className="text-sm text-red-500">
                    {formik.errors.title}
                  </span>
                )}
                <div className="mt-4">
                  <label className="text-[10px] text-zinc-600 text-sm font-bold normal-case">
                    Review Content
                  </label>
                  <textarea
                    rows={4}
                    className="w-full rounded-md border border-slate-200 p-2 mt-1"
                    placeholder=""
                    {...formik.getFieldProps("content")}
                    maxLength={1000}
                  />
                  {formik.touched.content && formik.errors.content && (
                    <span className="text-sm text-red-500">
                      {formik.errors.content}
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <button
                    disabled={
                      tokens.getAccessToken()
                        ? isLoading
                          ? true
                          : false
                        : true
                    }
                    onClick={() => formik.handleSubmit()}
                    className="py-3 px-10 relative rounded-md text-white"
                    style={{
                      background: tokens.getAccessToken()
                        ? isLoading
                          ? "gray"
                          : "#306cb5"
                        : "gray",
                    }}
                  >
                    {isLoading && (
                      <>
                        <span className="absolute left-[7%] top-[35%]">
                          <ButtonLoader />
                        </span>
                      </>
                    )}
                    {tokens.getAccessToken()
                      ? "Submit Review"
                      : "Login to continue"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MediumSizeModal>

      <MediumSizeModal isOpen={trackOrderModal} setIsOpen={setTrackOrderModal}>
        <OrderTrackComponent />
      </MediumSizeModal>
    </>
  );
};

export default OrderCard;
