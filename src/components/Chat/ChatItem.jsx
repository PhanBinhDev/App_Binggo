import { Stack, Typography } from "@mui/material";
import { Avatar, Badge } from "@nextui-org/react";
import React from "react";
import { Link, useParams } from "react-router-dom";

const ChatItem = ({ chat }) => {
  const { chatId } = useParams();
  const sameSender = chatId === chat.id;
  return (
    <div
      className={`max-w-[315px] max-h-18 h-16 rounded-[15px] w-full mb-2.5 ${
        sameSender
          ? "bg-[#5B96F7] hover:bg-[#518ef1]"
          : "bg-white hover:bg-slate-100"
      }`}>
      <Link
        key={chat.id}
        to={`${chat.id}`}
        className="flex w-full h-full items-center p-4">
        {chat.online ? (
          <Badge
            content=""
            color="success"
            shape="circle"
            size="sm"
            className="bg-green-400 min-h-2 min-w-2 w-2 h-2"
            placement="bottom-right">
            <Avatar src={chat.img} />
          </Badge>
        ) : (
          <Avatar src={chat.img} />
        )}
        <Stack direction={"column"} marginLeft={"0.6rem"}>
          <Typography
            className={`text-[14px] ${
              sameSender ? "text-white" : "text-[#030303]"
            } font-medium`}>
            {chat?.name}
          </Typography>
          <Typography
            variant="subtitle2"
            className={`text-[12px] ${
              sameSender ? "text-white" : "text-[#7C7C7D]"
            }`}>
            Tin nhắn cũ
          </Typography>
        </Stack>
      </Link>
    </div>
  );
};

export default ChatItem;
