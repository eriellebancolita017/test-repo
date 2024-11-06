import { SVGIcon } from "@/assets/svg";
import SkeletonLoader from "@/components/loader/skeletonLoader";
import { tokens } from "@/helpers/jwtTokenFunction";
import SVG from "@/public/svg";
import { useAppDispatch } from "@/redux/hooks";
import { setToastMessage } from "@/redux/slices/globaCache.slice";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import { Avatar } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { containsEmail, containsPhoneNumber } from "@/utils/commonFunction";

interface Review {
  id: number;
  username: string;
  userId: number;
  date: string;
  content: string;
  avatarUrl: string;
}

interface ProductReviewProps {
  reviewArray: Review[];
  handleFav: () => void;
  favCount: number;
  productId: string;
  handleRefreshComments: () => void;
}

const ProductReview: React.FC<ProductReviewProps> = ({
  reviewArray,
  handleFav,
  favCount,
  productId,
  handleRefreshComments,
}) => {
  /**
   * redux
   */
  const router = useRouter();
  const dispatch = useAppDispatch();

  /**
   * state management
   */
  const [comment, setComment] = useState<string>("");

  /**
   * handle comment
   */

  const handleComment = async () => {
    if (containsPhoneNumber(comment)) {
      dispatch(
        setToastMessage({
          message:
            "Comments cannot contain phone numbers for security reasons.",
          open: true,
          status: "error",
        }),
      );
      return;
    }

    if (containsEmail(comment)) {
      dispatch(
        setToastMessage({
          message:
            "Comments cannot contain email addresses for  security reasons.",
          open: true,
          status: "error",
        }),
      );
      return;
    }

    if (comment === "") {
      dispatch(
        setToastMessage({
          message: "Please enter comment.",
          open: true,
          status: "error",
        }),
      );
    } else if (typeof window !== "undefined" && !tokens.getAccessToken()) {
      dispatch(
        setToastMessage({
          message: "Please login to comment.",
          open: true,
          status: "error",
        }),
      );
    } else {
      const payload = {
        productId,
        comment,
      };

      const response = await UserApi.sendProdCommentsAPI(payload);

      if (response.remote === "success") {
        handleRefreshComments();
        setComment("");
      } else {
        dispatch(
          setToastMessage({
            message: response.error.errors.message || "An error occurred!",
            open: true,
            status: "error",
          }),
        );
      }
    }
  };

  return (
    <>
      <div className="comment_box_main">
        <div className="flex justify-between items-center">
          <div className="text-red-600 font-semibold flex items-center w-1/12 ">
            <span
              className="mr-2 cursor-pointer"
              onClick={() =>
                tokens.getAccessTokenCookies()
                  ? handleFav()
                  : dispatch(
                      setToastMessage({
                        message: "To save the product, plese login",
                        status: "error",
                        open: true,
                      }),
                    )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 16 14"
                fill={`${favCount > 0 ? "#737373" : "none"}`}
                // fill="none"
                className="cursor-pointer"
              >
                <path
                  d="M8.4135 13.8733C8.18683 13.9533 7.8135 13.9533 7.58683 13.8733C5.6535 13.2133 1.3335 10.46 1.3335 5.79332C1.3335 3.73332 2.9935 2.06665 5.04016 2.06665C6.2535 2.06665 7.32683 2.65332 8.00016 3.55998C8.6735 2.65332 9.7535 2.06665 10.9602 2.06665C13.0068 2.06665 14.6668 3.73332 14.6668 5.79332C14.6668 10.46 10.3468 13.2133 8.4135 13.8733Z"
                  stroke="#FF0000"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {/* {favCount || 0} */}
          </div>
          <div className="w-full mb-2">
            <div className="border rounded p-5">
              <p className="capitalize font-semibold border-b pb-2 text-[#252525]">
                Comment
              </p>

              <div className="flex  mt-3 border rounded px-2 py-1">
                <input
                  className="   w-full py-1 px-2 "
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Type a comment"
                />
                <button
                  className="bg-black rounded px-3 text-white"
                  onClick={() =>
                    tokens.getAccessTokenCookies()
                      ? handleComment()
                      : dispatch(
                          setToastMessage({
                            message: "Please login or register to comment.",
                            status: "error",
                            open: true,
                          }),
                        )
                  }
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {reviewArray?.map((review) => (
        <div
          key={review.id}
          className="review_card flex gap-4 normal-case border-gray-300 border-b py-2"
        >
          <div
            className="w-1/12 cursor-pointer"
            onClick={() => router.push(`/buyer-page?id=${review.userId}`)}
          >
            <Avatar
              src={review.avatarUrl}
              style={{ width: "50px", height: "50px" }}
            >
              {review?.username[0]}
            </Avatar>
          </div>
          <div className="w-3/12">
            <p
              onClick={() => router.push(`/buyer-page?id=${review.userId}`)}
              className="font-semibold text-primaryMain text-base cursor-pointer"
              dangerouslySetInnerHTML={{ __html: review?.username }}
            />
            <span
              className="font-normal text-xs cursor-pointer"
              onClick={() => router.push(`/buyer-page?id=${review.userId}`)}
            >
              {review?.date}
            </span>
          </div>

          <div className="w-8/12">
            <p className="font-semibold text-gray-500 text-base truncate">
              {review?.content}
            </p>
            <div className="flex justify-between mt-1">
              <span className="font-semibold text-xs cursor-pointer text-primaryMain">
                Reply
              </span>
              <span className="font-semibold">
                <SVG.flagIcon />
              </span>
            </div>
          </div>
        </div>
      ))}
      {reviewArray?.length === 0 && (
        <>
          {[...Array(3)].map((index) => (
            <div
              key={index}
              className="review_card flex gap-4 normal-case border-gray-300 border-b py-2"
            >
              <div className="w-1/12">
                <SkeletonLoader type="circular" width={50} height={50} />
              </div>
              <div className="w-3/12 space-y-1">
                <SkeletonLoader type="rectangular" width={160} height={24} />

                <SkeletonLoader type="rectangular" width={62} height={15} />
              </div>

              <div className="w-8/12">
                <SkeletonLoader type="rectangular" width={300} height={24} />

                <div className="flex justify-between mt-1">
                  <SkeletonLoader type="rectangular" width={34} height={20} />

                  <SkeletonLoader type="rectangular" width={20} height={20} />
                </div>
              </div>
            </div>
          ))}
        </>
      )}
      {!reviewArray && (
        <div className="flex items-center justify-center h-[200px]">
          <div className="text-center normal-case">
            <SVGIcon.noCommentIcon />
            <p className="text-base text-[#97B0FF] ">No comments</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductReview;
