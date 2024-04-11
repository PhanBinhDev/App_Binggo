import React, { useEffect, useState } from "react";
import { handleGetHistoryLogApi } from "../../apis/accountHistory";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { ArrowsClockwise } from "@phosphor-icons/react";
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

const Devices = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchDeviceLog = async () => {
    try {
      setIsLoading(true);
      const response = await handleGetHistoryLogApi(userInfo._id);
      if (response.errCode === 0) {
        console.log(response.data);
        setDevices(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      setTimeout(() => setIsLoading(false), 1000);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDeviceLog();
  }, []);
  const handleRefresh = () => {
    // if (isLoading) return;
    console.log(navigator);
    setIsLoading(true);
    // setTimeout(() => setIsLoading(false), 2000);
  };
  console.log(isLoading);
  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-10 border-b-1 border-solid border-slate-300 text-xl font-bold px-1">
        Devices
      </div>
      <div className="flex-1 flex flex-col w-full gap-1">
        <div className="w-full h-1/2 p-3 ">
          <div className="flex flex-col gap-2 h-full">
            <div className="font-semibold h-10 rounded-md bg-green-400 justify-between flex items-center px-3">
              <span className="text-gray-800">Current Device</span>

              <IconButton onClick={handleRefresh}>
                <ArrowsClockwise
                  size={20}
                  className={`text-black ${isLoading && "animate-spin"}`}
                />
              </IconButton>
            </div>
            <div className="flex-1 rounded-lg bg-[#eef6fd] p-3 flex ">
              {isLoading ? (
                <div
                  role="status"
                  className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center w-full">
                  <div className="flex items-center justify-center w-full h-44 bg-gray-300 rounded sm:w-96 ">
                    <svg
                      className="w-10 h-10 text-gray-200 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18">
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                  <div className="w-full">
                    <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full  max-w-[480px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full  max-w-[440px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full  max-w-[460px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>
                  </div>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <div className="flex-1 w-full rounded-lg bg-white"></div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex-1 p-3">
          <div className="flex flex-col gap-2 h-full">
            <div className="font-semibold h-10 rounded-md bg-blue-400 justify-between flex items-center px-3">
              <span className="text-gray-800">Action logs</span>

              <IconButton onClick={handleRefresh}>
                <ArrowsClockwise
                  size={20}
                  className={`text-black ${isLoading && "animate-spin"}`}
                />
              </IconButton>
            </div>
            <div className="flex-1 bg-white rounded-lg py-2.5">
              <Table
                aria-label="Log history"
                radius="sm"
                className="h-full"
                removeWrapper>
                <TableHeader>
                  <TableColumn>Device name</TableColumn>
                  <TableColumn>Time</TableColumn>
                  <TableColumn>Status</TableColumn>
                  <TableColumn>Description</TableColumn>
                  <TableColumn>Action</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key="1">
                    <TableCell>Windows NT</TableCell>
                    <TableCell>0:09 11/4/2024</TableCell>
                    <TableCell>ON</TableCell>
                    <TableCell>Chroe 1.0.27</TableCell>
                    <TableCell>Log out</TableCell>
                  </TableRow>
                  <TableRow key="2">
                    <TableCell>Windows NT</TableCell>
                    <TableCell>1:09 11/4/2024</TableCell>
                    <TableCell>ON</TableCell>
                    <TableCell>Chrome 1.0.27</TableCell>
                    <TableCell>Log out</TableCell>
                  </TableRow>
                  <TableRow key="3">
                    <TableCell>Windows NT</TableCell>
                    <TableCell>3:09 11/4/2024</TableCell>
                    <TableCell>ON</TableCell>
                    <TableCell>Chrome 1.0.27</TableCell>
                    <TableCell>Log out</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Devices;
