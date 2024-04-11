import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  Select,
  SelectItem,
  Avatar,
  Chip,
} from "@nextui-org/react";
import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { ModalTypes } from "../../constants";
import { ChatListItem } from "../../data";
import { Warning } from "@phosphor-icons/react";
import { signOut } from "../../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import { handleLogout } from "../../apis/auth";
const ModalAddKey = () => {
  const { onClose, type, isOpen } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const isModalOpen = isOpen && type === ModalTypes.addKey;
  const dispatch = useDispatch();
  const handleLogoutApp = async () => {
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
      onClose={onClose}
      className="rounded-[12px] w-[400px] min-h-[170px]">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add new key
            </ModalHeader>
            <ModalBody className="py-0">
              <div className="flex items-center justify-center gap-2">
                <Warning size={35} className="text-red-600" />
                <p className="text-sm">Are you sure you want to log out?</p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                onClick={handleLogoutApp}
                isLoading={isLoading}
                variant="light"
                className="rounded-[8px]">
                Confirm
              </Button>
              <Button
                color="primary"
                onClick={onClose}
                className="rounded-[8px]">
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalAddKey;
