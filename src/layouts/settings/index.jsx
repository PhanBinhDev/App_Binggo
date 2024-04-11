import { Stack } from "@mui/material";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import NavSettings from "../../components/settings/NavSettings";

import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { House } from "@phosphor-icons/react";
import { SETTINGS_PATH } from "../../config";
const breadcrumbItem = {
  details: {
    title: "details",
    path: `${SETTINGS_PATH}`,
    icon: "",
  },
  security: {
    title: "security",
    path: `${SETTINGS_PATH}/security`,
  },
  privacy: {
    title: "privacy",
    path: `${SETTINGS_PATH}/privacy`,
  },
  wallpaper: {
    title: "wallpaper",
    path: `${SETTINGS_PATH}/wallpaper`,
  },
};
const SettingsLayout = () => {
  const location = useLocation();
  const { pathname } = location;
  const renderBreadcrumbs = () => {
    switch (pathname) {
      case `${SETTINGS_PATH}`: {
        return (
          <BreadcrumbItem>
            <Link to={breadcrumbItem.details.path}>
              {breadcrumbItem.details.title}
            </Link>
          </BreadcrumbItem>
        );
      }
      case `${SETTINGS_PATH}/security`: {
        return (
          <BreadcrumbItem>
            <Link to={breadcrumbItem.security.path}>
              {breadcrumbItem.security.title}
            </Link>
          </BreadcrumbItem>
        );
      }
      case `${SETTINGS_PATH}/privacy`: {
        return (
          <BreadcrumbItem>
            <Link to={breadcrumbItem.privacy.path}>
              {breadcrumbItem.privacy.title}
            </Link>
          </BreadcrumbItem>
        );
      }
      case `${SETTINGS_PATH}/wallpaper`: {
        return (
          <BreadcrumbItem>
            <Link to={breadcrumbItem.wallpaper.path}>
              {breadcrumbItem.wallpaper.title}
            </Link>
          </BreadcrumbItem>
        );
      }
    }
  };
  return (
    <Stack
      direction={"row"}
      width={"100%"}
      height={"100%"}
      padding={"16px"}
      className="bg-slate-200">
      <div className="flex flex-col w-full h-full gap-2 ">
        <div className="h-12 bg-white border border-solid  border-slate-300 rounded-[8px] flex items-center p-[8px_20px]">
          <Breadcrumbs>
            <BreadcrumbItem startContent={<House size={18} />}>
              Settings
            </BreadcrumbItem>
            {renderBreadcrumbs()}
          </Breadcrumbs>
        </div>
        <div className="flex-1 flex gap-2">
          <NavSettings />
          <div className="flex-1 bg-white border border-solid  border-slate-300 rounded-[8px] p-3">
            <Outlet />
          </div>
        </div>
      </div>
    </Stack>
  );
};

export default SettingsLayout;
