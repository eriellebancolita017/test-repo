/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import IMAGES from "@/public/images";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

interface ProductShortCardI {
  productTitle?: string;
  productImage?: string;
  productPrice?: string;
  storeName?: string;
  condition?: string;
  productId?: number;
  sellerId?: number;
}

export const ProductShortCard = ({
  productTitle = " HUSQVARNA FX 350 2022–2024 - Tusk Clutch Lever Brembo Polished 1166230023",
  productImage = "/images/mainpages/product_dummy_.png",
  productPrice = "0",
  storeName = "",
  condition = "New",
  productId,
  sellerId,
}: ProductShortCardI) => {
  /**
   * router
   */

  const router = useRouter();

  /**
   * state management
   */
  const [productImg, setProductImg] = useState<any>(productImage);

  const currentPath = usePathname();
  return (
    <>
      <div
        className={`justify-between items-center w-full ${currentPath === "/shopping-cart" ? "block" : "flex"} `}
      >
        <div
          className={` gap-5 flex px-1 py-2 items-center ${currentPath === "/shopping-cart" ? "w-12/12" : "w-10/12"}`}
        >
          <div
            onClick={() =>
              productId && router.push(`/search-detail?id=${productId}`)
            }
            className={`cursor-pointer rounded-lg p-1 ${currentPath === "/shopping-cart" ? "w-5/12" : "w-3/12"}`}
          >
            <Image
              src={productImg}
              width={80}
              height={80}
              alt=""
              className={`rounded-lg border ${currentPath === "/shopping-cart" ? "w-[100px] h-[100px]" : "w-10/12"} `}
              onError={() => setProductImg(IMAGES.dummyProduct)}
            />
          </div>
          <div
            className={`${currentPath === "/shopping-cart" ? "w-7/12" : "w-9/12"}`}
          >
            <p className="text-[12px] text-black font-bold">{productTitle}</p>
            <p className="text-[12px] normal-case">
              <span>{condition}</span>
            </p>
            <p className="text-[12px] normal-case font-medium">
              <span
                onClick={() =>
                  sellerId && router.push(`/store-page?sellerId=${sellerId}`)
                }
                className="font-bold cursor-pointer text-primaryMain"
              >
                {storeName}
              </span>
            </p>
          </div>
        </div>
        {currentPath === "/shopping-cart" ? (
          <></>
        ) : (
          <div className="w-2/12">
            <p className="font-bold text-black text-end">{productPrice}</p>
          </div>
        )}
      </div>
    </>
  );
};
