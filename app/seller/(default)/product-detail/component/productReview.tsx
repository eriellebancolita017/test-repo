import SVG from "@/public/svg";
import Image from "next/image";
import React from "react";

interface Review {
  id: number;
  username: string;
  date: string;
  content: string;
  avatarUrl: string;
}

interface ProductReviewProps {
  reviewArray: Review[];
}

const ProductReview: React.FC<ProductReviewProps> = ({ reviewArray }) => {
  return (
    <>
      <div className="comment_box_main">
        <div className="flex justify-between gap-5 mt-5 mb-2 items-center">
          <div className="text-red-600 font-semibold flex w-1/12 mr-4">
            <span className="mr-2 ">
              <SVG.heartBlank />
            </span>
            1.6k
          </div>
          <div className="w-10/12">
            <input
              className="border-blue-300 rounded-2xl border w-full py-1 px-2"
              placeholder="Message seller"
            />
          </div>

          <div className="w-1/12">
            <span>
              <SVG.sendGray />
            </span>
          </div>
        </div>
      </div>
      {reviewArray.map((review) => (
        <div
          key={review.id}
          className="review_card flex gap-4 normal-case border-gray-300 border-b py-2"
        >
          <div className="w-1/12">
            <Image
              src={review.avatarUrl}
              alt={review.username}
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
          <div className="w-3/12">
            <p className="font-semibold text-primaryMain text-base">
              {review.username}
            </p>
            <span className="font-normal text-xs">{review.date}</span>
          </div>

          <div className="w-8/12">
            <p className="font-semibold text-gray-500 text-base truncate">
              {review.content}
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
    </>
  );
};

export default ProductReview;
