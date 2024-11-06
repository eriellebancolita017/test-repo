"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import aboutUsPic1 from "../../../assets/images/aboutUs-1.png";
import aboutUsPic2 from "../../../assets/images/aboutUs-2.png";
import { categoriesService } from "@fizno/api-client/src/apis/catergory";

export default function AboutUs() {
  const [, setPolicyContent] = useState<any>();

  const getPrivacyPolicy = async () => {
    try {
      const response = await categoriesService.getPrivacyPolicyContent();
      if (response.remote === "success") {
        setPolicyContent(response.data.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPrivacyPolicy();
  }, []);
  // const imagePath =
  //   "https://www.shutterstock.com/image-vector/colorful-abstract-banner-template-dummy-260nw-1538379314.jpg";
  return (
    <>
      <style>
        {`
          .subHeader_section {
            height: 0;
            overflow: hidden;
          }
        `}
      </style>
      <div className="">
        <div
          className="banner_section text-center csm_pages flex items-center justify-center bg-[#F6F3FF]"
          style={{
            backgroundImage: "none",
          }}
        >
          <div className="mx-4">
            <h1 className="font-bold text-[40px] text-black mb-4 mt-4">
              <span className="text-[#5b34fc]">Let’s Level</span> the Playing
              Field
            </h1>
            <p className="font-medium text-black text-[16px] max-w-[586px] m-auto normal-case">
              It’s a familiar scene: major online marketplaces with their
              sky-high fees. It’s become the standard practice—biting a fat
              chunk from your hard-earned profits. At Fizno, we break that cycle
            </p>
          </div>
        </div>
        {/* <div className="banner_section csm_pages"></div> */}

        <div className="container max-w[98%]">
          <div className="mt-5 flex flex-wrap lg:flex-nowrap justify-center items-center gap-4 py-10 pt-16">
            <div className="w-6/12">
              <div className=" w-full mr-8">
                <Image
                  src={aboutUsPic1}
                  alt="Product Detail"
                  // layout="content"
                  className="rounded w-full" // Optionally add rounded corners or other styles
                  width={500}
                  height={100}
                />
              </div>
            </div>
            <div className="w-8/12 xl:w-6/12">
              <div className="">
                <p className="font-medium text-black text-[16px] m-auto normal-case">
                  Welcome to a fair ecommerce ecosystem. No more giving away 10,
                  15, or even 20% of your sales just to exist in the
                  marketplace.
                  <br />
                  Together, we’re flipping the script. Welcome to the online
                  marketplace with a hometown feel, driven by fair play and
                  full-circle success.
                </p>
              </div>
            </div>
          </div>
          <div className="my-6 text-center py-10 pb-0">
            <h2 className="font-bold text-[40px] text-black mb-4">
              <span className="text-[#5b34fc]">FIZNO:</span> We Flip Fees into{" "}
              <span className="text-[#5b34fc]">Freedom</span>
            </h2>
          </div>
          <div className="mt-10 text-center">
            <div className="rounded-[20px] text-white bg-purple-700 py-16 px-5 bg-custom-gradient text-white">
              <p className="text-[20px] font-medium">Our style is simple:</p>
              <p className="font-bold text-[24px] mt-4 mx-auto max-w-[930px]">
                Low listing{" "}
                <span className="text-[#67DEFF]">fees at just 5%</span>. You
                sell your products, and we make sure you’re pocketing more cash
                to reinvest in your business.
              </p>
            </div>
            <div className="flex justify-center">
              <p className="font-medium text-black text-[16px] mt-16 mx-4 normal-case max-w-[700px] text-left">
                See, here’s our thing—we built Fizno because we believe in fair
                opportunity. Sellers deserve a real shot at success without the
                heavy hand of retail giants snacking on bits of your dreams.
                We’re the underdog’s platform. We stand for the small startups,
                the side hustlers, and even established businesses. We’re the
                partner that’s got your back when you’re ready to grow.
              </p>
            </div>
          </div>
        </div>
        <div
          className="mt-24 !min-h-[270px] banner_section text-center csm_pages flex items-center justify-center bg-[#F6F3FF]"
          style={{
            backgroundImage: "none",
          }}
        >
          <div className="mx-4">
            <h3 className="font-bold text-[40px] text-black mb-4">
              This isn’t just business — it’s{" "}
              <span className="text-[#5b34fc]">personal</span>
            </h3>
            <p className="font-medium text-black text-[16px] max-w-[586px] m-auto normal-case">
              FIZNO is about shifting the power back to the buyers and
              sellers—to you.In a world of shaky markets caused by poor
              corporate decisions, most platforms recover by piling on extra
              fees.
            </p>
          </div>
        </div>
        <div className="container">
          <div className="mt-5 flex flex-wrap lg:flex-nowrap justify-center items-center gap-4 py-10 pt-15">
            <div className="w-8/12">
              <div className="ml-8">
                <p className="font-medium text-black text-[16px] m-auto normal-case">
                  At Fizno, we believe you should only pay what you owe—produce
                  price and taxes—nothing more!
                  <br />
                  We’ve spent countless hours listening to real users to create
                  a system that works for everyone. Guided by your feedback,
                  we’re constantly maximizing fairness and simplicity to enhance
                  this online community.
                </p>
              </div>
            </div>
            <div className="w-7/12 lg:w-6-12 min-w-[400px]">
              <div className=" w-full ml-8">
                <Image
                  src={aboutUsPic2}
                  alt="Product Detail"
                  // layout="content"
                  className="rounded w-full" // Optionally add rounded corners or other styles
                  width={500}
                  height={100}
                />
              </div>
            </div>
          </div>
          <h4 className="text-center my-10 font-bold text-[24px] max-w-[762px] mx-auto text-gradient pb-20 mb-20">
            And remember, we’re not just a marketplace—we’re a movement. And
            we’re just getting started…
          </h4>
        </div>
      </div>
    </>
  );
}
