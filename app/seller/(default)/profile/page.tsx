/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import InputComponent from "@/components/common/inputField/page";
import SingleUploadComponent from "@/components/common/fileUpload/singleFileUpload";
import TooltipCustom from "@/components/common/tooltip/tooltip";
import { useAppSelector } from "@/redux/hooks";
import { FormikHelpers, useFormik } from "formik";
import { Alert, Snackbar } from "@mui/material";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import * as Yup from "yup";
import SearchSingleSelect from "@/components/common/select/searchableSingleSelect";
import TextEditor from "@/components/common/textEditor/page";
interface UserValues {
  userName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  sellerType: string;
}
interface PasswordValues {
  oldPassword: string;
  newPassword?: string;
  confirmPassword?: string;
}
export default function Profile() {
  // const handlePhoneChange = (newValue: string) => {
  //   console.log("Phone number changed:", newValue);
  // };
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "error";
    open: boolean;
  }>({ message: "", severity: "success", open: false });
  const { user } = useAppSelector((state) => state.globalCache);
  const formik = useFormik<UserValues>({
    initialValues: {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      sellerType: "",
    },
    enableReinitialize: true,
    onSubmit: async (
      values: UserValues,
      { setSubmitting }: FormikHelpers<UserValues>,
    ) => {
      const response = await UserApi.updateGeneralProfile(values);
      if (response.remote === "success") {
        setSnackbar({
          message: "update user successful!",
          severity: "success",
          open: true,
        });
      } else {
        setSnackbar({
          message: response.error.errors.message || "An error occurred!",
          severity: "error",
          open: true,
        });
      }
      setSubmitting(false);
    },
  });

  const formik2 = useFormik<PasswordValues>({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .required("Required")
        .min(8, "Password must be at least 8 characters"),
      newPassword: Yup.string()
        .required("Required")
        .min(8, "Password must be at least 8 characters"),
      confirmPassword: Yup.string().when("newPassword", (newPassword, field) =>
        newPassword ? field.required().oneOf([Yup.ref("newPassword")]) : field,
      ),
    }),
    onSubmit: async (
      values: PasswordValues,
      { setSubmitting }: FormikHelpers<PasswordValues>,
    ) => {
      try {
        const response = await UserApi.updateUserPassword(values);
        if (response.remote === "success") {
          setSnackbar({
            message: "update user password successful!",
            severity: "success",
            open: true,
          });
        } else {
          setSnackbar({
            message: response.data.errors.message || "An error occurred!",
            severity: "error",
            open: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
      setSubmitting(false);
    },
  });

  const getMetaValue = (key: string) => {
    const meta = user?.wp_nepaz2_usermeta?.find(
      (item: any) => item.meta_key === key,
    )?.meta_value;
    return meta;
  };
  useEffect(() => {
    if (user) {
      formik.setValues({
        userName: getMetaValue("nickname"),
        firstName: getMetaValue("first_name"),
        lastName: getMetaValue("last_name"),
        email: user?.user_email,
        phoneNumber: getMetaValue("phone_number"),
        sellerType: getMetaValue("seller_type"),
      });
    }
  }, [user]);

  // console.log(formik.values)
  const handleCloseSnackbar = () => {
    setSnackbar((prev: any) => ({ ...prev, open: false }));
  };

  const countryCode = [{ value: "1", label: "+1" }];

  const accountTypeOptions = ["Business", "Individual"];
  console.log({ formik: formik.values });

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          {/* Left: Title */}
          <div className="mb-4 sm:mb-0">
            <h1 className=" flex items-center text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
              Profile Manager
              <svg
                className="shrink-0 h-6 w-6 ms-2"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M448 341.37V170.61A32 32 0 0 0 432.11 143l-152-88.46a47.94 47.94 0 0 0-48.24 0L79.89 143A32 32 0 0 0 64 170.61v170.76A32 32 0 0 0 79.89 369l152 88.46a48 48 0 0 0 48.24 0l152-88.46A32 32 0 0 0 448 341.37z"
                ></path>
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="m69 153.99 187 110 187-110m-187 310v-200"
                ></path>
              </svg>
            </h1>
          </div>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative"
        >
          <div className="flex gap-5">
            <div className="w-7/12">
              <div className="">
                <label className="block text-zinc-600 text-sm font-bold mb-1 undefined">
                  Seller Type
                </label>
                <div className="mb-6 flex w-full gap-4">
                  {accountTypeOptions.map((option) => {
                    const isSelected =
                      formik.values.sellerType?.toLowerCase() ===
                      option.toLowerCase();
                    return (
                      <div
                        key={option}
                        className={`cursor-pointer border rounded-full px-3 py-1 normal-case font-medium text-sm ${
                          isSelected
                            ? "border-primaryMain text-primaryMain bg-blue-100"
                            : "border-gray-500 text-gray-500 bg-gray-100"
                        }`}
                        onClick={() => {
                          formik.setFieldValue(
                            "sellerType",
                            option.toLowerCase(),
                          );
                        }}
                      >
                        <input
                          type="radio"
                          className="mr-2"
                          checked={isSelected}
                          onChange={() =>
                            formik.setFieldValue(
                              "sellerType",
                              option.toLowerCase(),
                            )
                          }
                        />
                        {option}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="">
                {" "}
                <InputComponent
                  className="w-[80%]"
                  label="User Name"
                  {...formik.getFieldProps("userName")}
                />
              </div>
              <div className="mt-4">
                {" "}
                <InputComponent
                  className="w-[80%]"
                  label="First Name"
                  {...formik.getFieldProps("firstName")}
                />
              </div>
              <div className="mt-4">
                {" "}
                <InputComponent
                  className="w-[80%]"
                  label="Last Name"
                  {...formik.getFieldProps("lastName")}
                />
              </div>
              <div className="mt-4">
                {" "}
                <InputComponent
                  className="w-[80%]"
                  label="Email"
                  {...formik.getFieldProps("email")}
                />
              </div>
              <div className="mt-4">
                <label className="font-bold normal-case text-sm text-zinc-600">
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
                      options={countryCode}
                      placeholder="+1"
                    />
                  </div>{" "}
                  <div className="w-10/12">
                    <InputComponent
                      className="capitalize font-medium text-[#000!important] "
                      label="Phone Number"
                      placeholder="XXXXXXXXXX"
                      mandatory={true}
                      maxLength={10}
                      {...formik.getFieldProps("phoneNumber")}
                    />
                  </div>
                </div>
                {/* <TelephoneInputComponent
                  label="Phone Number"
                  className="custom-class"
                  onChange={handlePhoneChange}
                  tooltipMessage="Enter a valid phone number"
                  showTooltip={true}
                /> */}
              </div>
            </div>
            <div className="w-5/12 ">
              <div className=" profile_upload_div">
                <label className="flex text-zinc-600 text-sm font-bold mb-1">
                  Avatar
                  <TooltipCustom bg="light" className="ms-2 ">
                    <div className="text-[10px] font-normal text-slate-900 min-w-52 ">
                      Upload a Avatar, size is (150x150) pixels.
                    </div>
                  </TooltipCustom>
                </label>
                <SingleUploadComponent
                  component={{ isUploaded: false }}
                  type="add"
                />
                <p className="mt-1 text-red-500 font-medium text-xs">
                  Image size must be 150px * 150px
                </p>
              </div>
            </div>
          </div>
          <div className="w-12/12">
            <div className="mt-4">
              <TextEditor label="About Us" />
            </div>
          </div>
          <div className="mt-4 text-end">
            <button
              type="submit"
              className="btn bg-primaryMain hover:bg-blueTwo text-white"
            >
              <span className="hidden xs:block ">Submit</span>
            </button>
          </div>
        </form>

        <form
          onSubmit={formik2.handleSubmit}
          className="px-4 mt-8 sm:px-6 lg:px-8 py-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative"
        >
          <h4 className="text-xl mb-4 text-slate-700 font-semibold">
            Change Password
          </h4>
          <div className="flex gap-5">
            <div className="w-7/12">
              <div className="">
                {" "}
                <InputComponent
                  className="w-[80%]"
                  label="Old Password"
                  {...formik2.getFieldProps("oldPassword")}
                />
                {formik2.touched.oldPassword && formik2.errors.oldPassword ? (
                  <div className="text-red-600">
                    {formik2.errors.oldPassword}
                  </div>
                ) : null}
              </div>
              <div className="mt-4">
                {" "}
                <InputComponent
                  className="w-[80%]"
                  label="New Password"
                  {...formik2.getFieldProps("newPassword")}
                />
                {formik2.touched.newPassword && formik2.errors.newPassword ? (
                  <div className="text-red-600">
                    {formik2.errors.newPassword}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="w-5/12 ">
              <div className="">
                {" "}
                <InputComponent
                  className="w-[80%]"
                  label="Confirm Password"
                  {...formik2.getFieldProps("confirmPassword")}
                />
                {formik2.touched.confirmPassword &&
                formik2.errors.confirmPassword ? (
                  <div className="text-red-600">
                    {formik2.errors.confirmPassword}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="mt-4 text-end">
            <button
              type="submit"
              className="btn bg-primaryMain hover:bg-blueTwo text-white"
            >
              <span className="hidden xs:block ">Update</span>
            </button>
          </div>
        </form>
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

// "use client";
// import React from "react";
// import InputComponent from "@/components/common/inputField/page";
// // import MultiselectDropdown from "@/components/common/multiselect/page";
// import SingleUploadComponent from "@/components/common/fileUpload/singleFileUpload";
// import TooltipCustom from "@/components/common/tooltip/tooltip";
// import TelephoneInputComponent from "@/components/common/telephoneInput/telephoneInput";

// export default function Profile() {
//   const handlePhoneChange = (newValue: string) => {
//     console.log("Phone number changed:", newValue);
//   };
//   return (
//     <>
//       {" "}
//       <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
//         <div className="sm:flex sm:justify-between sm:items-center mb-8">
//           {/* Left: Title */}
//           <div className="mb-4 sm:mb-0">
//             <h1 className=" flex items-center text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
//               Profile Manager
//               <svg
//                 className="shrink-0 h-6 w-6 ms-2"
//                 stroke="currentColor"
//                 fill="currentColor"
//                 strokeWidth="0"
//                 viewBox="0 0 512 512"
//                 height="1em"
//                 width="1em"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   fill="none"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="32"
//                   d="M448 341.37V170.61A32 32 0 0 0 432.11 143l-152-88.46a47.94 47.94 0 0 0-48.24 0L79.89 143A32 32 0 0 0 64 170.61v170.76A32 32 0 0 0 79.89 369l152 88.46a48 48 0 0 0 48.24 0l152-88.46A32 32 0 0 0 448 341.37z"
//                 ></path>
//                 <path
//                   fill="none"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="32"
//                   d="m69 153.99 187 110 187-110m-187 310v-200"
//                 ></path>
//               </svg>
//             </h1>
//           </div>
//         </div>

//         <div className="px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
//           <div className="flex gap-5">
//             <div className="w-7/12">
//               <div className="">
//                 {" "}
//                 <InputComponent className="w-[80%]" label="Username" />
//               </div>
//               <div className="mt-4">
//                 {" "}
//                 <InputComponent className="w-[80%]" label="First Name" />
//               </div>
//               <div className="mt-4">
//                 {" "}
//                 <InputComponent className="w-[80%]" label="Last Name" />
//               </div>
//               <div className="mt-4">
//                 {" "}
//                 <InputComponent className="w-[80%]" label="Email" />
//               </div>
//               <div className="mt-4">
//                 <TelephoneInputComponent
//                   label="Phone Number"
//                   className="custom-class"
//                   onChange={handlePhoneChange}
//                   tooltipMessage="Enter a valid phone number"
//                   showTooltip={true}
//                 />
//               </div>
//             </div>
//             <div className="w-5/12 ">
//               <div className=" profile_upload_div">
//                 <label className="flex text-zinc-600 text-sm font-bold mb-1">
//                   Avatar
//                   <TooltipCustom bg="light" className="ms-2 ">
//                     <div className="text-[10px] font-normal text-slate-900 min-w-52 ">
//                       Upload a Avatar, size is (150x150) pixels.
//                     </div>
//                   </TooltipCustom>
//                 </label>
//                 <SingleUploadComponent type="add" />
//                 <p className="mt-1 text-red-500 font-medium text-xs">
//                   Image size must be 150px * 150px
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="mt-4 text-end">
//             <button
//               className="btn bg-primaryMain hover:bg-blueTwo text-white"
//               // onClick={() => router.push("/add-products")}
//             >
//               <span className="hidden xs:block ">Submit</span>
//             </button>
//           </div>
//         </div>

//         <div className="px-4 mt-8 sm:px-6 lg:px-8 py-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
//           <h4 className="text-xl mb-4 text-slate-700 font-semibold">
//             Change Password
//           </h4>
//           <div className="flex gap-5">
//             <div className="w-7/12">
//               <div className="">
//                 {" "}
//                 <InputComponent className="w-[80%]" label="Old Password" />
//               </div>
//               <div className="mt-4">
//                 {" "}
//                 <InputComponent className="w-[80%]" label="New Password" />
//               </div>
//             </div>
//             <div className="w-5/12 ">
//               <div className="">
//                 {" "}
//                 <InputComponent className="w-[80%]" label="Confirm Password" />
//               </div>
//             </div>
//           </div>
//           <div className="mt-4 text-end">
//             <button
//               className="btn bg-primaryMain hover:bg-blueTwo text-white"
//               // onClick={() => router.push("/add-products")}
//             >
//               <span className="hidden xs:block ">Update</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
