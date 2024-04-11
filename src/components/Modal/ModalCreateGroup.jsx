import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Avatar,
  Chip,
  Tabs,
  Tab,
  Skeleton,
  Spinner,
  Badge,
  Image,
} from "@nextui-org/react";
import { Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { ModalTypes } from "../../constants";
import { ChatListItem } from "../../data";
import { handleGetGalleryApi } from "../../apis/gallery";
import {
  CheckSquareOffset,
  GraduationCap,
  House,
  Upload,
  Users,
  X,
  FileImage,
  Trash,
} from "@phosphor-icons/react";
import { Check } from "@phosphor-icons/react/dist/ssr";
const tabGroupAvatar = [
  {
    key: "family",
    title: "Family",
    icon: <House size={16} />,
    data: [],
  },
  {
    key: "work",
    title: "Work",
    icon: <CheckSquareOffset size={16} />,
    data: [],
  },
  {
    key: "friends",
    title: "Friends",
    icon: <Users size={16} />,
    data: [],
  },
  {
    key: "school",
    title: "School",
    icon: <GraduationCap size={16} />,
    data: [],
  },
];
const defaultLinkAvatarGroup =
  "https://res.cloudinary.com/delkz1vi9/image/upload/v1712017164/Binggo/dwkardezbxirr1vbsag7.webp";
const ModalCreateGroup = () => {
  const { onClose, type, isOpen, onOpenSubModal, data } = useModal();
  const isModalOpen = isOpen && type === ModalTypes.createGroup;
  console.log("data", data);
  const newOnClose = () => {
    onClose();
    setValueSelect(new Set([]));
  };
  const [avatarSelected, setAvatarSelected] = useState({});
  const [valueSelect, setValueSelect] = useState(new Set([]));
  const [gallery, setGallery] = useState(tabGroupAvatar);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(50);
  const [uploading, setUploading] = useState(null);
  const fetchGallery = async () => {
    try {
      setIsLoading(true);
      const response = await handleGetGalleryApi("group");
      if (response?.errCode === 0) {
        const newGallery = [...gallery];
        newGallery.map((gallery) => {
          gallery.data = response.gallery?.filter(
            (item) => item.subCategory === gallery.key
          );
          return gallery;
        });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (isModalOpen) {
      fetchGallery();
    }
  }, [isModalOpen]);
  useEffect(() => {
    setUploading(null);
    if (Object.keys(data).length > 0) {
      if (data?.previewImage) {
        setUploading(data);
      }
    }
  }, [data]);
  return (
    <Modal
      isOpen={isModalOpen}
      placement="top-center"
      onClose={newOnClose}
      className="rounded-[12px] w-[400px] min-h-[300px]">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Create Group
            </ModalHeader>
            <ModalBody>
              <div className="flex h-56 flex-col mb-1">
                <div className="flex justify-center items-center">
                  {avatarSelected.value ? (
                    <Tooltip title="Remove avatar">
                      <>
                        <Badge
                          color="danger"
                          size="lg"
                          className="size-[18px] cursor-pointer hover:opacity-85"
                          onClick={() => setAvatarSelected({})}
                          content={<X size={14} weight="bold" />}>
                          <div className="p-1.5  rounded-[12px] border-solid border-[2px] border-blue-500 bg-slate-100">
                            <Image
                              isZoomed
                              loading="lazy"
                              className="cursor-pointer rounded-[8px]"
                              width={92}
                              height={92}
                              alt="Avatar"
                              src={
                                avatarSelected.value || defaultLinkAvatarGroup
                              }
                            />
                          </div>
                        </Badge>
                      </>
                    </Tooltip>
                  ) : (
                    <Badge className="size-[18px] opacity-0" content="">
                      <div className="p-1.5  rounded-[12px] border-solid border-[2px] border-blue-500 bg-slate-100">
                        <Image
                          isZoomed
                          loading="lazy"
                          className="cursor-pointer rounded-[8px]"
                          width={92}
                          height={92}
                          alt="Avatar"
                          src={defaultLinkAvatarGroup}
                        />
                      </div>
                    </Badge>
                  )}
                  <div className="flex flex-col h-full ml-2.5 w-[80%] gap-1.5">
                    <Tooltip title="Upload avatar from your pc" placement="top">
                      <>
                        <Button
                          onClick={() =>
                            onOpenSubModal(ModalTypes.subType.upload)
                          }
                          size="md"
                          color="success"
                          radius="lg"
                          variant="solid"
                          className="rounded-[8px] w-full text-black font-semibold text-[13px]"
                          startContent={<Upload size={18} />}>
                          Upload from your pc
                        </Button>
                      </>
                    </Tooltip>
                    {uploading !== null ? (
                      <div className="w-full flex-1 rounded-md border gap-1 group border-solid border-success-500 p-2 flex flex-col">
                        <div className="w-full flex-1 flex items-center justify-center">
                          <div className="flex gap-2 h-full items-center justify-center">
                            <FileImage size={22} className="text-zinc-500" />
                          </div>
                          <div className="h-full flex-1 flex flex-col ml-2">
                            <h3 className="text-sm font-bold">
                              {data?.previewImage?.fileName}
                            </h3>
                            <p className="text-xs lowercase text-slate-600">
                              {data?.previewImage?.fileSize} | {progress}%
                            </p>
                          </div>
                          <div className="group-hover:flex flex gap-2 h-full items-center justify-center">
                            <div className="p-1.5 transition-background flex items-center justify-center rounded-full hover:bg-slate-200 cursor-pointer">
                              <Trash size={22} className="text-zinc-500" />
                            </div>
                          </div>
                        </div>
                        <div className="w-full h-[10%] rounded-lg bg-zinc-300">
                          <div
                            className={`w-[${progress}%]  h-full rounded-lg bg-green-500 transition-width duration-[0.3s] ease-in-out`}></div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="h-[100px] mt-2.5 mb-1.5">
                  <Tabs
                    size="sm"
                    radius="sm"
                    color="primary"
                    variant="solid"
                    onSelectionChange={() => {
                      setIsLoading(true);
                      setTimeout(() => {
                        setIsLoading(false);
                      }, 1000);
                    }}
                    className={{
                      tabList: "rounded-[5px] bg-slate-300",
                      tabContent: "px-0",
                      panel: "px-0",
                    }}>
                    {gallery?.map((item) => (
                      <Tab
                        key={item._id}
                        title={
                          <div className="flex items-center space-x-1.5">
                            {item.icon}
                            <span>{item.title}</span>
                          </div>
                        }>
                        <div
                          className={`flex w-full items-center  space-x-2.5 p-2 rounded-[8px] ${
                            !isLoading ? "bg-foreground-200" : "bg-zinc-100"
                          }`}>
                          {isLoading ? (
                            <div className="w-full h-full flex items-center justify-center space-x-2 my-1">
                              <Spinner />
                              <span className="text-sm text-zinc-700 select-none">
                                Loading...
                              </span>
                            </div>
                          ) : (
                            <>
                              {item.data.map((image) => (
                                <>
                                  {image._id === avatarSelected._id ? (
                                    <Badge
                                      key={image._id}
                                      color="primary"
                                      className="size-4"
                                      content={
                                        image._id === avatarSelected._id && (
                                          <Check size={14} />
                                        )
                                      }>
                                      <div className="p-1 rounded-lg border-solid border-[2px] bg-sky-100 border-blue-500">
                                        <Image
                                          isZoomed
                                          loading="lazy"
                                          className="cursor-pointer rounded-[8px]"
                                          width={40}
                                          height={40}
                                          alt="Avatar"
                                          src={image.value}
                                          onClick={() =>
                                            setAvatarSelected(image)
                                          }
                                        />
                                      </div>
                                    </Badge>
                                  ) : (
                                    <div
                                      key={image._id}
                                      className="p-1 rounded-lg border-solid border-[2px] bg-sky-100 border-blue-500">
                                      <Image
                                        isZoomed
                                        loading="lazy"
                                        className="cursor-pointer rounded-[8px]"
                                        width={40}
                                        height={40}
                                        alt="Avatar"
                                        src={image.value}
                                        onClick={() => setAvatarSelected(image)}
                                      />
                                    </div>
                                  )}
                                </>
                              ))}
                            </>
                          )}
                        </div>
                      </Tab>
                    ))}
                  </Tabs>
                </div>
              </div>
              <Tooltip title="Group Name" placement="top">
                <>
                  <input
                    type="text"
                    className="bg-white  border-gray-300 border-[2px] hover:border-gray-400  text-[#7d7d86] text-sm rounded-[12px] focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5"
                    placeholder="Group Name"
                    required
                  />
                </>
              </Tooltip>
              <Tooltip title="Add members" placement="top">
                <>
                  <Select
                    label="Members"
                    variant="bordered"
                    labelPlacement="inside"
                    onSelectionChange={setValueSelect}
                    items={ChatListItem}
                    selectionMode={"multiple"}
                    classNames={{
                      trigger: "min-h-unit-12 py-2",
                    }}>
                    {(user) => (
                      <SelectItem key={user.id} textValue={user.name}>
                        <div className="flex gap-2 items-center">
                          <Avatar
                            alt={user.name}
                            className="flex-shrink-0"
                            size="sm"
                            src={user.img}
                          />
                          <div className="flex flex-col">
                            <span className="text-small">{user.name}</span>
                          </div>
                        </div>
                      </SelectItem>
                    )}
                  </Select>
                </>
              </Tooltip>
              <div className="flex flex-wrap gap-2">
                {Array.from(valueSelect).map((item) => {
                  return <Chip key={item.key}>{item.name}</Chip>;
                })}
              </div>
            </ModalBody>
            <ModalFooter className="justify-center mt-2">
              <Button
                color="primary"
                size="lg"
                onClick={onClose}
                className="rounded-[8px] w-full">
                Create
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalCreateGroup;
