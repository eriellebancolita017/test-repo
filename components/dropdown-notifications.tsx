"use client";
import React from "react";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { Avatar } from "@mui/material";
export default function DropdownNotifications({
  align,
}: {
  align?: "left" | "right";
}) {
  return (
    <Menu as="div" className="relative inline-flex">
      {({ open }) => (
        <>
          <Menu.Button
            className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full ${
              open && "bg-slate-200"
            }`}
          >
            <span className="sr-only">Notifications</span>
            <svg
              className="w-4 h-4"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"></path>
            </svg>
            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-white dark:border-[#182235] rounded-full"></div>
          </Menu.Button>
          <Transition
            as="div" // Specify the element to render
            className={`origin-top-right z-10 absolute top-full px-4 -mr-48 sm:mr-0 min-w-[600px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded-2xl shadow-xl overflow-hidden mt-1 ${
              align === "right" ? "right-0" : "left-0"
            }`}
            enter="transition ease-out duration-200 transform"
            enterFrom="opacity-0 -translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="text-base border-b font-bold py-2 normal-case text-blueTwo dark:text-slate-500 pt-1.5 pb-2">
              Notifications (To-do)
            </div>
            <Menu.Items as="ul" className="focus:outline-none">
              <Menu.Item
                as="li"
                className=" border-b border-[#CFCFCF] dark:border-slate-700 last:border-0"
              >
                {({ active }) => (
                  <Link
                    className={`block py-2 ${
                      active && "bg-slate-50 dark:bg-slate-700/20"
                    }`}
                    href="#0"
                  >
                    <div className="flex items-center">
                      <Avatar
                        // src={userData.userProfileImage}
                        src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
                        style={{
                          width: "60px",
                          height: "60px",
                          background: "#306cb5",
                        }}
                      >
                        Rahul
                      </Avatar>
                      <p className="text-[20px] font-normal normal-case ml-1">
                        <span className="text-primaryMain font-bold text-lg mr-1">
                          @Billyjohn
                        </span>
                        has liked your
                        <span className="text-black font-bold ml-1">
                          comment.
                        </span>
                      </p>
                    </div>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item
                as="li"
                className=" border-b border-[#CFCFCF] dark:border-slate-700 last:border-0"
              >
                {({ active }) => (
                  <Link
                    className={`block py-2 ${
                      active && "bg-slate-50 dark:bg-slate-700/20"
                    }`}
                    href="#0"
                  >
                    <div className="flex items-center">
                      <Avatar
                        // src={userData.userProfileImage}
                        src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
                        style={{
                          width: "60px",
                          height: "60px",
                          background: "#306cb5",
                        }}
                      >
                        Jay
                      </Avatar>
                      <p className="text-[20px] font-normal normal-case ml-1">
                        <span className="text-primaryMain font-bold text-lg mr-1">
                          @Jay443
                        </span>
                        mentioned you in a
                        <span className="text-black font-bold ml-1">
                          comment.
                        </span>
                      </p>
                    </div>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item
                as="li"
                className=" border-b border-[#CFCFCF] dark:border-slate-700 last:border-0"
              >
                {({ active }) => (
                  <Link
                    className={`block py-2 ${
                      active && "bg-slate-50 dark:bg-slate-700/20"
                    }`}
                    href="#0"
                  >
                    <div className="flex items-center">
                      <Avatar
                        // src={userData.userProfileImage}
                        src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
                        style={{
                          width: "60px",
                          height: "60px",
                          background: "#306cb5",
                        }}
                      >
                        Rahul
                      </Avatar>
                      <p className="text-[20px] text-[#2B2B2B] font-normal normal-case ml-1">
                        Your{" "}
                        <span className="text-black font-bold mr-1 ml-1">
                          Elka rear shock
                        </span>{" "}
                        has shipped and estimated delivery date is July 29 2024.
                      </p>
                    </div>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item
                as="li"
                className=" border-b border-[#CFCFCF] dark:border-slate-700 last:border-0"
              >
                {({ active }) => (
                  <Link
                    className={`block py-2 ${
                      active && "bg-slate-50 dark:bg-slate-700/20"
                    }`}
                    href="#0"
                  >
                    <div className="flex items-center">
                      <Avatar
                        // src={userData.userProfileImage}
                        src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
                        style={{
                          width: "60px",
                          height: "60px",
                          background: "#306cb5",
                        }}
                      >
                        Jay
                      </Avatar>
                      <p className="text-[20px] font-normal normal-case ml-1">
                        <span className="text-primaryMain font-bold text-lg mr-1">
                          @Matthew9912
                        </span>
                        has
                        <span className="text-black font-bold ml-1 mr-1">
                          followed
                        </span>
                        you
                      </p>
                    </div>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item
                as="li"
                className=" border-b border-[#CFCFCF] dark:border-slate-700 last:border-0"
              >
                {({ active }) => (
                  <Link
                    className={`block py-2 ${
                      active && "bg-slate-50 dark:bg-slate-700/20"
                    }`}
                    href="#0"
                  >
                    <div className="flex items-center">
                      <Avatar
                        // src={userData.userProfileImage}
                        src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
                        style={{
                          width: "60px",
                          height: "60px",
                          background: "#306cb5",
                        }}
                      >
                        Jay
                      </Avatar>
                      <p className="text-[20px] font-normal normal-case ml-1">
                        <span className="text-primaryMain font-bold text-lg mr-1">
                          @Jay443
                        </span>
                        mentioned you in a
                        <span className="text-black font-bold ml-1">
                          comment.
                        </span>
                      </p>
                    </div>
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
