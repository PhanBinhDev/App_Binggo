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
  CameraPlus,
  Check,
  GearSix,
  Info,
  Question,
  SignOut,
  Smiley,
  Upload,
  UserGear,
} from "@phosphor-icons/react";
import logo from "../../assets/images/logo.ico";
import { ModalTypes } from "../../constants";
import { useModal } from "../../hooks/useModal";
import { useDispatch, useSelector } from "react-redux";
import { handleGetGalleryApi } from "../../apis/gallery";

const tabCase = {
  avatar: "avatar",
  accounts: "accounts",
  settings: "settings",
};
const menuTab = [
  {
    icon: <Check size={18} />,
    activeIcon: <ArrowRight size={18} />,
    label: "1. Upload Avatar",
    tabActive: tabCase.avatar,
    success: false,
  },
  {
    icon: <Check size={18} />,
    activeIcon: <ArrowRight size={18} />,
    label: "2. Account Info",
    tabActive: tabCase.accounts,
    success: false,
  },
  {
    icon: <Check size={18} />,
    activeIcon: <ArrowRight size={18} />,
    label: "3. Settings App",
    tabActive: tabCase.settings,
    success: false,
  },
];
const SetupInfo = () => {
  // Set Avatar,
  // set name
  // view email,
  const [tabContent, setTabContent] = useState(tabCase.avatar);
  const { userInfo } = useSelector((state) => state.auth);
  const { email } = userInfo;
  const [fileURL, setFileURL] = useState("");
  const { onOpen, isOpen } = useModal();
  const [galleries, setGalleries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchGallery = async () => {
    try {
      setIsLoading(true);
      const response = await handleGetGalleryApi("profile");
      if (response.errCode === 0) {
        console.log(response);
        setGalleries(response.gallery);
        setFileURL(response.gallery[0].value);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGallery();
  }, []);
  const handleFileUploadChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileURL(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const renderTabContentSetUp = () => {
    switch (tabContent) {
      case tabCase.avatar:
        return (
          <div className="w-full h-full flex flex-col gap-2 items-center">
            <div className="w-full h-[90px] flex items-center justify-center">
              <div className="size-[80px]  rounded-full relative border-[4px] border-solid border-blue-300">
                <img
                  alt="avatar"
                  src={fileURL}
                  className="w-full h-full rounded-full object-contain"
                />
              </div>
            </div>
            <div className="h-[240px] w-[75%] mx-auto border border-solid border-blue-500 bg-sky-100 rounded-[12px] grid grid-cols-5 grid-rows-3 p-2 items-center gap-2">
              {galleries &&
                !isLoading &&
                galleries?.map((image) => {
                  return (
                    <div
                      className="p-2 w-full hover:bg-sky-200  flex items-center justify-center rounded-lg cursor-pointer hover:bg-opacity-85"
                      onClick={() => {
                        setFileURL(image.value);
                      }}>
                      <Avatar src={image.value} size="lg" />
                    </div>
                  );
                })}
              {!galleries &&
                // Hiển thị skeleton khi chưa có dữ liệu và đang trong quá trình loading
                Array.from({ length: 14 }).map((_, index) => {
                  return (
                    <div
                      className="p-2 w-full hover:bg-sky-200  flex items-center justify-center rounded-lg cursor-pointer hover:bg-opacity-85"
                      key={index}>
                      <Skeleton className="rounded-full">
                        <Avatar src="" size="lg" />
                      </Skeleton>
                    </div>
                  );
                })}
              <label
                htmlFor="upload"
                className="w-full flex items-center justify-center cursor-pointer hover:bg-opacity-85">
                <div className="size-[56px] flex items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-400">
                  <Upload size={30} color="white" />
                </div>
              </label>
            </div>
            <input
              type="file"
              id="upload"
              hidden
              name="upload-avatar"
              className=""
              accept="image/jpeg, image/png, image/gif"
              onChange={(e) => handleFileUploadChange(e)}
            />
          </div>
        );
      case tabCase.accounts:
        return (
          <div className="w-full h-full flex flex-col gap-2">
            <div className=""></div>
          </div>
        );
      case tabCase.settings:
        return (
          <div>
            What is Binggo? App Binggo is a FREE platform web messaging app used
            for instant messaging, sharing photos, videos, audio recordings and
            for group chats. The app, which is free to access, can be used to
            communicate with your friends with your phone contacts
          </div>
        );
      case tabCase.help:
        const defaultContent =
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
        return (
          <Accordion>
            <AccordionItem
              key="1"
              aria-label="Accordion 1"
              title="Key Admin Not Word">
              {defaultContent}
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="Accordion 2"
              title="Don't receive new message">
              {defaultContent}
            </AccordionItem>
            <AccordionItem key="3" aria-label="Accordion 3" title="Settings">
              {defaultContent}
            </AccordionItem>
          </Accordion>
        );
    }
  };
  const handleBack = () => {};
  const handleContinue = () => {};
  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-200">
      <div className="min-w-[85%] min-h-[90%] max-w-[85%]  rounded-[12px] bg-white shadow-custom p-[10px_30px_20px_30px] flex flex-col">
        <div className="w-full text-3xl font-bold flex items-center justify-center mt-3 ">
          <p className="p-[12px_16px] w-fit rounded-[10px]  mb-2">
            Hello, {email?.value}
          </p>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex w-full h-full flex-1 p-4 rounded-[6px] border border-zinc-300 border-solid">
            <div className="flex-1 flex gap-3">
              <div className="w-[30%] h-full border border-zinc-300 border-solid rounded-[6px]">
                <div className="select-none w-full text-2xl font-medium text-center p-3 flex items-center justify-center max-h-[64px]">
                  <div className="size-10">
                    <img src={logo} className="object-cover w-full h-full" />
                  </div>
                  <p>Binggo App</p>
                </div>
                <Divider />
                <div className="p-4 w-full h-[calc(100%-65px)] flex flex-col">
                  <div className="flex flex-col w-full gap-2">
                    {menuTab.map((tab) => {
                      return (
                        <Button
                          variant="flat"
                          className="w-full mt-auto rounded-[5px] justify-between"
                          rounded="sm"
                          disableAnimation={true}
                          color={
                            tab.tabActive === tabContent
                              ? "primary"
                              : tab.success
                              ? "success"
                              : "default"
                          }
                          onClick={() => {
                            setTabContent(tab.tabActive);
                          }}
                          size="lg">
                          <span className="font-medium">{tab.label}</span>
                          {tab.success
                            ? tab.icon
                            : tab.tabActive === tabContent
                            ? tab.activeIcon
                            : ""}
                        </Button>
                      );
                    })}
                  </div>
                  <Button
                    onClick={() => onOpen(ModalTypes.signOut)}
                    className="w-full mt-auto rounded-[5px]"
                    color="danger"
                    endContent={<SignOut size={20} />}
                    rounded="sm">
                    Sign out
                  </Button>
                </div>
              </div>
              <div className="w-[70%] h-full border flex flex-col border-zinc-300 border-dashed rounded-[6px] p-4">
                <div className="flex pb-3 w-full h-[60px]">
                  <div className="flex w-full rounded-[6px] bg-cyan-200 items-center justify-between px-2"></div>
                </div>
                <div className="w-full flex-1 mb-3">
                  {renderTabContentSetUp()}
                </div>
                <div className="flex w-full mt-auto justify-end gap-2">
                  <Button
                    className="mt-auto rounded-[5px]"
                    color="default"
                    variant="flat"
                    onClick={handleBack}
                    isDisabled={tabContent === tabCase.avatar}
                    rounded="sm">
                    Back
                  </Button>
                  <Button
                    className="mt-auto rounded-[5px]"
                    color="primary"
                    onClick={handleContinue}
                    rounded="sm">
                    {tabContent === tabCase.settings ? "Confirm" : "Continue"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupInfo;
