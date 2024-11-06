"use client";
import InputComponent from "@/components/common/inputField/page";
import Link from "next/link";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
import React from "react";

export default function ChangePassword() {
  // const router = useRouter();
  return (
    <main className="bg-white dark:bg-slate-900 mt-8 mb-16">
      <div className="container">
        <div className="mt-5 text-center">
          <h1 className="heading_section_text font-bold">New Password</h1>
          <span className="text-[#525252] font-normal normal-case">
            Set the new password for your account so you can login and<br></br>{" "}
            access all features.
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
                      <InputComponent
                        className="capitalize font-medium text-[#000!important] "
                        label="Enter new password"
                        placeholder="***********"
                        mandatory={true}
                        type="password"
                      />
                      <div className="mt-5">
                        <InputComponent
                          className="capitalize font-medium text-[#000!important]"
                          label="Confirm new password"
                          placeholder="***********"
                          mandatory={true}
                          type="password"
                        />
                      </div>
                    </div>
                  </div>
                  <div className=" my-6">
                    <Link
                      href="/whats-new"
                      // onClick={() => router.push("/dashboard")}
                      className="px-4 py-3 block normal-case font-bold text-center w-full bg-primaryMain text-white rounded disabled:opacity-50"
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
