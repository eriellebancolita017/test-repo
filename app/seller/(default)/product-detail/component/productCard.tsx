import Image from "next/image";
import React from "react";

// Define the props interface
interface ProductCardProps {
  type?: "gridView" | "listView";
  product: {
    id?: number;
    image: string;
    likes: string;
    comments: string;
    shares: string;
    title: string;
    condition: string;
    price: string;
    shipping: string;
    sellerImage: string;
    sellerName: string;
    location: string;
    rating: string;
  };
}

// Update the component to accept props
export default function ProductCard({ type, product }: ProductCardProps) {
  return (
    <div
      className={`product_card border-2 p-3 rounded-lg ${type === "listView" ? "flex w-full" : "block"}`}
    >
      <div
        className={`${type === "listView" ? " border-r pr-3 mr-3" : "text-center"} `}
      >
        <div className={`${type === "listView" ? "pr-3" : "text-center"} `}>
          <Image
            src={product.image}
            width={200}
            height={200}
            alt={product.title}
          />
        </div>
        <ul className="flex justify-between my-3">
          <li className="text-gray-400 flex items-center text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="mr-1"
            >
              <path
                d="M8.4135 13.8733C8.18683 13.9533 7.8135 13.9533 7.58683 13.8733C5.6535 13.2133 1.3335 10.46 1.3335 5.79332C1.3335 3.73332 2.9935 2.06665 5.04016 2.06665C6.2535 2.06665 7.32683 2.65332 8.00016 3.55998C8.6735 2.65332 9.7535 2.06665 10.9602 2.06665C13.0068 2.06665 14.6668 3.73332 14.6668 5.79332C14.6668 10.46 10.3468 13.2133 8.4135 13.8733Z"
                stroke="#E54B4D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {product.likes}
          </li>
          <li className="text-gray-400 flex items-center text-xs">
            <svg
              className="mr-1"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M5.66683 12.6666H5.3335C2.66683 12.6666 1.3335 12 1.3335 8.66665V5.33331C1.3335 2.66665 2.66683 1.33331 5.3335 1.33331H10.6668C13.3335 1.33331 14.6668 2.66665 14.6668 5.33331V8.66665C14.6668 11.3333 13.3335 12.6666 10.6668 12.6666H10.3335C10.1268 12.6666 9.92683 12.7666 9.80016 12.9333L8.80016 14.2666C8.36016 14.8533 7.64016 14.8533 7.20016 14.2666L6.20016 12.9333C6.0935 12.7866 5.84683 12.6666 5.66683 12.6666Z"
                stroke="#306CB5"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.6665 5.33331H11.3332"
                stroke="#306CB5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.6665 8.66669H8.6665"
                stroke="#306CB5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {product.comments}
          </li>
          <li className="text-gray-400 flex items-center text-xs">
            <svg
              className="mr-1"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M4.93313 4.21331L10.5931 2.32665C13.1331 1.47998 14.5131 2.86665 13.6731 5.40665L11.7865 11.0666C10.5198 14.8733 8.43979 14.8733 7.17313 11.0666L6.61312 9.38665L4.93313 8.82665C1.12646 7.55998 1.12646 5.48665 4.93313 4.21331Z"
                stroke="#306CB5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.74023 9.1L9.1269 6.70667"
                stroke="#306CB5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {product.shares}
          </li>
        </ul>
      </div>
      <div className="py-2 w-full">
        <div
          className={`mt-2 ${type === "listView" ? "flex w-full justify-between" : "block"}`}
        >
          <div className={`${type === "listView" ? "w-6/12" : "w-full"}`}>
            <h5 className="text-zinc-600 text-sm normal-case font-medium leading-4">
              {product.title}
            </h5>
            <p className="my-2 text-primaryMain font-medium text-xs">
              {product.condition}
            </p>
            <div className="flex items-baseline gap-2">
              <h4 className="text-lg text-black font-bold">{product.price}</h4>
              <p className="text-zinc-400 text-[12px] normal-case">
                {product.shipping}
              </p>
            </div>
            <div className="flex justify-between items-center my-2">
              <div className="flex items-center">
                <Image
                  src={product.sellerImage}
                  alt={product.sellerName}
                  width={40}
                  height={40}
                />
                <div className="ml-2">
                  <p className="text-black font-bold text-[12px]">
                    {product.sellerName}
                  </p>
                  <p className="text-[10px] font-medium text-[10px] normal-case">
                    {product.location}
                  </p>
                </div>
              </div>
              <div className="bg-orange-100 text-yellow-600 font-semibold py-1 h-7 px-2 rounded-md flex items-center">
                <svg
                  className="mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <path
                    d="M4.77249 1.1524C4.79097 1.10732 4.82244 1.06877 4.86289 1.04163C4.90335 1.01449 4.95096 1 4.99968 1C5.04839 1 5.096 1.01449 5.13646 1.04163C5.17691 1.06877 5.20838 1.10732 5.22686 1.1524L6.15524 3.38533C6.17262 3.42711 6.20119 3.46329 6.2378 3.48988C6.27442 3.51647 6.31766 3.53245 6.36276 3.53605L8.77351 3.72916C8.99152 3.74663 9.07977 4.01881 8.91375 4.1608L7.07707 5.73447C7.04276 5.76383 7.01719 5.80206 7.00316 5.84498C6.98914 5.88791 6.98744 5.93384 6.99813 5.97754L7.57088 8.34357C7.62322 8.5658 7.39147 8.74202 7.19762 8.62282L5.19173 7.39604C5.1511 7.37257 5.10625 7.35977 5.05968 7.35977C5.01311 7.35977 4.96826 7.37257 4.92763 7.39604L2.92174 8.62282C2.72789 8.74202 2.49614 8.5658 2.54848 8.34357L3.12123 5.97754C3.13191 5.93384 3.13021 5.88791 3.11619 5.84498C3.10216 5.80206 3.07659 5.76383 3.04228 5.73447L1.2056 4.1608C1.03958 4.01881 1.12783 3.74663 1.34585 3.72916L3.7566 3.53605C3.80169 3.53245 3.84493 3.51647 3.88154 3.48988C3.91815 3.46329 3.94672 3.42711 3.96411 3.38533L4.77249 1.1524Z"
                    fill="#F59E0B"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {product.rating}
              </div>
            </div>
          </div>
          <div
            className={` mt-4 gap-3 ${type === "listView" ? "block text-end w-3/12" : "flex"}`}
          >
            <button
              className={`text-[12px] bg-primaryMain text-white font-semibold border border-blueTwo h-9 px-4 rounded-md ${type === "listView" ? "w-full" : "w-6/12"}`}
            >
              Buy Now
            </button>
            {/* <div className="flex justify-end"> */}
            <button
              className={`text-[12px]  bg-transparent text-primaryMain font-semibold border border-blueTwo h-9 rounded-md ${type === "listView" ? "w-full mt-4" : "w-6/12"}`}
            >
              <span className=" justify-center flex  items-center">
                {" "}
                <svg
                  className="mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="14"
                  viewBox="0 0 12 14"
                  fill="none"
                >
                  <path
                    d="M8.31956 6.07228V3.2892C8.31956 2.6741 8.07522 2.0842 7.64028 1.64926C7.20534 1.21432 6.61543 0.969971 6.00033 0.969971C5.38523 0.969971 4.79533 1.21432 4.36039 1.64926C3.92545 2.0842 3.6811 2.6741 3.6811 3.2892V6.07228M10.7044 4.83968L11.4855 12.2612C11.5288 12.6725 11.2072 13.03 10.7934 13.03H1.20726C1.10967 13.0301 1.01315 13.0096 0.92397 12.97C0.83479 12.9304 0.754944 12.8724 0.689619 12.7999C0.624294 12.7274 0.574951 12.642 0.544795 12.5492C0.514638 12.4564 0.504344 12.3583 0.51458 12.2612L1.29632 4.83968C1.31435 4.66872 1.39504 4.51048 1.52283 4.39548C1.65062 4.28048 1.81646 4.21686 1.98837 4.21689H10.0123C10.3685 4.21689 10.6672 4.48592 10.7044 4.83968ZM3.91303 6.07228C3.91303 6.13379 3.88859 6.19278 3.8451 6.23627C3.8016 6.27977 3.74261 6.3042 3.6811 6.3042C3.61959 6.3042 3.5606 6.27977 3.51711 6.23627C3.47361 6.19278 3.44918 6.13379 3.44918 6.07228C3.44918 6.01077 3.47361 5.95178 3.51711 5.90828C3.5606 5.86479 3.61959 5.84036 3.6811 5.84036C3.74261 5.84036 3.8016 5.86479 3.8451 5.90828C3.88859 5.95178 3.91303 6.01077 3.91303 6.07228ZM8.55149 6.07228C8.55149 6.13379 8.52705 6.19278 8.48356 6.23627C8.44006 6.27977 8.38107 6.3042 8.31956 6.3042C8.25805 6.3042 8.19906 6.27977 8.15557 6.23627C8.11207 6.19278 8.08764 6.13379 8.08764 6.07228C8.08764 6.01077 8.11207 5.95178 8.15557 5.90828C8.19906 5.86479 8.25805 5.84036 8.31956 5.84036C8.38107 5.84036 8.44006 5.86479 8.48356 5.90828C8.52705 5.95178 8.55149 6.01077 8.55149 6.07228Z"
                    stroke="#306CB5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Add To Cart
              </span>
            </button>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
