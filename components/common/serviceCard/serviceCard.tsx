import React from "react";
import Image, { StaticImageData } from "next/image";

interface Option {
  id: number;
  name: string;
  deliveryTime: string;
  discount: string;
  originalPrice: string;
  discountedPrice: string;
  label?: string;
}

interface DeliveryOptionsProps {
  deliveryPic?: StaticImageData;
  option: Option;
  isSelected?: boolean;
  onClick: () => void;
}
const ServiceCard: React.FC<DeliveryOptionsProps> = ({
  deliveryPic,
  option,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={`flex justify-between p-4 border-b border-neutral-400 ${
        isSelected ? "bg-sky-100" : ""
      }`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className="">
        <div className="flex items-center mb-2">
          {deliveryPic && (
            <Image
              src={deliveryPic}
              alt=""
              width={40}
              height={60}
              className="mr-2"
            />
          )}
          <h3 className="text-2xl text-black font-bold mb-0 mr-2">
            {option.name}
          </h3>
          {option.label && (
            <div className="bg-green-500 px-2 text-sm py-1 h-5">
              <p className="bg-green-500 text-white px-3 text-xs leading-3 font-semibold">
                {option.label}
              </p>
            </div>
          )}
        </div>
        <p className="text-slate-400 font-medium">{option.deliveryTime}</p>
        <p className="text-slate-400 font-medium">{option.discount}</p>
      </div>
      <div className="text-end">
        <p className="text-slate-400 font-semibold">
          <del className=" mr-1">{option.originalPrice}</del>Retail
        </p>
        <h3 className="text-2xl text-black font-bold">
          {option.discountedPrice}
        </h3>
      </div>
    </div>
  );
};

export default ServiceCard;
