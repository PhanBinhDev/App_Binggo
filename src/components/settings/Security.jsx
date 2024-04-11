import { IconButton, Tooltip } from "@mui/material";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import {
  ClipboardText,
  Copy,
  DotsThreeOutlineVertical,
  Plus,
} from "@phosphor-icons/react";
import React, { useState } from "react";
import { icons } from "../../utils/icons";
import { ModalTypes } from "../../constants";
import { useModal } from "../../hooks/useModal";
const { LuCopy, LuCheck, MdOutlineDeleteOutline, MdOutlineRemoveRedEye } =
  icons;
const ListboxWrapper = ({ children }) => (
  <div className="w-full min-w-[150px] max-w-[260px] border-small rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

const Security = () => {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { onOpen } = useModal();
  const handleCopy = () => {
    if (!copied) {
      setCopied(true);
    }
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };
  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-10 border-b-1 border-solid border-slate-300 text-xl font-bold px-1">
        Security
      </div>
      <div className="flex-1 flex w-full ">
        <div className="w-4/5  p-3 pl-0 pr-1.5">
          <div className="rounded-[8px] border-solid border border-slate-300 h-full flex flex-col p-3">
            <div className="w-full min-h-[44%] max-h- rounded-[6px] border-slate-300 border-solid border">
              <div className="font-semibold text-base h-12 flex items-center pl-3 pr-2 border-slate-300 border-solid border-b-1 select-none">
                <span>Secret key</span>
                <Tooltip title="Add new secret key">
                  <Button
                    onPress={() => onOpen(ModalTypes.addKey)}
                    className="ml-auto font-semibold rounded-[5px]"
                    size="sm"
                    color="success"
                    radius="sm"
                    endContent={<Plus size={18} />}>
                    New Key
                  </Button>
                </Tooltip>
              </div>
              <div className="h-[calc(100%-48px)]">
                <div className="flex flex-col overflow-y-auto w-full h-full p-3 gap-[6px]">
                  <div className="flex p-2 items-center w-full h-[50px] rounded-[6px] bg-slate-100 transition-background cursor-pointer group hover:bg-slate-200 border-solid border-slate-200 border">
                    <div className="relative h-full flex items-center justify-between w-full">
                      <div className="relative h-full flex items-center">
                        <span className="max-w-[150px] overflow-hidden text-ellipsis">
                          kjasdhkasdhkasdhkasdhkaskdasd
                        </span>
                        <Popover
                          isOpen={copied}
                          radius="sm"
                          className="rounded-[8px]">
                          <PopoverTrigger>
                            <IconButton
                              className="absolute -right-8 rounded-lg p-1.5"
                              onClick={handleCopy}>
                              {copied ? (
                                <LuCheck size={18} />
                              ) : (
                                <LuCopy size={18} />
                              )}
                            </IconButton>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="px-0.5 py-1">Copied</div>
                          </PopoverContent>
                        </Popover>
                        <div className="absolute -right-24 p-[4px_8px] bg-green-100 rounded-md text-xs font-bold text-green-600 select-none">
                          Active
                        </div>
                      </div>
                      <div className="ml-auto h-full min-w-20 flex items-center justify-end">
                        <Popover
                          isOpen={isOpen}
                          placement="top"
                          onOpenChange={(open) => setIsOpen(open)}
                          // className="rounded-[6px]"
                          radius="sm">
                          <PopoverTrigger>
                            {/* <div className="rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-background text-white p-1 text-sm select-none">
                            </div> */}
                            <IconButton className="p-1 rounded-md">
                              <DotsThreeOutlineVertical
                                size={18}
                                weight="fill"
                              />
                            </IconButton>
                          </PopoverTrigger>
                          <PopoverContent className="p-1">
                            <ListboxWrapper>
                              <Listbox
                                aria-label="Actions"
                                onAction={(key) => {
                                  setIsOpen(false);
                                  onOpen(key);
                                }}>
                                <ListboxItem
                                  className="rounded-[5px]"
                                  key={ModalTypes.viewKey}
                                  startContent={
                                    <MdOutlineRemoveRedEye size={20} />
                                  }>
                                  View Key
                                </ListboxItem>
                                <ListboxItem
                                  key={ModalTypes.deleteKey}
                                  className="text-danger rounded-[5px]"
                                  startContent={
                                    <MdOutlineDeleteOutline size={20} />
                                  }
                                  color="danger">
                                  Delete Key
                                </ListboxItem>
                              </Listbox>
                            </ListboxWrapper>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 p-3 pr-0 pl-1.5">
          <div className="rounded-[8px] border-solid border border-slate-300 h-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Security;
