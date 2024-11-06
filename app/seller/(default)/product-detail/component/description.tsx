/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import VideoComponent from "./videoComponent";

const Description = ({ product }: { product: any }) => {
  return (
    <div>
      <h4 className="text-black font-bold normal-case mb-5 text-2xl">
        {" "}
        Description
      </h4>
      <div className="w-6/12">
        <p className="text-gray-500 font-medium normal-case">Tags:</p>
        <p className="font-bold text-lg text-primaryMain normal-case">
          Bars & Controls, Dirt Bike
        </p>
      </div>

      <div className="mt-5 w-6/12">
        <p className="text-gray-500 font-medium normal-case">Categories:</p>
        <p className="font-bold text-lg text-primaryMain normal-case">
          {product?.wp_term_relationships
            .filter((item: any) => item.term_taxonomy.taxonomy == "product_cat")
            .map((item: any) => {
              return item.term_taxonomy.term.name;
            })}
        </p>
      </div>
      <div className="mt-5">
        <p
          dangerouslySetInnerHTML={{
            __html: product?.post_content,
          }}
        />
      </div>
      <div className="grid grid-cols-3 gap-8 mt-10">
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
      </div>
    </div>
  );
};
export default Description;
