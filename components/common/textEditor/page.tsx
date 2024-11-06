"use client";
import React from "react";
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic
import "react-quill/dist/quill.snow.css";

interface TextEditorProps {
  label: string;
  className?: string;
  onChange?: (e: string) => void;
  value?: string;
  mandatory?: boolean;
  placeholder?: string;
}

const ReactQuillWithNoSSR = dynamic(() => import("react-quill"), {
  ssr: false,
});

const TextEditor: React.FC<TextEditorProps> = ({
  label,
  className,
  onChange,
  value,
  mandatory,
  placeholder,
}) => {
  return (
    <div>
      <label
        className={`block text-zinc-600 text-sm font-bold mb-1 ${className}`}
        htmlFor={label}
      >
        {label} {mandatory ? <span className="text-red-500">*</span> : ""}
      </label>
      <ReactQuillWithNoSSR // Use the dynamic component
        className="border border-slate-200"
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};
export default TextEditor;
