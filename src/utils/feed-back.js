import { message } from "antd";

message.config({
  duration: 1,
  maxCount: 3
});
console.log("hello");

const successMessage = msg => {
  return message.success(msg);
};

const errorMessage = msg => {
  return message.error(msg);
};

const warningMessage = msg => {
  return message.warning(msg);
};

export { successMessage, errorMessage, warningMessage };
