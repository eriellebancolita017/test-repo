/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ProductAccordian from "./productAccordian";
// import AccordianForm from "./accordianForm";
import AddAttributeForm from "./addAttributeForm";
import { useAppDispatch } from "@/redux/hooks";
import { setAttributes } from "@/redux/slices/product.slice";
export default function Attributes({
  data,
  handleSelect,
  attributes,
}: {
  data: any;
  handleSelect: (e: any) => void;
  attributes: any;
}) {
  // const { attributes } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const handleChange = (att: any) => {
    // console.log({ att });
    const attr = { ...attributes };
    attr[att.name] = att;
    dispatch(setAttributes(attr));
    handleSelect(attr);
  };

  return (
    <div>
      <h5 className="text-lg mb-4 mt-4 text-slate-800 font-semibold">
        Attributes
      </h5>
      {data.map((item: any, index: number) => {
        return (
          <ProductAccordian
            key={index}
            title={item.attribute_label}
            name={item.attribute_name}
            onSelect={handleChange}
            attributes={attributes}
            id={item.attribute_id}
            options={item.details.map((value: any) => {
              return { label: value.term.name, value: value.term_id };
            })}
          ></ProductAccordian>
        );
      })}

      <div className="add_attributes">
        <AddAttributeForm />
      </div>
    </div>
  );
}
