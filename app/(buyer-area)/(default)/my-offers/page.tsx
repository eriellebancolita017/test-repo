// import ProductCard from "@/components/common/card/productCard";
import HeaderSectionCard from "@/components/common/header/headerSectionCard";
import SVG from "@/public/svg";
import React from "react";

const MyOffers = () => {
  //   const OfferArray: [];

  return (
    <div className="min-h-screen">
      <div className="">
        <HeaderSectionCard title="My offers" />
      </div>
      {/* {OfferArray.length <= 1 ? ( */}
      <div className="flex justify-center items-center mt-8 h-96">
        <div className="">
          <span>
            <SVG.noOffer />
            {/* Replace this with your "No offers" SVG or component */}
          </span>
          <p className="text-center text-lg font-semibold normal-case mt-3">
            No Offers
          </p>
        </div>
      </div>
      {/* ) : ( */}
      {/* <div className="grid grid-cols-4 gap-6 mt-8">
          {OfferArray.map((product, index) => (
            <ProductCard key={index} type="gridView" product={product} />
          ))}
        </div>
      )} */}
    </div>
  );
};
export default MyOffers;
