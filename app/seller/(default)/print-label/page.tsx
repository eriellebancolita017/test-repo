"use client";
import React from "react";
import { SelectedItemsProvider } from "@/app/selected-items-context";
import InputComponent from "@/components/common/inputField/page";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SearchSingleSelect from "@/components/common/select/searchableSingleSelect";
import SingleUploadComponent from "@/components/common/fileUpload/singleFileUpload";
import Link from "next/link";
import deliveryPic from "@/public/images/postalCode.jpg";
import soccerPic from "@/public/images/soccer.jpg";
import ServiceCard from "@/components/common/serviceCard/serviceCard";
interface Option {
  id: number;
  name: string;
  deliveryTime: string;
  discount: string;
  originalPrice: string;
  discountedPrice: string;
  label?: string; // label is optional since not all objects have it
}
const AttachmentCard: React.FC<{ onRemove: () => void }> = ({ onRemove }) => {
  return (
    <div className="border border-slate-200 p-3 attachment_card relative mt-3  dark:border-slate-700">
      <div className="">
        <InputComponent label="Name" />
      </div>
      <div className="mt-4 ">
        <div className="">
          <label className="block text-zinc-600 text-sm font-bold">File</label>
          <SingleUploadComponent type="add" />
          <p className="mt-1 text-red-500 font-medium text-xs">
            Image size must be 160px * 160px
          </p>
        </div>
        <div className="absolute bottom-1 right-2">
          <button className="bg-transparent h-8 w-8" onClick={onRemove}>
            <svg
              className="w-7 h-7"
              stroke="currentColor"
              fill="none"
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
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const PrintLabel: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [attachmentCards, setAttachmentCards] = useState<JSX.Element[]>([
    <AttachmentCard key={0} onRemove={() => removeAttachmentCard(0)} />,
  ]);

  const router = useRouter();

  // Function to remove an attachment card
  const removeAttachmentCard = (index: number) => {
    setAttachmentCards((prevCards) => prevCards.filter((_, i) => i !== index));
  };
  const handleBack = () => {
    router.back();
  };

  const countryCodeArray = [
    { value: "FL", label: "FL" },
    { value: "FLOne", label: "FL" },
  ];

  const [selectedOption, setSelectedOption] = useState<number | null>(1);
  const optionsArray: Option[] = [
    {
      id: 1,
      name: "Parcel Select Ground",
      deliveryTime: "Estimated delivery in 2-8 days",
      discount: "Save 30%- Discount available",
      originalPrice: "$17.54",
      discountedPrice: "$12.35",
      label: "Cheapest",
    },
    {
      id: 2,
      name: "Priority Mail",
      deliveryTime: "Estimated delivery in 2-4 days",
      discount: "Save 27%- Discount available",
      originalPrice: "$24.75",
      discountedPrice: "$18.08",
    },
  ];

  const handleClick = (id: number) => {
    setSelectedOption(id);
  };
  return (
    <SelectedItemsProvider>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
        {/* Page header */}
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          {/* Left: Title */}
          <div className="mb-4 sm:mb-0">
            <h1 className="flex items-center text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
              Print Label
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
          <div className=" py-3">
            <div className="text-center">
              <Image
                className="rounded-full mx-auto h-10 w-10"
                src={soccerPic}
                width={50}
                height={50}
                alt=""
              />
              <div className=" w-40">YFZ 450R Shock 2014-2015</div>
            </div>
          </div>
          <div className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div className=" text-center">
              <div className="font-medium text-slate-800 dark:text-slate-100">
                #233232 by Guest
              </div>
              <div className="text-center font-medium text-fuchsia-500">
                12 item
              </div>
              <p className="underline text-primaryMain font-semibold cursor-pointer">
                Buy Shipping label
              </p>
            </div>
          </div>{" "}
          <div className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div className="text-center">22 May, 2024</div>
          </div>
          <div className="px-2 first:pl-5 last:pr-5 py-3 ">
            <div className="text-left w-40">
              Angel Moraga Heritage 18883 Cypress View Dr Fort Myers, FL
              33967-4824
            </div>
          </div>
          <div className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-center">
            <div className="">$65.43</div>
            {/* <span className="text-xs">Via PayPal Adaptive</span> */}
          </div>
          <div className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div className="text-left">$17.95</div>
          </div>
          <div className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <Link href="#" className="underline text-primaryMain font-semibold">
              Awaiting Shipment
            </Link>
            <div className="font-medium ">Ship by : 22 May 2024</div>
          </div>
        </div>
        <div className="">
          <div className="mt-4 flex justify-between w-full">
            <div className=" w-5/12">
              <h1 className=" mb-3 flex items-center text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
                Shipping To
              </h1>
              <div className=" py-4 pb-8 px-4 mb-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
                <div className=" grid grid-cols-2 gap-5">
                  {" "}
                  <div className=" ">
                    {" "}
                    <InputComponent
                      className="w-[80%]"
                      label=""
                      placeholder="Angel Moraga"
                    />
                  </div>
                  <div className="">
                    <InputComponent
                      className="w-[80%]"
                      placeholder="Company Name"
                      label=""
                    />
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-1 gap-5">
                  {" "}
                  <div className=" ">
                    {" "}
                    <InputComponent
                      className="w-[80%]"
                      label=""
                      placeholder="18883 Cypress View Drive"
                    />
                  </div>
                </div>
                <div className="mt-3 flex gap-5">
                  {" "}
                  <div className="w-40 ">
                    {" "}
                    <InputComponent
                      className="w-[80%]"
                      label=""
                      placeholder="Fort Myers"
                    />
                  </div>
                  <div className="w-20 coutryCode_select">
                    {" "}
                    <SearchSingleSelect label="" options={countryCodeArray} />
                  </div>
                  <div className="w-40">
                    <InputComponent
                      className="w-[80%]"
                      label=""
                      placeholder="33967-4824"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-6/12">
              {" "}
              <h1 className=" mb-3 flex items-center text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
                Package Dimensions
              </h1>
              <div className=" py-4 pb-8 px-4 mb-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
                <div className=" flex">
                  <div className=" ">
                    {" "}
                    <InputComponent
                      className="w-[80%]"
                      placeholder="Length"
                      label=""
                    />
                  </div>

                  <div className="flex items-end">
                    <svg
                      className="h-7 w-7 mb-1 mx-1"
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      version="1.1"
                      viewBox="0 0 16 16"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M15.854 12.854c-0-0-0-0-0-0l-4.854-4.854 4.854-4.854c0-0 0-0 0-0 0.052-0.052 0.090-0.113 0.114-0.178 0.066-0.178 0.028-0.386-0.114-0.529l-2.293-2.293c-0.143-0.143-0.351-0.181-0.529-0.114-0.065 0.024-0.126 0.062-0.178 0.114 0 0-0 0-0 0l-4.854 4.854-4.854-4.854c-0-0-0-0-0-0-0.052-0.052-0.113-0.090-0.178-0.114-0.178-0.066-0.386-0.029-0.529 0.114l-2.293 2.293c-0.143 0.143-0.181 0.351-0.114 0.529 0.024 0.065 0.062 0.126 0.114 0.178 0 0 0 0 0 0l4.854 4.854-4.854 4.854c-0 0-0 0-0 0-0.052 0.052-0.090 0.113-0.114 0.178-0.066 0.178-0.029 0.386 0.114 0.529l2.293 2.293c0.143 0.143 0.351 0.181 0.529 0.114 0.065-0.024 0.126-0.062 0.178-0.114 0-0 0-0 0-0l4.854-4.854 4.854 4.854c0 0 0 0 0 0 0.052 0.052 0.113 0.090 0.178 0.114 0.178 0.066 0.386 0.029 0.529-0.114l2.293-2.293c0.143-0.143 0.181-0.351 0.114-0.529-0.024-0.065-0.062-0.126-0.114-0.178z"></path>
                    </svg>
                    <div className="">
                      <InputComponent
                        className="w-[80%]"
                        placeholder="Width"
                        label=""
                      />
                    </div>
                    <svg
                      className="h-7 w-7 mb-1 mx-1"
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      version="1.1"
                      viewBox="0 0 16 16"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M15.854 12.854c-0-0-0-0-0-0l-4.854-4.854 4.854-4.854c0-0 0-0 0-0 0.052-0.052 0.090-0.113 0.114-0.178 0.066-0.178 0.028-0.386-0.114-0.529l-2.293-2.293c-0.143-0.143-0.351-0.181-0.529-0.114-0.065 0.024-0.126 0.062-0.178 0.114 0 0-0 0-0 0l-4.854 4.854-4.854-4.854c-0-0-0-0-0-0-0.052-0.052-0.113-0.090-0.178-0.114-0.178-0.066-0.386-0.029-0.529 0.114l-2.293 2.293c-0.143 0.143-0.181 0.351-0.114 0.529 0.024 0.065 0.062 0.126 0.114 0.178 0 0 0 0 0 0l4.854 4.854-4.854 4.854c-0 0-0 0-0 0-0.052 0.052-0.090 0.113-0.114 0.178-0.066 0.178-0.029 0.386 0.114 0.529l2.293 2.293c0.143 0.143 0.351 0.181 0.529 0.114 0.065-0.024 0.126-0.062 0.178-0.114 0-0 0-0 0-0l4.854-4.854 4.854 4.854c0 0 0 0 0 0 0.052 0.052 0.113 0.090 0.178 0.114 0.178 0.066 0.386 0.029 0.529-0.114l2.293-2.293c0.143-0.143 0.181-0.351 0.114-0.529-0.024-0.065-0.062-0.126-0.114-0.178z"></path>
                    </svg>
                  </div>
                  <div className="">
                    <InputComponent
                      className="w-[80%]"
                      label=""
                      placeholder="Height"
                    />
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-5">
                  <div className=" ">
                    {" "}
                    <InputComponent
                      className="w-[80%]"
                      placeholder="Pounds"
                      label=""
                    />
                  </div>
                  <div className="">
                    <InputComponent
                      className="w-[80%]"
                      label=""
                      placeholder="Ounces"
                    />
                  </div>
                </div>
                <p className="text-slate-800 mt-4 font-semibold text-xs">
                  Please make sure to round up to the nearest whole number to
                  avoid extra charges and fees from the carrier service (EX.
                  14.5 &#10230; 15)
                </p>
              </div>
            </div>{" "}
          </div>
        </div>
        <h1 className=" mb-3 flex items-center text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
          Choose a Service
        </h1>
        <div className=" mb-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
          {optionsArray.map((option: Option) => (
            <ServiceCard
              key={option.id}
              deliveryPic={deliveryPic}
              option={option}
              isSelected={selectedOption === option.id}
              onClick={() => handleClick(option.id)}
            />
          ))}

          <div className="text-end mt-4 p-4">
            {" "}
            <button className="btn bg-primaryMain  hover:bg-blueTwo text-white">
              <span className="hidden xs:block">Save</span>
            </button>
          </div>
        </div>{" "}
      </div>
    </SelectedItemsProvider>
  );
};

export default PrintLabel;
