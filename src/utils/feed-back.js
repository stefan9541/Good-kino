import { message } from "antd";

message.config({
  duration: 2,
  maxCount: 3
});

const successMessage = msg => {
  return message.success(msg);
};

const errorMessage = msg => {
  return message.error(msg);
};

export {
  successMessage,
  errorMessage
};
