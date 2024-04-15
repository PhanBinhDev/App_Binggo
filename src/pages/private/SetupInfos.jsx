import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Divider,
  Image,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Badge,
} from "@nextui-org/react";
import {
  ArrowRight,
  Check,
  CheckCircle,
  GearSix,
  User,
  UserGear,
  MessengerLogo,
  Upload,
  UserCircle,
  Image as ImagePhoto,
  Trash,
  CaretDown,
  GenderMale,
  GenderFemale,
  GenderIntersex,
  Detective,
} from "@phosphor-icons/react";
import logo from "../../assets/images/logo.ico";
import { ModalTypes } from "../../constants";
import { useModal } from "../../hooks/useModal";
import { useDispatch, useSelector } from "react-redux";
import { handleGetGalleryApi } from "../../apis/gallery";
import { toast } from "react-toast";
import { handleGetCurrentUserApi } from "../../apis/auth";
const tabCase = {
  avatar: "avatar",
  accounts: "accounts",
  settings: "settings",
};
const menuTabs = [
  {
    index: 1,
    icon: <User size={20} weight="fill" className="text-slate-600" />,
    completedIcon: (
      <CheckCircle size={20} weight="fill" className="text-blue-600" />
    ),
    label: "1. Account Info",
    completed: false,
    activated: true,
    divider: true,
    get textStatus() {
      return this.completed ? "Completed" : this.activated ? "Current" : "";
    },
    nextStep: false,
  },
  {
    index: 2,
    icon: <GearSix size={20} weight="fill" className="text-slate-600" />,
    completedIcon: (
      <CheckCircle size={20} weight="fill" className="text-blue-600" />
    ),
    label: "2. Preference",
    completed: false,
    divider: true,
    activated: false,
    get textStatus() {
      return this.completed ? "Completed" : this.activated ? "Current" : "";
    },
  },
  {
    index: 3,
    icon: <MessengerLogo size={20} weight="fill" className="text-slate-600" />,
    completedIcon: (
      <CheckCircle size={20} weight="fill" className="text-blue-600" />
    ),
    label: "3. Finish",
    completed: false,
    activated: false,
    divider: false,
    get textStatus() {
      return this.completed ? "Completed" : this.activated ? "Current" : "";
    },
  },
];

const genders = [
  {
    index: 1,
    type: "Male",
    icon: <GenderMale size={24} weight="bold" />,
    selected: false,
    value: "M",
  },
  {
    index: 2,
    type: "Female",
    icon: <GenderFemale size={24} weight="bold" />,
    selected: false,
    value: "F",
  },
  {
    index: 3,
    type: "Intersex",
    icon: <GenderIntersex size={24} weight="bold" />,
    selected: false,
    value: "I",
  },
  {
    index: 4,
    type: "Decline to answer",
    icon: <Detective size={24} weight="bold" />,
    selected: false,
    value: "Unknown",
  },
];

const defaultLinkAvatar =
  "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";

const SetupInfoPage = () => {
  const { onOpen, data, updateData } = useModal();
  const [dataImage, setDataImage] = useState({});
  const uploadRef = useRef(null);
  useEffect(() => {
    setDataImage(data);
    setInfo((prev) => ({
      ...prev,
      avatar: data?.value,
    }));
  }, [data]);
  const { userInfo } = useSelector((state) => state.auth);
  const [tabSetup, setTabSetup] = useState(menuTabs);
  const [gendersRender, setGendersRender] = useState(genders);
  const [fileURL, setFileURL] = useState("");
  const [info, setInfo] = useState({
    userName: "",
    bio: "",
    avatar: "",
    gender: gendersRender.find((gender) => gender.selected)?.value || "",
  });
  const [error, setError] = useState({
    userName: {
      error: false,
      message: "",
    },
    avatar: {
      error: false,
      message: "",
    },
    gender: {
      error: false,
      message: "",
    },
  });
  const { email } = userInfo;
  const [isLoading, setIsLoading] = useState(false);
  const tabActivated = tabSetup.find((item) => item.activated);
  const handleForwardStep = () => {
    const tabCurrent = tabSetup.find((item) => item.activated);
    const updateStep = [...tabSetup];
    if (tabCurrent.index > 1) {
      // được back

      updateStep.forEach((step) => {
        step.activated = step.index === tabCurrent.index - 1 ? true : false;
        step.completed = step.index >= tabCurrent.index - 1 ? false : true;
      });
      setTabSetup(updateStep);
    }
  };
  const handleNextStep = () => {
    const updateStep = [...tabSetup];
    const tabCurrent = tabSetup.find((item) => item.activated);
    if (tabCurrent.index < tabSetup.length) {
      if (tabCurrent.completed) {
        updateStep.forEach((item) => {
          item.activated = item.index === tabCurrent.index + 1 ? true : false;
        });
        setTabSetup(updateStep);
      } else {
        toast.warn("Bạn cần hoàn thành các bước trước đó");
      }
    } else {
      console.log("finish");
    }
  };
  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileURL(e.target.result);
        updateData({});
        setInfo((prev) => ({
          ...prev,
          avatar: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleChangeTabStep = (index) => {
    const prevTabClick = tabSetup.find((item) => item.index === index - 1);
    const tabCurrent = tabSetup.find((item) => item.activated);

    const updateStep = [...tabSetup];
    if (tabCurrent.index > index) {
      // case click back lại
      if (tabCurrent.index > 1) {
        updateStep.forEach((step) => {
          step.activated = step.index === index ? true : false;
          step.completed = step.index >= index ? false : true;
        });
        setTabSetup(updateStep);
      }
    } else if (tabCurrent.index < index) {
      // click next
      if (tabCurrent.index < tabSetup.length) {
        if (prevTabClick.completed) {
          updateStep.forEach((item) => {
            item.activated = item.index === index ? true : false;
          });
          setTabSetup(updateStep);
        } else {
          toast.warn("Bạn cần hoàn thành các bước trước đó");
        }
      }
    }
  };
  const handleError = (type, message) => {
    setError((prev) => {
      return {
        ...prev,
        [type]: {
          error: true,
          message,
        },
      };
    });
  };

  const handleSave = () => {
    setError({
      userName: {
        error: false,
        message: "",
      },
      avatar: {
        error: false,
        message: "",
      },
      gender: {
        error: false,
        message: "",
      },
    });
    const itemTypes = ["avatar", "gender", "userName"];
    const itemMessage = [
      "Cập nhập ảnh đại diện",
      "lựa chọn giới tính",
      "cung cấp tên",
    ];
    const { gender, avatar, bio, userName } = info;
    [avatar, gender, userName].forEach((item, index) => {
      const type = itemTypes[index];
      const message = itemMessage[index];
      if (!item) {
        handleError(type, `Vui lòng ${message}`);
        toast.error(`Vui lòng ${message}`);
      }
    });
    const arrError = Object.values(error);
    const hasError = arrError.some((item) => item.error);

    console.log({
      info,
      error,
    });
    if (hasError) {
      return;
    }
    // ok has data  to upload
    setIsLoading(true);
    setTimeout(() => {
      if (!tabSetup.find((item) => item.activated).completed) {
        setTabSetup((prev) => {
          const newUpdateTab = prev.map((item) => {
            if (item.index === tabSetup.find((item) => item.activated).index) {
              item.completed = true;
            }
            return item;
          });
          return [...prev];
        });
      }
      toast.success("Save info successfully!");
      setIsLoading(false);
    }, 2000);
  };
  const fetchCurrentUser = async () => {
    try {
      const res = await handleGetCurrentUserApi();
      console.log(res);
    } catch (error) {}
  };
  const handleResetData = () => {
    setInfo({
      userName: "",
      bio: "",
      avatar: "",
      gender: "",
    });
  };
  const handleChooseGender = (index) => {
    const updateGenders = [...genders];
    updateGenders.forEach((item) => (item.selected = item.index === index));
    setGendersRender(updateGenders);
    setInfo((prev) => {
      return {
        ...prev,
        gender: updateGenders.find((gender) => gender.selected)?.value || "",
      };
    });
  };
  const handleSelectOptions = (key) => {
    if (key === "upload") {
      uploadRef.current.click();
    } else {
      onOpen(ModalTypes.gallery);
    }
  };
  const handleRemoveAvatar = () => {
    setFileURL("");
    updateData({});
    setInfo((prev) => ({
      ...prev,
      avatar: "",
    }));
  };
  const renderContentTab = () => {
    switch (tabActivated.index) {
      case 1:
        return (
          <div className="w-full h-full flex gap-4">
            <div className="lg:w-1/4 hidden lg:flex rounded-lg shadow-sm bg-white"></div>
            <div className="flex-1 rounded-lg shadow-sm bg-white flex flex-col">
              <div className="h-12 flex items-center justify-start px-4 py-1 gap-1.5">
                <UserCircle size={20} />
                <span className="text-md font-bold py-2 select-none">
                  Account setup
                </span>
              </div>
              <div className="flex-1 p-3 pt-0 flex gap-2">
                <div className=" h-full flex flex-col border border-solid border-slate-200 p-3 rounded-md">
                  {/* options */}
                  <div className="h-[100px] min-h-[100px] w-full flex max-w-[300px] gap-2">
                    <div className="min-w-[100px] w-[110px] flex items-center justify-center ">
                      <div>
                        <img
                          src={dataImage?.value || fileURL || defaultLinkAvatar}
                          className="object-cover w-full h-full rounded-full"
                        />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2 justify-center">
                      <Dropdown
                        textValue=""
                        className="rounded-md"
                        classNames={{
                          content: "max-w-[170px]",
                        }}>
                        <DropdownTrigger>
                          <Button
                            className="rounded-md"
                            endContent={<CaretDown size={20} />}
                            color="primary">
                            Options
                            <input
                              ref={uploadRef}
                              type="file"
                              hidden
                              onChange={(e) => handleChangeAvatar(e)}
                            />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          textValue=""
                          aria-label="Options"
                          onAction={(key) => handleSelectOptions(key)}
                          className="">
                          <DropdownItem
                            startContent={<Upload size={20} />}
                            key="upload"
                            className="rounded-md">
                            Upload
                          </DropdownItem>

                          <DropdownItem
                            startContent={<ImagePhoto size={20} />}
                            key="gallery"
                            className="rounded-md">
                            Gallery
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                      <Button
                        className="rounded-md"
                        color="danger"
                        onPress={handleRemoveAvatar}
                        endContent={<Trash size={20} />}
                        variant="bordered">
                        Remove
                      </Button>
                    </div>
                  </div>
                  <Divider className="my-2" />

                  {/* gender */}
                  <div className="flex-1  rounded-[4px] flex flex-col">
                    <div className="h-10 flex items-center justify-start px-2.5  bg-zinc-200 rounded-[5px]">
                      <h3 className="text-md font-semibold">
                        Select your gender
                      </h3>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-3 mt-3 p-1 rounded-md ">
                      {gendersRender.map((item) => {
                        const { selected, icon, type, index } = item;
                        return (
                          <div
                            key={index}
                            onClick={() => handleChooseGender(index)}
                            className={`col-span-1 relative p-1  hover:bg-blue-100 transition-background flex flex-col  border-2 border-solid ${
                              selected
                                ? "border-blue-600 "
                                : "border-transparent"
                            } rounded-lg cursor-pointer shadow-medium`}>
                            <div
                              className={`absolute size-4 flex items-center justify-center rounded-full border-2 border-solid border-blue-500 transition-background right-1.5`}>
                              <div
                                className={`size-2 rounded-full ${
                                  selected ? "bg-blue-500" : "bg-white"
                                }`}></div>
                            </div>
                            <div
                              className={`h-[50px] flex items-center justify-center ${
                                selected ? "text-blue-500" : "text-zinc-700"
                              }`}>
                              {icon}
                            </div>
                            <div className="flex-1 flex items-center justify-center">
                              <span
                                className={`text-xs font-semibold select-none ${
                                  selected ? "text-blue-500" : "text-zinc-700"
                                }`}>
                                {type}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {/* info */}
                <div className="flex-1 p-3 pt-4 rounded-md border-solid border-1 border-slate-200 flex flex-col">
                  <div className="flex-1">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="display_name"
                          className="block mb-2 text-sm font-semibold text-gray-900 ">
                          Display name
                        </label>
                        <input
                          type="text"
                          autoFocus={true}
                          id="display_name"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                          placeholder="John"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-semibold text-gray-900 ">
                          Email
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="email"
                            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                            value={email.value}
                            disabled
                          />
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 select-none flex items-center text-green-600 gap-2">
                            <span className="text-sm">Verified</span>
                            <CheckCircle size={20} />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="message"
                          className="block mb-2 text-sm font-medium text-gray-900 ">
                          Bio
                        </label>
                        <textarea
                          id="message"
                          rows="4"
                          className="block p-2.5  w-full text-sm min-h-[100px] max-h-[210px] text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Write your thoughts here..."></textarea>
                      </div>
                      <div className="flex flex-col min-h-[238px]">
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900 ">
                          Coming soon
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                          placeholder="Coming soon"
                          required
                          disabled
                        />
                        <div className="mt-auto gap-2 flex justify-end items-center pt-2 pl-2">
                          <Button
                            color="default"
                            variant="light"
                            isDisabled={isLoading}
                            className="rounded-md">
                            Reset
                          </Button>
                          <Button
                            onPress={handleSave}
                            isLoading={isLoading}
                            color="secondary"
                            variant="solid"
                            className="rounded-md">
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="w-full h-full flex">
            <div className="w-1/3 shadow-sm bg-teal-100 rounded-md"></div>;
          </div>
        );
      case 3:
        return <></>;
      default:
        return <>Loading...</>;
    }
  };

  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center bg-[#eef1fb] p-4">
      {/* Header */}
      <div className="w-full min-h-[134px] rounded-md bg-white flex flex-col shadow-sm">
        <div className="flex justify-between items-center border-solid border-b-1 border-slate-200  p-[12px_20px]">
          <h2 className="font-bold text-lg">Create your consultant profile</h2>
          <Button
            onPress={() => onOpen(ModalTypes.signOut)}
            variant="solid"
            color="danger"
            size="sm"
            radius="sm"
            className="min-w-20 rounded-md">
            Log out
          </Button>
        </div>
        <div className="flex-1 p-3 flex items-center gap-3 ">
          {tabSetup.map((tabStep) => {
            const hasDivider = tabStep.divider;
            return (
              <React.Fragment key={tabStep.index}>
                <div
                  onClick={() => handleChangeTabStep(tabStep.index)}
                  className={`${
                    tabStep.activated
                      ? "bg-slate-200 hover:bg-slate-100 cursor-pointer"
                      : !tabStep.completed
                      ? "opacity-80 "
                      : "cursor-pointer bg-slate-100 hover:bg-slate-50"
                  } w-1/3 rounded-md  h-full  transition-background  flex py-1 px-2 flex-col`}>
                  <h6
                    className={`${
                      tabStep.completed ? "text-green-600" : "text-zinc-600"
                    }  font-bold text-xs min-h-4`}>
                    {tabStep.textStatus}
                  </h6>
                  <div className="flex-1 flex items-center  justify-between text-sm text-gray-900 font-extrabold">
                    <div className="flex gap-1 select-none">
                      {tabStep.icon}
                      <span>{tabStep.label}</span>
                    </div>
                    {tabStep.completed && (
                      <CheckCircle
                        size={20}
                        weight="fill"
                        className="text-blue-600"
                      />
                    )}
                  </div>
                </div>
                {hasDivider && <Divider orientation="vertical" />}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="w-full flex-1 rounded-md flex flex-col">
        {renderContentTab()}
      </div>

      {/* control */}
      <div className="bg-white shadow-sm rounded-md w-full flex items-center justify-between px-5 py-3 border-t-1 border-solid border-slate-200">
        <Button
          className="rounded-md min-w-24"
          onPress={handleForwardStep}
          isDisabled={tabActivated.index === 1}>
          Back
        </Button>
        <div
          onClick={() => {
            if (tabSetup.find((item) => item.activated).completed) {
              return;
            }
            setTabSetup((prev) => {
              const newUpdateTab = prev.map((item) => {
                if (
                  item.index === tabSetup.find((item) => item.activated).index
                ) {
                  item.completed = true;
                }
                return item;
              });
              console.log("new", newUpdateTab);
              return [...prev];
            });
          }}
          className="text-gray-800 font-semibold">
          ok
        </div>
        <Button
          className="rounded-md min-w-24"
          color="primary"
          isDisabled={!tabActivated.completed}
          onPress={handleNextStep}>
          {tabActivated.index === tabSetup.length ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default SetupInfoPage;
