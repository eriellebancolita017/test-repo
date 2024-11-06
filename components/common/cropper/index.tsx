/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from "react";
import Image from "next/image";
import CropperModal from "../modal/cropperModal";
import uploadImg from "@/public/images/default_upload.png";

interface ICropper {
  value: any;
  onChange: (value: File | undefined) => void;
  isActive?: boolean | undefined;
  placeholder?: string;
}

export const dataURLtoBlob = (dataURL: string, name: string) => {
  const arr = dataURL.split(",");
  const mime = arr[0]?.match(/:(.*?);/)?.[1] as string;
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], name, { type: mime });
};

const Cropper: FC<ICropper> = ({ value, onChange, isActive }) => {
  const [open, setOpen] = React.useState(false);
  const [imgName, setImgName] = React.useState<string | undefined>();
  const [croppedImage, setCroppedImage] = React.useState("");
  const [image, setImage] = React.useState<File | undefined>();

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (croppedImage) {
      const file = dataURLtoBlob(croppedImage, imgName || "image");
      onChange(file);
      handleClose();
    }
  }, [croppedImage]);

  return (
    <>
      <div
        className="uploader main_upload_section
        relative h-40 w-40 bordered_div border border-slate-200"
      >
        {/* {value ?
          (
          // <Image
          //   src={URL.createObjectURL(value)}
          //   width={150}
          //   height={150}
          //   style={{ borderRadius: "50%", objectFit: "cover", margin: "10px" }}
          //   alt=""
          // />
          "p"
        ) : */}
        {value ? (
          // <Image
          //   src={URL.createObjectURL(value)}
          //   width={120}
          //   height={120}
          //   style={{ borderRadius: "50%", objectFit: "cover" }}
          //   alt=""
          //   className="mx-auto"
          // />
          <>
            <div className="relative">
              <img
                className="preview_img object-cover w-full h-[160px] rounded-sm"
                src={URL.createObjectURL(value)}
                alt="Uploaded"
              />
              <div className="absolute top-1 right-1 flex action_btn_main">
                <button className="w-6 h-6 mr-2 relative bg-white flex items-center justify-center rounded-sm">
                  <input
                    className="h-40 w-full absolute"
                    type="file"
                    onChange={(e) => {
                      setImage(e.target.files?.[0]);
                      setImgName(e.target.files?.[0].name);
                      setOpen(true);
                    }}
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

                <button
                  // onClick={handleDelete}
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
          </>
        ) : (
          <>
            {isActive && (
              // <label htmlFor="upload-photo" className="uploadProfile">
              //   <input
              //     type="file"
              //     accept="image/*"
              //     id="upload-photo"
              //     hidden
              //     onChange={(e) => {
              //       setImage(e.target.files?.[0]);
              //       setImgName(e.target.files?.[0].name);
              //       setOpen(true);
              //     }}
              //   />
              //   <button
              //     onClick={() => document.getElementById("upload-photo")?.click()}
              //     aria-label="delete"
              //   >
              //     &#9998;
              //   </button>
              // </label>

              <>
                <Image
                  src={uploadImg}
                  alt="Upload"
                  className="h-30 w-30 rounded-sm mx-auto default_img"
                  width={120}
                  height={80}
                />
                <p
                  className="text-black text-center font-bold mb-0"
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
                      className="h-40 w-full absolute opacity-0"
                      type="file"
                      accept="image/*"
                      id="upload-photo"
                      // hidden
                      onChange={(e) => {
                        setImage(e.target.files?.[0]);
                        setImgName(e.target.files?.[0].name);
                        setOpen(true);
                      }}
                    />
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
      {/* <DialogueBox onClose={handleClose} open={open}> */}
      <CropperModal
        image={image}
        setCroppedImage={setCroppedImage}
        onClose={handleClose}
        open={open}
      />
    </>
  );
};

export default Cropper;
