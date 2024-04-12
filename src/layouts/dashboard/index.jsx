import { Stack } from "@mui/material";
import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import Nav from "../../components/Nav";
import { useSelector } from "react-redux";
import { TypeUsers } from "../../constants";

const DashBoardLayout = () => {
  const { isSignedIn, type } = useSelector((state) => state.auth);
  return (
    <div className="flex overflow-hidden w-screen">
      {isSignedIn ? (
        <>
          {type === TypeUsers.OLD_USER && <Nav />}
          <div className="flex-1">
            <Outlet />
          </div>
        </>
      ) : (
        <div className="flex-1">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default DashBoardLayout;
