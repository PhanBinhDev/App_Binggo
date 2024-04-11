import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { ModalTypes } from "../../constants";
import { useDispatch } from "react-redux";
const ModalEnterKey = () => {
  const { onClose, type, isOpen } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const isModalOpen = isOpen && type === ModalTypes.keyAdmin;
  const dispatch = useDispatch();
  const newOnClose = () => {
    onClose();
  };
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <Modal
      size="xs"
      isOpen={isModalOpen}
      placement="top-center"
      onClose={newOnClose}
      className="rounded-[12px] w-[400px] min-h-fit">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 justify-center text-center font-bold text-[20px] p-6">
              Enter secret key here
            </ModalHeader>
            <ModalBody className="pt-1.5 pb-1">
              <input
                disabled={isLoading}
                type="text"
                placeholder="Enter your key secret"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus-visible:border-blue-500"
              />
            </ModalBody>
            <ModalFooter className="flex flex-col">
              <Button
                color="primary"
                isLoading={isLoading}
                onClick={() => setIsLoading(true)}
                className="rounded-[8px] w-full">
                Verify
              </Button>
              <Tooltip title="You can get secret key at settings page">
                <div className="text-xs text-blue-500 cursor-pointer hover:text-blue-400 transition-colors select-none text-center">
                  Get secret key
                </div>
              </Tooltip>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalEnterKey;
