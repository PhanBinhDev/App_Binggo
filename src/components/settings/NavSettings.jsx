import { Avatar, Button, Divider } from "@nextui-org/react";
import React, { useState } from "react";
import { Nav_Setting } from "../../data";
import { Link, useLocation } from "react-router-dom";

const NavSettings = () => {
  const [tabActive, setTabActive] = useState(Nav_Setting[0].id);
  const location = useLocation();
  return (
    <div className="max-w-[220px] h-full bg-white p-3 gap-2 flex flex-col rounded-[8px] border border-solid border-slate-300">
      {Nav_Setting.map((nav) => {
        const isActive = nav.link === location.pathname;
        return (
          <Button
            onPress={() => setTabActive(nav.id)}
            key={nav.id}
            className={`min-w-[180px] font-semibold text-md w-full hover:bg-blue-200  p-0 rounded-[8px] ${
              isActive ? "bg-blue-200 text-blue-700" : "bg-white text-black"
            }`}
            size="md"
            color={isActive ? "primary" : "default"}>
            <Link
              to={nav.link}
              className="flex w-full h-full justify-start items-center px-4">
              {nav.title}
            </Link>
          </Button>
        );
      })}
    </div>
  );
};

export default NavSettings;
