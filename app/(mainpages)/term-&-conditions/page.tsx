/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Breadcrumb from "@/components/common/breadcrumb/breadcrumb";
import ImageLazyLoader from "@/components/loader/imageLazyLoader";
import SkeletonLoader from "@/components/loader/skeletonLoader";
import { categoriesService } from "@fizno/api-client/src/apis/catergory";
// import { title } from "process";
import React, { useEffect, useState } from "react";

export default function TermConditions() {
  const breadcrumbItems = [
    { text: "Home", href: "/" },
    { text: "Term & Conditions", href: "/term-&-conditions" },
  ];
  const [policyContent, setPolicyContent] = useState<any>();

  const getPrivacyPolicy = async () => {
    try {
      const response = await categoriesService.getTermAndConditionContent();
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
      <div>
        <div
          className="banner_section csm_pages"
          style={{
            backgroundImage: "none",
          }}
        >
          {/* <img
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${policyContent?.image}`}
            className="w-full h-[500px] object-cover"
            alt=""
          /> */}
          {!policyContent ? (
            <>
              <SkeletonLoader type="rectangular" width="100%" height={500} />
            </>
          ) : (
            <ImageLazyLoader
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${policyContent?.image}`}
              height="500px"
              alt=""
            />
          )}
        </div>
        <Breadcrumb items={breadcrumbItems} />
        <div className="container normal-case">
          <div className="mt-5 mb-16">
            <h4 className="my-5 heading_crm_pages text-black font-bold capitalize text-2xl">
              {policyContent?.title}
            </h4>
            <div
              dangerouslySetInnerHTML={{
                __html: policyContent?.content,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
