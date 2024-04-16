import {
  Badge,
  Button,
  Chip,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { ModalTypes } from "../../constants";
import { useDispatch } from "react-redux";
import { Warning, X } from "@phosphor-icons/react";
import { toast } from "react-toast";
import { formatFileSize } from "../../utils";
const SubModalUpload = () => {
  const { subModal, onOpen } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState({
    value: "",
    fileSize: "",
    type: "",
    fileName: "",
  });
  const { isOpen, onClose, subType } = subModal;
  const isModalOpen = isOpen && subType === ModalTypes.subType.upload;
  const [isValidateFile, setIsValidateFile] = useState({
    value: true,
    message: "",
  });
  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    const fileSize = formatFileSize(file.size);
    if (file.type.startsWith("image/")) {
      const formData = new FormData();
      formData.append("image", file);
      setIsValidateFile({ value: true, message: "" });
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setPreviewImage({
          value: imageUrl,
          fileSize: fileSize,
          type: file.type.split("/").pop(),
          fileName: file.name,
        });
      };
      reader.readAsDataURL(file);
    } else {
      setIsValidateFile({
        value: false,
        message: "Allowed format png, svg, jpg, jpeg, gif",
      });
    }
  };

  const handleBeforeUpload = () => {
    setIsLoading(true);
    setTimeout(() => {
      // pass file to modalCreateGroup
      onOpen(ModalTypes.createGroup, {
        previewImage,
      });
      setPreviewImage({
        value: "",
        fileSize: "",
        type: "",
        fileName: "",
      });
      onClose();
      setIsLoading(false);
    }, 500);
  };
  return (
    <Modal
      size="xs"
      isOpen={isModalOpen}
      placement="top-center"
      onClose={onClose}
      backdrop="opaque"
      className="rounded-[12px] w-[400px] min-h-[170px]">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 select-none">
              Upload Avatar
            </ModalHeader>
            <ModalBody className="py-0">
              <div className="flex flex-col gap-2 items-center justify-center w-full">
                <div className="relative w-full">
                  <label
                    htmlFor="dropzone-file"
                    className={`cursor-pointer relative flex flex-col items-center justify-center w-full h-48 border-2 ${
                      isValidateFile.value
                        ? "border-gray-300 bg-gray-50 hover:bg-gray-100"
                        : "bg-rose-50 border-rose-400 hover:bg-rose-100"
                    } border-dashed rounded-lg cursor-pointe`}>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className={`w-8 h-8 mb-4 ${
                          isValidateFile.value
                            ? "text-gray-500"
                            : "text-rose-500"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16">
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p
                        className={`mb-2 text-sm ${
                          isValidateFile.value
                            ? "text-gray-500"
                            : "text-rose-500"
                        } text-gray-500`}>
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p
                        className={`text-xs ${
                          isValidateFile.value
                            ? "text-gray-500"
                            : "text-rose-500"
                        }`}>
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      onChange={(e) => handleChangeFile(e)}
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      accept="image/png, image/svg, image/jpg, image/jpeg, image/gif"
                    />
                  </label>
                  {previewImage.value !== "" && (
                    <div className="absolute bottom-0 left-0 top-0 right-0">
                      <div className="relative w-full h-full group rounded-lg overflow-hidden border-[3px] border-solid border-green-400">
                        <img
                          srcSet={previewImage.value}
                          className="w-full h-full object-cover bg-center  overflow-hidden transition-transform"
                          alt="image description"
                        />
                        <div
                          onClick={() =>
                            setPreviewImage({
                              value: "",
                              fileSize: "",
                              type: "",
                            })
                          }
                          className="group-hover:opacity-100 opacity-0  transition-opacity absolute top-1 right-1 p-1 rounded-[5px] bg-rose-600 flex items-center justify-center cursor-pointer hover:bg-rose-500">
                          <X size={14} color="white" weight="bold" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {!isValidateFile.value && (
                  <div
                    className="w-full p-2 mb-1 flex gap-2 items-center font-medium text-xs text-rose-600 rounded-lg bg-rose-50"
                    role="alert">
                    <span className="font-semibold">
                      <Warning size={25} />
                    </span>{" "}
                    {isValidateFile.message}
                  </div>
                )}

                {isValidateFile.value && previewImage.value !== "" && (
                  <div
                    className="w-full p-2 mb-1 flex gap-2 items-center justify-center font-medium text-sm text-zinc-800 rounded-md bg-green-300"
                    role="alert">
                    <span>
                      <strong className="font-semibold select-none">
                        Size:
                      </strong>{" "}
                      {previewImage.fileSize}
                    </span>
                    -----
                    <span>
                      <strong className="font-semibold select-none">
                        Format:
                      </strong>{" "}
                      {previewImage.type}
                    </span>
                  </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={isLoading}
                isDisabled={!previewImage.value}
                fullWidth
                color="primary"
                onClick={handleBeforeUpload}
                className="rounded-[8px]">
                Upload
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SubModalUpload;
