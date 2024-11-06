import React from "react";
import OnTrackingSlider from "./orderTrackingSlider";
import SVG from "@/public/svg";

export const OrderTrackComponent = () => {
  const steps = [
    {
      title: (
        <>
          <p>Shipped</p>
          <p>Monday, 17 June 2024</p>
        </>
      ),
      icon: (
        <>
          <SVG.buyerShipped />
        </>
      ),
    },
    {
      title: (
        <>
          <p>In Transit</p>
          <p>&nbsp;</p>
        </>
      ),
      icon: (
        <>
          <SVG.buyerIntransit />
        </>
      ),
    },
    {
      title: (
        <>
          <p>Out for Delivery</p>
          <p>&nbsp;</p>
        </>
      ),
      icon: (
        <>
          <SVG.buyerTruck />{" "}
        </>
      ),
    },
    {
      title: (
        <>
          <p>Delivery</p>
          <p>&nbsp;</p>
        </>
      ),
      icon: (
        <>
          <SVG.buyerHandshake />
        </>
      ),
    },
  ];
  const currentStep = 1;
  return (
    <>
      <h4 className="font-bold text-xl text-[#151515]">Order Status #71147</h4>
      <div className="mt-4">
        <p className="font-medium text-sm text-[#52525B]">
          Order expected arrival
          <span className="font-bold text-primaryMain mx-1">23 June, 2024</span>
          | Order by
          <span className="font-bold text-primaryMain ml-1">MBJ Deals</span>
        </p>
        <div className=" border-b border-primaryMain pb-2 mb-4 ">
          <div className="flex justify-between mb-4 px-20">
            <OnTrackingSlider currentStep={currentStep} steps={steps} />
          </div>
        </div>
        <div className="">
          <p className="text-sm font-normal text-[#020617]">
            Tracking Code:
            <span className="text-primaryMain font-semibold ml-1">
              3243234342342342
            </span>
          </p>
          <p className="text-sm font-normal text-[#020617]">
            Tracking URL:
            <span className="text-primaryMain font-semibold ml-1">UPS.com</span>
          </p>
        </div>
      </div>
    </>
  );
};
