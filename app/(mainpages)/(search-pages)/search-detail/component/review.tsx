import InputComponent from "@/components/common/inputField/page";
import { ButtonLoader } from "@/components/common/loader/buttonLoader";
import { tokens } from "@/helpers/jwtTokenFunction";
import SVG from "@/public/svg";
import { useAppDispatch } from "@/redux/hooks";
import { setToastMessage } from "@/redux/slices/globaCache.slice";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import { Avatar, IconButton } from "@mui/material";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import * as yup from "yup";

export const Reviews = ({ productId }: { productId: string }) => {
  /**
   * redux
   */

  const dispatch = useAppDispatch();

  /**
   * state management
   */

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reviewList, setReviewList] = useState<{
    reviewListData: any;
    totalReview: number;
    averageReview: number;
  }>({
    reviewListData: [],
    totalReview: 0,
    averageReview: 0,
  });

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
   * handle get all review
   */

  const handleGetAllReview = async () => {
    const response = await UserApi.getAllProdReviewAPI(productId);

    if (response.remote === "success") {
      setReviewList({
        reviewListData: response.data.data.review,
        totalReview: response.data.data.total,
        averageReview: response.data.data.avg,
      });
    }
  };

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
        productId,
        content: values.content,
        title: values.title,
        rating: values.rating,
      };
      setIsLoading(true);
      const response = await UserApi.sendProdReviewAPI(payload);
      if (response.remote === "success") {
        setIsLoading(false);
        handleGetAllReview();
        formik.resetForm();
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

  const calculateRatingPercentage = (ratingsArray: any) => {
    // Step 1: Initialize the count for ratings from 1 to 5
    const ratingCount: any = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    // Step 2: Count the occurrences of each rating in the array
    ratingsArray.forEach(({ rating }: any) => {
      ratingCount[rating] = (ratingCount[rating] || 0) + 1;
    });

    // Step 3: Calculate the percentage for each rating (rounded to whole number)
    const totalRatings = ratingsArray.length;
    const ratingPercentageArray = Object.keys(ratingCount).map((rating) => ({
      rating: Number(rating),
      percentage:
        totalRatings === 0
          ? 0
          : Math.round((ratingCount[rating] / totalRatings) * 100),
    }));

    return ratingPercentageArray;
  };

  const formatRatingArr = () => {
    const data = reviewList.reviewListData.map((el: any) => ({
      rating: Number(el?.wp_commentmeta[0]?.meta_value),
    }));

    return data;
  };

  useEffect(() => {
    handleGetAllReview();
  }, [productId]);

  return (
    <div>
      <h4 className="font-bold text-2xl normal-case text-[#344054]">Reviews</h4>

      <div className="flex gap-5 mt-5">
        <div className="w-4/12 bg-gray-50 rounded-md flex items-center justify-center">
          <div className="text-center">
            <p className="text-6xl font-bold text-[#164C96] text-center">
              {reviewList.averageReview?.toFixed(1) || 0}
            </p>

            <div className="flex gap-1 my-1 justify-center">
              <SVG.yellowStar />

              <SVG.yellowStar />
              <SVG.yellowStar />

              <SVG.yellowStar />
              <SVG.yellowStar />
            </div>
            <p className="my-2 normal-case">Product Rating</p>
          </div>
        </div>
        <div className="w-8/12 bg-gray-50 rounded-md py-4 px-10 space-y-3">
          {calculateRatingPercentage(formatRatingArr())
            ?.reverse()
            ?.map((el: any, index: any) => (
              <div
                key={index}
                className="flex gap-x-6 items-center justify-between"
              >
                <div className="w-9/12">
                  <div className="relative w-full h-[5px] bg-slate-200 rounded-md">
                    <div
                      className="absolute inset-0 bg-primaryMain rounded-md"
                      aria-hidden="true"
                      style={{ width: `${el.percentage}%` }}
                    />
                  </div>
                </div>
                {/* <div className="flex w-3/12 justify-between gap-x-3"> */}
                <div className="flex gap-1 my-1 justify-center">
                  {[1, 2, 3, 4, 5].map((item) =>
                    item <= el.rating ? (
                      <SVG.yellowStar key={item} />
                    ) : (
                      <SVG.GreyStar key={item} />
                    ),
                  )}
                </div>
                <div className="w-10 mb-0 text-primaryMain font-medium text-base text-end">
                  {el?.percentage}%
                </div>
                {/* </div> */}
              </div>
            ))}
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-bold text-2xl normal-case text-[#1D2939]">
          Reviews
        </h4>
        <div className="review_card gap-4 normal-case border-gray-300 border-b py-2">
          {reviewList.reviewListData.map((item: any) => (
            <div className="flex" key={item?.comment_ID}>
              <div className=" mr-3">
                <Avatar
                  src={item?.user?.avatar?.guid}
                  style={{ width: "50px", height: "50px" }}
                >
                  {item?.user?.display_name[0]}
                </Avatar>
              </div>
              <div className="">
                <p
                  className="font-semibold text-primaryMain text-base"
                  dangerouslySetInnerHTML={{ __html: item?.user?.display_name }}
                />

                <span className="font-normal text-xs text-gray-400 ml-3">
                  {moment(item?.comment_date).format("MM-DD-YYYY")}
                </span>
                <div className="flex gap-1 my-1 ">
                  {new Array(Number(item?.wp_commentmeta[0]?.meta_value))
                    .fill(0)
                    .map((_, index) => (
                      <SVG.yellowStar key={index} />
                    ))}
                </div>
                <p className="font-medium text-primaryMain text-base ">
                  {item?.comment_title}
                </p>
                <p className="font-normal text-gray-500 text-base ">
                  {item?.comment_content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* <p className="cursor-pointer text-[#D94A27] text-base mt-2 normal-case underline">
          View All Reviews
        </p> */}
      </div>
      <div className="mt-4">
        <h4 className="font-bold text-2xl normal-case">Write a Review</h4>
        <p className="mt-4 text-gray-600 normal-case font-medium">
          What is it like to Product?
        </p>
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
          <span className="text-sm text-red-500">{formik.errors.rating}</span>
        )}
        <div className="">
          <InputComponent
            placeholder=""
            label="Review Title"
            className="normal-case text-lg rounded-md"
            {...formik.getFieldProps("title")}
          />
          {formik.touched.title && formik.errors.title && (
            <span className="text-sm text-red-500">{formik.errors.title}</span>
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
                tokens.getAccessToken() ? (isLoading ? true : false) : true
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
              {tokens.getAccessToken() ? "Submit Review" : "Login to continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
