import React from "react";

type Status = "process" | "success";

interface RecentActivityCardProps {
  date: string;
  time: string;
  description: string;
  status: Status;
  price: number; // Change price type to number
  estimatedDate: string;
  paymentAmount: number;
  transactionId: string;
}

const statusStyles = {
  process: "bg-primaryMain",
  success: "bg-green-500",
};

const RecentActivityCard: React.FC<RecentActivityCardProps> = ({
  date,
  time,
  paymentAmount,
  // description,
  status,
  // price,
  estimatedDate,
  transactionId,
}) => {
  // const priceClassName = price < 0 ? "text-red-600" : "text-black";
  // const formattedPrice = `${price < 0 ? "-" : ""}$${Math.abs(price).toFixed(
  //   2,
  // )}`;

  return (
    <div className="bg-white rounded-lg flex justify-between py-4 px-4 border mb-4 shadow-lg">
      <div className="flex items-start">
        {/* <div className="text-gray-400 mr-5">
          <p className="text-sm font-medium mb-0">{date}</p>
          <p className="text-sm font-medium">{time}</p>
        </div> */}
        <div>
          <div className="">
            <div className="text-gray-600 mr-5 flex items-center">
              <p className="text-sm font-medium mb-0">{date}</p>
              <p className="text-sm font-medium">{time}</p>
            </div>
            <div className="flex">
              <h4 className="text-black text-base font-bold mr-1">
                Payment amount:
              </h4>
              <p className="text-black text-base font-bold cursor-pointer">
                ${paymentAmount}
              </p>
            </div>
            <p className="text-sm font-medium">
              <b>Transaction ID</b> : {transactionId}
            </p>
          </div>
          {/* <p className="text-black font-medium">{description}</p> */}
          <p className="text-sm font-medium mt-4">
            <span
              className={`inline-block w-3 h-3 rounded-full mr-1 ${statusStyles[status]}`}
            ></span>
            Processing: to be completed on {estimatedDate}
          </p>
        </div>
      </div>
      {/* <div className="flex items-center">
        <p className={`font-bold ${priceClassName}`}>{formattedPrice}</p>
        <svg
          className="ml-2"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 320 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path>
        </svg>
      </div> */}
    </div>
  );
};

export default RecentActivityCard;
