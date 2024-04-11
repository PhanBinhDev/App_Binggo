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
import { DeviceUUID } from "device-uuid";
import { getInfoDevice } from "../../utils";
const ModalSignOut = () => {
  const { onClose, type, isOpen } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const isModalOpen = isOpen && type === ModalTypes.signOut;
  const dispatch = useDispatch();
  const device = getInfoDevice();
  device.uuid = new DeviceUUID().get();
  const newOnClose = () => {
    onClose();
    setValueSelect(new Set([]));
  };
  const [valueSelect, setValueSelect] = useState(new Set([]));
  const handleLogoutApp = async () => {
    try {
      setIsLoading(true);
      const data = {
        device,
      };
      const response = await handleLogout(data);
      if (response.errCode === 0) {
        setTimeout(() => {
          setIsLoading(false);
          dispatch(signOut());
          onClose();
        }, 1000);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <Modal
      size="xs"
      isOpen={isModalOpen}
      placement="top-center"
      onClose={newOnClose}
      className="rounded-[12px] w-[400px] min-h-[170px]">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Log out</ModalHeader>
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

export default ModalSignOut;
