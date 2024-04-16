// "use strict";

import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Badge,
} from "@nextui-org/react";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { ModalTypes } from "../../constants";
import { Input } from "../ui/input";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadBasic } from "@tsparticles/basic";

import { Label } from "../ui/label";
import { Button as ButtonShadcn } from "../ui/button";
import { handleGetCurrentUserApi } from "@/apis/auth";
import {
  CheckCircle,
  Envelope,
  Plus,
  Slideshow,
  UploadSimple,
  User,
  UserCircle,
  UserGear,
  X,
} from "@phosphor-icons/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { Banner } from "@/utils/svg";
import { toast } from "react-toast";
import { IconButton } from "@mui/material";

const menuUpload = [
  {
    key: 1,
    title: "Banner",
    icon: <Slideshow size={20} />,
    divider: true,
    upload: false,
  },
  {
    key: 2,
    title: "Avatar",
    icon: <UserGear size={20} />,
    divider: false,
    upload: true,
  },
];

const ModalSetupProfile = () => {
  const { isOpen, type, onClose } = useModal();
  const [user, setUser] = useState({});
  const [openSuccess, setOpenSuccess] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);
  const [file, setFile] = useState("");
  const uploadRef = useRef(null);
  const [dataSubmit, setDataSubmit] = useState({
    userName: "",
    avatar: "",
  });
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === ModalTypes.setupProfile;
  const fetchCurrentUser = async () => {
    try {
      setIsLoading(true);
      const response = await handleGetCurrentUserApi();
      if (response.errCode === 0) {
        setUser(response.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const handleChangeUpload = (e) => {
    setOpenMenu(false);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setIsLoading(true);
      const imageData = event.target.result;
      setPreviewAvatar(imageData);
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
    setDataSubmit((prev) => ({
      ...prev,
      avatar: file,
    }));
  };
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", dataSubmit.avatar);
    formData.append("userName", dataSubmit.userName);
    if (!dataSubmit.avatar) {
      toast.error("Bạn cần tải ảnh đại diện cho tài khoản của mình");
    } else if (!dataSubmit.userName) {
      toast.error("Tên không được để trống");
    } else {
      toast.success("OK");
    }
  };

  const handleMenuUpload = (e, key) => {
    if (key === 1) {
      e.preventDefault();
      console.log("Banner");
      toast.warn(
        "Hiện chức năng chỉnh sửa ảnh bìa chưa hỗ trợ. Vui lòng thử lại sau"
      );
      setOpenMenu(false);
    } else {
      console.log("here");
      setOpenMenu(false);
    }
  };
  return (
    <Modal
      size="md"
      isOpen={isModalOpen}
      hideCloseButton={true}
      placement="top-center"
      className="rounded-[12px]">
      <ModalContent className="min-h-[500px] max-w-[400px]">
        <>
          <ModalHeader className="text-center justify-center transition-all delay-500 p-4 pb-2">
            <div className="rounded-md bg-green-300 w-full p-2 relative ">
              <h4 className="font-bold text-lg text-zinc-900">
                Congratulations!
              </h4>
              <p className="text-sm font-medium text-zinc-800">
                Your account has been created successfully
              </p>
            </div>
          </ModalHeader>
          <ModalBody className="p-[12px_16px_8px_16px]">
            <div className="flex flex-1 flex-col gap-3">
              <div className="flex h-[140px] relative flex-col bg-slate-200 cursor-pointer rounded-md overflow-visible">
                <Banner className="mt-auto z-0" />
                <Popover
                  isOpen={openMenu}
                  onOpenChange={() => setOpenMenu(!openMenu)}
                  backdrop="opaque"
                  className="rounded-md shadow-sm"
                  placement="left">
                  <PopoverTrigger>
                    <ButtonShadcn
                      variant="secondary"
                      className="absolute right-2 bottom-2 rounded-md p-1.5 px-2.5">
                      <Plus size={20} weight="bold" />
                    </ButtonShadcn>
                  </PopoverTrigger>
                  <PopoverContent className="rounded-md">
                    <div className="px-1 py-1.5 flex gap-1.5 flex-col w-full min-w-[130px] max-w-[150px] rounded-md">
                      {menuUpload.map((item) => (
                        <React.Fragment key={item.key}>
                          <div className="p-[8px_12px] select-none flex gap-2 items-center cursor-pointer text-zinc-800 hover:bg-slate-200 transition-background rounded-md">
                            {item.upload ? (
                              <>
                                <Label
                                  htmlFor="upload_avatar"
                                  className="flex w-full h-full items-center gap-2 ">
                                  {item.icon} {item.title}
                                </Label>
                                <Input
                                  id="upload_avatar"
                                  type="file"
                                  className="hidden"
                                  onChange={(e) => handleChangeUpload(e)}
                                />
                              </>
                            ) : (
                              <>
                                {item.icon} {item.title}
                              </>
                            )}
                          </div>
                          {item.divider && <Divider />}
                        </React.Fragment>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                <div className="" target="_blank">
                  <Avatar className="size-24 absolute -bottom-4 left-4 z-10">
                    <AvatarImage src={previewAvatar} />
                    <div className="absolute right-2 top-2"></div>
                    <AvatarFallback>Avatar</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <div className="h-10 mb-2 mt-5 bg-slate-200 rounded-md flex items-center px-3 text-zinc-800 font-medium">
                Account information
              </div>
              <div className="flex-1 gap-3 flex flex-col">
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="username">Display name</Label>
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <ButtonShadcn
                      variant="secondary"
                      className="rounded-md select-none gap-2 ">
                      <User size={22} />
                    </ButtonShadcn>
                    <Input
                      type="text"
                      id="username"
                      placeholder="Enter your display name "
                      className="outline-none "
                      value={dataSubmit.userName}
                      onChange={(e) =>
                        setDataSubmit((prev) => ({
                          ...prev,
                          userName: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="email">Email</Label>

                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <ButtonShadcn
                      variant="secondary"
                      className="rounded-md select-none gap-2 ">
                      <Envelope size={22} />
                    </ButtonShadcn>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Email"
                      value={user?.email?.value}
                      disabled
                    />
                    <ButtonShadcn
                      className="max-w-[100px] rounded-md text-sm select-none gap-2 bg-[#18c964]"
                      disabled>
                      <CheckCircle size={22} />
                    </ButtonShadcn>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="p-[4px_16px_16px] gap-2 pt-3">
            <Button
              size="lg"
              color="primary"
              fullWidth
              isLoading={isLoading}
              onClick={handleSubmit}
              variant="solid"
              className="rounded-[8px] mt-2">
              Submit
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default ModalSetupProfile;
