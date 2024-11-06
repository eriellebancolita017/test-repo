import SVG from "@/public/svg";
import React from "react";
import { allAddressType } from "../page";

const DeliveryAddressForm = ({
  allAddress,
  selectedCard,
  handleNewAddress,
  handleSelectCard,
}: {
  allAddress: allAddressType[];
  selectedCard: number;
  handleSelectCard: (vl: any) => void;
  handleNewAddress: () => void;
}) => {
  /**
   * state management
   */

  const handleSelect = (index: number) => {
    handleSelectCard(index);
  };

  return (
    <div>
      <div className="flex justify-between border-b pb-3">
        <h5 className="font-semibold text-base normal-case">
          Select a delivery address
        </h5>
        <button
          onClick={() => handleNewAddress()}
          className={`text-[14px] bg-transparent text-primaryMain font-semibold border border-primaryMain h-9 rounded-md px-10`}
        >
          <span className="justify-center flex items-center">
            <span className="mr-2">
              <SVG.circlePlusBlue />
            </span>
            Add new address
          </span>
        </button>
      </div>
      <div className="my-3 min-h-[300px]">
        {allAddress?.map((item: allAddressType) => (
          <div
            key={item?.id}
            className={` border rounded-md p-3 mb-4 items-center flex address_card cursor-pointer ${
              selectedCard === item?.id
                ? "bg-blue-100 text-primaryMain border-primaryMain"
                : "border-gray-300"
            }`}
            onClick={() => handleSelect(item?.id)}
          >
            <div className="mr-2">
              {selectedCard === item?.id ? (
                <SVG.checkedBlue />
              ) : (
                <SVG.unfilledCheck />
              )}
            </div>
            <p
              className={` text-[13px] normal-case   ${selectedCard === item?.id ? "bg-blue-100 text-primaryMain font-bold" : "font-normal"}`}
            >
              {item?.addressLineOne} {item?.addressLineTwo},{item?.city}{" "}
              {item?.state},{item?.country} {item?.zipcode}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryAddressForm;
