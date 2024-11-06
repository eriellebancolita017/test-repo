import IMAGES from "@/public/images";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const ProductShortCard = ({
  title,
  vendor,
  price,
  ImageData,
  sellerId,
  productId,
}: {
  title: string;
  vendor: string;
  price: string;
  ImageData: string;
  productId: number;
  sellerId: number;
}) => {
  /**
   * router
   */
  const router = useRouter();

  /**
   * state management
   */
  const [img, setImg] = useState<any>(ImageData);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="w-10/12 gap-5 flex px-1 py-2 items-center">
          <div
            onClick={() => router.push(`/search-detail?id=${productId}`)}
            className="border rounded-lg p-1 w-3/12 cursor-pointer"
          >
            <Image
              src={img}
              width={80}
              height={80}
              alt=""
              className="rounded-lg"
              onError={() => setImg(IMAGES.dummyProduct)}
            />
          </div>
          <div className="w-9/12">
            <p className="text-[12px] text-black font-bold">{title}</p>
            <p className="text-[12px] normal-case">
              Condition:
              <span>New</span>
            </p>
            <p className="text-[12px] normal-case font-medium">
              Vendor:
              <span
                className="font-bold cursor-pointer text-primaryMain"
                onClick={() => router.push(`/store-page?sellerId=${sellerId}`)}
              >
                {vendor}
              </span>
            </p>
          </div>
        </div>
        <div className="w-2/12">
          <p className="font-bold text-black text-end">${price}</p>
        </div>
      </div>
    </>
  );
};
