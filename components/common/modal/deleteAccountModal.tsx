import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import { ButtonLoader } from "../loader/buttonLoader";

interface ModalActionProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  content: string;
  title: string;
  handleClick: () => void;
  buttonText: string;
  isLoading?: boolean;
}

export default function DeleteAccountModal({
  isOpen,
  setIsOpen,
  title,
  content,
  handleClick,
  buttonText,
  isLoading = false,
}: ModalActionProps) {
  return (
    <Transition appear show={isOpen}>
      <Dialog as="div" onClose={() => setIsOpen(false)}>
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
            <div className="p-6">
              <div className="relative">
                {/* Close button */}
                <button
                  className="absolute top-1 right-0 text-slate-400 dark:text-slate-500 hover:text-slate-500 dark:hover:text-slate-400"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <div className="sr-only">Close</div>
                  <svg className="w-4 h-4 fill-current">
                    <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
                  </svg>
                </button>
                <div className="">
                  <h4 className="font-bold text-lg text-[#151515]">{title}</h4>
                  <p className="mt-4 text-[#475156] font-medium">{content}</p>
                  <div className="flex mt-5 gap-5">
                    <button
                      className="bg-red-500 px-8 relative text-white py-2 rounded-md"
                      onClick={() => handleClick()}
                    >
                      {isLoading && (
                        <>
                          <span className="absolute left-[7%] top-[35%]">
                            <ButtonLoader />
                          </span>
                        </>
                      )}
                      {buttonText}
                    </button>
                    <button
                      className="bg-gray-300  border text-[#E54B4D] border-[#E54B4D] bg-transparent font-medium px-6 rounded-md py-2"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
