import React, { useState } from "react";
import googleText from "../../assets/images/google_text.png";
import {
  Button,
  Avatar,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { Tooltip } from "@mui/material";
import {
  Check,
  CheckCircle,
  CloudArrowUp,
  GenderFemale,
  GenderMale,
} from "@phosphor-icons/react";
import { useSelector } from "react-redux";
import { fDate } from "../../utils/formatTime";

const Details = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { createdAt, email, gender } = userInfo;
  const [genderType, setGenderType] = useState(gender.value);
  const handleChangeGender = (e) => {
    setGenderType(e.target.value);
  };

  const handleDeleteAccount = async () => {
    console.log(navigator);
  };
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="select-none h-10 border-b-1 border-solid border-slate-300 text-xl font-bold px-1">
        Profile
      </div>
      <div className="flex-1 flex w-full gap-4">
        <div className="flex w-[28%] flex-col gap-4">
          <div className="h-[250px] bg-white rounded-md border border-solid border-slate-300 flex-col flex">
            <div className="select-none h-[50px] border-b-1 border-solid border-slate-200 flex items-center justify-start pl-2.5 font-semibold">
              Your photo
            </div>
            <div className="flex-1 p-2 flex flex-col">
              <div className="h-[50px] flex items-center p-1 gap-2">
                <Avatar
                  size="md"
                  src="data:image/jpeg;base64,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"
                />
                <div className="h-full flex-1 flex flex-col justify-between">
                  <div className="text-sm font-medium">Edit your avatar</div>
                  <div className="text-xs flex gap-2 select-none">
                    <Tooltip
                      slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: "offset",
                              options: {
                                offset: [0, -8],
                              },
                            },
                          ],
                        },
                      }}
                      title="Delete your avatar">
                      <span className="cursor-pointer text-rose-500 p-[3px] hover:bg-rose-200 rounded-md">
                        Delete
                      </span>
                    </Tooltip>
                    <Tooltip
                      slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: "offset",
                              options: {
                                offset: [0, -8],
                              },
                            },
                          ],
                        },
                      }}
                      title="Update your avatar">
                      <span className="cursor-pointer text-blue-500 p-[3px] hover:bg-blue-200 rounded-md">
                        Update
                      </span>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="mt-2 p-1 flex-1">
                <label className="cursor-pointer select-none hover:bg-slate-100  text-xs text-slate-400 p-2 rounded-md border border-dashed border-gray-400 h-full gap-1 flex items-center justify-center flex-col">
                  <CloudArrowUp size={24} />
                  <span>
                    <span className="font-medium text-blue-500">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </span>
                  <p>PNG, SVG, JPG, JPEG or GIF</p>
                  <p>(max: 800x400px)</p>
                </label>
              </div>
            </div>
          </div>
          <div className="max-h-[150px] bg-white rounded-md border border-solid border-slate-300 flex flex-col">
            <div className="w-full h-[45%] flex items-center justify-between p-[8px_10px_4px_4px]">
              <div className="w-[35%]">
                <img src={googleText} className="object-cover" />
              </div>
              <div className="text-sm text-green-600 bg-green-200 rounded-[6px] p-[4px_8px] select-none">
                Connected
              </div>
            </div>
            <div className="flex-1 flex flex-col p-3 pt-2 pl-4">
              <span className="font-semibold text-sm mb-1">Google</span>
              <p className="text-xs">Use google to sign in your account</p>
            </div>
          </div>
          <div className="w-full max-h-[80px] p-3 bg-white rounded-md border border-solid border-slate-300 flex items-center justify-between gap-1 select-none">
            <div className="flex flex-col ">
              <span className="text-sm font-semibold">Gia nhập Binggo từ</span>
              <span className="text-zinc-500 text-xs mt-1">
                {fDate(createdAt)}
              </span>
            </div>
            <CheckCircle size={24} color="#00ff2a" weight="fill" />
          </div>
        </div>
        <div className="flex-1 bg-white flex flex-col">
          <div className="rounded-md border border-solid border-slate-300 h-full flex flex-col">
            <div className="select-none h-[50px] border-b-1 border-solid border-slate-200 flex items-center justify-start pl-2.5 font-semibold">
              Personal Info
            </div>
            {/* info here */}
            <div className="flex-1  flex gap-2 max-h-[428px] ">
              <div className="flex flex-col border-r-1 border-solid border-slate-300 p-3 overflow-hidden overflow-y-auto min-w-[60%]">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="block mb-1.5 text-sm font-medium text-gray-900 text-nowrap">
                    Email
                  </label>
                  <Input
                    isDisabled
                    type="email"
                    value={email.value}
                    endContent={
                      <div className="flex items-center justify-center gap-2 select-none text-sm">
                        <span>Verified</span>
                        <CheckCircle size={22} color="#00ff2a" />
                      </div>
                    }
                    variant="bordered"
                    className="w-full bg-[#f9f9fa] border border-gray-400 border-solid rounded-[8px] select-none"
                  />
                  <div className="absolute"></div>
                </div>
                <div className="flex gap-2 mt-2">
                  <div className="mt-2.5 w-[65%]">
                    <label
                      htmlFor="first_name"
                      className="block mb-1.5 text-sm font-medium text-gray-900 text-nowrap">
                      Display name
                    </label>
                    <Input
                      type="text"
                      value={email.value}
                      defaultValue="Your name"
                      variant="bordered"
                      className="w-full bg-[#f9f9fa] border border-gray-400 border-solid rounded-[8px] select-none"
                    />
                  </div>
                  <div className="mt-2.5 flex-1">
                    <label
                      htmlFor="first_name"
                      className="block mb-1.5 text-sm font-medium text-gray-900 text-nowrap">
                      Gender
                    </label>
                    <Select
                      radius="sm"
                      onChange={handleChangeGender}
                      selectedKeys={[genderType]}
                      defaultSelectedKeys={[genderType]}
                      aria-label="Select gender"
                      placeholder="Select an animal"
                      className="max-w-full bg-[#f9fafb] border border-gray-400 border-solid rounded-[8px] ">
                      <SelectItem
                        key={"M"}
                        startContent={<GenderMale size={20} />}
                        color="success">
                        Male
                      </SelectItem>
                      <SelectItem
                        key={"FM"}
                        startContent={<GenderFemale size={20} />}
                        color="primary">
                        Female
                      </SelectItem>
                      <SelectItem
                        key={"U"}
                        startContent={<GenderFemale size={20} />}>
                        Unknown
                      </SelectItem>
                    </Select>
                  </div>
                </div>
                <div className="flex-1 flex flex-col mt-3">
                  <label
                    for="message"
                    class="block mb-2 text-sm font-medium text-gray-900">
                    Bio
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="Write your thoughts here..."></textarea>
                </div>
              </div>
              <div className="flex-1 p-[12px_12px_12px_4px] flex flex-col gap-2">
                <div className="h-[150px] w-full rounded-lg bg-slate-100"></div>
                <div className="w-full rounded-lg bg-slate-100 p-3 gap-2 flex flex-col">
                  <h3 className="font-semibold text-sm">Delete Account</h3>
                  <p className="text-xs">
                    You can permanently delete your account
                  </p>
                  <Button
                    size="sm"
                    variant="flat"
                    color="danger"
                    className="mt-1 font-bold rounded-[6px]"
                    onPress={handleDeleteAccount}
                    fullWidth>
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* Actions */}
          <div className="min-h-[50px] flex items-center justify-end mt-1 gap-2">
            <Button variant="flat" className="rounded-[6px] min-w-[130px]">
              Reset
            </Button>
            <Button color="primary" className="rounded-[6px] min-w-[130px]">
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
