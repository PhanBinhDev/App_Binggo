import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import { useModal } from "../../hooks/useModal";
import { ModalTypes } from "../../constants";
import { Warning } from "@phosphor-icons/react";
const SubModalWarnFileType = () => {
  const { subPenModals } = useModal();
  const thisModal = subPenModals.find(
    (subPenModal) => subPenModal.subPenType === ModalTypes.subType.upload
  );
  const { isOpen, onClose, subPenType } = thisModal ?? {};
  const isModalOpen = isOpen && subPenType === ModalTypes.subType.warnFileType;
  return (
    <Modal
      size="xs"
      isOpen={isModalOpen}
      hideCloseButton={true}
      onClose={onClose}
      placement="top-center"
      className="rounded-[12px] w-[400px] min-h-[180px]">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="p-[24px_16px_8px_16px]">
              <div className="flex items-center flex-col justify-center gap-1 h-full">
                <Warning size={35} className="text-rose-600 mb-1" />
                <h4 className="font-medium text-lg">Session Timeout!</h4>
                <p className="text-sm text-center mt-2 text-gray-500">
                  You have been logged out due to inactivity
                </p>
              </div>
            </ModalBody>
            <ModalFooter className="p-[4px_16px_16px]">
              <Button
                color="primary"
                fullWidth
                onClick={onClose}
                variant="solid"
                className="rounded-[8px] mt-2 ">
                OK
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SubModalWarnFileType;
