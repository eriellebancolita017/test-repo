"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import { SVGIcon } from "@/assets/svg";
import IMAGES from "@/public/images";
import SellerAccordion from "@/components/sellerAccordion";

export default function Sell() {
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const faqArrayData = [
    {
      id: "1",
      title: "What is Fizno shipping policy for sellers?",
      answer: (
        <>
          Fizno is designed to save you money. Our platform offers low listing
          and selling fees, allowing you to maximize your profits without
          breaking the bank. We believe in helping you save!
        </>
      ),
    },
    {
      id: "2",
      title: "Why choose Fizno over other marketplaces?",
      answer: (
        <>
          Fizno is designed to save you money. Our platform offers low listing
          and selling fees, allowing you to maximize your profits without
          breaking the bank. We believe in helping you save!
        </>
      ),
    },
    {
      id: "3",
      title: "What payment processing company does Fizno use?",
      answer: (
        <>
          Fizno is designed to save you money. Our platform offers low listing
          and selling fees, allowing you to maximize your profits without
          breaking the bank. We believe in helping you save!
        </>
      ),
    },
    {
      id: "4",
      title: "When will I receive tracking information?",
      question: "",
      answer: (
        <>
          Fizno is designed to save you money. Our platform offers low listing
          and selling fees, allowing you to maximize your profits without
          breaking the bank. We believe in helping you save!
        </>
      ),
    },
    {
      id: "5",
      title: "When will I receive my funds after selling an item?",
      question: "",
      answer: (
        <>
          Fizno is designed to save you money. Our platform offers low listing
          and selling fees, allowing you to maximize your profits without
          breaking the bank. We believe in helping you save!
        </>
      ),
    },
  ];
  useEffect(() => {
    const section = sectionRef.current;

    const handleScroll = () => {
      if (section) {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY;
        const isSectionInView =
          sectionTop < windowHeight && sectionTop + sectionHeight > 0;

        if (isSectionInView) {
          const scrollWithinSection =
            scrollPosition - (sectionTop + window.scrollY);

          const fillPercentage = Math.min(
            ((scrollWithinSection + 200) / sectionHeight) * 100,
            100,
          );
          setProgress(fillPercentage);
        } else if (scrollPosition >= sectionTop + sectionHeight) {
          setProgress(100);
        } else {
          setProgress(0);
        }
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="normal-case">
        <div className="banner_section csm_pages relative !bg-[url('../../assets/images/seller-bg.jpg')] py-20 text-center pt-[200px]">
          <div className="text-white rounded-full border border-white text-[14px] px-[20px] py-[8px] w-fit mx-auto">
            Low Fees
            <span className="bg-[#7A59FD] w-[6px] h-[6px] rounded-full mx-2 mb-0.5 inline-block"></span>
            Unlimited Potential
          </div>
          <div className="text-white text-[54px] capitalize leading-[65.83px] font-medium mt-6">
            Launch Your Free Store
            <br />
            in Minutes
          </div>
          <div className="text-white text-[24px] normal-case leading-[28.06px] mt-4 max-w-[550px] mx-auto">
            Take advantage of whats free to expand your customer base.
          </div>
          <a
            href="/login2"
            className="mt-8 text-white text-[14px] font-bold btn-grad rounded-[8px] py-[15px] px-[22px] block w-fit mx-auto"
          >
            Start Your Store Now
          </a>
          <div className="mt-16 flex justify-between gap-4 items-start text-[16px] text-white w-full text-left normal-case">
            <div className="ml-[-10px] mt-[10px] [transform:rotateZ(-4deg)] border border-[#FFFFFF66] rounded-[16px] p-[15px] min-h-[271px]">
              <div className="bg-[#DFFF22] rounded-full w-[44px] h-[44px] flex items-center justify-center">
                <SVGIcon.widgetIcon />
              </div>
              <div className="font-bold mt-2 mb-2.5">Easy Management Tools</div>
              <div className="max-w-[270px]">
                Track sales, manage orders, and grow your business with our
                integrated dashboard.
              </div>
            </div>
            <Image
              alt="descriptive"
              width="90"
              className="max-w-[243px] w-[253px] max-h-[271px]"
              src={IMAGES.sellIcon}
            />
            <div className="border border-[#FFFFFF66] rounded-[16px] p-[15px] min-h-[271px]">
              <div className="bg-[#DFFF22] rounded-full w-[44px] h-[44px] flex items-center justify-center">
                <SVGIcon.supportIcon />
              </div>
              <div className="font-bold mt-2 mb-2.5">Fizno Selling Support</div>
              <div className="max-w-[270px]">
                We have a comprehensive FAQ and policy section to assist sellers
                in understanding how Fizno works. Our customer support team is
                here to support you every step of the way
              </div>
            </div>
            <div className="relative">
              <div className="absolute z-[1] left-[2px] bottom-0 overflow-hidden rounded-r-[109px]">
                <div className="absolute w-[52px] h-[64px] bg-[#7069bc] z-[2] left-[-29px] top-[-39px] rotate-[46deg]"></div>
                <Image
                  alt=""
                  src={IMAGES.map}
                  className="absolute !h-full max-h-[initial] z-[1] rounded-b-[50px] rotating-img"
                />
                <Image
                  alt="descriptive"
                  className="max-w-[180px] max-h-[215px] w-[180px] h-[215px] object-right"
                  src={IMAGES.globe}
                />
              </div>
              <Image
                alt="descriptive"
                width="243"
                height="271"
                className="max-w-[253px] w-[243px] max-h-[271px]"
                src={IMAGES.sellIcon2}
              />
              <Image
                alt="descriptive"
                width="243"
                height="271"
                className="max-w-[243px] left-0 max-h-[271px] absolute z-[2]"
                src={IMAGES.sellIcons}
              />
            </div>
            <div className="mr-[-10px] mt-[10px] [transform:rotateZ(4deg)] border border-[#FFFFFF66] rounded-[16px] p-[15px] min-h-[271px]">
              <div className="bg-[#DFFF22] rounded-full w-[44px] h-[44px] flex items-center justify-center">
                <SVGIcon.moneyIcon />
              </div>
              <div className="font-bold mt-2 mb-2.5">
                No Setup Fees or Monthly Charges
              </div>
              <div className="max-w-[270px]">
                Enjoy zero upfront costs, no hidden fees or buyers fees
              </div>
            </div>
          </div>
        </div>
        <div className="container text-black py-16">
          <div className="text-[32px] font-semibold">Why Sell With Us?</div>
          <div className="text-[16px]">
            Expand your reach with a trusted marketplace designed for growth.
          </div>
          <div className="flex gap-3 mt-10">
            <div className="w-6/12 custom-grad rounded-[16px] overflow-hidden">
              <div className="flex p-6">
                <SVGIcon.feesIcon className="min-w-[32px] mr-2" />
                <div>
                  <div className="text-[20px] leading-[26.06px] font-semibold mb-3">
                    NO listing fees!
                  </div>
                  <div className="text-[14px] leading-[18px]">
                    That’s right—no listing fees! At Fizno, you can list your
                    products with zero insertion fees. Whether you’re selling
                    new or used items, it’s completely free to showcase them in
                    your Fizno store.
                  </div>
                </div>
              </div>
              <div className="inline-block whitespace-nowrap overflow-hidden relative w-full font-bold text-[36px] text-white  mt-6 mb-10 [text-shadow:-7px_0px_11px_rgba(83,_80,_104,_0.294)]">
                <div className="moving-bar-content ![animation-duration:38s] inline-block pl-[100%]">
                  ZERO LISTING FEES{" "}
                  <span className="rounded-full bg-white h-[10px] w-[10px] align-middle inline-block"></span>{" "}
                  ZERO LISTING FEES{" "}
                  <span className="rounded-full bg-white h-[10px] w-[10px] align-middle inline-block"></span>{" "}
                  ZERO LISTING FEES
                </div>
              </div>
            </div>
            <div className="w-3/12 bg-[#F9F9FB] rounded-[16px] border border-[#EAE5F6]">
              <div className="flex p-6">
                <SVGIcon.buyersIcon className="min-w-[32px] mr-2" />
                <div>
                  <div className="text-[20px] leading-[26.06px] font-semibold mb-3">
                    Reach Thousands of Buyers
                  </div>
                  <div className="text-[14px] leading-[18px]">
                    By creating a store on Fizno, you gain access to a broad
                    audience of potential buyers. You can also share your store
                    link across other platforms, driving even more traffic to
                    your products.
                  </div>
                </div>
              </div>
            </div>
            <div className="w-3/12 bg-[#F9F9FB] rounded-[16px] border border-[#EAE5F6]">
              <div className="flex p-6">
                <SVGIcon.inventoryIcon className="min-w-[32px] mr-2" />
                <div>
                  <div className="text-[20px] leading-[26.06px] font-semibold mb-3">
                    Inventory Management
                  </div>
                  <div className="text-[14px] leading-[18px]">
                    You can easily track your inventory levels. Your Fizno user
                    dashboard displays all of the data you need to maintain
                    proper inventory levels.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-3">
            <div className="w-3/12 bg-[#F9F9FB] rounded-[16px] border border-[#EAE5F6]">
              <div className="flex p-6">
                <SVGIcon.orderIcon className="min-w-[32px] mr-2" />
                <div>
                  <div className="text-[20px] leading-[26.06px] font-semibold mb-3">
                    Order fulfillment
                  </div>
                  <div className="text-[14px] leading-[18px]">
                    Being able to sell and manage your orders with a user
                    friendly dashboard.
                  </div>
                </div>
              </div>
            </div>
            <div className="w-3/12 bg-[#F9F9FB] rounded-[16px] border border-[#EAE5F6]">
              <div className="flex p-6">
                <SVGIcon.marketplaceIcon className="min-w-[32px] mr-2" />
                <div>
                  <div className="text-[20px] leading-[26.06px] font-semibold mb-3">
                    Lowest Marketplace Fees
                  </div>
                  <div className="text-[14px] leading-[18px]">
                    2.99% per product commission fees. We want to help you save
                    money because we understand how hard you work for it.
                    Selling on Fizno offers you the chance to maximize your
                    savings for future ventures.
                  </div>
                </div>
              </div>
            </div>
            <div className="w-6/12 custom-grad rounded-[16px] overflow-hidden">
              <div className="flex p-6">
                <SVGIcon.storeIcon className="min-w-[32px] mr-2" />
                <div>
                  <div className="text-[20px] leading-[26.06px] font-semibold mb-3">
                    Create Your Store for Free
                  </div>
                  <div className="text-[14px] leading-[18px]">
                    Sign up and set up your store at no cost! No need to worry
                    about hefty monthly overhead fees—on Fizno, you can have
                    your store up and running in just 10 minutes.{" "}
                  </div>
                </div>
              </div>
              <div className="inline-block whitespace-nowrap overflow-hidden relative w-full font-bold text-[36px] text-white mt-6 mb-10 [text-shadow:-7px_0px_11px_rgba(83,_80,_104,_0.294)]">
                <div className="moving-bar-content">
                  ZERO LISTING FEES{" "}
                  <span className="rounded-full bg-white h-[10px] w-[10px] align-middle inline-block"></span>{" "}
                  ZERO LISTING FEES{" "}
                  <span className="rounded-full bg-white h-[10px] w-[10px] align-middle inline-block"></span>{" "}
                  ZERO LISTING FEES
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-3">
            <div className="w-3/12 bg-[#F9F9FB] rounded-[16px] border border-[#EAE5F6]">
              <div className="flex p-6">
                <SVGIcon.statisticsIcons className="min-w-[32px] mr-2" />
                <div>
                  <div className="text-[20px] leading-[26.06px] font-semibold mb-3">
                    Real time statistics
                  </div>
                  <div className="text-[14px] leading-[18px]">
                    You can track your monthly sales by looking and reviewing
                    your statistics dashboard. You can take these numbers and
                    figure out what’s the next best step for your business and
                    set goals based on your numbers.
                  </div>
                </div>
              </div>
            </div>
            <div className="w-9/12 custom-grad rounded-[16px] overflow-hidden">
              <div className="flex p-6 pb-0">
                <SVGIcon.shieldIcon className="min-w-[32px] mr-2" />
                <div>
                  <div className="text-[20px] leading-[26.06px] font-semibold mb-3">
                    Protection That Matters
                  </div>
                  <div className="text-[14px] leading-[18px]">
                    Fizno Marketplace was designed not only to help you save
                    money but also to protect our sellers. Unlike other
                    platforms, we prioritize fairness for everyone. We have
                    strict policies in place to ensure seller protection,
                    including benefits like Fizno Feedback Protection and Seller
                    Protection. For more details, please visit our FAQ page.
                    “FAQ link”
                  </div>
                </div>
                <Image
                  className="min-w-[360px] ml-8"
                  alt="Protection"
                  src={IMAGES.protectionImg}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container text-black py-16">
          <div className="text-center mb-10">
            <div className="text-[32px] font-semibold">How it works?</div>
            <div className="text-[16px]">
              Step-by-step process to seamlessly grow your business on Fizno.
            </div>
          </div>
          <div className="relative" ref={sectionRef}>
            <div className="flex justify-between items-center relative z-[2]">
              <div className="max-w-[calc(50%_-_100px)]">
                <div className="text-[20px] font-semibold mb-2">
                  Register Quickly and Verify
                </div>
                <div className="text-[14px] leading-[18px]">
                  Sign up for your account in just a few seconds, making the
                  registration process effortless. Once registered, secure your
                  store by completing a quick email or phone verification,
                  ensuring that your account is safe and ready to use.
                </div>
              </div>
              <div className="bg-white w-[75px] h-[75px] rounded-full flex items-center justify-center ml-[5px]">
                <div className="bg-[#DFFF22] rounded-full w-[44px] h-[44px] flex items-center justify-center font-semibold text-[16px]">
                  1
                </div>
              </div>
              <div className="max-w-[calc(50%_-_100px)]">
                <Image alt="" src={IMAGES.howWorks2} />
              </div>
            </div>
            <div className="flex justify-between mt-24 mb-10 items-center relative z-[2]">
              <div className="max-w-[calc(50%_-_100px)]">
                <Image alt="" src={IMAGES.howWorks1} />
              </div>
              <div className="bg-white w-[75px] h-[75px] rounded-full flex items-center justify-center ml-[5px]">
                <div className="bg-[#DFFF22] rounded-full w-[44px] h-[44px] flex items-center justify-center font-semibold text-[16px]">
                  2
                </div>
              </div>
              <div className="max-w-[calc(50%_-_100px)]">
                <div className="text-[20px] font-semibold mb-2">
                  Set Up Your Store
                </div>
                <div className="text-[14px] leading-[18px]">
                  Customize your storefront by adding a profile picture and
                  setting up your store, all at no cost. You can list items
                  easily by utilizing AI to generate descriptions, allowing you
                  to showcase your products in minutes without the hassle of
                  writing everything from scratch.
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-24 mb-10 items-center relative z-[2]">
              <div className="max-w-[calc(50%_-_100px)]">
                <div className="text-[20px] font-semibold mb-2">
                  Register Quickly and Verify
                </div>
                <div className="text-[14px] leading-[18px]">
                  Sign up for your account in just a few seconds, making the
                  registration process effortless. Once registered, secure your
                  store by completing a quick email or phone verification,
                  ensuring that your account is safe and ready to use.
                </div>
              </div>
              <div className="bg-white w-[75px] h-[75px] rounded-full flex items-center justify-center ml-[5px]">
                <div className="bg-[#DFFF22] rounded-full w-[44px] h-[44px] flex items-center justify-center font-semibold text-[16px]">
                  3
                </div>
              </div>
              <div className="max-w-[calc(50%_-_100px)]">
                <Image alt="" src={IMAGES.howWorks3} />
              </div>
            </div>
            <div className="items-center absolute top-0 right-0 left-0 mx-auto w-fit h-full z-[1]">
              <div className="bg-[linear-gradient(180deg,_rgba(255,255,255,1)_20%,_rgba(255,255,255,0)_120%)] h-[50px] w-[20px] z-[2] left-[-5px] absolute top-0 "></div>
              <div className="bg-[linear-gradient(360deg,_rgba(255,255,255,1)_20%,_rgba(255,255,255,0)_120%)] h-[50px] w-[20px] z-[2] left-[-5px] absolute bottom-0 "></div>
              <div className="w-[3px] h-[100%] bg-[#EDE8F9] absolute left-0 right-0 mx-auto">
                <div
                  className="bg-[#5C34FC]"
                  style={{ height: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <Image src={IMAGES.categoriesImg} className="w-full" alt="Categories" />
        <div className="bg-[linear-gradient(180deg,_#F0F0FB_0%,_#FFFFFF_100%)] py-10 mt-[-2px]">
          <div className="container">
            <div className="rounded-[16px] pl-10 text-white !bg-[url('../../assets/images/bgGradient.png')] flex justify-between">
              <div className="py-10">
                <div className="text-[32px] font-medium mb-2">
                  Store Coupons That fits yours needs
                </div>
                <div className="max-w-[650px] leading-[21px]">
                  As a seller, you can showcase exclusive coupons directly in
                  your store.
                  <br /> With over{" "}
                  <span className="font-semibold">
                    15 different coupon variations
                  </span>{" "}
                  to choose from, you can tailor your offers to attract more
                  customers.
                  <div className="mt-2">
                    Creating coupons not only boosts your chances of making a
                    sale but also helps ensure customer satisfaction. Start your
                    flash sale today and watch your sales soar!
                  </div>
                </div>
                <a className="mt-6 text-white text-[14px] font-bold btn-grad rounded-[8px] py-[15px] px-[22px] block w-fit">
                  Start Promoting Your Shop
                </a>
              </div>
              <Image
                className="rounded-b-[16px]"
                src={IMAGES.coupons}
                alt="coupons"
              />
            </div>
          </div>
        </div>
        <div className="container text-black py-16">
          <div className="text-center mb-10">
            <div className="text-[32px] font-semibold">Fees Comparison</div>
            <div className="text-[16px] mb-10">
              Saving you money is what matters the most to us. See why Fizno is
              beneficial for your growth and pockets.
            </div>
            <Image src={IMAGES.fiznoTable} alt="table" className="w-full" />
          </div>
        </div>
        <div className="container text-black py-16 pb-20">
          <div className="text-left mb-10">
            <div className="text-[32px] font-semibold">
              Frequently Asked Questions
            </div>
            <div className="text-[16px] mb-10">
              Your go-to guide for understanding how FIZNO works for businesses.
            </div>
          </div>
          <div>
            {faqArrayData.map((item, index) => (
              <>
                <div
                  className="bg-[#F9F9FB] rounded-[16px] py-3 px-5 mb-5 border border-[#EAE5F6]"
                  key={index}
                >
                  <SellerAccordion title={item.title}>
                    <div className="mt-4">{item.answer}</div>
                  </SellerAccordion>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
