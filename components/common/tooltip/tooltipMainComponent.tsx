"use client";

import React, { useState } from "react";
import { Transition } from "@headlessui/react";

interface TooltipProps {
  children: React.ReactNode;
  tooltipContent: React.ReactNode;
  className?: string;
  bg?: "dark" | "light" | "primaryMain" | null;
  size?: "sm" | "md" | "lg" | "none";
  position?: "top" | "bottom" | "left" | "right";
}

export default function TooltipMainComponent({
  children,
  tooltipContent,
  className = "",
  bg = null,
  size = "none",
  position = "top",
}: TooltipProps) {
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);

  const positionOuterClasses = (position: TooltipProps["position"]) => {
    switch (position) {
      case "right":
        return "left-full top-1/2 -translate-y-1/2";
      case "left":
        return "right-full top-1/2 -translate-y-1/2";
      case "bottom":
        return "top-full left-1/2 -translate-x-1/2";
      default:
        return "bottom-full left-1/2 -translate-x-1/2";
    }
  };

  const sizeClasses = (size: TooltipProps["size"]) => {
    switch (size) {
      case "lg":
        return "min-w-[18rem] p-3";
      case "md":
        return "min-w-[14rem] p-3";
      case "sm":
        return "min-w-[11rem] p-2";
      default:
        return "p-2";
    }
  };

  const colorClasses = (bg: TooltipProps["bg"]) => {
    switch (bg) {
      case "light":
        return "bg-white text-slate-950 border-slate-200";
      case "dark":
        return "bg-slate-700 text-slate-100 border-slate-600";
      default:
        return "text-slate-600 bg-white dark:bg-slate-700 dark:text-slate-100 border-slate-200 dark:border-slate-600";
    }
  };

  const positionInnerClasses = (position: TooltipProps["position"]) => {
    switch (position) {
      case "right":
        return "ml-2";
      case "left":
        return "mr-2";
      case "bottom":
        return "mt-2";
      default:
        return "mb-2";
    }
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setTooltipOpen(true)}
      onMouseLeave={() => setTooltipOpen(false)}
      onFocus={() => setTooltipOpen(true)}
      onBlur={() => setTooltipOpen(false)}
    >
      {children}
      <div className={`z-10 absolute ${positionOuterClasses(position)}`}>
        <Transition
          show={tooltipOpen}
          as="div"
          className={`rounded border overflow-hidden shadow-lg ${sizeClasses(
            size,
          )} ${colorClasses(bg)} ${positionInnerClasses(position)}`}
          enter="transition ease-out duration-200 transform"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          unmount={false}
        >
          {tooltipContent}
        </Transition>
      </div>
    </div>
  );
}
