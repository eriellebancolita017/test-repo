/* eslint-disable @typescript-eslint/no-explicit-any */
import InputComponent from "@/components/common/inputField/page";
import TooltipCustom from "@/components/common/tooltip/tooltip";
import { useAppSelector } from "@/redux/hooks";
import { UserApi } from "@fizno/api-client/src/apis/UserApi";
import { Alert, Snackbar } from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import React, { useEffect, useState } from "react";
interface UserValues {
  seoTitle?: string;
  metaKeywords?: string;
  metaDescription?: string;
  twitterUrl?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
}
export default function SEO() {
  const { user } = useAppSelector((state) => state.globalCache);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "error";
    open: boolean;
  }>({ message: "", severity: "success", open: false });
  const formik = useFormik<UserValues>({
    initialValues: {
      seoTitle: "",
      metaKeywords: "",
      metaDescription: "",
      twitterUrl: "",
      facebookUrl: "",
      linkedinUrl: "",
      youtubeUrl: "",
    },
    onSubmit: async (
      values: UserValues,
      { setSubmitting }: FormikHelpers<UserValues>,
    ) => {
      const response = await UserApi.updateSeoSetting(values);
      if (response.remote === "success") {
        setSnackbar({
          message: "update seo setting successful!",
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
    if (user) {
      if (getMetaValue("dokan_profile_settings")?.store_seo) {
        formik.setValues({
          seoTitle: getMetaValue("dokan_profile_settings")?.store_seo[
            "dokan-seo-meta-title"
          ],
          metaKeywords: getMetaValue("dokan_profile_settings")?.store_seo[
            "dokan-seo-meta-desc"
          ],
          metaDescription: getMetaValue("dokan_profile_settings")?.store_seo[
            "dokan-seo-meta-keywords"
          ],
          twitterUrl: getMetaValue("dokan_profile_settings")?.social.twitter,
          facebookUrl: getMetaValue("dokan_profile_settings")?.social.fb,
          linkedinUrl: getMetaValue("dokan_profile_settings")?.social.linkedin,
          youtubeUrl: getMetaValue("dokan_profile_settings")?.social.youtube,
        });
      }
    }
  }, [user]);

  const handleCloseSnackbar = () => {
    setSnackbar((prev: any) => ({ ...prev, open: false }));
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex mt-4 mb-4 gap-5">
        <div className="w-6/12">
          <div className="mt-4 ">
            <InputComponent
              label="SEO Title"
              showTooltip={true}
              {...formik.getFieldProps("seoTitle")}
              tooltipMessage="SEO Title is shown as the title of your store page"
            />
          </div>
          <div className="mt-4 ">
            <InputComponent
              label="Meta Description"
              showTooltip={true}
              {...formik.getFieldProps("metaDescription")}
              tooltipMessage="The meta description is often shown as the black text under the title in a search result. For this to work it has to contain the keyword that was searched for and should be less than 156 chars."
            />
          </div>
        </div>
        <div className="w-6/12">
          {" "}
          <div className=" mt-4 mb-4 gap-5">
            <div className="w-12/12">
              <div className="mt-4">
                <label className="flex text-zinc-600 text-sm font-bold mb-1">
                  Meta Keywords
                  <TooltipCustom bg="light" className="ms-2 ">
                    <div className="text-[10px] font-normal text-slate-900 min-w-52 ">
                      Insert some comma separated keywords for better ranking of
                      your store page
                    </div>
                  </TooltipCustom>
                </label>
                <textarea
                  className="min-h-16 rounded-sm border border-slate-200 w-full dark:bg-[rgb(18,18,18)] dark:border-slate-700"
                  rows={4}
                  {...formik.getFieldProps("metaKeywords")}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="dark:border-slate-700" />
      <div className="flex mt-4 mb-4 gap-5">
        {/* <div className="w-6/12">
          <div className="mt-4 ">
            {" "}
            <label className="block text-zinc-600 text-sm font-bold mb-1">
              Facebook Image
            </label>
            <FileUploadComponent type="add" />
          </div>
        </div> */}
        <div className="w-6/12">
          <div className="mt-4 ">
            <InputComponent
              label="Twitter Url"
              {...formik.getFieldProps("twitterUrl")}
            />
          </div>
          <div className=" mt-4 mb-4 gap-5">
            <div className="w-12/12">
              {/* <div className="mt-4">
                <label className="block text-zinc-600 text-sm font-bold mb-1">
                  Twitter Description
                </label>
                <textarea
                  className="min-h-16 rounded-sm border border-slate-200 w-full"
                  rows={4}
                ></textarea>
              </div> */}
            </div>
          </div>
        </div>
        <div className="w-6/12">
          <div className="mt-4 ">
            <InputComponent
              label="Facebook Url"
              {...formik.getFieldProps("facebookUrl")}
            />
          </div>
          <div className=" mt-4 mb-4 gap-5">
            <div className="w-12/12">
              {/* <div className="mt-4">
                <label className="block text-zinc-600 text-sm font-bold mb-1">
                  Facebook Description
                </label>
                <textarea
                  className="min-h-16 rounded-sm border border-slate-200 w-full"
                  rows={4}
                ></textarea>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <hr className="dark:border-slate-700" />
      <div className="flex mt-4 mb-4 gap-5">
        {/* <div className="w-6/12">
          <div className="mt-4 ">
            <label className="block text-zinc-600 text-sm font-bold mb-1">
              Twitter Image
            </label>
            <FileUploadComponent type="add" />
          </div>
        </div> */}
        <div className="w-6/12">
          <div className="mt-4 ">
            <InputComponent
              label="Linkedin Url"
              {...formik.getFieldProps("linkedinUrl")}
            />
          </div>
          <div className=" mt-4 mb-4 gap-5">
            <div className="w-12/12">
              {/* <div className="mt-4">
                <label className="block text-zinc-600 text-sm font-bold mb-1">
                  Linkedin Description
                </label>
                <textarea
                  className="min-h-16 rounded-sm border border-slate-200 w-full"
                  rows={4}
                ></textarea>
              </div> */}
            </div>
          </div>
        </div>
        <div className="w-6/12">
          <div className="mt-4 ">
            <InputComponent
              label="Youtube Url"
              {...formik.getFieldProps("youtubeUrl")}
            />
          </div>
          <div className=" mt-4 mb-4 gap-5">
            <div className="w-12/12">
              {/* <div className="mt-4">
                <label className="block text-zinc-600 text-sm font-bold mb-1">
                  Youtube Description
                </label>
                <textarea
                  className="min-h-16 rounded-sm border border-slate-200 w-full"
                  rows={4}
                ></textarea>
              </div> */}
            </div>
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
