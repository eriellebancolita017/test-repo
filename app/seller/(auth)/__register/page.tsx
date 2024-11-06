// pages/seller-register.tsx
"use client";
import React, { useEffect, useState } from "react";
import FirstStep from "./component/firstStep";
import StepHeader from "./component/stepper";
import Link from "next/link";
import SecondStep from "./component/secondStep";
import ThirdStep from "./component/thirdStep";
import { useRouter, useSearchParams } from "next/navigation";
import SocialMediaRegister from "./component/socialMediaRegister";

const SellerRegister: React.FC = () => {
  /**
   * router
   */

  const router = useRouter();
  const searchParams = useSearchParams();
  const type: any = searchParams.get("type");

  const steps = [
    { title: "Registration", description: "Create account" },
    { title: "Shop", description: "Name your shop" },
    { title: "Billing", description: "Setup your billing" },
    { title: "Your Dashboard", description: "Fill details" },
  ];
  const switchSellersteps = [
    { title: "Shop", description: "Name your shop" },
    { title: "Billing", description: "Setup your billing" },
    { title: "Your Dashboard", description: "Fill details" },
  ];

  /**
   * state management
   */
  const [currentStep, setCurrentStep] = useState(0);
  const [socialLoginForm] = useState(false);

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/seller/dashboard");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            {socialLoginForm ? (
              <SocialMediaRegister
                currentStep={currentStep}
                handleNext={handleNext}
              />
            ) : (
              <FirstStep currentStep={currentStep} handleNext={handleNext} />
            )}
          </>
        );
      case 1:
        return <SecondStep currentStep={currentStep} handleNext={handleNext} />; // Replace with actual component
      case 2:
        return (
          <ThirdStep
            currentStep={currentStep}
            handlePrevious={handlePrevious}
            type={type}
          />
        ); // Replace with actual component
      default:
        return null;
    }
  };

  useEffect(() => {
    if (type) {
      setCurrentStep(1);
    }
  }, [type]);

  return (
    <main className="bg-white dark:bg-slate-900">
      <div className="container">
        <div className="pt-8 pb-10">
          <StepHeader
            steps={type === "newSeller" ? switchSellersteps : steps}
            currentStep={currentStep}
          />
          {renderCurrentStep()}
          {currentStep === 0 ? (
            <p className="mt-3 normal-case text-center ">
              Already have an account ?
              <Link
                href="/seller/login "
                className="font-semibold text-primaryMain ml-1"
              >
                Login Now
              </Link>
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </main>
  );
};

export default SellerRegister;
