"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAppProvider } from "@/app/app-provider";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { Transition } from "@headlessui/react";
import { getBreakpoint } from "../utils/utils";
import SidebarLink from "./sidebar-link";
import Logo from "./logo";
import SidebarLinkGroup from "./sidebar-link-group";

export default function Sidebar() {
  const sidebar = useRef<HTMLDivElement>(null);
  const { sidebarOpen, setSidebarOpen } = useAppProvider();
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);
  const segments = useSelectedLayoutSegments();
  const [breakpoint, setBreakpoint] = useState<string | undefined>(
    getBreakpoint(),
  );
  const pathname = usePathname();

  const expandOnly =
    !sidebarExpanded && (breakpoint === "lg" || breakpoint === "xl");

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!sidebar.current) return;
      if (!sidebarOpen || sidebar.current.contains(target as Node)) return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const handleBreakpoint = () => {
    setBreakpoint(getBreakpoint());
  };

  useEffect(() => {
    window.addEventListener("resize", handleBreakpoint);
    return () => {
      window.removeEventListener("resize", handleBreakpoint);
    };
  }, [breakpoint]);

  return (
    <div className={`min-w-fit ${sidebarExpanded ? "sidebar-expanded" : ""}`}>
      {/* Sidebar backdrop (mobile only) */}
      <Transition
        className="fixed inset-0 bg-primaryMain bg-opacity-30 z-40 lg:hidden lg:z-auto"
        show={sidebarOpen}
        enter="transition-opacity ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-out duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        aria-hidden="true"
      />

      {/* Sidebar */}
      <Transition
        show={sidebarOpen}
        unmount={false}
        as="div"
        id="sidebar"
        ref={sidebar}
        className="flex lg:!flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar  lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-primaryMain p-4 transition-all duration-200 ease-in-out"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-6 pr-3 sm:px-2">
          {/* Close button */}
          <button
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <Logo />
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            {/* <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Pages
              </span>
            </h3> */}
            <ul className="mt-3">
              {/* Dashboard */}
              {/* <SidebarLinkGroup open={segments.includes('dashboard')}>
                {(handleClick, open) => {
                  return (
                    <>
                      <a
                        href="#0"
                        className={`block text-slate-200 truncate transition duration-150 ${segments.includes('dashboard') ? 'hover:text-slate-200' : 'hover:text-white'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          expandOnly ? setSidebarExpanded(true) : handleClick()
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path
                                className={`fill-current ${segments.includes('dashboard') ? 'text-indigo-500' : 'text-slate-400'
                                  }`}
                                d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                              />
                              <path
                                className={`fill-current ${segments.includes('dashboard') ? 'text-indigo-600' : 'text-slate-600'
                                  }`}
                                d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                              />
                              <path
                                className={`fill-current ${segments.includes('dashboard') ? 'text-indigo-200' : 'text-slate-400'
                                  }`}
                                d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Dashboard
                            </span>
                          </div>
                          <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className="mb-1 last:mb-0">
                            <SidebarLink href="/dashboard">
                              <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Main
                              </span>
                            </SidebarLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <SidebarLink href="/dashboard/analytics">
                              <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Analytics
                              </span>
                            </SidebarLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <SidebarLink href="/dashboard/fintech">
                              <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Fintech
                              </span>
                            </SidebarLink>
                          </li>
                        </ul>
                      </div>
                    </>
                  )
                }}
              </SidebarLinkGroup> */}
              {/* E-Commerce */}
              {/* Inbox */}
              <li
                className={`px-3 hover:bg-blueTwo py-2 rounded-sm mb-0.5 last:mb-0 ${
                  segments.includes("dashboard") && "bg-blueTwo"
                }`}
              >
                <SidebarLink href="/seller/dashboard">
                  <div className="flex items-center">
                    <svg
                      className="shrink-0 h-6 w-6"
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="7" height="9" x="3" y="3" rx="1"></rect>
                      <rect width="7" height="5" x="14" y="3" rx="1"></rect>
                      <rect width="7" height="9" x="14" y="12" rx="1"></rect>
                      <rect width="7" height="5" x="3" y="16" rx="1"></rect>
                    </svg>

                    <span className="text-sm font-medium ml-3  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Dashboard
                    </span>
                  </div>
                </SidebarLink>
              </li>
              {/* Messages */}
              <li
                className={`px-3 hover:bg-blueTwo py-2 rounded-sm mb-0.5 last:mb-0 ${
                  segments.includes("messages") && "bg-blueTwo"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  expandOnly ? setSidebarExpanded(true) : console.log();
                }}
              >
                <SidebarLink href="/seller/messages">
                  <div className="flex items-center">
                    <svg
                      className="shrink-0 h-6 w-6"
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      version="1.2"
                      baseProfile="tiny"
                      viewBox="0 0 24 24"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M21 7h-3c0-1.65-1.35-3-3-3h-12c-1.65 0-3 1.35-3 3v7c0 1.65 1.35 3 3 3v3l3-3c0 1.65 1.35 3 3 3h8l3 3v-3h1c1.65 0 3-1.35 3-3v-7c0-1.65-1.35-3-3-3zm-18 8c-.542 0-1-.458-1-1v-7c0-.542.458-1 1-1h12c.542 0 1 .458 1 1v1h-6.5c-1.379 0-2.5 1.121-2.5 2.5v4.5h-4zm19 2c0 .542-.458 1-1 1h-12c-.542 0-1-.458-1-1v-6.5c0-.827.673-1.5 1.5-1.5h11.5c.542 0 1 .458 1 1v7z"></path>
                    </svg>
                    <span className="text-sm font-medium ml-3  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 relative">
                      {/* <div className="h-4 w-4 text-[10px] flex justify-center items-center text-center rounded-full bg-red-500 text-white absolute right-[-20px] top-[-1px] z-10">
                        12
                      </div> */}
                      Messages
                    </span>
                  </div>
                </SidebarLink>
              </li>
              {/* Orders */}
              <li
                className={`px-3 hover:bg-blueTwo py-2 rounded-sm mb-0.5 last:mb-0 ${
                  segments.includes("orders") ||
                  segments.includes("order-details")
                    ? "bg-blueTwo"
                    : ""
                }`}
              >
                <SidebarLink href="/seller/orders">
                  <div className="flex items-center">
                    <svg
                      className="shrink-0 h-6 w-6"
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 1024 1024"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"></path>
                    </svg>

                    <span className="text-sm font-medium ml-3  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Orders
                    </span>
                  </div>
                </SidebarLink>
              </li>
              {/* Offers */}
              <li
                className={`px-3 hover:bg-blueTwo py-2 rounded-sm mb-0.5 last:mb-0 ${
                  segments.includes("offers") ||
                  segments.includes("offers-details")
                    ? "bg-blueTwo"
                    : ""
                }`}
              >
                <SidebarLink href="/seller/offers">
                  <div className="flex items-center">
                    <svg
                      className="shrink-0 h-6 w-6"
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="none" d="M0 0h24v24H0V0z"></path>
                      <path d="m21.41 11.58-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM13 20.01 4 11V4h7v-.01l9 9-7 7.02z"></path>
                      <circle cx="6.5" cy="6.5" r="1.5"></circle>
                    </svg>
                    <span className="text-sm font-medium ml-3  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Offers
                    </span>
                  </div>
                </SidebarLink>
              </li>
              {/* Product */}
              <li
                className={`px-3 hover:bg-blueTwo py-2 rounded-sm mb-0.5 last:mb-0 ${
                  segments.includes("products") ||
                  segments.includes("add-products") ||
                  segments.includes("edit-products")
                    ? "bg-blueTwo"
                    : ""
                }`}
              >
                <SidebarLink href="/seller/products">
                  <div className="flex items-center">
                    <svg
                      className="shrink-0 h-6 w-6"
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="32"
                        d="M448 341.37V170.61A32 32 0 0 0 432.11 143l-152-88.46a47.94 47.94 0 0 0-48.24 0L79.89 143A32 32 0 0 0 64 170.61v170.76A32 32 0 0 0 79.89 369l152 88.46a48 48 0 0 0 48.24 0l152-88.46A32 32 0 0 0 448 341.37z"
                      ></path>
                      <path
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="32"
                        d="m69 153.99 187 110 187-110m-187 310v-200"
                      ></path>
                    </svg>

                    <span className="text-sm font-medium ml-3  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Products
                    </span>
                  </div>
                </SidebarLink>
              </li>

              {/* ebay */}
              {/* <li
                className={`px-3 hover:bg-blueTwo py-2 rounded-sm mb-0.5 last:mb-0 ${
                  segments.includes("ebay-import") && "bg-blueTwo"
                }`}
              >
                <SidebarLink href="/seller/ebay-import">
                  <div className="flex items-center">
                    <svg
                      className="shrink-0 h-6 w-6"
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                      <path d="M3 3v5h5"></path>
                      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
                      <path d="M16 16h5v5"></path>
                    </svg>

                    <span className="text-sm font-medium ml-3  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Import/CSV
                    </span>
                  </div>
                </SidebarLink>
              </li> */}
              {/* coupons */}
              <li
                className={`px-3 hover:bg-blueTwo py-2 rounded-sm mb-0.5 last:mb-0 ${
                  segments.includes("coupons") ||
                  segments.includes("add-coupons") ||
                  segments.includes("edit-coupons")
                    ? "bg-blueTwo"
                    : ""
                }`}
              >
                <SidebarLink href="/seller/coupons">
                  <div className="flex items-center">
                    <svg
                      className="shrink-0 h-6 w-6"
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="none"
                        strokeWidth="2"
                        d="M3,11 L21,11 L21,23 L3,23 L3,11 Z M2,11 L2,7 L22,7 L22,11 L2,11 Z M12,23 L12,7 L12,23 Z M7,7 L12,7 C12,7 10,2 7,2 C3.5,2 3,7 7,7 Z M17.1843819,7 L12.1843819,7 C12.1843819,7 14,2 17.1843819,2 C20.5,2 21.1843819,7 17.1843819,7 Z"
                      ></path>
                    </svg>

                    <span className="text-sm font-medium ml-3  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Coupons
                    </span>
                  </div>
                </SidebarLink>
              </li>
              {/* my earning */}
              <li
                className={`px-3 hover:bg-blueTwo py-2 rounded-sm mb-0.5 last:mb-0 ${
                  segments.includes("my-earning") && "bg-blueTwo"
                }`}
              >
                <SidebarLink href="/seller/my-earning">
                  <div className="flex items-center">
                    <svg
                      className="shrink-0 h-6 w-6"
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 576 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M112 112c0 35.3-28.7 64-64 64V336c35.3 0 64 28.7 64 64H464c0-35.3 28.7-64 64-64V176c-35.3 0-64-28.7-64-64H112zM0 128C0 92.7 28.7 64 64 64H512c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM176 256a112 112 0 1 1 224 0 112 112 0 1 1 -224 0zm80-48c0 8.8 7.2 16 16 16v64h-8c-8.8 0-16 7.2-16 16s7.2 16 16 16h24 24c8.8 0 16-7.2 16-16s-7.2-16-16-16h-8V208c0-8.8-7.2-16-16-16H272c-8.8 0-16 7.2-16 16z"></path>
                    </svg>

                    <span className="text-sm font-medium ml-3  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      My Earning
                    </span>
                  </div>
                </SidebarLink>
              </li>
              {/* get paid */}
              <li
                className={`px-3 hover:bg-blueTwo py-2 rounded-sm mb-0.5 last:mb-0 ${
                  segments.includes("get-paid") && "bg-blueTwo"
                }`}
              >
                <SidebarLink href="/seller/get-paid">
                  <div className="flex items-center">
                    <svg
                      className="shrink-0 h-6 w-6"
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 1024 1024"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm47.7-395.2l-25.4-5.9V348.6c38 5.2 61.5 29 65.5 58.2.5 4 3.9 6.9 7.9 6.9h44.9c4.7 0 8.4-4.1 8-8.8-6.1-62.3-57.4-102.3-125.9-109.2V263c0-4.4-3.6-8-8-8h-28.1c-4.4 0-8 3.6-8 8v33c-70.8 6.9-126.2 46-126.2 119 0 67.6 49.8 100.2 102.1 112.7l24.7 6.3v142.7c-44.2-5.9-69-29.5-74.1-61.3-.6-3.8-4-6.6-7.9-6.6H363c-4.7 0-8.4 4-8 8.7 4.5 55 46.2 105.6 135.2 112.1V761c0 4.4 3.6 8 8 8h28.4c4.4 0 8-3.6 8-8.1l-.2-31.7c78.3-6.9 134.3-48.8 134.3-124-.1-69.4-44.2-100.4-109-116.4zm-68.6-16.2c-5.6-1.6-10.3-3.1-15-5-33.8-12.2-49.5-31.9-49.5-57.3 0-36.3 27.5-57 64.5-61.7v124zM534.3 677V543.3c3.1.9 5.9 1.6 8.8 2.2 47.3 14.4 63.2 34.4 63.2 65.1 0 39.1-29.4 62.6-72 66.4z"></path>
                    </svg>
                    <span className="text-sm font-medium ml-3  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Get Paid
                    </span>
                  </div>
                </SidebarLink>
              </li>
              <li>
                {/* Product  */}
                <SidebarLinkGroup open={segments.includes("#")}>
                  {(handleClick, open) => {
                    return (
                      <>
                        <a
                          href="#0"
                          className={`block text-slate-200 min-w-auto lg:min-w-[190px] 2xl:w-[190px] truncate transition duration-150 ${
                            segments.includes("products")
                              ? "hover:text-slate-200"
                              : "hover:text-white"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            expandOnly
                              ? setSidebarExpanded(true)
                              : handleClick();
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <svg
                                className="shrink-0 h-6 w-6"
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 512 512"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="32"
                                  d="M262.29 192.31a64 64 0 1 0 57.4 57.4 64.13 64.13 0 0 0-57.4-57.4zM416.39 256a154.34 154.34 0 0 1-1.53 20.79l45.21 35.46a10.81 10.81 0 0 1 2.45 13.75l-42.77 74a10.81 10.81 0 0 1-13.14 4.59l-44.9-18.08a16.11 16.11 0 0 0-15.17 1.75A164.48 164.48 0 0 1 325 400.8a15.94 15.94 0 0 0-8.82 12.14l-6.73 47.89a11.08 11.08 0 0 1-10.68 9.17h-85.54a11.11 11.11 0 0 1-10.69-8.87l-6.72-47.82a16.07 16.07 0 0 0-9-12.22 155.3 155.3 0 0 1-21.46-12.57 16 16 0 0 0-15.11-1.71l-44.89 18.07a10.81 10.81 0 0 1-13.14-4.58l-42.77-74a10.8 10.8 0 0 1 2.45-13.75l38.21-30a16.05 16.05 0 0 0 6-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 0 0-6.07-13.94l-38.19-30A10.81 10.81 0 0 1 49.48 186l42.77-74a10.81 10.81 0 0 1 13.14-4.59l44.9 18.08a16.11 16.11 0 0 0 15.17-1.75A164.48 164.48 0 0 1 187 111.2a15.94 15.94 0 0 0 8.82-12.14l6.73-47.89A11.08 11.08 0 0 1 213.23 42h85.54a11.11 11.11 0 0 1 10.69 8.87l6.72 47.82a16.07 16.07 0 0 0 9 12.22 155.3 155.3 0 0 1 21.46 12.57 16 16 0 0 0 15.11 1.71l44.89-18.07a10.81 10.81 0 0 1 13.14 4.58l42.77 74a10.8 10.8 0 0 1-2.45 13.75l-38.21 30a16.05 16.05 0 0 0-6.05 14.08c.33 4.14.55 8.3.55 12.47z"
                                ></path>
                              </svg>
                              <span className="text-sm font-medium ml-3  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Settings
                              </span>
                            </div>
                            <div className="flex shrink-0 ml-2">
                              <svg
                                className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                  open && "rotate-180"
                                }`}
                                viewBox="0 0 12 12"
                              >
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className=" lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-1 mt-2 ${!open && "hidden"}`}>
                            <li
                              className={`p-2 mb-1 last:mb-0 ${
                                pathname === "/seller/settings"
                                  ? "bg-blueTwo text-white"
                                  : "bg-transparent"
                              }`}
                            >
                              <SidebarLink href="/seller/settings">
                                <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Payment and overages
                                </span>
                              </SidebarLink>
                            </li>
                            <li
                              className={`p-2 mb-1 last:mb-0 ${
                                pathname === "#"
                                  ? "bg-blueTwo"
                                  : "bg-transparent"
                              }`}
                            >
                              <SidebarLink href="#">
                                <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Withdrawals
                                </span>
                              </SidebarLink>
                            </li>
                            <li
                              className={`p-2 mb-1 last:mb-0 ${
                                pathname === "#"
                                  ? "bg-blueTwo"
                                  : "bg-transparent"
                              }`}
                            >
                              <SidebarLink href="#">
                                <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Blocked user
                                </span>
                              </SidebarLink>
                            </li>
                            <li
                              className={`p-2 mb-1 last:mb-0 ${
                                pathname === "#"
                                  ? "bg-blueTwo"
                                  : "bg-transparent"
                              }`}
                            >
                              <SidebarLink href="#">
                                <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Help
                                </span>
                              </SidebarLink>
                            </li>
                          </ul>
                        </div>
                      </>
                    );
                  }}
                </SidebarLinkGroup>
              </li>
              {/* Calendar */}
              {/* <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  segments.includes("calendar") && "bg-blueTwo"
                }`}
              >
                <SidebarLink href="/calendar">
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current ${
                          segments.includes("calendar")
                            ? "text-indigo-500"
                            : "text-slate-600"
                        }`}
                        d="M1 3h22v20H1z"
                      />
                      <path
                        className={`fill-current ${
                          segments.includes("calendar")
                            ? "text-indigo-300"
                            : "text-slate-400"
                        }`}
                        d="M21 3h2v4H1V3h2V1h4v2h10V1h4v2Z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Calendar
                    </span>
                  </div>
                </SidebarLink>
              </li> */}
              {/* Campaigns */}
              {/* <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  segments.includes("campaigns") && "bg-slate-900"
                }`}
              >
                <SidebarLink href="/campaigns">
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current ${
                          segments.includes("campaigns")
                            ? "text-indigo-500"
                            : "text-slate-600"
                        }`}
                        d="M20 7a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 0120 7zM4 23a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 014 23z"
                      />
                      <path
                        className={`fill-current ${
                          segments.includes("campaigns")
                            ? "text-indigo-300"
                            : "text-slate-400"
                        }`}
                        d="M17 23a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 010-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1zM7 13a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 112 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Campaigns
                    </span>
                  </div>
                </SidebarLink>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 text-white fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-white"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-white" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </Transition>
    </div>
  );
}
