import Image from "next/image";
import React from "react";

const RoundedLoader = () => {
  return (
    <>
      <div className="relative h-full w-full">
        <div className="flex justify-center items-center h-full">
          <div className="">
            {/* <Image
              src="/images/loaderFizno.gif"
              alt=""
              width={100}
              height={100}
            /> */}
            <Image
              src="/images/transparentLoader.gif"
              alt=""
              width={100}
              height={100}
            />
            <h4 className="text-center font-semibold">Loading ...</h4>
          </div>
        </div>
      </div>
    </>
  );
};
export default RoundedLoader;
