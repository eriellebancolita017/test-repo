"use client";
import CheckboxComponent from "@/components/common/checkboxField/checkboxField";
import React, { useState } from "react";

export default function FeedbackPage() {
  const Star = ({
    selected,
    onClick,
  }: {
    selected: boolean;
    onClick: () => void;
  }) => (
    <svg
      className="mr-2"
      xmlns="http://www.w3.org/2000/svg"
      width="44"
      height="41"
      viewBox="0 0 44 41"
      fill="none"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <path
        d="M24.3131 3.06435L24.3127 3.06358C23.7431 1.94547 22.5954 1.51776 21.6601 1.51776C20.7243 1.51776 19.5795 1.9452 19.0063 3.05729L19.0063 3.05728L19.0023 3.06499L14.4703 11.9856L4.31458 13.4181L4.31429 13.4182C3.22913 13.5714 2.2742 14.3131 1.91238 15.398L1.9116 15.4003C1.55675 16.4703 1.85184 17.6504 2.68107 18.4259L10.0017 25.3551L8.27503 35.1257L8.27375 35.1332C8.084 36.2399 8.5484 37.3632 9.47709 38.014C10.3787 38.6459 11.5715 38.7411 12.5687 38.2251C12.5709 38.2239 12.5731 38.2228 12.5753 38.2217L21.661 33.5887L30.7483 38.2257C30.7489 38.226 30.7495 38.2263 30.7501 38.2266C31.1993 38.4567 31.6724 38.5531 32.122 38.5531C32.7227 38.5531 33.3207 38.3761 33.8366 38.0196L33.8452 38.0136L33.8537 38.0076C34.7688 37.3559 35.2387 36.2462 35.0479 35.1332L35.0466 35.1257L33.3199 25.3551L40.6432 18.4234C40.6435 18.4231 40.6438 18.4229 40.644 18.4226C40.6442 18.4225 40.6443 18.4223 40.6444 18.4222C41.4702 17.6415 41.7585 16.4707 41.4053 15.4037C41.0516 14.3213 40.0949 13.5716 39.0071 13.4181L38.8001 14.8858L39.0071 13.4181L28.8509 11.9855L24.3131 3.06435Z"
        fill={selected ? "#FFD029" : "#EFF0F6"}
        stroke="white"
        strokeWidth="2.96448"
      />
    </svg>
  );

  const [rating, setRating] = useState(0);

  return (
    <>
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="w-4/12">
            <p className="text-primaryMain  font-bold mb-2">
              --- Rate our Services
            </p>
            <h4 className="text-3xl font-bold text-black normal-case">
              Fill the form to submit your feedback
            </h4>
            <p className="normal-case">
              Thank you for using our site! We value your feedback as it helps
              us improve. Please take a moment to complete this short feedback
              form.{" "}
            </p>
            <p className="normal-case">
              Your input is greatly appreciated. <p>Best regards, Fizno Team</p>
            </p>
          </div>
          <div className="w-6/12">
            <div className="border border-blue-200 rounded-3xl my-9 p-8">
              <p className="text-base font-medium normal-case mb-2">
                Your service rating
              </p>
              <div className="rating_star flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    selected={star <= rating}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
              <p className="text-base font-medium normal-case mb-2">
                Additional feedback
              </p>
              <textarea
                rows={5}
                className="w-full border border-gray-200 rounded-md p-3"
                placeholder="If you have any additional feedback, please type it in here..."
              />

              <div className="">
                <CheckboxComponent
                  label={<>I have read and accept the Privacy Policy.</>}
                  type="checkbox"
                  className="font-normal normal-case"
                />
              </div>

              <div className="mt-4">
                {" "}
                <button
                  className="btn h-11 font-semibold bg-yellow-500 hover:bg-yellow-600 text-black px-6 rounded-md"
                  // onClick={() => router.push("/add-products")}
                >
                  <span className="hidden xs:block ">Submit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
