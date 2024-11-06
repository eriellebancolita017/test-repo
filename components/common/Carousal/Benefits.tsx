import React from "react";
import Image, { StaticImageData } from "next/image";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css"; // Keep this for your custom CSS

// Import icons
import BuyerProtectionIcon from "@/public/images/streamline_user-protection-2.png";
import SellerProtectionIcon from "@/public/images/streamline_user-protection-2 (1).png";
import SellerFeedbackProtectionIcon from "@/public/images/streamline_user-protection-2 (2).png";
import LowFeesIcon from "@/public/images/fluent_money-24-regular.png";
// import NextIcon from "@/public/images/grommet-icons_next.png";

interface CarouselItem {
  title: string;
  description: string;
  iconColor: string;
  icon: string | StaticImageData;
}

const items: CarouselItem[] = [
  {
    title: "Buyer Protection",
    description: "If your item is lost or damaged in transit, you're covered",
    iconColor: "#d4f0c2",
    icon: BuyerProtectionIcon,
  },
  {
    title: "Seller Protection",
    description: "If your item is lost or damaged in transit, you're covered",
    iconColor: "#acace8",
    icon: SellerProtectionIcon,
  },
  {
    title: "Seller Feedback Protection",
    description: "If your item is lost or damaged in transit, you're covered",
    iconColor: "#edadad",
    icon: SellerFeedbackProtectionIcon,
  },
  {
    title: "Low Fees",
    description: "If your item is lost or damaged in transit, you're covered",
    iconColor: "#f0c0f0",
    icon: LowFeesIcon,
  },
];

const Benefits: React.FC = () => {
  const settings: Settings = {
    // dots: true,
    autoplay: true,
    // dots: true,
    infinite: true,
    autoplaySpeed: 0,
    speed: 8000,
    cssEase: "linear",
    slidesToShow: 4,
    slidesToScroll: 1,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0px",
        },
      },
    ],
  };

  return (
    <div className="bg-[#F6F6FE] py-8">
      <div className="max-w-[clamp(320px,100vw,1530px)] mx-auto px-[clamp(20px,9vw,130px)]">
        <div className="flex justify-between items-center">
          <h2 className="font-bold m-0 ml-6">Fizno Benefits</h2>
          {/* <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                const prevButton = document.querySelector(
                  ".slick-prev",
                ) as HTMLElement;
                prevButton?.click();
              }}
              className="border border-[#1010DC] rounded-full cursor-pointer text-lg p-2 w-10 h-10 flex items-center justify-center"
            >
              <Image
                src={NextIcon}
                alt="prev"
                width={20}
                height={25}
                className="rotate-180"
              />
            </button>
            <button
              type="button"
              onClick={() => {
                const nextButton = document.querySelector(
                  ".slick-next",
                ) as HTMLElement | null;
                nextButton?.click();
              }}
              className="border border-[#1010DC] rounded-full cursor-pointer text-lg p-2 w-10 h-10 flex items-center justify-center text-[#1010DC]"
            >
              <Image src={NextIcon} alt="next" width={20} height={25} />
            </button>
          </div> */}
        </div>
        <div className="ml-4">
          <Slider {...settings}>
            {items.map((item, index) => (
              <div key={index} className="p-2 mx-auto">
                <div className="border border-[#E8E8E8] w-[90%] rounded-lg p-5 bg-white flex flex-col items-start justify-start">
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-full"
                    style={{
                      backgroundColor: `${item.iconColor}99`,
                      border: `1px solid ${item.iconColor}`,
                    }}
                  >
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={20}
                      height={25}
                    />
                  </div>
                  <h3 className="text-sm font-bold my-2 normal-case">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 normal-case">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
