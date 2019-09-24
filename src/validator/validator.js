import validator from "validator";

export const isEmail = (value, cb) => {
  if (validator.isEmpty(value)) {
    cb("Enter email");
    return false;
  }
  if (!validator.isEmail(value)) {
    cb("Incorrect Email");
    return false;
  }
  return true;
};

export const isPassword = (value, cb) => {
  if (validator.isEmpty(value)) {
    cb("Enter password");
    return false;
  }
  if (!validator.isLength(value, { min: 6, max: undefined })) {
    cb("Short passwod. At least 6 letters");
    return false;
  }
  return true;
};

export const isEmpty = (value, message, cb) => {
  if (validator.isEmpty(value)) {
    cb(message);
    return false;
  }
  return true;
};

export const isEqual = (value1, value2, cb) => {
  if (!validator.equals(value1, value2)) {
    cb("Passwords does not match");
    return false;
  }
  return true;
};
