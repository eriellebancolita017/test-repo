import React from "react";

interface ErrorTextI {
  children: React.ReactNode;
}

const ErrorText = ({ children }: ErrorTextI) => {
  return <div className="text-red-600 text-xs capitalize">{children}</div>;
};

export default ErrorText;
