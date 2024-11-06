"use client";
import Breadcrumb from "@/components/common/breadcrumb/breadcrumb";
import InputComponent from "@/components/common/inputField/page";
import React, { useState } from "react";

export default function ContactUs() {
  const breadcrumbItems = [
    { text: "Home", href: "/" },
    { text: "Contact Us", href: "/contact-us" },
  ];

  const [selectedOption, setSelectedOption] = useState<string>("Tech support");

  const options = [
    "Tech support",
    "Buyer support",
    "Seller support",
    "HR support",
  ];
  return (
    <>
      <div>
        <div className="banner_section csm_pages"></div>
        <Breadcrumb items={breadcrumbItems} />

        <div className="container">
          <div className="mt-5 mb-16">
            <h4 className="my-5 heading_crm_pages text-black font-bold capitalize text-2xl text-center">
              Contact Us
            </h4>
            <div className="flex justify-center my-6">
              <div className="w-6/12">
                <div className="my-6 flex w-full justify-between">
                  {options.map((option) => {
                    const isSelected = selectedOption === option;
                    return (
                      <div
                        key={option}
                        className={`cursor-pointer border rounded-full px-3 py-1 normal-case font-medium text-sm ${
                          isSelected
                            ? "border-primaryMain text-primaryMain bg-blue-100"
                            : "border-gray-500 text-gray-500 bg-gray-100"
                        }`}
                      >
                        <input
                          type="radio"
                          className="mr-2"
                          checked={isSelected}
                          onChange={() => setSelectedOption(option)}
                        />
                        {option}
                      </div>
                    );
                  })}
                </div>
                <div className="flex mt-4 mb-4 gap-5">
                  <div className="w-6/12">
                    <div className="mt-4 ">
                      <InputComponent
                        className="normal-case"
                        label="First Name"
                        mandatory={true}
                        placeholder="John"
                      />
                    </div>
                  </div>
                  <div className="w-6/12">
                    <div className="mt-4 ">
                      <InputComponent
                        label="Last Name"
                        className="normal-case"
                        mandatory={true}
                        placeholder="Bravo"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 ">
                  <InputComponent
                    label="Email"
                    className="normal-case"
                    mandatory={true}
                    placeholder="Email"
                  />
                </div>
                <div className="mt-4 ">
                  <InputComponent
                    label="Phone Number"
                    className="normal-case"
                    mandatory={true}
                    placeholder="phone number"
                  />
                </div>
                <div className="mt-4">
                  <label className="flex text-zinc-600 text-sm font-bold mb-1 normal-case">
                    Message
                  </label>
                  <textarea
                    className="min-h-16 rounded-sm border border-slate-200 w-full dark:bg-[rgb(18,18,18)] dark:border-slate-700"
                    rows={4}
                  ></textarea>
                </div>
                <div className="text-end mt-4">
                  <button
                    className="btn h-11 bg-primaryMain hover:bg-blueTwo text-white px-24"
                    // onClick={() => router.push("/add-products")}
                  >
                    <span className="hidden xs:block ">Submit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
