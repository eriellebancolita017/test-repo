/* eslint-disable @typescript-eslint/no-explicit-any */
import SkeletonLoader from "@/components/loader/skeletonLoader";
import React from "react";
// import VideoComponent from "./videoComponent";

const Description = ({ product }: { product: any }) => {
  const replaceEmbedWithIframe = (htmlString: string) => {
    return htmlString?.replace(/\[embed\](.*?)\[\/embed\]/g, (match, url) => {
      const videoId = url.split("v=")[1] || url.split("/").pop();
      return `
        <iframe
          src="https://www.youtube.com/embed/${videoId}"
          style="width:100%; height:400px; border:none;"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube Video"
        ></iframe>
      `;
    });
  };

  return (
    <div>
      <h4 className="text-black font-bold normal-case mb-5 text-2xl">
        {" "}
        Description
      </h4>
      <div className="mt-5 normal-case ">
        {product?.post_content ? (
          <div
            dangerouslySetInnerHTML={{
              __html: replaceEmbedWithIframe(product?.post_content),
            }}
          />
        ) : (
          <div className="space-y-2">
            <SkeletonLoader type="rectangular" width="100%" height={18} />
            <SkeletonLoader type="rectangular" width="100%" height={18} />
            <SkeletonLoader type="rectangular" width={200} height={18} />
          </div>
        )}
      </div>
      <div className="w-6/12 text-[14px] mt-5">
        <span className="text-gray-500 font-medium normal-case">
          Categories:{" "}
        </span>
        {product?.wp_term_relationships ? (
          <span className=" text-primaryMain normal-case text-[14px]">
            {product?.wp_term_relationships
              .filter((item: any) => item.taxonomy == "product_cat")
              .map((item: any) => {
                return `${item.name}, `;
              })}
          </span>
        ) : (
          <SkeletonLoader type="rectangular" width={200} height={27} />
        )}
      </div>
      <div className="w-6/12 text-[14px]">
        <span className="text-gray-500 font-medium normal-case">Tags: </span>
        {product?.wp_term_relationships ? (
          <span className="text-primaryMain normal-case text-[14px]">
            {product?.wp_term_relationships
              .filter((item: any) => item.taxonomy == "product_tag")
              .map((item: any) => {
                return `${item.name}, `;
              })}
          </span>
        ) : (
          <SkeletonLoader type="rectangular" width={200} height={27} />
        )}
      </div>
      {/* <div className="grid grid-cols-3 gap-8 mt-10">
        <div className="">
          <VideoComponent videoId="G7Mipr4wLRJ4PsdZ" />
        </div>
        <div className="">
          <VideoComponent videoId="G7Mipr4wLRJ4PsdZ" />
        </div>
        <div className="">
          <VideoComponent videoId="G7Mipr4wLRJ4PsdZ" />
        </div>
        <div className="">
          <VideoComponent videoId="G7Mipr4wLRJ4PsdZ" />
        </div>
        <div className="">
          <VideoComponent videoId="G7Mipr4wLRJ4PsdZ" />
        </div>
        <div className="">
          <VideoComponent videoId="G7Mipr4wLRJ4PsdZ" />
        </div>
      </div> */}
    </div>
  );
};
export default Description;
