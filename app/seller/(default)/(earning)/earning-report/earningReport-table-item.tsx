// import Image from "next/image";
import React from "react";
import { Product } from "./earningReport-table";
import { Avatar } from "@mui/material";
import { useRouter } from "next/navigation";

interface EarningReportTableItemProps {
  product: Product;
  onCheckboxChange: (id: number, checked: boolean) => void;
  isSelected: boolean;
}

export default function EarningReportTableItem({
  product,
  //   onCheckboxChange,
  //   isSelected,
}: EarningReportTableItemProps) {
  //   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     onCheckboxChange(product.id, e.target.checked);
  //   };
  const router = useRouter();
  return (
    <tr
      className="border border-slate-200 cursor-pointer"
      onClick={() => router.push("/seller/earning-detail")}
    >
      <td className="px-2 first:pl-5 last:pr-5 py-3">
        <div className="flex items-center gap-3">
          {/* <Image
            className="rounded-full"
            src={product.userDetail.image}
            width={40}
            height={40}
            alt={product.userDetail.title}
          /> */}
          <Avatar
            className="mr-2"
            style={{ width: "50px", height: "50px", background: "#306cb5" }}
          >
            GH
          </Avatar>
          <div>
            <p className="text-base mb-1 font-semibold text-[#1D364D]">
              {product.userDetail.title}
            </p>
            <p className="text-xs text-[#666666] font-medium">
              {product.userDetail.subTitle}
            </p>
          </div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 text-end">
        <div className="font-bold text-primaryMain text-xl dark:text-slate-100">
          {product.amount}
        </div>
      </td>
    </tr>
  );
}
