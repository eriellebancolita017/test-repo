/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import Image from "next/image";
import React from "react";
import uploadImg from "@/public/images/default_upload.png";

interface FileUploadProps {
  type?: string;
  component?: any;
  handleImageChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDelete?: () => void;
}

const SingleUploadComponent: React.FC<FileUploadProps> = ({
  component,
  handleImageChange,
  handleDelete,
}) => {
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  console.log({ component });

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="main_upload_section">
      <div>
        <div
          style={{
            borderRadius: "5px",
            textAlign: "center",
            cursor: "pointer",
          }}
          className="relative h-40 w-40 bordered_div border border-slate-200 dark:border-slate-700"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {!component?.item?.ID && (
            <div className="absolute top-0 w-full cursor-pointer">
              <input
                className="h-40 w-full"
                type="file"
                onChange={handleImageChange}
                accept=".jpg, .jpeg, .png"
                style={{ opacity: "0", cursor: "pointer" }}
              />
            </div>
          )}
          <div className="text-center">
            {component?.isUploaded ? (
              <div className="relative">
                <img
                  className="preview_img object-cover w-full h-[160px] rounded-sm"
                  src={
                    component?.item?.guid
                      ? component?.item?.guid.includes("http")
                        ? component?.item?.guid
                        : `${process.env.NEXT_PUBLIC_API_BASE_URL}${component?.item?.guid}`
                      : URL.createObjectURL(component?.item)
                  }
                  alt="Uploaded"
                />
                <div className="absolute top-1 right-1 flex action_btn_main">
                  {!component?.item?.ID && (
                    <button className="w-6 h-6 mr-2 relative bg-white flex items-center justify-center rounded-sm">
                      <input
                        className="h-40 w-full absolute"
                        type="file"
                        onChange={handleImageChange}
                        accept=".jpg, .jpeg, .png"
                        style={{ opacity: "0", cursor: "pointer" }}
                      />
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <circle cx="12" cy="12" r="3.2"></circle>
                        <path d="M9 2 7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path>
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={handleDelete}
                    className=" bg-white text-red-500 w-6 h-6 rounded-sm flex justify-center items-center"
                    style={{ border: "none", cursor: "pointer", zIndex: "99" }}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="none" d="M0 0h24v24H0V0z"></path>
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5-1-1h-5l-1 1H5v2h14V4h-3.5z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <Image
                  src={uploadImg}
                  alt="Upload"
                  className="h-30 w-30 rounded-sm mx-auto default_img"
                  width={120}
                  height={80}
                />
                <p
                  className="text-black font-bold mb-0"
                  style={{ fontSize: "9px" }}
                >
                  Drop your image here, or
                  <br />
                  <span className="text-blueLightTwo font-bold ml-1">
                    browse
                  </span>
                </p>
                <div className="absolute right-2 top-2 camera_btn">
                  <button className="flex justify-center w-7 h-7 relative ">
                    <svg
                      className="w-6 h-6"
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <circle cx="12" cy="12" r="3.2"></circle>
                      <path d="M9 2 7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path>
                    </svg>{" "}
                    <input
                      className="h-40 w-full absolute"
                      type="file"
                      onChange={handleImageChange}
                      accept=".jpg, .jpeg, .png"
                      style={{ opacity: "0", cursor: "pointer" }}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUploadComponent;
