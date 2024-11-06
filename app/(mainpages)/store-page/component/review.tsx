import SkeletonLoader from "@/components/loader/skeletonLoader";
import IMAGES from "@/public/images";
import SVG from "@/public/svg";
import Image from "next/image";
import React from "react";

export const Reviews = ({
  reviews,
  reviewCounts,
  totalReviewCount,
  avgRating,
}: {
  reviews: any[];
  reviewCounts: any;
  totalReviewCount: number;
  avgRating: number;
}) => {
  const getAvgRatingCount = (rating: number) => {
    const avg = (rating * 100) / totalReviewCount;
    return avg;
  };

  return (
    <div className="mx-4">
      <h4 className="font-bold text-2xl normal-case">Reviews</h4>
      <div className="flex gap-5 mt-5">
        <div className="w-4/12 bg-gray-50 rounded-md flex items-center justify-center">
          <div className="">
            <p className="text-6xl font-bold text-primaryMain text-center flex justify-center">
              {avgRating >= 0 ? (
                <>{avgRating || 0}</>
              ) : (
                <SkeletonLoader type="rectangular" width={100} height={80} />
              )}
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
          {/* <div className="flex gap-4 items-center">
            {" "}
            <div className="relative w-full h-2 bg-slate-200 rounded-md">
              <div
                className="absolute inset-0 bg-primaryMain rounded-md"
                aria-hidden="true"
                style={{ width: `${getAvgRatingCount(reviewCounts["5"])}%` }}
              />
            </div>
            <div className="flex ">
              <div className="flex gap-1 my-1 justify-center mr-2">
                <SVG.yellowStar />

                <SVG.yellowStar />
                <SVG.yellowStar />

                <SVG.yellowStar />
                <SVG.yellowStar />
              </div>
              <p className="mb-0 text-primaryMain font-medium text-base w-5 text-end">
                {getAvgRatingCount(reviewCounts["5"]) || 0}%
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            {" "}
            <div className="relative w-full h-2 bg-slate-200 rounded-md">
              <div
                className="absolute inset-0 bg-primaryMain rounded-md"
                aria-hidden="true"
                style={{ width: `${getAvgRatingCount(reviewCounts["4"])}%` }}
              />
            </div>
            <div className="flex">
              <div className="flex gap-1 my-1 justify-center mr-2">
                <SVG.yellowStar />

                <SVG.yellowStar />
                <SVG.yellowStar />

                <SVG.yellowStar />
                <SVG.GreyStar />
              </div>
              <p className="mb-0 text-primaryMain font-medium text-base w-5 text-end">
                {getAvgRatingCount(reviewCounts["4"]) || 0}%
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            {" "}
            <div className="relative w-full h-2 bg-slate-200 rounded-md">
              <div
                className="absolute inset-0 bg-primaryMain rounded-md"
                aria-hidden="true"
                style={{ width: `${getAvgRatingCount(reviewCounts["3"])}%` }}
              />
            </div>
            <div className="flex">
              <div className="flex gap-1 my-1 justify-center mr-2">
                <SVG.yellowStar />

                <SVG.yellowStar />
                <SVG.yellowStar />

                <SVG.GreyStar />
                <SVG.GreyStar />
              </div>
              <p className="mb-0 text-primaryMain font-medium text-base w-5">
                {getAvgRatingCount(reviewCounts["3"]) || 0}%
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            {" "}
            <div className="relative w-full h-2 bg-slate-200 rounded-md">
              <div
                className="absolute inset-0 bg-primaryMain rounded-md"
                aria-hidden="true"
                style={{ width: `${getAvgRatingCount(reviewCounts["2"])}%` }}
              />
            </div>
            <div className="flex">
              <div className="flex gap-1 my-1 justify-center mr-2">
                <SVG.yellowStar />

                <SVG.yellowStar />
                <SVG.GreyStar />

                <SVG.GreyStar />
                <SVG.GreyStar />
              </div>
              <p className="mb-0 text-primaryMain font-medium text-base w-5 text-end">
                {getAvgRatingCount(reviewCounts["2"]) || 0}%
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            {" "}
            <div className="relative w-full h-2 bg-slate-200 rounded-md">
              <div
                className="absolute inset-0 bg-primaryMain rounded-md"
                aria-hidden="true"
                style={{ width: `${getAvgRatingCount(reviewCounts["1"])}%` }}
              />
            </div>
            <div className="flex">
              <div className="flex gap-1 my-1 justify-center mr-2">
                <SVG.yellowStar />

                <SVG.GreyStar />
                <SVG.GreyStar />

                <SVG.GreyStar />
                <SVG.GreyStar />
              </div>
              <p className="mb-0 text-primaryMain font-medium text-base w-5 text-end">
                {getAvgRatingCount(reviewCounts["1"]) || 0}%
              </p>
            </div>
          </div> */}

          <div className="flex gap-x-6 items-center justify-between">
            <div className="w-9/12">
              <div className="relative w-full h-[5px] bg-slate-200 rounded-md">
                <div
                  className="absolute inset-0 bg-primaryMain rounded-md"
                  aria-hidden="true"
                  style={{ width: `${getAvgRatingCount(reviewCounts["5"])}%` }}
                />
              </div>
            </div>
            {/* <div className="flex w-3/12 justify-between gap-x-3"> */}
            <div className="flex gap-1 my-1 justify-center">
              <SVG.yellowStar />

              <SVG.yellowStar />
              <SVG.yellowStar />

              <SVG.yellowStar />
              <SVG.yellowStar />
            </div>
            <div className="w-10 mb-0 text-primaryMain font-medium text-base text-end">
              {getAvgRatingCount(reviewCounts["5"])}%
            </div>
            {/* </div> */}
          </div>
          <div className="flex gap-x-6 items-center justify-between">
            <div className="w-9/12">
              <div className="relative w-full h-[5px] bg-slate-200 rounded-md">
                <div
                  className="absolute inset-0 bg-primaryMain rounded-md"
                  aria-hidden="true"
                  style={{ width: `${getAvgRatingCount(reviewCounts["4"])}%` }}
                />
              </div>
            </div>
            {/* <div className="flex w-3/12 justify-between gap-x-3"> */}
            <div className="flex gap-1 my-1 justify-center">
              <SVG.yellowStar />

              <SVG.yellowStar />
              <SVG.yellowStar />

              <SVG.yellowStar />
              <SVG.GreyStar />
            </div>
            <div className="w-10 mb-0 text-primaryMain font-medium text-base text-end">
              {getAvgRatingCount(reviewCounts["4"])}%
            </div>
            {/* </div> */}
          </div>
          <div className="flex gap-x-6 items-center justify-between">
            <div className="w-9/12">
              <div className="relative w-full h-[5px] bg-slate-200 rounded-md">
                <div
                  className="absolute inset-0 bg-primaryMain rounded-md"
                  aria-hidden="true"
                  style={{ width: `${getAvgRatingCount(reviewCounts["3"])}%` }}
                />
              </div>
            </div>
            {/* <div className="flex w-3/12 justify-between gap-x-3"> */}
            <div className="flex gap-1 my-1 justify-center">
              <SVG.yellowStar />

              <SVG.yellowStar />
              <SVG.yellowStar />

              <SVG.GreyStar />
              <SVG.GreyStar />
            </div>
            <div className="w-10 mb-0 text-primaryMain font-medium text-base text-end">
              {getAvgRatingCount(reviewCounts["3"])}%
            </div>
            {/* </div> */}
          </div>
          <div className="flex gap-x-6 items-center justify-between">
            <div className="w-9/12">
              <div className="relative w-full h-[5px] bg-slate-200 rounded-md">
                <div
                  className="absolute inset-0 bg-primaryMain rounded-md"
                  aria-hidden="true"
                  style={{ width: `${getAvgRatingCount(reviewCounts["2"])}%` }}
                />
              </div>
            </div>
            {/* <div className="flex w-3/12 justify-between gap-x-3"> */}
            <div className="flex gap-1 my-1 justify-center">
              <SVG.yellowStar />

              <SVG.yellowStar />
              <SVG.GreyStar />

              <SVG.GreyStar />
              <SVG.GreyStar />
            </div>
            <div className="w-10 mb-0 text-primaryMain font-medium text-base text-end">
              {getAvgRatingCount(reviewCounts["2"])}%
            </div>
            {/* </div> */}
          </div>
          <div className="flex gap-x-6 items-center justify-between">
            <div className="w-9/12">
              <div className="relative w-full h-[5px] bg-slate-200 rounded-md">
                <div
                  className="absolute inset-0 bg-primaryMain rounded-md"
                  aria-hidden="true"
                  style={{ width: `${getAvgRatingCount(reviewCounts["1"])}%` }}
                />
              </div>
            </div>
            {/* <div className="flex w-3/12 justify-between gap-x-3"> */}
            <div className="flex gap-1 my-1 justify-center">
              <SVG.yellowStar />

              <SVG.GreyStar />
              <SVG.GreyStar />

              <SVG.GreyStar />
              <SVG.GreyStar />
            </div>
            <div className="w-10 mb-0 text-primaryMain font-medium text-base text-end">
              {getAvgRatingCount(reviewCounts["1"])}%
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-bold text-2xl normal-case">Reviews</h4>
        {reviews.map((review, index) => {
          return (
            <div
              key={index}
              className="review_card gap-4 normal-case border-gray-300 border-b py-2"
            >
              <div className="flex">
                <div className=" mr-3">
                  <Image
                    src={review.image}
                    alt=""
                    width={50}
                    height={50}
                    className="rounded-full"
                    onError={(e) => {
                      // Typecast the target to HTMLImageElement
                      (e.target as HTMLImageElement).src = IMAGES.avatar.src;
                    }}
                  />
                </div>
                <div className="">
                  <p className="font-semibold text-primaryMain text-base">
                    {review.name}
                    <span className="font-normal text-xs text-gray-400 ml-3">
                      {review.time}
                    </span>
                  </p>
                  <div className="flex gap-1 my-1 ">
                    <SVG.yellowStar />

                    <SVG.yellowStar />
                    <SVG.yellowStar />

                    <SVG.yellowStar />
                    <SVG.yellowStar />
                  </div>
                  <p className="font-medium text-primaryMain text-base ">
                    {review.title}
                  </p>
                  <p className="font-normal text-gray-500 text-base ">
                    {review.content}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        {/* <p className="cursor-pointer text-red-600 text-base mt-2 normal-case underline">
          View All Reviews
        </p> */}
      </div>
    </div>
  );
};
