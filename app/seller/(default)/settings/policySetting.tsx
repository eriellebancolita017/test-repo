/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import InputComponent from "@/components/common/inputField/page";
import TextEditor from "@/components/common/textEditor/page";
import { useAppSelector } from "@/redux/hooks";
import { FormikHelpers, useFormik } from "formik";
import { Alert, Snackbar } from "@mui/material";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
interface UserValues {
  tabTitle?: string;
  shippingPolicy?: string;
  refundPolicy?: string;
  returnPolicy?: string;
}
export default function PolicySetting() {
  const { user } = useAppSelector((state) => state.globalCache);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "error";
    open: boolean;
  }>({ message: "", severity: "success", open: false });
  const formik = useFormik<UserValues>({
    initialValues: {
      tabTitle: "",
      shippingPolicy: "",
      refundPolicy: "",
      returnPolicy: "",
    },
    onSubmit: async (
      values: UserValues,
      { setSubmitting }: FormikHelpers<UserValues>,
    ) => {
      const response = await UserApi.updatePolicySetting(values);
      if (response.remote === "success") {
        setSnackbar({
          message: "update policy setting successful!",
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
    const meta = user?.wp_nepaz2_usermeta?.find(
      (item: any) => item.meta_key === key,
    )?.meta_value;
    return meta;
  };
  useEffect(() => {
    formik.setValues({
      tabTitle: getMetaValue("dokan_profile_settings")?.wcfm_policy_tab_title,
      shippingPolicy: getMetaValue("dokan_profile_settings")
        ?.wcfm_shipping_policy,
      refundPolicy: getMetaValue("dokan_profile_settings")?.wcfm_refund_policy,
      returnPolicy: getMetaValue("dokan_profile_settings")
        ?.wcfm_cancellation_policy,
    });
  }, [user]);
  const handleCloseSnackbar = () => {
    setSnackbar((prev: any) => ({ ...prev, open: false }));
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className=" mt-4 mb-4 gap-5">
        <div className="w-12/12">
          <div className=" ">
            <InputComponent
              className="w-[50%]"
              label="Policy Tab Label"
              {...formik.getFieldProps("tabTitle")}
            />
          </div>
        </div>
        <div className="w-12/12">
          <div className="mt-4">
            <TextEditor
              value={formik.getFieldProps("shippingPolicy").value}
              label="Shipping Policy"
              onChange={(e: string) =>
                formik.setFieldValue("shippingPolicy", e)
              }
            />
          </div>
        </div>
        <div className="w-12/12">
          <div className="mt-4">
            <TextEditor
              value={formik.getFieldProps("refundPolicy").value}
              label="Refund Policy"
              onChange={(e: string) => formik.setFieldValue("refundPolicy", e)}
            />
          </div>
        </div>
        <div className="w-12/12">
          <div className="mt-4">
            <TextEditor
              value={formik.getFieldProps("returnPolicy").value}
              label="Cancellation/Return/Exchange Policy"
              onChange={(e: string) => formik.setFieldValue("returnPolicy", e)}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 text-end">
        <button
          type="submit"
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
