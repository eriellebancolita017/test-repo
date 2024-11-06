import Image from "next/image";
import React, { useEffect, useState } from "react";
import uploadImg from "@/public/images/uploadImg.png";
interface fileUploadProps {
  type: string;
}
const FileUploadComponent: React.FC<fileUploadProps> = ({ type }) => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const selectedImages = Array.from(selectedFiles);
      setImages(selectedImages);

      const selectedPreviews = selectedImages.map((image) =>
        URL.createObjectURL(image),
      );
      setPreviews(selectedPreviews);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const selectedFiles = event.dataTransfer.files;
    if (selectedFiles) {
      const selectedImages = Array.from(selectedFiles).slice(0, 2); // Limit to maximum 2 files
      setImages(selectedImages);

      const selectedPreviews = selectedImages.map((image) =>
        URL.createObjectURL(image),
      );
      setPreviews(selectedPreviews);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDelete = (index: number) => {
    const updatedPreviews = [...previews];
    updatedPreviews.splice(index, 1);
    setPreviews(updatedPreviews);

    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  useEffect(() => {
    if (type === "add") {
      setPreviews([]);
    }
  }, [type]);
  return (
    <div className="main_upload_section">
      <div>
        <div
          style={{
            border: "1px solid rgba(221, 221, 221, 1)",
            borderRadius: "5px",
            textAlign: "center",
            cursor: "pointer",
          }}
          className="relative h-40 w-40"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="absolute top-0 w-full cursor-pointer">
            <input
              className="h-40 w-full"
              type="file"
              multiple
              onChange={handleImageChange}
              accept=".jpg, .jpeg, .png"
              style={{ opacity: "0", cursor: "pointer" }}
            />
          </div>
          <div className="text-center">
            <div>
              <Image
                src={uploadImg}
                alt=""
                className="h-30 w-30 rounded-sm mx-auto"
                width={120}
                height={80}
              />
            </div>
            <div className="text-center">
              <p
                className="text-black font-bold mb-0"
                style={{ fontSize: "9px" }}
              >
                Drop your image here, or<br></br>
                <span className="text-blueLightTwo font-bold ml-1">browse</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center showing_preview">
        {previews.map((preview, index) => {
          return (
            <>
              <div
                key={index}
                className="h-24 w-24 mx-3 mb-2"
                style={{ position: "relative" }}
              >
                <img
                  className="object-cover"
                  // src={preview?.src ? preview?.src : preview}
                  src={typeof preview === "string" ? preview : ""}
                  alt={`Image ${index}`}
                  style={{ width: "100px", height: "100px", margin: "5px" }}
                />
                <button
                  onClick={() => handleDelete(index)}
                  className=" bg-lightPink text-red-500 w-7 h-7 rounded-sm top-0 right-0 flex justify-end items-center"
                  style={{
                    position: "absolute",

                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <span role="img" aria-label="Delete">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M16 1.75V3h5.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75Zm-6.5 0V3h5V1.75a.25.25 0 0 0-.25-.25h-4.5a.25.25 0 0 0-.25.25ZM4.997 6.178a.75.75 0 1 0-1.493.144L4.916 20.92a1.75 1.75 0 0 0 1.742 1.58h10.684a1.75 1.75 0 0 0 1.742-1.581l1.413-14.597a.75.75 0 0 0-1.494-.144l-1.412 14.596a.25.25 0 0 1-.249.226H6.658a.25.25 0 0 1-.249-.226L4.997 6.178Z"></path>
                      <path d="M9.206 7.501a.75.75 0 0 1 .793.705l.5 8.5A.75.75 0 1 1 9 16.794l-.5-8.5a.75.75 0 0 1 .705-.793Zm6.293.793A.75.75 0 1 0 14 8.206l-.5 8.5a.75.75 0 0 0 1.498.088l.5-8.5Z"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default FileUploadComponent;
