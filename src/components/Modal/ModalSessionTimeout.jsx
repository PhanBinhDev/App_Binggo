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
import { signOut } from "../../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import { handleLogout } from "../../apis/auth";
import { getInfoDevice } from "../../utils";
import { DeviceUUID } from "device-uuid";
const ModalSessionTimeOut = () => {
  const { onClose, type, isOpen } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const isModalOpen = isOpen && type === ModalTypes.timeOut;
  const dispatch = useDispatch();
  const device = getInfoDevice();
  device.uuid = new DeviceUUID().get();
  const handleSessionTimeout = async () => {
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
      hideCloseButton={true}
      placement="top-center"
      className="rounded-[12px] w-[400px] min-h-[180px]">
      <ModalContent>
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
              onClick={handleSessionTimeout}
              isLoading={isLoading}
              variant="solid"
              className="rounded-[8px] mt-2 ">
              Login
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default ModalSessionTimeOut;
