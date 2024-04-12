import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { icons } from "../../utils/icons";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/validator";
import { handleAuthenticateApi, handleVerifyApi } from "../../apis/auth";
import { toast } from "react-toast";
const { FaGoogle, FaFacebook, HiShieldCheck } = icons;
import usePersistedState from "../../hooks/usePersistedState";
import { formatHideEmail, getInfoDevice } from "../../utils";
import OtpInput from "../../components/OtpInput";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slice/authSlice";
import { sleep } from "../../utils";
import { DeviceUUID } from "device-uuid";
import { TypeUsers } from "../../constants";
const Authenticate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [verifyStatus, setVerifyStatus] = useState({
    message: "",
    isMatched: true,
  });
  const [otpValue, setOtpValue] = useState("");
  const [step, setStep] = usePersistedState("step", 0);
  const [timeOut, setTime] = usePersistedState("timeOut", 0);
  const [email, setEmail] = usePersistedState("verifyInfo", {
    value: "",
    error: false,
    message: "",
  });
  useEffect(() => {
    let intervalId;
    if (timeOut > 0) {
      intervalId = setInterval(() => {
        setTime((prevTimeOut) => prevTimeOut - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timeOut, setTime]);
  const verifyLocalStorage = localStorage.getItem("verifyInfo");
  let emailFormatted = "example@gmail.com";
  if (verifyLocalStorage) {
    emailFormatted = formatHideEmail(JSON.parse(verifyLocalStorage)?.value);
  }
  const handleLoginByEmail = async () => {
    setIsLoading(true);
    setEmail((prev) => {
      return {
        ...prev,
        error: false,
        message: "",
      };
    });

    if (!email?.value) {
      setEmail((prev) => {
        return {
          ...prev,
          error: true,
          message: "Email is require",
        };
      });
    } else {
      const message = validateEmail(email?.value);
      if (message && message.length > 0) {
        setEmail((prev) => {
          return {
            ...prev,
            error: true,
            message,
          };
        });
      }
    }
    try {
      const data = {
        email: email?.value,
      };
      const response = await handleAuthenticateApi(data);
      if (response.errCode === 0) {
        toast.success(response.message);
        setStep(2);
        setIsLoading(false);
        return 1;
      } else {
        toast.error(response.message);
        setIsLoading(false);
        return 0;
      }
    } catch (error) {
      setIsLoading(false);
    }

    // console.log(navigator);
  };
  const handleVerifyOTP = async () => {
    const uuid = new DeviceUUID().get();
    const device = getInfoDevice();
    device.uuid = uuid;
    try {
      setIsLoading(true);
      setVerifyStatus({
        message: "",
        isMatched: true,
        success: false,
      });
      if (otpValue.length < 6) {
        setVerifyStatus({
          message: "This OTP cannot be filled",
          isMatched: false,
          success: false,
        });
        setIsLoading(false);
      } else {
        const data = {
          device,
          email: email?.value,
          code: otpValue,
        };
        const response = await handleVerifyApi(data);
        if (response.errCode === 0) {
          await sleep(1000);
          toast.success(response.message);
          setEmail((prev) => {
            return {
              ...prev,
              value: "",
            };
          });
          const userData = {
            userInfo: response.userData,
            accessToken: response.accessToken,
            type: response.userData.isActive
              ? TypeUsers.OLD_USER
              : TypeUsers.NEW_USER,
            isSignedIn: true,
          };
          setTimeout(() => {
            dispatch(setUser(userData));
            setIsLoading(false);
          }, 1000);
        } else {
          setVerifyStatus({
            message: response.message,
            isMatched: false,
            success: false,
          });
          toast.error(response.message);
        }
        setIsLoading(false);
        localStorage.removeItem("verifyInfo");
        localStorage.removeItem("step");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong with system! Please try later");
      setIsLoading(false);
    }
  };
  const handleResend = async () => {
    if (timeOut <= 0 || timeOut === "undefined") {
      localStorage.removeItem("timeOut");
      const response = await handleLoginByEmail();
      if (response) {
        setTime(60);
      }
    }
  };
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center mb-3">
              Welcome to Binggo App
            </h1>
            <Button
              onClick={() => setStep(1)}
              color="primary"
              className="font-medium w-full"
              radius="sm"
              size="lg">
              Continue with email
            </Button>
            <div className="flex mt-4 w-full items-center">
              <div className="w-full h-[2px] bg-[#e5e7eb] flex-1"></div>
              <div className="px-[20px] text-[12px] text-gray-500">
                or continue with
              </div>
              <div className="w-full h-[2px] bg-[#e5e7eb] flex-1"></div>
            </div>
            <div className="flex w-full gap-2 mb-8">
              <Button
                startContent={<FaGoogle size={20} />}
                variant="flat"
                radius="sm"
                size="lg"
                className="bg-blue-100 w-1/2 text-blue-600 min-w-[155px] max-h-[44px]">
                <span className="font-medium text-[14px]">Google</span>
              </Button>
              <Button
                startContent={<FaFacebook size={23} />}
                variant="flat"
                radius="sm"
                size="lg"
                className="bg-blue-100 w-1/2 text-blue-600 min-w-[155px] max-h-[44px]">
                <span className="font-medium text-[14px]">Facebook</span>
              </Button>
            </div>
            <p className=" text-[12px] text-[#64748b] leading-[1rem] mt-6">
              By creating an account, you agree to our{" "}
              <Link to="" className="text-[#0f172a] hover:underline">
                Terms of services
              </Link>{" "}
              and{" "}
              <Link to="" className="text-[#0f172a] hover:underline">
                Privacy Policy
              </Link>
            </p>
          </>
        );
      case 1:
        // Step 2: Xác thực code
        return (
          <>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center mb-3">
              Welcome to Binggo App
            </h1>
            <div className="relative w-full">
              <input
                value={email?.value}
                onChange={(e) =>
                  setEmail((prev) => {
                    return {
                      ...prev,
                      value: e.target.value,
                    };
                  })
                }
                type="text"
                id="hs-validation-name-error-helper"
                disabled={isLoading}
                className={`${
                  isLoading ? "select-none cursor-not-allowed" : ""
                }  ${
                  email?.error &&
                  "border-red-500 focus:border-red-500 focus:ring-red-500 text-red-500 placeholder:text-red-500"
                } p-[12px_16px_12px_24px] block w-full border border-gray-400 rounded-lg text-sm  disabled:opacity-50 disabled:pointer-events-none focus-visible:border-blue-500 mt-3`}
                placeholder="Enter your email"></input>
            </div>
            {email?.error && (
              <p
                className="text-sm text-red-600 mt-2 w-full text-start"
                id="hs-validation-name-error-helper">
                {email?.message}
              </p>
            )}
            <Button
              isLoading={isLoading}
              onClick={handleLoginByEmail}
              color="primary"
              className="font-medium w-full mt-4"
              radius="sm"
              size="lg">
              Continue
            </Button>
            <Button
              isDisabled={isLoading}
              onClick={() => {
                localStorage.removeItem("verifyInfo");
                localStorage.removeItem("timeOut");
                setStep(0);
              }}
              className={`${
                isLoading
                  ? "pointer-events-none cursor-not-allowed opacity-70"
                  : ""
              } font-medium w-full bg-transparent hover:bg-[#d4d4d866] mt-2`}
              radius="sm"
              variant="flat"
              size="lg">
              Back
            </Button>
          </>
        );
      case 2:
        // Step 3: Xác định người dùng cũ hay mới
        return (
          <div className="flex items-center flex-col w-full">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400 my-3 ">
              <p>
                We have sent a code to your email{" "}
                {step === 2 && <>{emailFormatted}</>}
              </p>
            </div>

            <div className="w-full h-28 flex items-center justify-center">
              <div className="size-[80px] bg-blue-500 flex items-center justify-center rounded-full">
                <HiShieldCheck size={60} color="white" />
              </div>
            </div>
            <div className="w-full flex items-center justify-center mt-4">
              <OtpInput
                setOtpValue={setOtpValue}
                message={verifyStatus.message}
                isMatched={verifyStatus.isMatched}
                success={verifyStatus.success}
              />
            </div>
            <Button
              isLoading={isLoading}
              onClick={handleVerifyOTP}
              color="primary"
              className="font-medium w-full mt-4"
              radius="sm"
              size="lg">
              Verify
            </Button>
            <Button
              isDisabled={isLoading}
              onClick={() => setStep(1)}
              className={`${
                isLoading
                  ? "pointer-events-none cursor-not-allowed opacity-70"
                  : ""
              } font-medium w-full bg-transparent hover:bg-[#d4d4d866] mt-2`}
              radius="sm"
              variant="flat"
              size="lg">
              Change email
            </Button>
            <div className="select-none flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500 mt-2">
              <p>Didn't recieve code?</p>{" "}
              <span
                className="flex flex-row items-center text-blue-600 cursor-pointer"
                onClick={handleResend}>
                Resend {timeOut > 0 && `(${timeOut})`}
              </span>
            </div>
          </div>
        );

      default:
        setStep(0);
    }
  };
  return (
    <section className="bg-gray-200">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  ">
          <div className="p-[24px_24px_40px] w-full h-full flex items-center justify-center">
            <div
              className={`space-y-4 flex flex-col items-center ${
                step === 2 ? "w-full" : "w-[85%]"
              }`}>
              {renderStep()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Authenticate;
