"use client";
import ImageLazyLoader from "@/components/loader/imageLazyLoader";
import { useRouter } from "next/navigation";
import React from "react";
import AliceCarousel from "react-alice-carousel";
interface bannerSectionI {
  bannerData: {
    id: number;
    image: string;
    category: number;
    color?: string;
    size?: number;
    spacing?: number;
    title: string;
  }[];
}

const BannerSection = ({ bannerData }: bannerSectionI) => {
  /**
   * rotuer
   */
  const router = useRouter();

  return (
    <div className="slider_banner_section relative h-[500px]">
      <AliceCarousel
        // ref={carouselRef}
        mouseTracking
        items={bannerData?.map((product) => (
          <div key={product.id} className="relative">
            {/* <img
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${product.image}`}
              alt=""
              className="w-full object-cover"
            /> */}
            <ImageLazyLoader
              alt=""
              height="500px"
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${product.image}`}
            />
            <div className="absolute bottom-16 text-center w-full">
              <h2
                className="text-white text-[42px]"
                style={{
                  color: product.color ?? "",
                  fontSize: product.size ?? "inherit",
                  letterSpacing: product?.spacing ?? "normal",
                }}
              >
                {product.title}
              </h2>
              <button
                onClick={() => router.push("/search-result")}
                className="mt-5 btn h-11 font-semibold text-base bg-yellow-500 hover:bg-yellow-600 text-black px-16 rounded-sm"
              >
                <span className="block">Find what you’re searching for</span>
              </button>
            </div>
          </div>
        ))}
        responsive={{
          0: { items: 1 },
          512: { items: 1 },
          1024: { items: 1 },
        }}
        disableButtonsControls
        disableDotsControls={false}
        // autoPlay
        infinite
        autoPlayInterval={2000}
      />
    </div>
  );
};

export default BannerSection;
