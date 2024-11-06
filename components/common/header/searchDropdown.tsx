import { SVGIcon } from "@/assets/svg";
import IMAGES from "@/public/images";
import { useRouter } from "next/navigation";
import React from "react";

const SearchDropdown = ({
  results,
  keyword,
  handleResetKeyword,
}: {
  results: any[];
  keyword: string;
  handleResetKeyword: () => void;
}) => {
  const router = useRouter();

  return (
    <div className="absolute w-full bg-white p-2 pb-0 max-h-[400px] overflow-y-auto z-10 border">
      <div className="relative">
        <ul>
          {results.map((product: any) => (
            <>
              <li
                className="flex items-center p-2 cursor-pointer"
                onClick={() => {
                  router.push(`/search-detail?id=${product?.id}`);
                  handleResetKeyword();
                }}
              >
                <img
                  width="60"
                  height="60"
                  src={product.image}
                  className="attachment-100x100 size-100x100 w-[60px] h-[60px] rounded"
                  alt=""
                  decoding="async"
                  loading="lazy"
                  sizes="(max-width: 100px) 100vw, 100px"
                  onError={(e) => {
                    // Typecast the target to HTMLImageElement
                    (e.target as HTMLImageElement).src =
                      IMAGES.dummyProduct.src;
                  }}
                />
                <div className="content-item ml-4">
                  <p className="text-base font-normal text-primaryMain leading-[20px] overflow-hidden text-ellipsis line-clamp-2">
                    {product.title}
                  </p>
                  <div className="rating-item"></div>
                  <div className="price-item">
                    <span className="text-black text-sm">{product.price}</span>
                  </div>
                </div>
              </li>
            </>
          ))}
        </ul>
        {results?.length === 0 ? (
          <div className="justify-center flex h-200 pb-1">
            <div className="text-center mx-auto no-search_data">
              <SVGIcon.noOffer />
              <p className=" text-black font-bold">No result Found</p>
            </div>
          </div>
        ) : (
          <div className="py-4 bg-white text-center flex justify-center items-center sticky w-full bottom-0 text-black ">
            <p className="mr-1 font-semibold">{results.length || 0} results</p>
            <button
              // href={}
              onClick={() => {
                router.push(`/search-result?keyword=${keyword}`);
                handleResetKeyword();
              }}
              className="text-primaryMain cursor-pointer font-semibold"
            >
              {" "}
              See All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default SearchDropdown;
