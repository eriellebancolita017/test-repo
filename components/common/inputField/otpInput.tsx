import React, { useState } from "react";
import OtpInput from "react-otp-input";

export default function OtpInputComponent() {
  const [otp, setOtp] = useState("");

  return (
    <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={5}
      renderSeparator={<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>}
      renderInput={(props) => (
        <input
          {...props}
          className="border border-slate-400 w-[50px!important] h-[50px] rounded-md"
        />
      )}
    />
  );
}
