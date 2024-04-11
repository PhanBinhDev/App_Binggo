import React from "react";
import { ModalProvider } from "./providers/ModalProvider";
import Router from "./routes";
import { AxiosInstance } from "./axios";
import { DeviceUUID } from "device-uuid";

function App() {
  const uuid = new DeviceUUID().get();
  localStorage.setItem("uuid", uuid);
  return (
    <AxiosInstance>
      <Router />
      <ModalProvider />
    </AxiosInstance>
  );
}

export default App;
