/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

const Specification = ({ attributes }: { product?: any; attributes?: any }) => {
  const [attr, setAttr] = useState<any>([]);
  useEffect(() => {
    const attributesTaxnonomy: any[] = [];
    const groupedData = attributes.reduce((acc: any, item: any) => {
      const { taxonomy } = item;
      if (!acc[taxonomy]) {
        acc[taxonomy] = [];
      }
      acc[taxonomy].push(item);
      return acc;
    }, {});
    if (groupedData) {
      Object.keys(groupedData).forEach((key) => {
        const attribute = groupedData[key];
        if (attribute) {
          attributesTaxnonomy.push({ name: key, attribute: attribute });
        }
      });
    }
    setAttr(attributesTaxnonomy);
  }, [attributes]);

  return (
    <>
      <table className="border w-full my-10">
        <tbody>
          {attr.map((spec: any, index: any) => {
            return (
              <tr key={index}>
                <td className="bg-slate-100 p-4 w-52 text-slate-800 normal-case border-r border-b font-medium">
                  {spec.name.split("_")[1]}
                </td>
                <td className="p-4 normal-case border-b">
                  {spec.attribute?.map((value: any) => {
                    return `${value.terms.name}, `;
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Specification;
