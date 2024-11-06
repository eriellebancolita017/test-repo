"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HeaderSectionCard from "@/components/common/header/headerSectionCard";
import SVG from "@/public/svg";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import { useAppDispatch } from "@/redux/hooks";
import { setToastMessage } from "@/redux/slices/globaCache.slice";
import DeleteAccountModal from "@/components/common/modal/deleteAccountModal";

type addressType = {
  id: number;
  addressLineOne: string;
  addressLineTwo: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  isDefault: boolean;
};

const ManageAddress: React.FC = () => {
  /**
   * router
   */

  const router = useRouter();

  /**
   * redux
   */

  const dispatch = useAppDispatch();

  /**
   * state management
   */
  const [allAddress, setAllAddress] = useState<addressType[]>([]);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  /**
   * handle get all address
   */

  const handleGetAllAddress = async () => {
    const response = await UserApi.getAllAddressAPI();
    if (response.remote === "success") {
      const data = response.data.data;
      const addressList = data?.map((item: any) => ({
        id: item?.id,
        addressLineOne: item?.street1,
        addressLineTwo: item?.street2,
        country: item?.country,
        state: item?.state,
        city: item?.city,
        zipcode: item?.zipcode,
        isDefault: item?.default ? true : false,
      }));

      setAllAddress(addressList);
    }
  };

  /**
   * handle update address status
   */

  const handleUpdateAddressStatus = async (address: addressType) => {
    const payload = {
      data: {
        street1: address.addressLineOne,
        street2: address.addressLineTwo,
        country: address.country,
        state: address.state,
        city: address.city,
        zipcode: address.zipcode,
        default: address.isDefault ? 0 : 1,
      },
      id: address.id,
    };
    const response = await UserApi.updateAddressAPI(payload);

    if (response.remote === "success") {
      dispatch(
        setToastMessage({
          message: "Address marked as default.",
          status: "success",
          open: true,
        }),
      );
      handleGetAllAddress();
    } else {
      dispatch(
        setToastMessage({
          message: response.error.errors.message || "An error has occurs.",
          status: "error",
          open: true,
        }),
      );
    }
  };

  /**
   * handle delete address
   */

  const handleDeleteAddress = async () => {
    if (selectedAddress) {
      setDeleteLoading(true);
      const response = await UserApi.deleteAddressAPI(selectedAddress);

      if (response.remote === "success") {
        setDeleteLoading(false);
        setIsDeleteModal(false);
        handleGetAllAddress();
        dispatch(
          setToastMessage({
            message: "Address deleted successfully.",
            status: "success",
            open: true,
          }),
        );
      } else {
        setDeleteLoading(false);
        dispatch(
          setToastMessage({
            message: response.error.errors.message || "An error has occurs.",
            status: "error",
            open: true,
          }),
        );
      }
    }
  };

  useEffect(() => {
    handleGetAllAddress();
  }, []);
  return (
    <div className="">
      <div className="">
        <HeaderSectionCard title="Manage Address" />
      </div>
      <div className=" gap-6 mt-8">
        <div className="w-12/12">
          <div className="border border-[#F0F0F0] p-5 buyer_address_form">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-[#121212] text-[28px] normal-case my-2">
                My Address
              </h4>
              <button
                className="border text-primaryMain font-medium border-primaryMain rounded-[5px] px-4 h-9 flex items-center"
                onClick={() => router.push("/add-new-address")}
              >
                <span className="mr-3">
                  <SVG.circlePlusBlue />
                </span>{" "}
                Add new address
              </button>
            </div>
            <div className="">
              <p className="font-medium text-base mb-4 normal-case text-black">
                Address
              </p>
              {allAddress?.map((address) => (
                <div
                  key={address.id}
                  className="address_card_main flex gap-5 w-full mb-4"
                >
                  <div
                    className={`border rounded-[5px] px-3 py-2 normal-case text-[10px] font-medium flex items-center cursor-pointer ${
                      address.isDefault
                        ? "bg-primaryMain text-white"
                        : "border-primaryMain text-primaryMain"
                    }`}
                    style={{ width: "12%" }}
                    onClick={() => handleUpdateAddressStatus(address)}
                  >
                    <span
                      className={`mr-1 ${
                        address.isDefault ? "text-white" : "text-primaryMain"
                      }`}
                    >
                      <SVG.unfilledCheck />
                    </span>{" "}
                    {address.isDefault ? "Default add." : "Make default"}
                  </div>
                  <div
                    style={{ width: "80%" }}
                    className="w-full bg-[#EEF7FF] py-2 px-3 text-primaryMain font-bold normal-case rounded-[4px]"
                  >
                    {address.addressLineOne} {address.addressLineTwo},
                    {address.city} {address.state} {address.country},{" "}
                    {address.zipcode}
                  </div>
                  <div
                    onClick={() => {
                      setSelectedAddress(address.id);
                      setIsDeleteModal(true);
                    }}
                    style={{ width: "4%" }}
                    className="border border-primaryMain rounded-[5px] w-9 h-9 flex items-center justify-center cursor-pointer"
                  >
                    <SVG.trashIcon />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <DeleteAccountModal
        isLoading={deleteLoading}
        title="Are you sure you want to delete address"
        content=""
        buttonText="Delete Address"
        handleClick={() => handleDeleteAddress()}
        isOpen={isDeleteModal}
        setIsOpen={setIsDeleteModal}
      />
    </div>
  );
};

export default ManageAddress;
