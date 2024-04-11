export const formatFileSize = (bytes) => {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const sleep = (ms = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const formatHideEmail = (email) => {
  if (!email || email === "" || typeof email !== "string")
    return "example@gmail.com";
  const atIndex = email?.indexOf("@");
  const userName = email.substring(0, atIndex);
  const maskedUsername =
    userName.charAt(0) + "*".repeat(5) + userName.charAt(userName.length - 1);
  const domain = email.substring(atIndex);
  return maskedUsername + domain;
};

export const getInfoDevice = () => {
  const deviceInfo = {
    deviceType: "",
    deviceName: "",
    operatingSystem: "",
    location: {},
  };

  // Xác định loại thiết bị
  const regex = /\(.*?\)/g;
  if (/Mobi/.test(navigator.userAgent)) {
    deviceInfo.deviceType = "Mobile";
  } else if (/Tablet/.test(navigator.userAgent)) {
    deviceInfo.deviceType = "Tablet";
  } else {
    deviceInfo.deviceType = "Desktop";
  }

  // Xác định tên thiết bị
  const deviceNames = navigator.userAgent.match(regex);
  deviceInfo.deviceName = deviceNames[0].slice(1, -1);

  // Xác định hệ điều hành
  const operatingSystems = {
    Windows: /Win/,
    Mac: /Mac/,
    Linux: /Linux/,
  };

  for (const osName in operatingSystems) {
    if (operatingSystems[osName].test(navigator.platform)) {
      deviceInfo.operatingSystem = osName;
      break;
    }
  }
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        deviceInfo.location = {
          latitude,
          longitude,
        };
      },
      (error) => {
        console.error("Lỗi khi lấy vị trí:", error);
      }
    );
  } else {
    console.error("Trình duyệt không hỗ trợ Geolocation.");
  }

  return deviceInfo;
};
