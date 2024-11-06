import React from "react";
import ProductAccordian from "./productAccordian";
import AccordianForm from "./accordianForm";
import AddAttributeForm from "./addAttributeForm";

export default function Attributes() {
  const colorArray = [
    { label: "red", value: "Red" },
    { label: "green", value: "Green" },
    { label: "red", value: "Red" },
    { label: "orange", value: "Orange" },
    { label: "black", value: "Black" },
    { label: "blue", value: "Blue" },
    { label: "red", value: "Red" },
    { label: "green", value: "Green" },
    { label: "red", value: "Red" },
    { label: "green", value: "Green" },
  ];
  return (
    <div>
      <h5 className="text-lg mb-4 mt-4 text-slate-800 font-semibold">
        Attributes
      </h5>
      <ProductAccordian title="Color">
        <AccordianForm title="Color" options={colorArray} />
      </ProductAccordian>
      <ProductAccordian title="Compatible Make">
        <AccordianForm title="Compatible Make" options={colorArray} />
      </ProductAccordian>
      <ProductAccordian title="Condition">
        <AccordianForm title="Condition" options={colorArray} />
      </ProductAccordian>{" "}
      <ProductAccordian title="Fits">
        <AccordianForm title="Fits" options={colorArray} />
      </ProductAccordian>{" "}
      <ProductAccordian title="Manufacturer Part Number">
        <AccordianForm title="Manufacturer Part Number" options={colorArray} />
      </ProductAccordian>{" "}
      <ProductAccordian title="Material">
        <AccordianForm title="Material" options={colorArray} />
      </ProductAccordian>{" "}
      <ProductAccordian title="Modified Item">
        <AccordianForm title="Modified Item" options={colorArray} />
      </ProductAccordian>{" "}
      <ProductAccordian title="MSRP was">
        <AccordianForm title="MSRP was" options={colorArray} />
      </ProductAccordian>{" "}
      <ProductAccordian title="Part Brand">
        <AccordianForm title="Part Brand" options={colorArray} />
      </ProductAccordian>{" "}
      <ProductAccordian title="Placement on Vehicle">
        <AccordianForm title="Placement on Vehicle" options={colorArray} />
      </ProductAccordian>{" "}
      <ProductAccordian title="Quantity">
        <AccordianForm title="Quantity" options={colorArray} />
      </ProductAccordian>{" "}
      <ProductAccordian title="Size">
        <AccordianForm title="Size" options={colorArray} />
      </ProductAccordian>{" "}
      <ProductAccordian title="SKU">
        <AccordianForm title="SKU" options={colorArray} />
      </ProductAccordian>{" "}
      <ProductAccordian title="Style ">
        <AccordianForm title="Style" options={colorArray} />
      </ProductAccordian>{" "}
      <ProductAccordian title="Warranty">
        <AccordianForm title="Warranty" options={colorArray} />
      </ProductAccordian>
      <div className="add_attributes">
        <AddAttributeForm />
      </div>
    </div>
  );
}
