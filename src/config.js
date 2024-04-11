// @mui
import { enUS, viVN } from "@mui/material/locale";

// routes
import { PATH_DASHBOARD } from "./routes/paths";

export const allLangs = [
  {
    label: "English",
    value: "en",
    systemValue: enUS,
    // icon: "/assets/icons/flags/ic_flag_en.svg",
  },
  {
    label: "Vietnamese",
    value: "vn",
    systemValue: viVN,
    // icon: "/assets/icons/flags/ic_flag_vn.svg",
  },
];

export const defaultLang = allLangs[1]; // Vietnamese

// DEFAULT ROOT PATH
export const DEFAULT_PATH = PATH_DASHBOARD.general.app; // as '/app/chat'
export const DEFAULT_SETUP_PATH = PATH_DASHBOARD.general.setup; // as '/app/chat'
export const SETTINGS_PATH = PATH_DASHBOARD.general.settings; // as '/app/settings'
export const CHAT_PATH = PATH_DASHBOARD.general.chatRoom; // as '/app/chat/:chatId'
export const AUTH_PATH = PATH_DASHBOARD.general.auth; // as '/auth'
export const FRIENDS_PATH = PATH_DASHBOARD.general.friends; // as '/app/friends'
export const HISTORY_PATH = PATH_DASHBOARD.general.history; // as '/app/history'
export const SETUP_INFO_PATH = PATH_DASHBOARD.general.setup; // as /app/setup-info
