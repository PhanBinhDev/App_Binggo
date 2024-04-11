import { Box, Button, IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ChatSideBar from "./ChatSideBar";
import {
  Info,
  Link,
  PaperPlaneTilt,
  Phone,
  Smiley,
  VideoCamera,
} from "@phosphor-icons/react";
import Picker from "emoji-picker-react";
import { Avatar } from "@nextui-org/react";
import { handleGetCurrentUserApi } from "../../apis/auth";
const isGroupChat = false;
const ChatRoom = () => {
  const { chatId } = useParams();

  const [chatInput, setChatInput] = useState("");
  const [showSideBar, setShowSideBar] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const onEmojiClick = (event) => {
    setChatInput((prevInput) => prevInput + event.emoji);
    setShowEmoji(false);
  };
  useEffect(() => {
    setChatInput("");
  }, [chatId]);
  const [currentUser, setCurrentUser] = useState({});
  const fetchCurrentUser = async () => {
    const response = await handleGetCurrentUserApi();
    console.log(response);
  };
  useEffect(() => {
    fetchCurrentUser();
    return () => {};
  }, []);

  // const user = ChatListItem.find((item => item.id === ))
  return (
    <div className="flex flex-1">
      <div className="flex w-full flex-col bg-[#F0F4FA]  duration-300 ease-in-out">
        {/* Header info chat */}
        <header className="h-[70px] shadow-header flex bg-[#F8FAFF]">
          {!isGroupChat ? (
            <>
              <div className="flex items-center justify-center h-full ml-[1rem] cursor-pointer gap-2">
                <div onClick={fetchCurrentUser}>
                  <Avatar />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-black text-base font-bold ">
                    Pink Panda
                  </h5>
                  {/* handle online or time offline here */}
                  <p className="text-[#696969] text-sm select-none">Online</p>
                </div>
              </div>
              <div className="ml-auto h-full flex items-center gap-2 p-4 mr-2">
                <IconButton>
                  <VideoCamera size={20} weight="bold" />
                </IconButton>
                <IconButton>
                  <Phone size={20} weight="bold" />
                </IconButton>
                <IconButton onClick={() => setShowSideBar(!showSideBar)}>
                  <Info size={20} weight="bold" />
                </IconButton>
              </div>
            </>
          ) : (
            <>
              <Avatar />
            </>
          )}
          {/* <div className="flex h-full"></div> */}
        </header>

        <div className="flex-1 w-full">Message</div>
        <div className="mt-auto h-[70px] w-full p-[14px] flex gap-2">
          <div className="flex-1 h-[45px] relative">
            <Tooltip title="attachments">
              <div className="absolute h-full rounded-[12px] left-[4px] cursor-pointer flex items-center justify-center">
                <IconButton>
                  <Link size={24} color="#709CE6" />
                </IconButton>
              </div>
            </Tooltip>
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="bg-[#EAF2FE] border border-blue-300 placeholder:text-[#709CE6] text-gray-900 text-sm rounded-lg  block w-full p-[12px_40px_12px_40px] focus-visible:outline-blue-500"
              placeholder="Write a message..."
            />
            <Tooltip title="Emoji">
              <div
                onClick={() => setShowEmoji(!showEmoji)}
                className="absolute h-full rounded-[12px] right-[4px] top-0 cursor-pointer flex items-center justify-center">
                <IconButton>
                  <Smiley size={24} color="#709CE6" />
                </IconButton>
              </div>
            </Tooltip>
            {showEmoji && (
              <Picker
                width={300}
                height={350}
                emojiStyle="facebook"
                lazyLoadEmojis={true}
                className="absolute bottom-[100%] right-0 text-base"
                onEmojiClick={(e, i) => onEmojiClick(e)}
              />
            )}
          </div>
          <Tooltip title="Send" placement={"top"}>
            <div className="bg-[#5B96F7] size-[45.6px] rounded-[12px] cursor-pointer flex items-center justify-center">
              <IconButton>
                <PaperPlaneTilt size={24} color="white" />
              </IconButton>
            </div>
          </Tooltip>
        </div>
      </div>
      <ChatSideBar showSideBar={showSideBar} />
    </div>
  );
};

export default ChatRoom;
