"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface BreadcrumbItem {
  text: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const BreadcrumbTwo: React.FC<BreadcrumbProps> = ({ items, className }) => {
  //   const router = useRouter();
  const currentPath = usePathname();

  return (
    <div
      className={`py-1 breadcrumb_list text-[14px] ${className}`}
      style={{
        width: "fit-content",
      }}
    >
      <div className="container">
        <ul className="flex space-x-2 items-center">
          {items.map((item, index) => (
            <>
              <li key={index} className="truncate">
                <Link
                  href={item.href}
                  className={`capitalize text-md  ${
                    currentPath === item.href
                      ? "font-semibold text-primaryMain"
                      : "font-normal text-primaryMain"
                  }`}
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
              </li>
              {index < items.length - 1 && (
                <span className="text-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="9"
                    height="11"
                    viewBox="0 0 8 13"
                    fill="none"
                  >
                    <path
                      d="M1.5 1.5L6.5 6.5L1.5 11.5"
                      stroke="#A3A9C2"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BreadcrumbTwo;
