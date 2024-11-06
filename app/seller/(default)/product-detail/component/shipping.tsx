/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const Shipping = ({ product }: { product: any }) => {
  const getMetaValue = (key: string) => {
    const meta = product?.wp_nepaz2_users?.wp_nepaz2_usermeta.find(
      (item: any) => item.meta_key === key,
    )?.meta_value;
    return meta;
  };

  return (
    <>
      <h6 className="text-gray-500 font-semibold normal-case mt-6">
        Shipping Policy
      </h6>
      <hr className="mt-4" />
      <h4 className="text-blue-700 font-bold mt-6 normal-case text-xl">
        <p
          dangerouslySetInnerHTML={{
            __html: getMetaValue("dokan_profile_settings")
              ?.wcfm_shipping_policy,
          }}
        />
      </h4>
      <hr className="mt-6" />

      <h6 className="text-gray-500 font-semibold normal-case mt-10">
        Refund Policy
      </h6>
      <hr className="mt-4" />
      <h4 className="text-blue-700 font-bold mt-6 normal-case text-xl">
        <p
          dangerouslySetInnerHTML={{
            __html: getMetaValue("dokan_profile_settings")?.wcfm_refund_policy,
          }}
        />
      </h4>
      <hr className="mt-6" />
    </>
  );
};

export default Shipping;
