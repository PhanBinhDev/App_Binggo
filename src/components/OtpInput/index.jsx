import React, { useState, useRef, useEffect } from "react";

const OtpInput = ({
  numDigits = 6,
  setOtpValue,
  isMatched = false,
  message,
  success,
}) => {
  const [otp, setOtp] = useState("");
  const inputRefs = Array(numDigits)
    .fill()
    .map(() => useRef());
  const handleInputChange = (index, event) => {
    const value = event.target.value;
    const numericValue = value.replace(/\D/, ""); // remove all character not number
    setOtp((prev) => {
      const updatedOtp = [...prev];
      updatedOtp[index] = numericValue;
      setOtpValue(updatedOtp.join(""));
      return updatedOtp;
    });
    if (value !== "") {
      if (index < numDigits - 1 && otp[index + 1] === "") {
        inputRefs[index + 1].current.focus();
      }
    }
  };
  const handleInputKeyDown = (index, event) => {
    if (event.key === "Backspace" && index !== 0 && otp[index] === "") {
      inputRefs[index - 1].current.focus();
    }
  };
  useEffect(() => {
    if (success) {
      setOtp(Array(numDigits).fill(""));
    }
  }, [success]);
  return (
    <div className="flex flex-col">
      <div className="flex space-x-2">
        {Array(numDigits)
          .fill()
          .map((_, index) => (
            <div className="w-12 h-12 " key={index}>
              <input
                autoFocus={index === 0}
                maxLength={1}
                value={otp[index] || ""}
                onChange={(event) => handleInputChange(index, event)}
                onKeyDown={(event) => handleInputKeyDown(index, event)}
                ref={inputRefs[index]}
                type="text"
                className={`w-full h-full flex flex-col items-center justify-center text-center px-4 outline-none rounded-xl border ${
                  isMatched
                    ? "border-gray-200 bg-slate-100 focus:bg-gray-50 focus:ring-1 ring-blue-700"
                    : "border-red-500 bg-rose-100 focus:bg-red-50 text-rose-500"
                } text-lg  `}
              />
            </div>
          ))}
      </div>
      {!isMatched && (
        <p className="text-rose-500 text-sm py-2 font-medium">{message}</p>
      )}
    </div>
  );
};

export default OtpInput;
