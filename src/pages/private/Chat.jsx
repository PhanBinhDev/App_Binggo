import React, { useState } from "react";
import { ChatListItem } from "../../data";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { CircleDashed, MagnifyingGlass, X } from "@phosphor-icons/react";
import ChatItem from "../../components/Chat/ChatItem";
import { useModal } from "../../hooks/useModal";
import { ModalTypes } from "../../constants";

const ChatList = () => {
  const [inputSearch, setInputSearch] = useState("");
  const { onOpen, isOpen } = useModal();

  return (
    <div className="flex flex-col p-[25px_20px] w-[350px] bg-[#F8FAFF] h-screen overflow-hidden">
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}>
        <Typography variant="h5">Chats</Typography>
        <Tooltip title="Add new group">
          <IconButton onClick={() => onOpen(ModalTypes.createGroup)}>
            <CircleDashed size={32} />
          </IconButton>
        </Tooltip>
      </Stack>

      <form className="w-full mt-2">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only bg-[#EAF2FE]">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <MagnifyingGlass size={20} className="text-gray-900" />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-2.5 ps-10 text-sm text-gray-900 border  rounded-[20px] bg-[#EAF2FE] outline-none"
            placeholder="Search..."
            required
          />
          <IconButton className="absolute top-[50%] translate-y-[-50%] right-[10px] text-gray-900">
            <X size={20} weight="bold" className="text-gray-900" />
          </IconButton>
        </div>
      </form>

      <Stack
        direction={"column"}
        width={"full"}
        justifyContent={"space-between"}
        alignItems={"start"}
        flexGrow={1}
        marginTop={"20px"}>
        <Typography
          variant="h6"
          className="text-[#676667] text-[14px] text-start my-2">
          All Chats
        </Typography>
        <Stack
          height={"520px"}
          direction={"column"}
          alignItems={"center"}
          width={"100%"}
          overflow={"hidden"}>
          <div className="overflow-y-auto w-full style-scrollbar p-[10px_0]">
            {ChatListItem.map((item) => (
              <ChatItem chat={item} key={item.id} />
            ))}
          </div>
        </Stack>
      </Stack>
    </div>
  );
};

export default ChatList;
