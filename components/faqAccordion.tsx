"use client";

import React, { useState } from "react";
interface AccordionBasicProps {
  children: React.ReactNode;
  title: string;
  defaultOpen?: boolean;
}
export default function FaqAccordion({
  children,
  title,
  defaultOpen = false,
}: AccordionBasicProps) {
  const [open, setOpen] = useState<boolean>(defaultOpen);

  return (
    <div
      className="px-4 mb-4 rounded-sm dark:bg-slate-800 "
      style={{ borderRadius: "16px", background: "#F9F9FB" }}
    >
      <button
        className="flex items-center justify-between w-full group border-b py-4"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {/* <div className="font-medium text-[18px] text-slate-800 dark:text-slate-100">
          {title}
        </div> */}
        <div
          className={`font-medium text-[18px] ${open ? "text-[#5636F3]" : "text-slate-800 dark:text-slate-100"}`}
        >
          {title}
        </div>

        <svg
          className={`w-7 h-7 p-1 rounded-full ${open ? "bg-[#5636F3] text-white" : "bg-white text-gray-800"}`}
          viewBox="0 0 24 24"
        >
          {open ? (
            // Minus icon for the "open" state
            <path
              d="M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            // Plus icon for the "closed" state
            <path
              d="M12 5v14m-7-7h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </button>
      <div className={`text-sm ${!open && "hidden"}`}>{children}</div>
    </div>
  );
}
