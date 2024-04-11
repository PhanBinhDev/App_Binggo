import React from "react";
import none from "../../assets/images/none.png";
import { Image } from "@nextui-org/react";
import { useModal } from "../../hooks/useModal";
import { ModalTypes } from "../../constants";
const ChatSelect = () => {
  const { onOpen } = useModal();
  return (
    <div className="flex flex-1 w-full items-center justify-center flex-col">
      <Image width={260} alt="None Chat Selected" src={none} />
      <span className="mt-8 select-none">
        Select a conversation or{" "}
        <span
          className="text-[#5B96F7] cursor-pointer select-none"
          onClick={() => onOpen(ModalTypes.createGroup)}>
          start a new one
        </span>
      </span>
    </div>
  );
};

export default ChatSelect;
