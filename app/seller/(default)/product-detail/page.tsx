"use client";
import SVG from "@/public/svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function ProductDetail() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <>
      <div className="container">
        <div className="sm:flex sm:justify-between sm:items-center mx-8 mt-8 ">
          {/* Left: Title */}
          <div className="mb-4 sm:mb-0">
            <h1 className=" flex items-center text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
              Product Detail
              <svg
                className="shrink-0 h-6 w-6 ms-2"
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
                  strokeWidth="32"
                  d="M448 341.37V170.61A32 32 0 0 0 432.11 143l-152-88.46a47.94 47.94 0 0 0-48.24 0L79.89 143A32 32 0 0 0 64 170.61v170.76A32 32 0 0 0 79.89 369l152 88.46a48 48 0 0 0 48.24 0l152-88.46A32 32 0 0 0 448 341.37z"
                ></path>
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="m69 153.99 187 110 187-110m-187 310v-200"
                ></path>
              </svg>
            </h1>
          </div>
          <button
            className="btn bg-primaryMain hover:bg-blueTwo text-white"
            onClick={() => handleBack()}
          >
            <span className="flex items-center">
              <svg
                className="mr-1"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
              </svg>
              Back
            </span>
          </button>
        </div>
        <div className="title_section_product bg-white m-8 p-5 flex justify-between">
          <div className=" w-6/12">
            <h4 className="text-2xl font-medium mb-1">
              0 [68/K0-78] Engine TB Billet Oil Temp Gauge, Black – Honda 50cc
              &70cc TBW1181
            </h4>
            <span>Condition: </span>
            <span className="text-primaryMain"> New</span>
          </div>
          <div className="">
            <ul className="flex">
              <li className="mr-2 cursor-pointer">
                <SVG.WhatsappIcon />
              </li>
              <li className="mr-2 cursor-pointer">
                <SVG.InstagramIcon />
              </li>
              <li className="mr-2 cursor-pointer">
                <SVG.FacebookIcon />
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-white p-4 mx-8">
          <div className="flex gap-5">
            <div className="w-5/12">
              <div className=" w-full mr-8">
                <Image
                  src="/images/mainpages/productDetail.jpg"
                  alt="Product Detail"
                  // layout="content"
                  objectFit="cover" // Adjust objectFit as needed
                  className="rounded w-full" // Optionally add rounded corners or other styles
                  width={400}
                  height={100}
                />
              </div>
            </div>
            <div className="w-7/12">
              <div className="flex items-baseline">
                <h4 className="text-2xl font-semibold ">$58.99</h4>
                <span className="text-gray-400 ml-2">Free Shipping</span>
              </div>
              <div className="flex items-center mt-2">
                <p className="mr-1 mb-0 text-sm">Sold By:</p>
                <h4 className="text-lg mb-0 text-primaryMain font-semibold ">
                  MBJ DEALS
                </h4>
              </div>
              <div className="flex items-center ">
                <p className="mb-0 mr-1 text-sm">Status:</p>
                <h4 className=" text-green-500 mb-0 text-sm font-semibold">
                  Delivered
                </h4>
              </div>
              <div className="flex items-center ">
                <p className="mb-0 mr-1 text-sm">Stock:</p>
                <h4 className=" text-red-500 mb-0 text-sm font-semibold">
                  Out of stock
                </h4>
              </div>

              <div className="flex items-center mt-8 ">
                <p className="mb-0 mr-1 text-sm">Categories:</p>
                <h4 className=" text-primaryMain mb-0 text-sm font-medium">
                  Dirt,Bike,Engine Parts & Accessories
                </h4>
              </div>
              <div className="flex items-center ">
                <p className="mb-0 mr-1 text-sm">Tags:</p>
                <h4 className=" text-gray-400 mb-0 text-sm font-medium">
                  Hond,Oil Temp Gauge{" "}
                </h4>
              </div>
              <div className="flex items-center ">
                <p className="mb-0 mr-1 text-sm">Views:</p>
                <h4 className="text-fuchsia-500 mb-0 text-sm font-medium">
                  59
                </h4>
              </div>
            </div>
          </div>

          <div className="mt-5"></div>
        </div>
      </div>
    </>
  );
}
