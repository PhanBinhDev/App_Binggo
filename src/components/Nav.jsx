import { Box, Divider, IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import Logo from "../assets/images/logo.ico";
import {
  ChartPieSlice,
  Gear,
  SignOut,
  User,
  UserCircle,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { DEFAULT_PATH, SETTINGS_PATH } from "../config";
import { Nav_Buttons } from "../data/index.jsx";
import { useModal } from "../hooks/useModal.jsx";
import { ModalTypes } from "../constants/index.js";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
const Nav = () => {
  const [selected, setSelected] = useState(0);
  const { onOpen } = useModal();
  return (
    <Box
      p={2}
      sx={{
        padding: "24px 16px 16px",
        width: 80,
        height: "100vh",
        borderRadius: "0 5px 5px 0",
        backgroundColor: "#F0F4FA",
        boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
      }}
      className="border-solid border border-slate-300">
      <Stack
        direction="column"
        alignItems={"center"}
        sx={{ width: "100%", height: "100%" }}
        spacing={3}
        justifyContent={"space-between"}>
        <Stack alignItems={"center"} spacing={4}>
          <Box
            sx={{
              bgcolor: "#AFBBF7",
              height: 54,
              width: 54,
              borderRadius: 1.5,
            }}>
            <Link
              to={DEFAULT_PATH}
              className="w-full h-full flex items-center justify-center">
              <img
                src={Logo}
                alt="logo"
                className="max-w-12 max-h-12 object-contain"
              />
            </Link>
          </Box>
          <Stack
            direction={"column"}
            alignItems={"center"}
            sx={{ width: "max-content" }}
            spacing={3}>
            {Nav_Buttons.map((el) => {
              return el.index === selected ? (
                <Box
                  p={0.5}
                  key={el.index}
                  sx={{
                    backgroundColor: "#5B96F7",
                    borderRadius: 1.5,
                  }}>
                  <Link
                    to={el.link}
                    onClick={() => setSelected(el.index)}
                    className="w-full h-full flex items-center justify-center">
                    <IconButton sx={{ width: "max-content", color: "white" }}>
                      {el.icon}
                    </IconButton>
                  </Link>
                </Box>
              ) : (
                <Link
                  to={el.link}
                  key={el.index}
                  onClick={() => setSelected(el.index)}
                  className="w-full h-full flex items-center justify-center">
                  <IconButton
                    sx={{
                      width: "max-content",
                      color: "black",
                    }}>
                    {el.icon}
                  </IconButton>
                </Link>
              );
            })}
            <Divider sx={{ width: "48px" }} orientation="horizontal" />

            {selected === 3 ? (
              <Box
                p={0.5}
                sx={{
                  backgroundColor: "#5B96F7",
                  borderRadius: 1.5,
                }}>
                <Link
                  to={SETTINGS_PATH}
                  onClick={() => setSelected(3)}
                  className="w-full h-full flex items-center justify-center ">
                  <IconButton sx={{ width: "max-content", color: "white" }}>
                    <Gear size={24} />
                  </IconButton>
                </Link>
              </Box>
            ) : (
              <Link to={SETTINGS_PATH} onClick={() => setSelected(3)}>
                <IconButton
                  sx={{
                    width: "max-content",
                    color: "black",
                  }}>
                  <Gear size={24} />
                </IconButton>
              </Link>
            )}
          </Stack>
        </Stack>
        <Stack direction="column" alignItems={"center"} spacing={2}>
          <Dropdown className="rounded-[6px]">
            <DropdownTrigger>
              <div className="size-12 rounded-[8px] bg-violet-700 cursor-pointer flex items-center justify-center">
                <UserCircle color="white" size={28} />
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" className="rounded-[6px]">
              <DropdownItem
                key="new"
                className="rounded-[4px] p-2"
                endContent={<User size={18} className="text-inherit" />}>
                Profile
              </DropdownItem>
              <DropdownItem
                key="edit"
                className="rounded-[4px] p-2"
                onClick={() => onOpen(ModalTypes.keyAdmin)}
                endContent={
                  <ChartPieSlice size={18} className="text-inherit" />
                }>
                Admin dashboard
              </DropdownItem>
              <DropdownItem
                key="delete"
                className="text-danger p-2  rounded-[4px]"
                color="danger"
                onClick={() => onOpen(ModalTypes.signOut)}
                endContent={<SignOut className="text-inherit" size={18} />}>
                Log out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Nav;
