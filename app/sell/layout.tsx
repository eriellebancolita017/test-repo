import React from "react";
import SecondaryHeader from "@/components/common/header/SecondaryHeader";
import MainFooter from "@/components/footer/mainFooter";

export default function SellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[100vh] overflow-hidden">
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <SecondaryHeader />
        <main className="grow [&>*:first-child]:scroll-mt-16 bg-white uppercase ">
          {children}
        </main>
        <MainFooter />
      </div>
    </div>
  );
}
