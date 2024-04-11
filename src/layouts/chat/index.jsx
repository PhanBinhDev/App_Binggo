import { Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import ChatList from "../../pages/private/Chat";

const ChatLayout = () => {
  return (
    <Stack direction={"row"} width={"100%"}>
      <ChatList />
      <Outlet />
    </Stack>
  );
};

export default ChatLayout;
