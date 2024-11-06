"use client";
// import Breadcrumb from "@/components/common/breadcrumb/breadcrumb";
// import FaqAccordion from "@/components/faqAccordion";
// import ImageLazyLoader from "@/components/loader/imageLazyLoader";
// import SkeletonLoader from "@/components/loader/skeletonLoader";
import React, { useEffect, useState } from "react";
import { categoriesService } from "@fizno/api-client/src/apis/catergory";
import { Search } from "lucide-react";
import Link from "next/link";

export default function TermConditions() {
  // const breadcrumbItems = [
  //   { text: "Home", href: "/" },
  //   { text: "FAQs", href: "/faq" },
  // ];

  const [setPolicyContent] = useState<any>();

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

  // const categories = [
  //   { title: 'Fizno Policies', href: '/faq/policies' },
  //   { title: 'Fizno Account/Buying', href: '/faq/buying-policies' },
  //   { title: 'Fizno Selling', href: '/faq/selling' },
  //   { title: 'Fizno Protection', href: '/faq/protection' },
  //   { title: 'Fizno Fees', href: '/faq/fees' },
  //   { title: 'Fizno Terms & Privacy', href: '/term-&-conditions' },
  // ];

  const categories = [
    { title: "Fizno Policies", href: "/faq/buying-policies" },
    { title: "Fizno Account/Buying", href: "/faq/buying-policies" },
    { title: "Fizno Selling", href: "/faq/buying-policies" },
    { title: "Fizno Protection", href: "/faq/buying-policies" },
    { title: "Fizno Fees", href: "/faq/buying-policies" },
    { title: "Fizno Terms & Privacy", href: "/faq/buying-policies" },
  ];
  return (
    <>
      <div className="mb-40">
        {/* <Breadcrumb items={breadcrumbItems} /> */}

        <div
          className="bg-purple-50 p-8 mb-8"
          style={{
            height: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Header Section */}
          <div className="text-center mb-16 mt-16" style={{ minWidth: "80%" }}>
            <h1 className="text-3xl font-bold mb-8">HOW CAN WE HELP?</h1>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <Search
                className="absolute right-4 top-3 text-gray-400"
                size={24}
              />
            </div>
          </div>
        </div>

        {/* Grid of Categories */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white mt-20">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="bg-purple-50 rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer h-40 flex items-center justify-center"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {category.title}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
