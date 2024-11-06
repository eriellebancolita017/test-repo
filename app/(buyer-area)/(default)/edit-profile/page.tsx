"use client";
import { dataURLtoBlob } from "@/components/common/cropper";
import ProfileImageUpload from "@/components/common/fileUpload/profileUpload";
import HeaderSectionCard from "@/components/common/header/headerSectionCard";
import InputComponent from "@/components/common/inputField/page";
import { ButtonLoader } from "@/components/common/loader/buttonLoader";
import CropperModal from "@/components/common/modal/cropperModal";
import DeleteAccountModal from "@/components/common/modal/deleteAccountModal";
import SearchSingleSelect from "@/components/common/select/searchableSingleSelect";
// import TextEditor from "@/components/common/textEditor/page";
import SVG from "@/public/svg";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  globalCacheStateSelector,
  refreshProfile,
  setIsLoading,
  setToastMessage,
} from "@/redux/slices/globaCache.slice";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

type ProfileType = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  about: string;
};

interface PasswordValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const EditProfile = () => {
  //   const OfferArray: [];
  const countryCode = [
    { value: "1", label: "+1" },
    { value: "91", label: "+91" },
    { value: "61", label: "+61" },

    { value: "275", label: "+275" },
  ];

  /**
   * redux
   */
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector(globalCacheStateSelector);

  /**
   * state management
   */
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [profileImage, setProfileImage] = useState<File | string>("");
  const [profileTempImage, setProfileTempImage] = useState<File>();
  const [showCropper, setShowCropper] = useState<boolean>(false);

  /**
   * formik
   */

  const formik = useFormik<ProfileType>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      about: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required."),
      lastName: Yup.string().required("Last Name is required."),
      email: Yup.string()
        .email("Email is invalid")
        .required("Email is required"),
      phoneNumber: Yup.string()
        .matches(/^\+?\d{10,15}$/, "Invalid phone number format")
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number cannot exceed 15 digits")
        .required("Phone Number is required"),
      about: Yup.string(),
    }),
    onSubmit: (values) => {
      handleUpdateProfile(values);
    },
  });

  const passwordFormik = useFormik<PasswordValues>({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .required("Old password is required.")
        .min(8, "Password must be at least 8 characters"),
      newPassword: Yup.string()
        .required("New password is required.")
        .min(8, "Password must be at least 8 characters"),
      confirmPassword: Yup.string().when("newPassword", (newPassword, field) =>
        newPassword ? field.required().oneOf([Yup.ref("newPassword")]) : field,
      ),
    }),
    onSubmit: async (values: PasswordValues) => {
      try {
        dispatch(setIsLoading(true));
        const response = await UserApi.updateUserPassword(values);
        if (response.remote === "success") {
          dispatch(setIsLoading(false));
          passwordFormik.setFieldValue("oldPassword", "");
          passwordFormik.setFieldValue("newPassword", "");
          passwordFormik.setFieldValue("confirmPassword", "");
          dispatch(
            setToastMessage({
              message: "update user password successful!",
              status: "success",
              open: true,
            }),
          );
        } else {
          dispatch(setIsLoading(false));
          dispatch(
            setToastMessage({
              message: response.data.errors.message || "An error occurred!",
              status: "error",
              open: true,
            }),
          );
        }
      } catch (error) {
        dispatch(setIsLoading(false));
      }
    },
  });

  /**
   * handle update profile
   */

  const handleUpdateProfile = async (values: ProfileType) => {
    dispatch(setIsLoading(true));
    const response = await UserApi.updateGeneralProfile(values);
    if (response.remote === "success") {
      dispatch(
        setToastMessage({
          message: "update user successful!",
          open: true,
          status: "success",
        }),
      );
      dispatch(setIsLoading(false));
    } else {
      dispatch(
        setToastMessage({
          message: response.error.errors.message || "An error occurred!",
          open: true,
          status: "success",
        }),
      );
      dispatch(setIsLoading(false));
    }
  };

  /**
   * handle update image
   */

  const handleUpdateImage = async (image: File) => {
    const response = await UserApi.updateProfileImage({ image });
    if (response.remote === "success") {
      dispatch(refreshProfile(Math.floor(100 + Math.random() * 900)));
      dispatch(
        setToastMessage({
          message: "Profile Image updated successfully.",
          open: true,
          status: "success",
        }),
      );
    } else {
      dispatch(
        setToastMessage({
          message: response.error.errors.message || "An error occurred!",
          open: true,
          status: "success",
        }),
      );
    }
  };

  useEffect(() => {
    if (user) {
      formik.setFieldValue(
        "firstName",
        user?.wp_nepaz2_usermeta?.find(
          (el: any) => el.meta_key === "first_name",
        )?.meta_value,
      );
      formik.setFieldValue(
        "lastName",
        user?.wp_nepaz2_usermeta?.find((el: any) => el.meta_key === "last_name")
          ?.meta_value,
      );
      formik.setFieldValue(
        "phoneNumber",
        user?.wp_nepaz2_usermeta?.find(
          (el: any) => el.meta_key === "phone_number",
        )?.meta_value,
      );
      formik.setFieldValue(
        "about",
        user?.wp_nepaz2_usermeta?.find((el: any) => el.meta_key === "about")
          ?.meta_value || "",
      );
      formik.setFieldValue("email", user?.user_email);
      setProfileImage(
        user?.avatar?.guid
          ? user?.avatar?.guid.includes("http")
            ? user?.avatar?.guid
            : `${process.env.NEXT_PUBLIC_API_BASE_URL}${user?.avatar?.guid}`
          : "",
      );
    }
  }, [user]);

  return (
    <>
      <div className="">
        <div className="">
          <HeaderSectionCard title="Edit Profile" />
        </div>
        <div className="flex flex-wrap md:flex-nowrap justify-between gap-6 mt-8">
          <div className="w-full md:w-3/12 mx-2">
            <div className="border border-[#F0F0F0] p-5">
              <ProfileImageUpload
                title={formik.values.firstName}
                initialImageUrl={profileImage}
                handleChangeImage={(imageFile) => {
                  setProfileTempImage(imageFile);
                  setShowCropper(true);
                }}
              />
            </div>
          </div>
          <div className="w-full md:w-9/12 mx-2">
            <div className="border border-[#F0F0F0] p-5">
              <h4 className="font-semibold text-[#121212] text-[28px] normal-case my-2">
                About
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <InputComponent
                    className="capitalize font-medium text-[#000!important] "
                    label="First Name"
                    placeholder=""
                    mandatory={true}
                    {...formik.getFieldProps("firstName")}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <span className="text-xs text-red-500">
                      {formik.errors.firstName}
                    </span>
                  )}
                </div>
                <div>
                  <InputComponent
                    className="capitalize font-medium text-[#000!important]"
                    label="Last Name"
                    placeholder=""
                    mandatory={true}
                    {...formik.getFieldProps("lastName")}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <span className="text-xs text-red-500">
                      {formik.errors.lastName}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <div>
                  <InputComponent
                    className="capitalize font-medium text-[#000!important] "
                    label="Email"
                    placeholder=""
                    mandatory={true}
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <span className="text-xs text-red-500">
                      {formik.errors.email}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <label className=" normal-case text-black text-sm font-medium">
                  Phone Number <span className="text-red-500"> *</span>
                </label>
                <div
                  className="flex phone_input_code mt-0"
                  style={{ marginTop: "0!important" }}
                >
                  {" "}
                  <div className="w-2/12 mr-4">
                    <SearchSingleSelect
                      label=""
                      placeholder="+1"
                      options={countryCode}
                      isDisabled
                    />
                  </div>{" "}
                  <div className="w-10/12">
                    <InputComponent
                      maxLength={10}
                      className="capitalize font-medium text-[#000!important] "
                      label="Phone Number"
                      placeholder="XXXXXXXXXX"
                      mandatory={true}
                      {...formik.getFieldProps("phoneNumber")}
                    />
                    {formik.touched.phoneNumber &&
                      formik.errors.phoneNumber && (
                        <span className="text-xs text-red-500">
                          {formik.errors.phoneNumber}
                        </span>
                      )}
                  </div>
                </div>
              </div>

              <div className="mt-4 normal-case">
                <label className="block text-zinc-600 text-sm font-medium mb-1 normal-case  text-[#000!important] ">
                  Write about you
                </label>
                <textarea
                  className="border border-[#E5E7EB] p-4 w-full  font-medium text-[#000!important] "
                  placeholder="Write here"
                  rows={5}
                  value={formik.values.about}
                  onChange={(e) =>
                    formik.setFieldValue("about", e.target.value)
                  }
                ></textarea>
                {/* <TextEditor
                  label=""
                  placeholder="Write here"
                  value={formik.values.about}
                  onChange={(e) =>
                    formik.setFieldValue("about", e.target.value)
                  }
                /> */}
                {formik.touched.about && formik.errors.about && (
                  <span className="text-xs text-red-500">
                    {formik.errors.about}
                  </span>
                )}
              </div>
              <div className="mt-5">
                <button
                  disabled={isLoading}
                  onClick={() => formik.handleSubmit()}
                  className="bg-primaryMain relative px-8 py-2 text-white font-medium rounded-md"
                >
                  {isLoading && (
                    <>
                      <span className="absolute left-[7%] top-[32%]">
                        <ButtonLoader />
                      </span>
                    </>
                  )}
                  Save
                </button>
              </div>
            </div>
            <div className="border border-[#F0F0F0] p-5 mt-6">
              <h4 className="font-semibold text-[#121212] text-[28px] normal-case my-2">
                Password
              </h4>
              <div className="">
                <InputComponent
                  type="password"
                  className="capitalize font-medium text-[#000!important] "
                  label="Old password"
                  placeholder=""
                  {...passwordFormik.getFieldProps("oldPassword")}
                />
                {passwordFormik.touched.oldPassword &&
                  passwordFormik.errors.oldPassword && (
                    <span className="text-xs text-red-500">
                      {passwordFormik.errors.oldPassword}
                    </span>
                  )}
              </div>
              <div className="mt-4">
                <InputComponent
                  type="password"
                  className="capitalize font-medium text-[#000!important]"
                  label="New password"
                  placeholder=""
                  {...passwordFormik.getFieldProps("newPassword")}
                />
                {passwordFormik.touched.newPassword &&
                  passwordFormik.errors.newPassword && (
                    <span className="text-xs text-red-500">
                      {passwordFormik.errors.newPassword}
                    </span>
                  )}
              </div>
              <div className="mt-4">
                <InputComponent
                  type="password"
                  className="capitalize font-medium text-[#000!important] "
                  label="Confirm new password"
                  placeholder=""
                  {...passwordFormik.getFieldProps("confirmPassword")}
                />
                {passwordFormik.touched.confirmPassword &&
                  passwordFormik.errors.confirmPassword && (
                    <span className="text-xs text-red-500">
                      {passwordFormik.errors.confirmPassword}
                    </span>
                  )}
              </div>
              <div className="mt-6">
                <button
                  disabled={isLoading}
                  onClick={() => passwordFormik.handleSubmit()}
                  className="bg-primaryMain relative px-8 py-2 text-white font-medium rounded-md"
                >
                  {isLoading && (
                    <>
                      <span className="absolute left-[7%] top-[32%]">
                        <ButtonLoader />
                      </span>
                    </>
                  )}
                  Update
                </button>
              </div>
            </div>
            <div className="mt-6 flex justify-end mb-4">
              <button
                className="border flex  border-[#E54B4D] rounded-lg px-4 text-[#E54B4D] font-medium text-base py-2"
                onClick={() => setShowDeleteAccount(true)}
              >
                <span className="mr-2">
                  <SVG.trashIcon />
                </span>{" "}
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
      <DeleteAccountModal
        buttonText="Delete Account"
        content="your account can be recovered with in 60 days of deleting the account."
        title="Are you sure you want to delete account"
        handleClick={() => console.log("clicked")}
        isOpen={showDeleteAccount}
        setIsOpen={setShowDeleteAccount}
      />
      {showCropper && (
        <CropperModal
          image={profileTempImage}
          setCroppedImage={(vl) => {
            const file = dataURLtoBlob(vl, profileTempImage?.name || "image");
            setProfileImage(file);
            setShowCropper(false);
            handleUpdateImage(file);
          }}
          onClose={() => setShowCropper(false)}
          open={showCropper}
          shape="round"
        />
      )}
    </>
  );
};
export default EditProfile;
