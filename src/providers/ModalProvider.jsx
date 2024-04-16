import { useEffect, useState } from "react";
import { ToastContainer } from "react-toast";
import ModalCreateGroup from "../components/Modal/ModalCreateGroup";
import ModalSignOut from "../components/Modal/ModalSignOut.jsx";
import ModalEnterKey from "../components/Modal/ModalKeyAdmin.jsx";
import ModalSessionTimeOut from "../components/Modal/ModalSessionTimeout.jsx";
import ModalDeleteKey from "../components/Modal/ModalDeleteKey.jsx";
import ModalViewKey from "../components/Modal/ModalViewKey.jsx";
import ModalAddKey from "../components/Modal/ModalAddKey.jsx";
import ModalGallery from "../components/Modal/ModalGallery.jsx";
import ModalSetupProfile from "../components/Modal/ModalSetupProfile.jsx";

import SubModalGallery from "../components/Modal/SubModalGallery.jsx";
import SubModalUpload from "../components/Modal/SubModalUpload.jsx";

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
      <ModalSessionTimeOut />
      <ModalDeleteKey />
      <ModalViewKey />
      <ModalAddKey />
      <ModalGallery />
      <ModalSetupProfile />
      {/* SubModal */}
      <SubModalUpload />
      <SubModalGallery />

      <ToastContainer delay={3000} position="top-right" />
    </>
  );
};
