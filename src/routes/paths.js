// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = "/";

const appPath = path(ROOTS_DASHBOARD, "app");
const chatPath = path(ROOTS_DASHBOARD, "app/chat");
const setupPath = path(ROOTS_DASHBOARD, "app/setup-info");
const authPath = path(ROOTS_DASHBOARD, "auth");
const adminPath = path(ROOTS_DASHBOARD, "admin-panel");

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: chatPath,
    setup: setupPath,
    auth: authPath,
    settings: path(appPath, "/settings"),
    chatRoom: path(chatPath, `/:chatId`),
    history: path(appPath, `/history`),
    friends: path(appPath, `/friends`),
    dashboard: path(adminPath),
  },
};
