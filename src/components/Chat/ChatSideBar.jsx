import React from "react";

const ChatSideBar = ({ showSideBar }) => {
  console.log("showSideBar", showSideBar);

  return (
    <div
      className={`duration-300 ease-in-out ${
        showSideBar ? "w-[365px]" : "w-0"
      }`}>
      <div className="p-3 w-full h-full bg-white"></div>
    </div>
  );
};

export default ChatSideBar;
