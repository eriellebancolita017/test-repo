/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Box } from "@mui/material";
import Cropper, { Area } from "react-easy-crop";
import { Dialog, Transition } from "@headlessui/react";

interface CropperModalProps {
  onClose: () => void;
  setCroppedImage: (image: string) => void;
  image: any;
  open: boolean;
  shape?: string;
}
function CropperModal({
  onClose,
  setCroppedImage,
  image,
  open,
  shape,
}: CropperModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [imgSrc, setImageSrc] = useState<string | null>(null);

  const handleSave = async () => {
    if (croppedAreaPixels) {
      const croppedCanvas = await getCroppedCanvas(croppedAreaPixels);
      if (croppedCanvas) {
        const dataURL = croppedCanvas.toDataURL();
        setCroppedImage(dataURL);
      }
    }
  };

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const createImage = (url: string) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.src = url;
    });

  const getCroppedCanvas = async (pixelCrop: Area) => {
    if (!imgSrc) return null;
    const image = (await createImage(imgSrc)) as HTMLImageElement;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }

    // set canvas size to match the bounding box
    canvas.width = image.width;
    canvas.height = image.height;

    // translate canvas context to a central location to allow rotating and flipping around the center
    ctx.translate(image.width / 2, image.height / 2);
    ctx.translate(-image.width / 2, -image.height / 2);

    // draw rotated image
    ctx.drawImage(image, 0, 0);

    const croppedCanvas = document.createElement("canvas");

    const croppedCtx = croppedCanvas.getContext("2d");

    if (!croppedCtx) {
      return null;
    }

    // Set the size of the cropped canvas
    croppedCanvas.width = pixelCrop.width;
    croppedCanvas.height = pixelCrop.height;

    // Draw the cropped image onto the new canvas
    croppedCtx.drawImage(
      canvas,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );

    // As Base64 string
    // return croppedCanvas.toDataURL('image/jpeg');

    // As a blob
    return croppedCanvas;
  };

  function readFile(file: File) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  const onFileChange = async (file: File | null) => {
    if (file) {
      const imageDataUrl = await readFile(file);
      if (typeof imageDataUrl === "string") {
        setImageSrc(imageDataUrl);
      }
    }
  };

  React.useEffect(() => {
    onFileChange(image);
  }, [image]);

  return (
    <Transition appear show={open}>
      <Dialog as="div" onClose={onClose}>
        <Transition.Child
          className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
          enter="transition ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-out duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          aria-hidden="true"
        />
        <Transition.Child
          className="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6 mx-auto min-w-[800px]   max-w-[1000px]"
          enter="transition ease-in-out duration-200"
          enterFrom="opacity-0 translate-y-4"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in-out duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-4"
        >
          <Dialog.Panel className="bg-white dark:bg-slate-800 rounded shadow-lg overflow-auto w-auto max-h-full custom_modal_div min-w-[800px]   max-w-[1000px]">
            <Box className="cropper">
              <div className="flex justify-between mb-3 p-3">
                <p id="modal-modal-title" className="font-bold text-base">
                  Crop the picture
                </p>
                <div onClick={onClose} className="cursor-pointer">
                  {/* <SVG.Cross /> */}X
                </div>
              </div>

              {imgSrc && (
                <Cropper
                  image={imgSrc}
                  crop={crop}
                  rotation={rotation}
                  zoom={zoom}
                  aspect={1}
                  cropShape={shape as "rect" | "round" | undefined}
                  onCropChange={setCrop}
                  onRotationChange={setRotation}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  style={{
                    containerStyle: {
                      height: "400px",
                      width: "100%",
                      position: "relative",
                    },
                  }}
                />
              )}

              <div className="text-end px-4 py-4">
                {" "}
                <button
                  onClick={handleSave}
                  className="invite bg-primaryMain px-4 text-white h-9 rounded-md "
                >
                  Save
                </button>
              </div>
            </Box>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export default CropperModal;
