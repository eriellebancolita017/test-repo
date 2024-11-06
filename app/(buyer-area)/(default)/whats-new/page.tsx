"use client";
import { SVGIcon } from "@/assets/svg";
import HeaderSectionCard from "@/components/common/header/headerSectionCard";
// import Image from "next/image";
import React from "react";

const WhatsNew = () => {
  return (
    <div>
      <div className="flex flex-col">
        <HeaderSectionCard title="See what’s new" />

        <div className="mt-4">
          {/* <div className="flex items-center border-b py-3">
            <Image
              src="/images/avatar-03.jpg"
              alt=""
              className="mr-2 rounded-full"
              width={60}
              height={60}
            />
            <p className="text-[20px] font-normal normal-case">
              <span className="text-primaryMain font-bold text-lg mr-1">
                @Billyjohn
              </span>
              has liked your
              <span className="text-black font-bold text-lg ml-1">
                comment.
              </span>
            </p>
          </div>
          <div className="flex items-center border-b py-3">
            <Image
              src="/images/avatar-03.jpg"
              alt=""
              className="mr-2 rounded-full"
              width={60}
              height={60}
            />
            <p className="text-[20px] font-normal normal-case">
              <span className="text-primaryMain font-bold text-lg mr-1">
                @Jay 443
              </span>
              mentioned you in a
              <span className="text-black font-bold text-lg ml-1">
                comment.
              </span>
            </p>
          </div>
          <div className="flex items-center border-b py-3">
            <Image
              src="/images/mainpages/productPic.png"
              alt=""
              className="mr-2 rounded-full border border-primaryMain"
              width={60}
              height={60}
            />
            <p className="text-[20px] font-normal normal-case">
              Your
              <span className="text-black font-bold text-lg mx-1">
                Your Elka rear shock
              </span>
              has shipped and estimated delivery date is July 29 2024.
            </p>
          </div>
          <div className="flex items-center border-b py-3">
            <Image
              src="/images/avatar-03.jpg"
              alt=""
              className="mr-2 rounded-full"
              width={60}
              height={60}
            />
            <p className="text-[20px] font-normal normal-case">
              <span className="text-primaryMain font-bold text-lg mr-1">
                @Matthew9912
              </span>
              has
              <span className="text-black font-bold text-lg mx-1">
                followed
              </span>
              you.
            </p>
          </div>
          <div className="flex items-center border-b py-3">
            <Image
              src="/images/avatar-03.jpg"
              alt=""
              className="mr-2 rounded-full"
              width={60}
              height={60}
            />
            <p className="text-[20px] font-normal normal-case">
              <span className="text-primaryMain font-bold text-lg mr-1">
                @lo663
              </span>
              <span className="text-black font-bold text-lg mx-1">sent</span>
              you a message
            </p>
          </div>
          <div className="flex items-center border-b py-3">
            <Image
              src="/images/avatar-03.jpg"
              alt=""
              className="mr-2 rounded-full"
              width={60}
              height={60}
            />
            <p className="text-[20px] font-normal normal-case">
              <span className="text-primaryMain font-bold text-lg mr-1">
                @seller
              </span>
              listed 5 new
              <span className="text-black font-bold text-lg ml-1">
                products
              </span>
            </p>
          </div> */}
          <div className="text-center w-full flex justify-center items-center min-h-[400px]">
            <div className="">
              <SVGIcon.NoDataIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WhatsNew;
