import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { ModalTypes } from "../../constants";
import { Warning } from "@phosphor-icons/react";
import { useDispatch } from "react-redux";
const ModalDeleteKey = () => {
  const { onClose, type, isOpen } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const isModalOpen = isOpen && type === ModalTypes.deleteKey;
  const dispatch = useDispatch();
  const handleDeleteKey = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      size="xs"
      isOpen={isModalOpen}
      placement="top-center"
      hideCloseButton
      onClose={onClose}
      className="rounded-[12px] w-[400px] min-h-[170px]">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex gap-1 items-center justify-center pb-3 pt-5">
              <div className="p-1.5 rounded-full bg-rose-100 flex items-center justify-center">
                <Warning size={30} className="text-red-600" />
              </div>
            </ModalHeader>
            <ModalBody className="py-0">
              <div className="flex items-center flex-col justify-center gap-2">
                <h1 className="font-bold text-lg">Are you sure?</h1>
                <p className="text-sm text-center text-gray-600">
                  This action cannot be undone. All values associated with this
                  field will be lost.
                </p>
              </div>
            </ModalBody>
            <ModalFooter className="flex flex-col">
              <Button
                fullWidth
                color="danger"
                onClick={handleDeleteKey}
                isLoading={isLoading}
                variant="solid"
                className="rounded-[8px] font-semibold">
                Delete key
              </Button>
              <Button
                fullWidth
                color="default"
                variant="bordered"
                onClick={onClose}
                className="rounded-[8px] font-semibold">
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalDeleteKey;
