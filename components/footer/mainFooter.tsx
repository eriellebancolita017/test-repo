"use client";
import React from "react";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { globalCacheStateSelector } from "@/redux/slices/globaCache.slice";
import { tokens } from "@/helpers/jwtTokenFunction";
import { SVGIcon } from "@/assets/svg";
import { usePathname } from "next/navigation";

export default function MainFooter() {
  const pathname = usePathname();
  const { user } = useAppSelector(globalCacheStateSelector);

  const isLoggedIn = () => {
    if (typeof window !== "undefined" && tokens.getAccessToken()) {
      return true;
    } else {
      return false;
    }
  };

  const sellArray = [
    {
      label: "Create a Store",
      url: "/login2",
    },
    {
      label: "List Item",
      url:
        isLoggedIn() && user?.role === "seller"
          ? "/seller/dashboard"
          : "/login2",
    },
    {
      label: "List Service",
      url:
        isLoggedIn() && user?.role === "seller"
          ? "/seller/dashboard"
          : "/login2",
    },
    {
      label: "My Products",
      url:
        isLoggedIn() && user?.role === "seller"
          ? "/seller/dashboard"
          : "/login2",
    },
    {
      label: "Seller Benefits",
      url: "/sell",
    },
    {
      label: "Seller Standards",
      url: "/faq",
    },
  ];

  const ShopArray = [
    { label: "Sign In", url: "/register2" },
    { label: "My Account", url: "/dashboard" },
    { label: "My Orders", url: "/dashboard" },
    { label: "Buying Process", url: "/faq" },
  ];

  const companyArray = [
    { label: "Selling Policies", url: "/faq" },
    { label: "Buying Policies", url: "/faq" },
    { label: "FAQ", url: "/faq" },
    { label: "Fizno Marketplace Policies", url: "/faq" },
    { label: "Privacy Policy", url: "/faq" },
    { label: "Terms & Conditions", url: "/faq" },
  ];

  const helpArray = [
    {
      label: "Buying Support",
      url: "/faq",
    },
    { label: "Selling Support", url: "/faq" },
    { label: "Technical Support", url: "/faq" },
    { label: "General Support", url: "/faq" },
  ];

  if (pathname === "/login2" || pathname === "/register2") {
    return null;
  }

  return (
    <div className="bg-black rounded-t-[24px] pt-12">
      <div className="container mx-auto px-4">
        <div className="text-white py-[32px] px-[48px] bg-[url('../../assets/images/footer-bg.png')] bg-no-repeat bg-cover rounded-[16px] flex flex-col lg:flex-row justify-between items-center">
          <div className="mb-4 lg:mb-0">
            <div className="text-[28px] mb-2 font-semibold">
              Want to make some extra cash?
            </div>
            <div className="text-[14px] max-w-[530px] opacity-60">
              Turn that unwanted clutter into cash. <br />
              Listing an item on Fizno only takes a few minutes.
            </div>
          </div>
          <div className="xl:mr-10">
            <a href="/login2" className="text-white flex items-center">
              <span className="mr-4 text-[20px]">Start listing now</span>
              <SVGIcon.rightArrowIcon className="w-[26px] h-[22px] mt-[1px]" />
            </a>
          </div>
        </div>
        <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 my-10 mb-16">
          <div>
            <h5 className="text-[#9C9CBB] text-[14px] tracking-[0.5px] font-semibold mb-5">
              FIZNO SELLING
            </h5>
            <ul>
              {sellArray.map((item, index) => (
                <li key={index} className="py-[3px] text-white text-[14px]">
                  <Link href={item.url}> {item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-[#9C9CBB] text-[14px] tracking-[0.5px] font-semibold mb-5">
              FIZNO SHOPPING
            </h5>
            <ul>
              {ShopArray.map((item, index) => (
                <li key={index} className="py-[3px] text-white text-[14px]">
                  <Link href={item.url}> {item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-[#9C9CBB] text-[14px] tracking-[0.5px] font-semibold mb-5">
              TERMS & POLICIES
            </h5>
            <ul>
              {companyArray.map((item, index) => (
                <li key={index} className="py-[3px] text-white text-[14px]">
                  <Link href={item.url}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-[#9C9CBB] text-[14px] tracking-[0.5px] font-semibold mb-5">
              SUPPORT
            </h5>
            <ul>
              {helpArray.map((item, index) => (
                <li key={index} className="py-[3px] text-white text-[14px]">
                  <Link href={item.url}> {item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <a href="/" className="mb-4 lg:mb-0">
            <SVGIcon.fiznoLogo />
          </a>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-3 pb-12">
          <p className="text-sm text-[#9C9CBB] font-normal mb-0">
            Osborne Enterprises Inc t/a Fizno ™ All Rights Reserved © 2024
          </p>
        </div>
      </div>
    </div>
  );
}
