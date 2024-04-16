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
  Image as ImagePhoto,
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
  const { onClose, type, isOpen, onOpenSubModal, data, onOpen } = useModal();
  const isModalOpen = isOpen && type === ModalTypes.createGroup;
  const newOnClose = () => {
    onClose();
    setValueSelect(new Set([]));
  };
  const [valueSelect, setValueSelect] = useState(new Set([]));
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(null);
  useEffect(() => {
    setUploading(null);
    if (Object.keys(data).length > 0) {
      if (data?.avatarSelect) {
        setUploading(data?.avatarSelect);
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
              <div className="flex flex-col h-32 mb-1">
                <div className="flex justify-center items-center">
                  {uploading?.value ? (
                    <Tooltip title="Remove avatar">
                      <>
                        <Badge
                          color="danger"
                          size="lg"
                          className="size-[20px] cursor-pointer hover:opacity-85"
                          onClick={() => setUploading({})}
                          content={<X size={14} weight="bold" />}>
                          <div className=" min-w-[95px] min-h-[95px] flex items-center justify-center rounded-[12px] border-solid border-[2px] border-blue-500 bg-slate-100 overflow-hidden">
                            <Image
                              isZoomed
                              loading="lazy"
                              className="cursor-pointer rounded-none"
                              width={80}
                              height={80}
                              alt="Avatar"
                              src={uploading?.value || defaultLinkAvatarGroup}
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
                          width={80}
                          height={80}
                          alt="Avatar"
                          src={defaultLinkAvatarGroup}
                        />
                      </div>
                    </Badge>
                  )}
                  <div className="flex flex-col justify-between h-full ml-2.5 w-[80%] gap-1.5">
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
                          className="rounded-[8px] w-full text-zinc-900 font-semibold text-[13px]"
                          startContent={<Upload size={18} />}>
                          Upload from your pc
                        </Button>
                      </>
                    </Tooltip>
                    <Tooltip title="Upload avatar from your pc" placement="top">
                      <>
                        <Button
                          onClick={() =>
                            onOpenSubModal(ModalTypes.subType.uploadGallery)
                          }
                          size="md"
                          color="secondary"
                          radius="lg"
                          variant="solid"
                          className="rounded-[8px] w-full  font-semibold text-[13px]"
                          startContent={<ImagePhoto size={18} />}>
                          Gallery
                        </Button>
                      </>
                    </Tooltip>
                  </div>
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
