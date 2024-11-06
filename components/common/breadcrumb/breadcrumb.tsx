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

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  //   const router = useRouter();
  const currentPath = usePathname();

  return (
    <div
      className={`py-2 ${className}`}
      style={{ backgroundColor: "rgba(239, 239, 239, 1)" }}
    >
      <div className="container">
        <ul className="flex space-x-2">
          {items.map((item, index) => (
            <>
              <li key={index}>
                <Link
                  href={item.href}
                  className={`capitalize ${
                    currentPath === item.href
                      ? "font-semibold text-primaryMain"
                      : "text-gray-400 font-normal"
                  }`}
                >
                  {item.text}
                </Link>
              </li>
              {index < items.length - 1 && <span>/</span>}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Breadcrumb;
