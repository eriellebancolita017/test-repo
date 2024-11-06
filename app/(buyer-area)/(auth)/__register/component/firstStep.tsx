"use client";
import CheckboxComponent from "@/components/common/checkboxField/checkboxField";
import InputComponent from "@/components/common/inputField/page";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import googleBtn from "@public/svg/mainpages/google.svg";
export default function FirstStep() {
  return (
    <>
      <div className="mt-5 text-center">
        <h1 className="heading_section_text font-bold">Register</h1>
        <span className="text-[#525252] font-normal">
          SEARCH, SELL & BUY. WE KEEP IT SIMPLE.
        </span>
      </div>
      <div className="relative md:flex items-center">
        {/* Content */}
        <div className="w-6/12">
          <div className="w-[500px] mx-auto">
            {" "}
            <p className="text-center font-normal mb-2 capitalize text-black">
              Register with
            </p>
            <button className="border text-black  border border-primaryMain flex justify-center items-center w-full rounded-md py-3">
              <Image
                alt=""
                src="../svg/mainpages/google.svg"
                width={30}
                height={30}
                className="mr-2"
              />{" "}
              Login With <b className="ml-1"> Google</b>
            </button>
            <button className="mt-3 text-black border  border border-primaryMain flex justify-center items-center w-full rounded-md py-3">
              <Image
                alt=""
                src="../svg/mainpages/facebookIcon.svg"
                width={30}
                height={30}
                className="mr-2"
              />{" "}
              Login With <b className="ml-1"> Facebook</b>
            </button>
            <button className="mt-3 text-black border  border border-primaryMain flex justify-center items-center w-full rounded-md py-3">
              <Image
                alt=""
                src="../svg/mainpages/appleIcon.svg"
                width={30}
                height={30}
                className="mr-2"
              />{" "}
              Login With <b className="ml-1"> Apple</b>
            </button>
          </div>
        </div>
        <div className="md:w-6/12">
          <div className=" h-full flex flex-col after:flex-1">
            <div className=" mx-auto w-full px-6 py-8">
              {/* Form */}
              <form>
                <div className="space-y-4">
                  <div className="grid grid-cols-2    gap-4">
                    <InputComponent
                      className="capitalize font-medium text-[#000!important] "
                      label="First Name"
                      placeholder=""
                      mandatory={true}
                    />
                    <InputComponent
                      className="capitalize font-medium text-[#000!important]"
                      label="Last Name"
                      placeholder=""
                      mandatory={true}
                    />
                  </div>
                  <div className="">
                    <InputComponent
                      className="capitalize font-medium text-[#000!important] "
                      label="Username"
                      placeholder=""
                      mandatory={true}
                    />
                  </div>
                  <div className="">
                    <InputComponent
                      className="capitalize font-medium text-[#000!important] "
                      label="Email"
                      placeholder=""
                      mandatory={true}
                    />
                  </div>
                  <div className="">
                    <InputComponent
                      className="capitalize font-medium text-[#000!important] "
                      label="Website Url"
                      placeholder=""
                      mandatory={true}
                    />
                  </div>
                  <div className="">
                    <InputComponent
                      className="capitalize font-medium text-[#000!important] "
                      label="Password"
                      placeholder=""
                      mandatory={true}
                    />
                  </div>
                  <div className="">
                    <InputComponent
                      className="capitalize font-medium text-[#000!important] "
                      label="Confirm Password"
                      placeholder=""
                      mandatory={true}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <CheckboxComponent
                    label={
                      <>
                        By checking this box you agree to our{" "}
                        <Link
                          href=""
                          className="font-semibold text-primaryMain"
                        >
                          Privacy Policy
                        </Link>{" "}
                        and{" "}
                        <Link
                          href=""
                          className="font-semibold text-primaryMain"
                        >
                          Terms and Conditions
                        </Link>
                      </>
                    }
                    type="checkbox"
                    className="font-normal normal-case"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
