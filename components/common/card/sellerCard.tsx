import { SVGIcon } from "@/assets/svg";
import { Avatar } from "@mui/material";
import { useRouter } from "next/navigation";
// import Image from "next/image";
import React from "react";

type SellerCardType = {
  id: number;
  image: string;
  name: string;
  address: string;
  rating: string;
  followers: number;
  handleMessage: () => void;
};

export default function SellerCard({
  id,
  image,
  name,
  address,
  rating,
  followers,
  handleMessage,
}: SellerCardType) {
  const router = useRouter();
  return (
    // <>
    //   <div className="border-primaryMain rounded-lg px-3 py-3 border cursor-pointer">
    //     <div className="flex justify-between items-center my-2  ">
    //       <div
    //         className="flex items-start cursor-pointer"
    //         onClick={() => router.push(`/store-page?sellerId=${id}`)}
    //       >
    //         <Avatar
    //           src={image}
    //           sx={{ width: "50px", height: "50px", background: "#306cb5" }}
    //         >
    //           {name?.charAt(0)}
    //         </Avatar>
    //
    //         <div className="ml-2">
    //           <p
    //             className="text-primaryMain font-semibold text-xl normal-case leading-6"
    //             dangerouslySetInnerHTML={{
    //               __html: name,
    //             }}
    //           />
    //           <p className=" font-medium text-[12px] normal-case">{address}</p>
    //           <p className=" font-medium text-[12px] normal-case">
    //             {followers} followers
    //           </p>
    //         </div>
    //       </div>
    //       <div className="bg-[#FBF3EA] text-yellow-600 font-semibold py-1 h-7 px-2 rounded-md flex items-center">
    //         <svg
    //           className="mr-2"
    //           xmlns="http://www.w3.org/2000/svg"
    //           width="15"
    //           height="15"
    //           viewBox="0 0 10 10"
    //           fill="none"
    //         >
    //           <path
    //             d="M4.77249 1.1524C4.79097 1.10732 4.82244 1.06877 4.86289 1.04163C4.90335 1.01449 4.95096 1 4.99968 1C5.04839 1 5.096 1.01449 5.13646 1.04163C5.17691 1.06877 5.20838 1.10732 5.22686 1.1524L6.15524 3.38533C6.17262 3.42711 6.20119 3.46329 6.2378 3.48988C6.27442 3.51647 6.31766 3.53245 6.36276 3.53605L8.77351 3.72916C8.99152 3.74663 9.07977 4.01881 8.91375 4.1608L7.07707 5.73447C7.04276 5.76383 7.01719 5.80206 7.00316 5.84498C6.98914 5.88791 6.98744 5.93384 6.99813 5.97754L7.57088 8.34357C7.62322 8.5658 7.39147 8.74202 7.19762 8.62282L5.19173 7.39604C5.1511 7.37257 5.10625 7.35977 5.05968 7.35977C5.01311 7.35977 4.96826 7.37257 4.92763 7.39604L2.92174 8.62282C2.72789 8.74202 2.49614 8.5658 2.54848 8.34357L3.12123 5.97754C3.13191 5.93384 3.13021 5.88791 3.11619 5.84498C3.10216 5.80206 3.07659 5.76383 3.04228 5.73447L1.2056 4.1608C1.03958 4.01881 1.12783 3.74663 1.34585 3.72916L3.7566 3.53605C3.80169 3.53245 3.84493 3.51647 3.88154 3.48988C3.91815 3.46329 3.94672 3.42711 3.96411 3.38533L4.77249 1.1524Z"
    //             fill="#F59E0B"
    //             stroke="currentColor"
    //             strokeWidth="0.5"
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //           />
    //         </svg>
    //         {rating}
    //       </div>
    //     </div>
    //     <div
    //       onClick={() => handleMessage()}
    //       className="bg-blue-100 flex justify-center items-center text-primaryMain font-semibold normal-case h-9 rounded-lg cursor-pointer"
    //     >
    //       <span className="mr-2 msg_icon_svg">
    //         <SVGIcon.commentIcon />
    //       </span>{" "}
    //       Message seller
    //     </div>
    //   </div>
    // </>
    <>
      <div className="border-primaryMain rounded-lg px-3 py-3 border cursor-pointer sm:px-2 sm:py-2">
        <div className="flex justify-between items-center my-2">
          <div
            className="flex items-start cursor-pointer"
            onClick={() => router.push(`/store-page?sellerId=${id}`)}
          >
            <Avatar
              src={image}
              sx={{ width: "50px", height: "50px", background: "#306cb5" }}
            >
              {name?.charAt(0)}
            </Avatar>

            <div className="ml-2">
              <p
                className="text-primaryMain font-semibold text-lg normal-case leading-6 sm:text-xl break-words"
                dangerouslySetInnerHTML={{
                  __html: name,
                }}
              />
              <p className="font-medium text-[12px] normal-case sm:text-[10px]">
                {address}
              </p>
              <p className="font-medium text-[12px] normal-case sm:text-[10px]">
                {followers} followers
              </p>
            </div>
          </div>
          <div className="bg-[#FBF3EA] text-yellow-600 font-semibold py-1 h-7 px-2 rounded-md flex items-center sm:py-0.5 sm:h-6 sm:px-1.5">
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
            {rating}
          </div>
        </div>
        <div
          onClick={() => handleMessage()}
          className="bg-blue-100 flex justify-center items-center text-primaryMain font-semibold normal-case h-9 rounded-lg cursor-pointer sm:h-8"
        >
          <span className="mr-2 msg_icon_svg">
            <SVGIcon.commentIcon />
          </span>{" "}
          Message seller
        </div>
      </div>
    </>
  );
}
