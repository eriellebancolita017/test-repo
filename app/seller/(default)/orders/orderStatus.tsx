import React, { useState } from "react";
import Image from "next/image";
import GoogleMapComponent from "@/components/common/map/googleMap";
import deliveryPic from "@/public/images/postalCode.jpg";

export default function OrderStatus() {
  const [activeTabs, setActiveTabs] = useState([
    "shipped",
    "inTransit",
    "outForDelivery",
  ]);

  const tabs = [
    { name: "Shipped", key: "shipped" },
    { name: "In Transit", key: "inTransit" },
    { name: "Out for Delivery", key: "outForDelivery" },
    { name: "", key: "orderPlaced" },
  ];

  const handleTabClick = (tabKey: string) => {
    if (!activeTabs.includes(tabKey)) {
      setActiveTabs((prevTabs) => [...prevTabs, tabKey]);
    }
  };

  return (
    <>
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1
            className="mb-0 flex items-end text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold"
            style={{ lineHeight: "28px" }}
          >
            Orders Status
            <div className="ml-3">
              <p className="text-gray-400 text-sm font-semibold">
                Order #4343 by
                <span className="text-primaryMain underline text-sm font-semibold ml-1">
                  skyz432
                </span>
              </p>
            </div>
          </h1>
        </div>
      </div>
      <div className="shippment_section">
        <div className="flex justify-between mb-4">
          {tabs.map((tab) => (
            <div
              key={tab.key}
              className="text-center px-10 relative tab_button_shipping"
            >
              <div
                className={` pointer-events-none relative mx-auto  rounded-full border ${
                  activeTabs.includes(tab.key)
                    ? "top-[-3] border-transparent text-customBlue font-semibold w-12 h-12"
                    : "border-primaryMain border-4 hover:text-customBlue w-10 h-10"
                }`}
                onClick={() => handleTabClick(tab.key)}
              >
                {activeTabs.includes(tab.key) && (
                  <svg
                    className="text-primaryMain"
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm106.5 150.5L228.8 332.8h-.1c-1.7 1.7-6.3 5.5-11.6 5.5-3.8 0-8.1-2.1-11.7-5.7l-56-56c-1.6-1.6-1.6-4.1 0-5.7l17.8-17.8c.8-.8 1.8-1.2 2.8-1.2 1 0 2 .4 2.8 1.2l44.4 44.4 122-122.9c.8-.8 1.8-1.2 2.8-1.2 1.1 0 2.1.4 2.8 1.2l17.5 18.1c1.8 1.7 1.8 4.2.2 5.8z"></path>
                  </svg>
                )}
              </div>
              <button
                className={`tab-button text-sm pointer-events-none w-full pb-2.5 text-center transition-colors duration-300 ${
                  activeTabs.includes(tab.key)
                    ? "text-customBlue font-semibold active"
                    : "text-customGray hover:text-customBlue"
                }`}
                onClick={() => handleTabClick(tab.key)}
              >
                {tab.name}
                {tab.name === "Shipped" && <p>Monday, May 1</p>}
              </button>
            </div>
          ))}
        </div>
        <div className="p-4 border mb-4 border-gray-200 rounded-lg shadow-inner">
          {/* {activeTabs.includes("shipped") && (
            <div>
              <div className="h-52">Shipped</div>
            </div>
          )}
          {activeTabs.includes("inTransit") && (
            <div>
              <div className="h-52">In Transit</div>
            </div>
          )} */}
          {activeTabs.includes("outForDelivery") && (
            <div className="h-52">
              <GoogleMapComponent />
            </div>
          )}
          {activeTabs.includes("orderPlaced") && (
            <div>
              <div className="h-52">Order Placed</div>
            </div>
          )}
        </div>
      </div>
      <div className="">
        <h1
          className="mb-0 text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold"
          style={{ lineHeight: "28px" }}
        >
          Tracking Information
        </h1>
        <div className="flex items-end mb-2 mt-2">
          <Image
            src={deliveryPic}
            alt=""
            width={40}
            height={60}
            className="mr-2 w-8 h-8"
          />
          <p className="text-sm text-primaryMain font-normal mb-0 mr-2 underline">
            99898985948954584985
          </p>
          <div className=" text-sm ">
            <svg
              className="h-6 w-6 cursor-pointer"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 256 256"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M212.24,67.76l-40-40A6,6,0,0,0,168,26H88A14,14,0,0,0,74,40V58H56A14,14,0,0,0,42,72V216a14,14,0,0,0,14,14H168a14,14,0,0,0,14-14V198h18a14,14,0,0,0,14-14V72A6,6,0,0,0,212.24,67.76ZM170,216a2,2,0,0,1-2,2H56a2,2,0,0,1-2-2V72a2,2,0,0,1,2-2h77.51L170,106.49Zm32-32a2,2,0,0,1-2,2H182V104a6,6,0,0,0-1.76-4.24l-40-40A6,6,0,0,0,136,58H86V40a2,2,0,0,1,2-2h77.51L202,74.49Zm-60-32a6,6,0,0,1-6,6H88a6,6,0,0,1,0-12h48A6,6,0,0,1,142,152Zm0,32a6,6,0,0,1-6,6H88a6,6,0,0,1,0-12h48A6,6,0,0,1,142,184Z"></path>
            </svg>
          </div>
        </div>
        <div className="flex items-center border-t-2 border-b-2 border-gray-300">
          <div className="w-4/12">
            <p className="font-bold text-black">Sun, April 30</p>
            <span>09:15 A.M.</span>
          </div>
          <div className="w-8/12">
            <p className="font-bold text-black">Tracking number provided</p>
          </div>
        </div>
      </div>
    </>
  );
}
