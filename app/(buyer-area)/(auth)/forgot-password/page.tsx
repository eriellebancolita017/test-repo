"use client";
import InputComponent from "@/components/common/inputField/page";
import Link from "next/link";
import React from "react";

export default function ForgotPassword() {
  return (
    <main className="bg-white dark:bg-slate-900 mb-20">
      <div className="container">
        <div className="mt-5 text-center">
          <h1 className="heading_section_text font-bold">Forgot password</h1>
          <span className="text-[#525252] font-normal normal-case">
            Enter your email for the verification process, we will send{" "}
            <br></br>4 digits code to your email.
          </span>
        </div>
        <div className="relative md:flex items-center justify-center">
          {/* Content */}

          <div className="md:w-5/12">
            <div className=" h-full flex flex-col after:flex-1">
              <div className=" mx-auto w-full px-6 py-8">
                {/* Form */}
                <form>
                  <div className="space-y-4">
                    <div className="">
                      <div className="mt-16">
                        <InputComponent
                          className="capitalize font-medium text-[#000!important]"
                          label="Email"
                          placeholder=""
                          mandatory={true}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 mb-4">
                    <Link
                      href="/verification"
                      className="px-4 py-2 block normal-case font-bold text-center w-full bg-primaryMain text-white rounded disabled:opacity-50"
                    >
                      Continue
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
