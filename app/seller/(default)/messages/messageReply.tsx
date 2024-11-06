import TextEditor from "@/components/common/textEditor/page";
import Image from "next/image";
import React from "react";
// import Image01 from "@/public/images/user-40-01.jpg";
// import Image02 from "@/public/images/user-40-02.jpg";
// import MessageReplyAccordian from "./messageReplyAccordian";
import SingleUploadComponent from "@/components/common/fileUpload/singleFileUpload";
import ZoomableImage from "@/components/common/modal/imageZoomModal";
export default function ReplyMessage() {
  // const [messageOpen, setMessageOpen] = useState<boolean>(false);
  // const oldMessageArray = ["1", "2", "3", "4", "5"];

  const messageData = [
    {
      date: "October 19, 2023",
      messages: [
        {
          sender: "XYZ Deals",
          time: "12:35 pm",
          avatar: "/images/user-40-01.jpg",
          text: "Yamaha Raptor 700 & YFZ450 Alba front armsYamaha Raptor 700 & YFZ450 Alba front arms",
        },
        {
          sender: "MBJ Deals",
          time: "12:35 pm",
          avatar: "/images/user-40-02.jpg",
          text: (
            <>
              {" "}
              <ZoomableImage
                src="/images/mainpages/thirdBox.png"
                alt="Motorcycle"
                width={80}
                height={80}
              />
            </>
          ),
        },
        {
          sender: "XYZ Deals",
          time: "12:35 pm",
          avatar: "/images/user-40-01.jpg",
          text: "Yamaha Raptor 700 & YFZ450 Alba front armsYamaha Raptor 700 & YFZ450 Alba front arms",
        },
      ],
    },
    {
      date: "December 28, 2023",
      messages: [
        {
          sender: "XYZ Deals",
          time: "12:35 pm",
          avatar: "/images/user-40-01.jpg",
          text: "Yamaha Raptor 700 & YFZ450 Alba front armsYamaha Raptor 700 & YFZ450 Alba front arms",
        },
        {
          sender: "MBJ Deals",
          time: "12:35 pm",
          avatar: "/images/user-40-02.jpg",
          text: "Yamaha Raptor 700 & YFZ450 Alba front armsYamaha Raptor 700 & YFZ450 Alba front arms",
        },
        {
          sender: "XYZ Deals",
          time: "12:35 pm",
          avatar: "/images/user-40-01.jpg",
          text: "Yamaha Raptor 700 & YFZ450 Alba front armsYamaha Raptor 700 & YFZ450 Alba front arms",
        },
      ],
    },
  ];

  return (
    <>
      <div className="flex gap-5 w-full">
        {" "}
        <div className="w-full ">
          <div className="main_reply_containt">
            <div className="border bg-white border-slate-200 dark:border-slate-700 py-4 px-8  mb-4">
              <div className="bg-sky-50 dark:bg-sky-200 p-4 rounded-md flex">
                <div className="mr-4">
                  <Image
                    src="/images/mainpages/productPic.png"
                    alt=""
                    className="rounded-md"
                    width={90}
                    height={90}
                  />
                </div>
                <div className="w-3/12">
                  <h4 className="font-bold text-slate-950 text-[12px]">
                    HUSQVARNA FX 350 2022–2024 - Tusk Clutch Lever Brembo
                    Polished 1166230023
                  </h4>
                  <p className="text-gray-400 text-[12px]">Condition: New</p>
                  <div className="flex items-center">
                    {" "}
                    <h4 className="font-bold text-slate-950 text-lg ">
                      $23.99
                    </h4>
                    <p className="text-gray-500 text-[10px] font-bold ml-1">
                      Free Shipping
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className="text-end mt-3">
                <button
                  className="btn bg-primaryMain  hover:bg-blueTwo text-white"
                >
                  <span className="hidden xs:block">Buy Now</span>
                </button>
              </div> */}
            </div>

            <div className="border bg-white border-slate-200 dark:border-slate-700 py-4 px-8  mb-4">
              <div className="border border-slate-200 dark:border-slate-700 p-4 mb-4">
                {messageData.map((dateGroup, index) => (
                  <div key={index} className="main_datewise_message mt-2 mb-5">
                    <div className="relative border-t border-gray-300 h-3">
                      <div className="absolute py-1 px-2 bg-white text-[10px] top-[-11px] mx-auto text-center left-[45%]">
                        {dateGroup.date}
                      </div>
                    </div>
                    <div className="message_conversation_list mt-2">
                      {dateGroup.messages.map((message, idx) => (
                        <div
                          key={idx}
                          className="message_section-list flex mb-4"
                        >
                          <div className="mr-2">
                            <img
                              src={message.avatar}
                              alt={message.sender}
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                          </div>
                          <div>
                            <h5 className="font-bold text-xs text-black">
                              {message.sender}
                              <span className="text-gray-500 text-[10px] font-normal ml-2">
                                {message.time}
                              </span>
                            </h5>
                            <p className="text-sm text-slate-950 font-medium">
                              {message.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3">
                <TextEditor label="Message:" className="" />
              </div>
              <div className="mt-5 send_message_upload">
                <SingleUploadComponent type="edit " />
              </div>
              <div className="mt-3 text-end">
                <button className="btn bg-primaryMain  hover:bg-blueTwo text-white">
                  <span className="hidden xs:block">Send Message</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
