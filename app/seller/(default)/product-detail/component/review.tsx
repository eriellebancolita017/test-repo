import InputComponent from "@/components/common/inputField/page";
import SVG from "@/public/svg";
import Image from "next/image";
import React from "react";

export const Reviews = () => {
  return (
    <div>
      <h4 className="font-bold text-2xl normal-case">Reviews</h4>

      <div className="flex gap-5 mt-5">
        <div className="w-4/12 bg-gray-50 rounded-md flex items-center justify-center">
          <div className="">
            <p className="text-6xl font-bold text-primaryMain text-center">
              4.8
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
        <div className="w-8/12 bg-gray-50 rounded-md py-4 px-6">
          <div className="flex gap-4 items-center">
            {" "}
            <div className="relative w-full h-2 bg-slate-200 rounded-md">
              <div
                className="absolute inset-0 bg-primaryMain rounded-md"
                aria-hidden="true"
                style={{ width: "70%" }}
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
                70%
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            {" "}
            <div className="relative w-full h-2 bg-slate-200 rounded-md">
              <div
                className="absolute inset-0 bg-primaryMain rounded-md"
                aria-hidden="true"
                style={{ width: "50%" }}
              />
            </div>
            <div className="flex">
              <div className="flex gap-1 my-1 justify-center mr-2">
                <SVG.yellowStar />

                <SVG.yellowStar />
                <SVG.yellowStar />

                <SVG.yellowStar />
                <SVG.yellowStar />
              </div>
              <p className="mb-0 text-primaryMain font-medium text-base w-5 text-end">
                15%
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            {" "}
            <div className="relative w-full h-2 bg-slate-200 rounded-md">
              <div
                className="absolute inset-0 bg-primaryMain rounded-md"
                aria-hidden="true"
                style={{ width: "15%" }}
              />
            </div>
            <div className="flex">
              <div className="flex gap-1 my-1 justify-center mr-2">
                <SVG.yellowStar />

                <SVG.yellowStar />
                <SVG.yellowStar />

                <SVG.yellowStar />
                <SVG.yellowStar />
              </div>
              <p className="mb-0 text-primaryMain font-medium text-base w-5">
                10%
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            {" "}
            <div className="relative w-full h-2 bg-slate-200 rounded-md">
              <div
                className="absolute inset-0 bg-primaryMain rounded-md"
                aria-hidden="true"
                style={{ width: "5%" }}
              />
            </div>
            <div className="flex">
              <div className="flex gap-1 my-1 justify-center mr-2">
                <SVG.yellowStar />

                <SVG.yellowStar />
                <SVG.yellowStar />

                <SVG.yellowStar />
                <SVG.yellowStar />
              </div>
              <p className="mb-0 text-primaryMain font-medium text-base w-5 text-end">
                3%
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            {" "}
            <div className="relative w-full h-2 bg-slate-200 rounded-md">
              <div
                className="absolute inset-0 bg-primaryMain rounded-md"
                aria-hidden="true"
                style={{ width: "2%" }}
              />
            </div>
            <div className="flex">
              <div className="flex gap-1 my-1 justify-center mr-2">
                <SVG.yellowStar />

                <SVG.yellowStar />
                <SVG.yellowStar />

                <SVG.yellowStar />
                <SVG.yellowStar />
              </div>
              <p className="mb-0 text-primaryMain font-medium text-base w-5 text-end">
                2%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-bold text-2xl normal-case">Reviews</h4>
        <div className="review_card gap-4 normal-case border-gray-300 border-b py-2">
          <div className="flex">
            <div className=" mr-3">
              <Image
                src="/images/avatar-06.jpg"
                alt=""
                width={50}
                height={50}
                className="rounded-full"
              />
            </div>
            <div className="">
              <p className="font-semibold text-primaryMain text-base">
                Niclos Cage
                <span className="font-normal text-xs text-gray-400 ml-3">
                  3 days ago
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
                Great Product
              </p>
              <p className="font-normal text-gray-500 text-base ">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour
              </p>
            </div>
          </div>
        </div>
        <div className="review_card gap-4 normal-case border-gray-300 border-b py-2">
          <div className="flex">
            <div className=" mr-3">
              <Image
                src="/images/avatar-06.jpg"
                alt=""
                width={50}
                height={50}
                className="rounded-full"
              />
            </div>
            <div className="">
              <p className="font-semibold text-primaryMain text-base">
                Niclos Cage
                <span className="font-normal text-xs text-gray-400 ml-3">
                  3 days ago
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
                Great Product
              </p>
              <p className="font-normal text-gray-500 text-base ">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour
              </p>
            </div>
          </div>
        </div>
        <p className="cursor-pointer text-red-600 text-base mt-2 normal-case underline">
          View All Reviews
        </p>
      </div>
      <div className="mt-4">
        <h4 className="font-bold text-2xl normal-case">Write a Review</h4>
        <p className="mt-4 text-gray-600 normal-case font-medium">
          What is it like to Product?
        </p>
        <div className="flex gap-1 my-1 mb-4">
          <SVG.yellowStar />

          <SVG.yellowStar />
          <SVG.yellowStar />

          <SVG.yellowStar />
          <SVG.yellowStar />
        </div>
        <div className="">
          <InputComponent
            placeholder="Great Products"
            label="Review Title"
            className="normal-case text-lg rounded-md"
          />
          <div className="mt-4">
            <label className="text-[10px] text-zinc-600 text-sm font-bold normal-case">
              Review Content
            </label>
            <textarea
              rows={4}
              className="w-full rounded-md border border-slate-200 p-2 mt-1"
              placeholder="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
            />
          </div>
          <div className="mt-4">
            <button className="bg-primaryMain py-3 px-10 rounded-md text-white">
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
