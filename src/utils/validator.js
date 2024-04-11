import validator from "validator";

const validateEmail = (email) => {
  let message = "";
  if (!validator.isEmail(email)) {
    message = "Please enter a valid email address.";
  }
  return message;
};

export { validateEmail };
