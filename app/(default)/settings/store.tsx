/* eslint-disable @typescript-eslint/no-explicit-any */
import SingleUploadComponent from "@/components/common/fileUpload/singleFileUpload";
import InputComponent from "@/components/common/inputField/page";
import SearchSingleSelect from "@/components/common/select/searchableSingleSelect";
import TooltipCustom from "@/components/common/tooltip/tooltip";
import React, { useEffect, useState } from "react";
import SVG from "@/public/svg";
import { FormikHelpers, useFormik } from "formik";
import { useAppSelector } from "@/redux/hooks";
import Countries from "../../../helpers/countries.json";
import States from "../../../helpers/states.json";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import { Alert, Snackbar } from "@mui/material";
import {
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from "react-share";
interface UserValues {
  storeName?: string;
  storeProduct?: string;
  street?: string;
  street2?: string;
  city?: string;
  zipCode?: string;
  country?: string;
  state?: string;
  url?: string;
}

export default function StoreSetting() {
  const [states, setStates] = useState(States);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "error";
    open: boolean;
  }>({ message: "", severity: "success", open: false });
  const { user } = useAppSelector((state) => state.globalCache);
  const formik = useFormik<UserValues>({
    initialValues: {
      storeName: "",
      storeProduct: "",
      street: "",
      street2: "",
      city: "",
      zipCode: "",
      country: "",
      state: "",
      url: "",
    },
    onSubmit: async (
      values: UserValues,
      { setSubmitting }: FormikHelpers<UserValues>,
    ) => {
      const response = await UserApi.updateStoreSetting(values);
      if (response.remote === "success") {
        setSnackbar({
          message: "update store setting successful!",
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

  const getMetaValue = (key: string) => {
    const meta = user?.wp_nepaz2_usermeta.find(
      (item: any) => item.meta_key === key,
    )?.meta_value;
    return meta;
  };

  const handleCountrySelect = (data: { label: string; value: string }) => {
    formik.setFieldValue("country", data.value);
    const stateFilter = States.filter(
      (item) => item.country_code == data.value,
    );
    setStates(stateFilter);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(formik.getFieldProps("url").value);
    setSnackbar({
      message: "Link Copied",
      severity: "success",
      open: true,
    });
  };

  useEffect(() => {
    formik.setValues({
      storeName: getMetaValue("dokan_profile_settings")?.store_name,
      storeProduct: getMetaValue("dokan_profile_settings")?.store_ppp,
      street: getMetaValue("dokan_profile_settings")?.address.street_1,
      street2: getMetaValue("dokan_profile_settings")?.address.street_2,
      city: getMetaValue("dokan_profile_settings")?.address.city,
      zipCode: getMetaValue("dokan_profile_settings")?.address.zip,
      state: getMetaValue("dokan_profile_settings")?.address.state,
      country: getMetaValue("dokan_profile_settings")?.address.country,
      url: user?.user_url || "www.example.com",
    });
  }, [user]);

  const handleCloseSnackbar = () => {
    setSnackbar((prev: any) => ({ ...prev, open: false }));
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex mt-4 mb-4 gap-5">
        <div className="w-6/12">
          <div className="mt-4 profile_upload_div">
            <label className="flex text-zinc-600 text-sm font-bold mb-1">
              Profile Image
              <TooltipCustom bg="light" className="ms-2 ">
                <div className="text-[10px] font-normal text-slate-900 min-w-52 ">
                  Upload a Profile, size is (150x150) pixels.
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
          {/* <div className="mt-4 ">
            <InputComponent label="Meta Keywords" />
          </div> */}
        </div>
        <div className="w-6/12">
          <div className="mt-4 banner_image_section ">
            <label className="flex text-zinc-600 text-sm font-bold mb-1">
              Banner Image
              <TooltipCustom bg="light" className="ms-2 ">
                <div className="text-[10px] font-normal text-slate-900 min-w-52 ">
                  Upload a banner for your store. Banner size is (625x300)
                  pixels.
                </div>
              </TooltipCustom>
            </label>
            {/* <FileUploadComponent type="add" /> */}
            <SingleUploadComponent
              component={{ isUploaded: false }}
              type="add"
            />
            <p className="mt-1 text-red-500 font-medium text-xs">
              Image size must be 625px * 300px
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 mb-4">
        <div className="w-12/12">
          <div className="mt-4 ">
            <InputComponent
              label="Store Name"
              {...formik.getFieldProps("storeName")}
            />
          </div>
        </div>
        <div className="w-12/12">
          <div className="mt-4 ">
            <InputComponent
              label="Store Product Per Page"
              {...formik.getFieldProps("storeProduct")}
            />
          </div>
        </div>
      </div>
      {/* <hr /> */}
      <h5 className="mt-4 text-slate-800 text-lg font-semibold dark:text-zinc-600  ">
        Store Address
      </h5>
      <div className="flex mt-4 mb-4 gap-5">
        <div className="w-6/12">
          <div className="mt-4 ">
            <InputComponent
              label="Street"
              {...formik.getFieldProps("street")}
            />
          </div>
        </div>
        <div className="w-6/12">
          <div className="mt-4 ">
            <InputComponent
              label="Street 2"
              {...formik.getFieldProps("street2")}
            />
          </div>
        </div>
      </div>{" "}
      <div className="flex mt-4 mb-4 gap-5">
        <div className="w-6/12">
          <div className="mt-4 ">
            <InputComponent
              label="City/Town"
              {...formik.getFieldProps("city")}
            />
          </div>
        </div>
        <div className="w-6/12">
          <div className="mt-4 ">
            <InputComponent
              label="Postcode/Zip"
              {...formik.getFieldProps("zipCode")}
            />
          </div>
        </div>
      </div>{" "}
      <div className="flex mt-4 mb-4 gap-5">
        <div className="w-6/12">
          <div className="mt-4">
            {" "}
            <SearchSingleSelect
              label="Country"
              value={Countries.map((item: any) => {
                return { label: item.name, value: item.iso2 };
              }).find(
                (item) => item.value == formik.getFieldProps("country").value,
              )}
              options={Countries.map((item: any) => {
                return { label: item.name, value: item.iso2 };
              })}
              onChange={handleCountrySelect}
            />
          </div>
        </div>
        <div className="w-6/12">
          <div className="mt-4">
            {" "}
            <SearchSingleSelect
              label="State/Province"
              value={states
                ?.filter(
                  (state: any) =>
                    state.country_code ===
                    formik.getFieldProps("country").value,
                )
                ?.map((item: any) => {
                  return { label: item.name, value: item.state_code };
                })
                .find(
                  (item: any) =>
                    item.value === formik.getFieldProps("state").value,
                )}
              options={states
                ?.filter(
                  (state: any) =>
                    state.country_code ===
                    formik.getFieldProps("country").value,
                )
                ?.map((item: any) => {
                  return { label: item.name, value: item.state_code };
                })}
              onChange={(e) => formik.setFieldValue("state", e.value)}
            />
          </div>
        </div>
      </div>
      <div className="share_section border p-4 rounded-sm">
        <p className="text-primaryMain font-semibold text-lg">
          Share this link via
        </p>
        <ul className="flex">
          <WhatsappShareButton
            url={formik.getFieldProps("url").value}
            type="button"
          >
            <li className="mr-2 cursor-pointer">
              <SVG.WhatsappIcon />
            </li>
          </WhatsappShareButton>
          <li className="mr-2 cursor-pointer">
            <SVG.InstagramIcon />
          </li>
          <FacebookShareButton
            url={formik.getFieldProps("url").value}
            hashtag={"#Fizno"}
            type="button"
          >
            <li className="mr-2 cursor-pointer">
              <SVG.FacebookIcon />
            </li>
          </FacebookShareButton>

          <TwitterShareButton
            url={formik.getFieldProps("url").value}
            type="button"
          >
            <li className="mr-2 cursor-pointer">
              {/* <span SVG.TwitterIcon alt="" width={30} height={30}></span> */}
              <SVG.TwitterIcon />
            </li>
          </TwitterShareButton>
        </ul>
        <div className="mt-2 pt-2">
          <label className="">Copy Link</label>
          <div className="flex mt-1">
            <input
              type="text"
              className="h-9 mr-2 px-2 w-full rounded-sm border border-slate-200 dark:bg-[rgb(18,18,18)] dark:border-slate-700"
              placeholder=""
              value={formik.getFieldProps("url").value}
            />
            <button
              className="btn h-9 bg-primaryMain hover:bg-blueTwo text-white"
              type="button"
              onClick={() => {
                copyLink();
              }}
            >
              <span className="hidden xs:block ">Copy</span>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4 text-end">
        <button
          type={"submit"}
          className="btn bg-primaryMain hover:bg-blueTwo text-white"
        >
          <span className="hidden xs:block ">Save</span>
        </button>
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
    </form>
  );
}
