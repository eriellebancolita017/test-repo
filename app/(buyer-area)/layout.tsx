import MainHeader from "@/components/common/header/mainHeader";
import MainFooter from "@/components/footer/mainFooter";
import React from "react";
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex  bg-white">
      {/* Sidebar */}

      {/* Content area */}
      <div className="relative flex flex-col flex-1 ">
        {/*  Site header */}
        <MainHeader />
        <div id="main_container" className="container">
          <main className="grow [&>*:first-child]:scroll-mt-16 bg-white uppercase">
            {children}
          </main>
        </div>
        <MainFooter />
      </div>
    </div>
  );
}
