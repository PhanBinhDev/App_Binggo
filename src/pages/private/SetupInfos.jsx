import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  Divider,
  Image,
  Skeleton,
} from "@nextui-org/react";
import {
  ArrowRight,
  Check,
  CheckCircle,
  GearSix,
  User,
  UserGear,
  MessengerLogo,
  Upload,
} from "@phosphor-icons/react";
import logo from "../../assets/images/logo.ico";
import { ModalTypes } from "../../constants";
import { useModal } from "../../hooks/useModal";
import { useDispatch, useSelector } from "react-redux";
import { handleGetGalleryApi } from "../../apis/gallery";
import { toast } from "react-toast";
import { handleGetCurrentUserApi } from "../../apis/auth";
const tabCase = {
  avatar: "avatar",
  accounts: "accounts",
  settings: "settings",
};
const menuTabs = [
  {
    index: 1,
    icon: <User size={20} weight="fill" className="text-slate-600" />,
    completedIcon: (
      <CheckCircle size={20} weight="fill" className="text-blue-600" />
    ),
    label: "1. Account Info",
    completed: true,
    activated: true,
    divider: true,
    get textStatus() {
      return this.completed ? "Completed" : this.activated ? "Current" : "";
    },
    nextStep: false,
  },
  {
    index: 2,
    icon: <GearSix size={20} weight="fill" className="text-slate-600" />,
    completedIcon: (
      <CheckCircle size={20} weight="fill" className="text-blue-600" />
    ),
    label: "2. Preference",
    completed: false,
    divider: true,
    activated: false,
    get textStatus() {
      return this.completed ? "Completed" : this.activated ? "Current" : "";
    },
  },
  {
    index: 3,
    icon: <MessengerLogo size={20} weight="fill" className="text-slate-600" />,
    completedIcon: (
      <CheckCircle size={20} weight="fill" className="text-blue-600" />
    ),
    label: "3. Finish",
    completed: false,
    activated: false,
    divider: false,
    get textStatus() {
      return this.completed ? "Completed" : this.activated ? "Current" : "";
    },
  },
];

const SetupInfoPage = () => {
  const [tabContent, setTabContent] = useState(tabCase.avatar);
  const { userInfo } = useSelector((state) => state.auth);
  const [stepSetup, setStepSetup] = useState(1);
  const [tabSetup, setTabSetup] = useState(menuTabs);
  const { email } = userInfo;
  const { onOpen, isOpen } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const isDisabled = tabSetup.find((item) => item.activated).index === 1;
  const tabActivated = tabSetup.find((item) => item.activated);
  const handleForwardStep = () => {
    const tabCurrent = tabSetup.find((item) => item.activated);
    const updateStep = [...tabSetup];
    if (tabCurrent.index > 1) {
      // được back

      updateStep.forEach((step) => {
        step.activated = step.index === tabCurrent.index - 1 ? true : false;
        step.completed = step.index >= tabCurrent.index - 1 ? false : true;
      });
      setTabSetup(updateStep);
    }
  };
  const handleNextStep = () => {
    const updateStep = [...tabSetup];
    const tabCurrent = tabSetup.find((item) => item.activated);
    if (tabCurrent.index < tabSetup.length) {
      if (tabCurrent.completed) {
        updateStep.forEach((item) => {
          item.activated = item.index === tabCurrent.index + 1 ? true : false;
        });
        setTabSetup(updateStep);
      } else {
        toast.warn("Bạn cần hoàn thành các bước trước đó");
      }
    } else {
      console.log("finish");
    }
  };

  const handleChangeTabStep = (index) => {
    const prevTabClick = tabSetup.find((item) => item.index === index - 1);
    const tabCurrent = tabSetup.find((item) => item.activated);

    const updateStep = [...tabSetup];
    if (tabCurrent.index > index) {
      // case click back lại
      if (tabCurrent.index > 1) {
        updateStep.forEach((step) => {
          step.activated = step.index === index ? true : false;
          step.completed = step.index >= index ? false : true;
        });
        setTabSetup(updateStep);
      }
    } else if (tabCurrent.index < index) {
      // click next
      if (tabCurrent.index < tabSetup.length) {
        if (prevTabClick.completed) {
          updateStep.forEach((item) => {
            item.activated = item.index === index ? true : false;
          });
          setTabSetup(updateStep);
        } else {
          toast.warn("Bạn cần hoàn thành các bước trước đó");
        }
      }
    }
  };
  const handleSave = () => {
    setIsLoading(true);
    if (!tabSetup.find((item) => item.activated).completed) {
      setTabSetup((prev) => {
        const newUpdateTab = prev.map((item) => {
          if (item.index === tabSetup.find((item) => item.activated).index) {
            item.completed = true;
          }
          return item;
        });
        console.log("new", newUpdateTab);
        return [...prev];
      });
    }
    setTimeout(() => {
      toast.success("Save info successfully!");
      setIsLoading(false);
    }, 2000);
  };
  const fetchCurrentUser = async () => {
    try {
      const res = await handleGetCurrentUserApi();
      console.log(res);
    } catch (error) {}
  };
  useEffect(() => {
    // fetchCurrentUser();
  }, []);
  const handleResetData = () => {};
  const renderContentTab = () => {
    switch (tabActivated.index) {
      case 1:
        return (
          <div className="w-full h-full flex gap-4">
            <div className="w-1/3 shadow-sm bg-teal-100 rounded-md flex flex-col">
              <div className="h-24 flex items-center justify-center p-2">
                <div className="size-[72px] rounded-full border-solid border-3 border-blue-400">
                  <Image
                    radius="full"
                    src="https://res.cloudinary.com/delkz1vi9/image/upload/v1711612331/Binggo/tjtzgqhtyzfuvsx4vxoc.avif"
                  />
                </div>
              </div>
              <div className="w-[calc(100%-32px)] mx-auto">
                <Button
                  fullWidth
                  startContent={<Upload weight="bold" />}
                  className="rounded-md font-bold"
                  color="primary">
                  Upload
                </Button>
              </div>
              <div className="flex-1 p-2 pt-2 flex flex-col gap-2">
                <div className="text-md font-bold h-8 flex items-center px-3 ">
                  Suggestion Avatar:
                </div>
                <div className="flex-1 px-2 pb-10">
                  <div className="w-full h-full  grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-rows-2 gap-2 justify-center">
                    <div className="size-20 rounded-lg bg-blue-200 cursor-pointer"></div>
                    <div className="size-20 rounded-lg bg-blue-200 cursor-pointer"></div>
                    <div className="size-20 rounded-lg bg-blue-200 cursor-pointer"></div>
                    <div className="size-20 rounded-lg bg-blue-200 cursor-pointer"></div>
                    <div className="size-20 rounded-lg bg-blue-200 cursor-pointer"></div>
                    <div className="size-20 rounded-lg bg-blue-200 cursor-pointer"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 rounded-md bg-[#f1f2fcf3] flex flex-col">
              <div className="flex-1 p-3 flex flex-col">
                <div className="h-10 flex items-center justify-start px-1 border-b-1 border-solid border-slate-400 font-bold ">
                  Personal Info
                </div>
                <div className="flex-1 p-2">
                  <form className="max-w-sm">
                    <div className="mb-5">
                      <label
                        for="name"
                        className="block mb-2 text-sm font-medium text-gray-900 ">
                        Your name
                      </label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Enter your display name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        for="email"
                        className="block mb-2 text-sm font-medium text-gray-900 ">
                        Your email
                      </label>
                      <input
                        type="email"
                        disabled
                        id="email"
                        value={email.value}
                        className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        for="password"
                        className="block mb-2 text-sm font-medium text-gray-900">
                        Your password
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                        required
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className="h-12 w-full mt-auto gap-2 flex justify-end px-3">
                <Button
                  onPress={handleResetData}
                  isDisabled={isLoading}
                  variant="flat"
                  color="default"
                  className="rounded-md">
                  Reset
                </Button>
                <Button
                  isLoading={isLoading}
                  onPress={handleSave}
                  color="secondary"
                  className="rounded-md">
                  Save
                </Button>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="w-full h-full flex">
            <div className="w-1/3 shadow-sm bg-teal-100 rounded-md"></div>;
          </div>
        );
      case 3:
        return <></>;
      default:
        return <>Loading...</>;
    }
  };

  return (
    <div className="w-full h-screen flex flex-col gap-4 items-center bg-[#eef1fb] p-6">
      <div className="w-full h-[134px] rounded-md bg-white flex flex-col">
        <div className="flex justify-between items-center border-solid border-b-1 border-slate-200  p-[12px_20px]">
          <h2 className="font-bold text-lg">Create your consultant profile</h2>
          <Button
            onPress={() => onOpen(ModalTypes.signOut)}
            variant="solid"
            color="danger"
            size="sm"
            radius="sm"
            className="min-w-20 rounded-md">
            Log out
          </Button>
        </div>
        <div className="flex-1 p-3 flex items-center gap-3">
          {tabSetup.map((tabStep) => {
            const hasDivider = tabStep.divider;
            return (
              <React.Fragment key={tabStep.index}>
                <div
                  onClick={() => handleChangeTabStep(tabStep.index)}
                  className={`${
                    tabStep.activated
                      ? "bg-slate-200 hover:bg-slate-100 cursor-pointer"
                      : !tabStep.completed
                      ? "opacity-80 "
                      : "cursor-pointer bg-slate-100 hover:bg-slate-50"
                  } w-1/3 rounded-md  h-full  transition-background  flex py-1 px-2 flex-col`}>
                  <h6
                    className={`${
                      tabStep.completed ? "text-green-600" : "text-zinc-600"
                    }  font-bold text-xs min-h-4`}>
                    {tabStep.textStatus}
                  </h6>
                  <div className="flex-1 flex items-center  justify-between text-sm text-gray-900 font-extrabold">
                    <div className="flex gap-1 select-none">
                      {tabStep.icon}
                      <span>{tabStep.label}</span>
                    </div>
                    {tabStep.completed && (
                      <CheckCircle
                        size={20}
                        weight="fill"
                        className="text-blue-600"
                      />
                    )}
                  </div>
                </div>
                {hasDivider && <Divider orientation="vertical" />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <div className="w-full flex-1 rounded-md bg-white flex flex-col">
        <div className="h-[calc(100%-65px)] p-4">{renderContentTab()}</div>
        <div className=" mt-auto flex items-center justify-between px-5 py-3 border-t-1 border-solid border-slate-200">
          <Button
            className="rounded-md min-w-24"
            onPress={handleForwardStep}
            isDisabled={tabActivated.index === 1}>
            Back
          </Button>
          <div
            onClick={() => {
              if (tabSetup.find((item) => item.activated).completed) {
                return;
              }
              setTabSetup((prev) => {
                const newUpdateTab = prev.map((item) => {
                  if (
                    item.index === tabSetup.find((item) => item.activated).index
                  ) {
                    item.completed = true;
                  }
                  return item;
                });
                console.log("new", newUpdateTab);
                return [...prev];
              });
            }}
            className="text-gray-800 font-semibold">
            ok
          </div>
          <Button
            className="rounded-md min-w-24"
            color="primary"
            isDisabled={!tabActivated.completed}
            onPress={handleNextStep}>
            {tabActivated.index === tabSetup.length ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SetupInfoPage;
