import InputComponent from "@/components/common/inputField/page";
import React, { useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { AuthApi } from "@fizno/api-client/src/apis/AuthApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Alert, Snackbar } from "@mui/material";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { setUser } from "@/redux/slices/globaCache.slice";
import SVG from "@/public/svg";

function ThirdStep({
  handlePrevious,
  currentStep,
  type,
}: {
  handlePrevious: () => void;
  currentStep?: number;
  type?: string;
}) {
  /**
   * redux
   */

  const dispatch = useAppDispatch();
  const { user, secondStep } = useAppSelector((state) => state.globalCache);

  /**
   * router
   */

  const router = useRouter();

  /**
   * state management
   */

  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "error";
    open: boolean;
  }>({ message: "", severity: "success", open: false });

  /**
   * formik
   */
  const formik = useFormik<any>({
    initialValues: {
      bankAccountNumber: "",
      confirmBankAccountNumber: "",
      bankName: "",
      ifscCode: "",
    },
    validationSchema: Yup.object({
      bankAccountNumber: Yup.string()
        .matches(/^\d+$/, "Account number must be digits.")
        .required("This field is required"),
      confirmBankAccountNumber: Yup.string().when(
        "bankAccountNumber",
        (bankAccountNumber, field) =>
          bankAccountNumber
            ? field.required().oneOf([Yup.ref("bankAccountNumber")])
            : field,
      ),
      bankName: Yup.string().required("Required"),
      ifscCode: Yup.string().required("Required"),
    }),
    onSubmit: async (values: any, { setSubmitting }: FormikHelpers<any>) => {
      const data = JSON.parse(JSON.stringify(secondStep));
      data.payment = values;
      if (type === "newSeller") {
        const response: any = await AuthApi.switchToSeller({
          ...data,
        });
        if (response.remote === "success") {
          setSnackbar({
            message: "create user successful!",
            severity: "success",
            open: true,
          });

          dispatch(setUser({ ...user, role: "seller" }));

          router.replace("/seller/dashboard");
        } else {
          setSnackbar({
            message: response.error.errors.message || "An error occurred!",
            severity: "error",
            open: true,
          });
        }
      } else {
        const response: any = await AuthApi.nextStep({
          ...data,
          id: user.user.id,
        });
        if (response.remote === "success") {
          setSnackbar({
            message: "Seller account created successfully!",
            severity: "success",
            open: true,
          });
          Cookies.set("accessToken", response.data.accessToken);
          Cookies.set("refreshToken", response.data.refreshToken);
          Cookies.set("userRole", response.data?.user?.role);
          if (typeof window !== "undefined") {
            window.localStorage.setItem(
              "access-token",
              response.data.data.accessToken,
            );
            window.localStorage.setItem(
              "refreshToken",
              response.data.data.refreshToken,
            );
          }
          dispatch(setUser(response.data.data));
          router.replace("/seller/dashboard");
        } else {
          setSnackbar({
            message: response.error.errors.message || "An error occurred!",
            severity: "error",
            open: true,
          });
        }
      }

      setSubmitting(false);
    },
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev: any) => ({ ...prev, open: false }));
  };

  return (
    <>
      <div className="px-8">
        <div className="text-center">
          <h2 className="text-center heading_section_text font-bold">
            Setup your Billing details
          </h2>
          <span className="text-[#525252] font-normal normal-case text-base">
            Verify payout information add CC for refunds and back payments
          </span>
        </div>
        <div className="py-7 mt-3 mb-2 px-8">
          <SVG.bankDetail />
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="px-8 grid grid-cols-2 gap-6 mt-5 mb-8">
            {/* Content */}
            <div className="w-12/12">
              {" "}
              <InputComponent
                className="capitalize font-medium text-[#000!important]"
                label="Bank Account Number"
                placeholder="**********"
                mandatory={false}
                {...formik.getFieldProps("bankAccountNumber")}
              />
              {formik.touched.bankAccountNumber &&
              formik.errors.bankAccountNumber ? (
                <div className="text-red-600 text-sm">Required</div>
              ) : null}
            </div>
            <div className="w-12/12">
              <InputComponent
                className="capitalize font-medium text-[#000!important]"
                label="Confirm Bank Account Number"
                placeholder="************"
                mandatory={false}
                {...formik.getFieldProps("confirmBankAccountNumber")}
              />
              {formik.touched.confirmBankAccountNumber &&
              formik.errors.confirmBankAccountNumber ? (
                <div className="text-red-600 text-sm">
                  Bank account number not matched
                </div>
              ) : null}
            </div>
            <div className="w-12/12">
              <div className="">
                <InputComponent
                  className="capitalize font-medium text-[#000!important]"
                  label="Bank Name"
                  placeholder="Write here"
                  mandatory={false}
                  {...formik.getFieldProps("bankName")}
                />
                {formik.touched.bankName && formik.errors.bankName ? (
                  <div className="text-red-600 text-sm">Required</div>
                ) : null}
              </div>
            </div>

            <div className="w-12/12">
              <div className="">
                <InputComponent
                  className="capitalize font-medium text-[#000!important]"
                  label="Routing Number"
                  placeholder="Write here"
                  mandatory={false}
                  {...formik.getFieldProps("ifscCode")}
                />
                {formik.touched.ifscCode && formik.errors.ifscCode ? (
                  <div className="text-red-600 text-sm">Required</div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full stepper_next_btn mt-4 gap-5">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-4 py-2 w-[250px] bg-gray-300 text-black rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              // onClick={formik.handleSubmit}
              disabled={formik.isSubmitting}
              type="submit"
              className="px-4 py-2 w-[250px] bg-primaryMain text-white rounded disabled:opacity-50"
            >
              {"Register"}
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
export default ThirdStep;
