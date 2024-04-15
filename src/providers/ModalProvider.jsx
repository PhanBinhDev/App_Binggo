import { useEffect, useState } from "react";
import ModalCreateGroup from "../components/Modal/ModalCreateGroup";
import { ToastContainer } from "react-toast";
import ModalSignOut from "../components/Modal/ModalSignOut.jsx";
import ModalEnterKey from "../components/Modal/ModalKeyAdmin.jsx";
import SubModalUpload from "../components/Modal/SubModalUpload.jsx";
import ModalSessionTimeOut from "../components/Modal/ModalSessionTimeout.jsx";
import ModalDeleteKey from "../components/Modal/ModalDeleteKey.jsx";
import ModalViewKey from "../components/Modal/ModalViewKey.jsx";
import ModalAddKey from "../components/Modal/ModalAddKey.jsx";
import ModalGallery from "../components/Modal/ModalGallery.jsx";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <ModalCreateGroup />
      <ModalSignOut />
      <ModalEnterKey />
      <SubModalUpload />
      <ModalSessionTimeOut />
      <ModalDeleteKey />
      <ModalViewKey />
      <ModalAddKey />
      <ModalGallery />
      <ToastContainer delay={3000} position="top-right" />
    </>
  );
};
