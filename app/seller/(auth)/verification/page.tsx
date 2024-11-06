"use client";
import OtpInputComponent from "@/components/common/inputField/otpInput";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import OtpInputComponent from "@/components/common/inputField/otpInput.tsx";

export default function verification() {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [seconds]);

  const formatTime = (sec: number) => {
    const minutes = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const remainingSeconds = (sec % 60).toString().padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  };
  return (
    <main className="bg-white dark:bg-slate-900 pb-20">
      <div className="container">
        <div className="pt-5 text-center">
          <h1 className="heading_section_text font-bold">Verification</h1>
          <span className="text-[#525252] font-normal normal-case">
            Enter your 5 digits code that you received on your<br></br>{" "}
            registered email.
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
                      <div className="my-8 text-center otp_input_main">
                        <OtpInputComponent />

                        <div className="my-6">
                          <p className="text-red-500 font-normal">
                            {formatTime(seconds)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 mb-4">
                    <Link
                      href="/seller/change-password"
                      className="px-4 py-3 block normal-case font-bold text-center w-full bg-primaryMain text-white rounded disabled:opacity-50"
                    >
                      Continue
                    </Link>
                  </div>
                  <div className="text-center">
                    <p className="mt-3 normal-case text-center text-black ">
                      If you didn’t receive a code!
                      <Link
                        href="#"
                        className="font-semibold text-primaryMain ml-1"
                      >
                        Resend
                      </Link>
                    </p>{" "}
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
