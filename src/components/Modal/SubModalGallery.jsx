import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { ModalTypes } from "../../constants";
import {
  ArrowClockwise,
  Image as ImagePhoto,
  Check,
} from "@phosphor-icons/react";
import { handleGetGalleryApi } from "../../apis/gallery";
import { IconButton } from "@mui/material";
const SubModalGallery = () => {
  const { updateData, subModal, onOpen } = useModal();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  const [selected, setSelected] = useState("");
  const { isOpen, onClose, subType } = subModal;
  const isModalOpen = isOpen && subType === ModalTypes.subType.uploadGallery;
  const [galleries, setGalleries] = useState([]);
  const fetchGallery = async () => {
    try {
      setIsLoading(true);
      const response = await handleGetGalleryApi("profile");
      if (response?.errCode === 0) {
        setGalleries(response?.gallery);
      }
      setTimeout(() => setIsLoading(false), 1000);
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
  const handleRefresh = () => {
    if (isLoading) return;
    fetchGallery();
  };
  const handleSelectAvatar = () => {
    setIsLoadingFetch(true);
    setTimeout(() => {
      const avatarSelect = galleries.find((item) => item._id === selected);
      onOpen(ModalTypes.createGroup, { avatarSelect });
      onClose();
      setIsLoadingFetch(false);
    }, 1000);
  };
  return (
    <Modal
      size="lg"
      isOpen={isModalOpen}
      placement="top-center"
      onClose={onClose}
      className="rounded-[12px] max-w-[420px] max-h-[500px]">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 pb-2 font-bold">
              Gallery
            </ModalHeader>
            <ModalBody className="py-3">
              {/* Header */}
              <div className="h-[46px] w-full flex items-center rounded-md bg-slate-200">
                <div className="flex-1 px-3 h-full flex items-center">
                  <span className="text-md font-semibold text-zinc-900">
                    Select on picture to set your avatar
                  </span>
                </div>
                <div className="ml-auto  size-[50px] flex items-center justify-center ">
                  <IconButton onClick={handleRefresh}>
                    <ArrowClockwise
                      size={24}
                      className={`text-black ${isLoading && "animate-spin"}`}
                    />
                  </IconButton>
                </div>
              </div>
              {/* Body */}
              <div className="flex-1 p-3 rounded-lg bg-slate-100 flex-col flex">
                <div className="flex-1 w-full ">
                  <div className="w-full h-full p-2 overflow-hidden">
                    <div className="grid grid-cols-3 gap-4 max-h-[216px] overflow-y-auto">
                      {isLoading ? (
                        <>
                          {Array.from([1, 2, 3, 4, 5, 6]).map((_, index) => {
                            return (
                              <div
                                key={index}
                                className=" col-span-1 flex items-center justify-center size-[100px] bg-gray-300 rounded animate-pulse text-zinc-600">
                                <ImagePhoto size={40} />
                              </div>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          {galleries.map((item) => {
                            const { value, _id } = item;
                            const sameId = _id === selected;
                            return (
                              <div
                                key={_id}
                                onClick={() => setSelected(_id)}
                                className={`cursor-pointer relative col-span-1 w-full flex items-center justify-center h-fit bg-slate-200 hover:bg-slate-300 transition-background rounded-lg border-3 border-solid p-1.5 ${
                                  sameId
                                    ? "border-blue-500"
                                    : "border-transparent"
                                }`}>
                                <Image
                                  src={value}
                                  className="rounded-full w-full h-full object-cover"
                                />
                                {sameId && (
                                  <div className="absolute top-1 right-1 rounded-md p-1 bg-blue-500 z-10">
                                    <Check size={18} color="white" />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="pt-3">
              <Button
                color="primary"
                isLoading={isLoadingFetch}
                onPress={handleSelectAvatar}
                variant="solid"
                className="rounded-[8px] min-w-24">
                Next
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SubModalGallery;
