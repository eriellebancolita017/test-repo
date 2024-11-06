// components/ShareModal.tsx
"use client"; // Optional for Next.js app router
import { SVGIcon } from "@/assets/svg";
import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  shareUrl,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full">
        <div className="flex justify-between w-full mb-4 items-center">
          <h2 className="text-xl font-semibold mb-0 text-gray-900 dark:text-white normal-case">
            Share this page
          </h2>
          <span onClick={onClose} className="cursor-pointer">
            <SVGIcon.closeIcon />
          </span>
        </div>
        <div className="flex justify-around">
          <TwitterShareButton url={shareUrl}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>

          <WhatsappShareButton url={shareUrl}>
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>
          {/* <InsagramShareButton url={shareUrl}>
            <WhatsappIcon size={40} round />
          </InsagramShareButton> */}
          <LinkedinShareButton url={shareUrl}>
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>
          <TelegramShareButton url={shareUrl}>
            <TelegramIcon size={40} round />
          </TelegramShareButton>
          <EmailShareButton url={shareUrl}>
            <EmailIcon size={40} round />
          </EmailShareButton>
        </div>
        {/* <div className="text-end">
          <button
            onClick={onClose}
            className="mt-6 bg-primaryMain text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ShareModal;
