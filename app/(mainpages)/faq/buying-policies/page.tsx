"use client";
// import Breadcrumb from "@/components/common/breadcrumb/breadcrumb";
import FaqAccordion from "@/components/faqAccordion";
// import ImageLazyLoader from "@/components/loader/imageLazyLoader";
// import SkeletonLoader from "@/components/loader/skeletonLoader";
import React, { useEffect, useState } from "react";
import { categoriesService } from "@fizno/api-client/src/apis/catergory";
// import { Search } from "lucide-react";

export default function BuyingPolicies() {
  // const breadcrumbItems = [
  //   { text: "Home", href: "/" },
  //   { text: "FAQs", href: "/faq" },
  // ];

  const faqArrayData = [
    {
      id: "1",
      title: "Buying Age Restriction Policy",
      //   question: "How do I get started buying?",
      answer: (
        <>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </>
      ),
    },
    {
      id: "2",
      title: "Falsely Reported Items Policy",
      //   question: "How do I get started buying?",
      answer: (
        <>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </>
      ),
    },
    {
      id: "3",
      title: "Feedback Policy",
      //   question: "",
      answer: (
        <>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </>
      ),
    },
    {
      id: "4",
      title: "Identity Policy",
      //   question: "",
      answer: (
        <>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </>
      ),
    },
    {
      id: "5",
      title: "Cancelation Policy - 2 hours Store",
      //   question: "",
      answer: (
        <>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </>
      ),
    },
    {
      id: "6",
      title: "Intellectual Property Policy",
      //   question: "",
      answer: (
        <>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </>
      ),
    },
    {
      id: "7",
      title: "Off-Site Solicitation Policy",
      //   question: "",
      answer: (
        <>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </>
      ),
    },
    {
      id: "9",
      title: "Refund Policy",
      //   question: "",
      answer: (
        <>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </>
      ),
    },
  ];
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

  return (
    <>
      <div>
        {/* <Breadcrumb items={breadcrumbItems} /> */}

        <div className="container faq_page">
          <div className="mt-5 mb-16">
            <h4
              className="my-10 heading_crm_pages text-black font-bold capitalize text-2xl align-center"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              Buying Policies
            </h4>
            <div className="mt-4 mx-auto  w-full ">
              {/* <div className="w-12/12"> */}
              {faqArrayData.map((item: any, index) => (
                <>
                  <div className="" key={index}>
                    <FaqAccordion title={item.title}>
                      <div className="font-semibold text-xl normal-case text-[#2E4049]  ">
                        {item.question}
                      </div>
                      <div className="mt-2 normal-case text-xl text-[#727272]">
                        {item.answer}
                      </div>
                    </FaqAccordion>
                  </div>
                </>
              ))}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
