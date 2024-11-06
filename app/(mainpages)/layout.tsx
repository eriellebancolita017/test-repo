import MainHeader from "@/components/common/header/mainHeader";
import MainFooter from "@/components/footer/mainFooter";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[100vh] overflow-hidden">
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <MainHeader />

        <main className="grow [&>*:first-child]:scroll-mt-16 bg-white uppercase">
          {children}
        </main>
        <MainFooter />
      </div>
    </div>
  );
}
