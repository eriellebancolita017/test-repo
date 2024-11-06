"use client";

import React, { useState } from "react";
interface SellerAccordionProps {
  children: React.ReactNode;
  title: string;
  defaultOpen?: boolean;
}
export default function SellerAccordion({
  children,
  title,
  defaultOpen = false,
}: SellerAccordionProps) {
  const [open, setOpen] = useState<boolean>(defaultOpen);

  return (
    <div className="text-black text-[16px]">
      <button
        className="flex items-center justify-between w-full group"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <div
          className={`font-semibold ${open ? "text-[#5C34FC]" : "text-black"}`}
        >
          {title}
        </div>

        <div
          className={`flex items-center justify-center w-[32px] h-[32px] shrink-0 fill-current ml-3 rounded-full text-[33px] ${open ? "bg-[#5C34FC] text-white" : "bg-white text-black"}`}
        >
          <div className={`${open ? "mt-[-5px]" : ""}`}>{open ? "-" : "+"}</div>
        </div>
      </button>
      <div className={`text-sm ${!open && "hidden"}`}>{children}</div>
    </div>
  );
}
