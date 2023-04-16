import { toast } from "react-toastify";
import { alertProperties } from "../Data/alertProps";

export const notify = (message: string, type?: any) => {
  if (type === "success") {
    toast.success(message, alertProperties);
    console.log("success");
  } else if (type === "info") toast.info(message, alertProperties);
  else if (type === "warn") toast.warn(message, alertProperties);
  else if (type === "error") toast.error(message, alertProperties);
  else toast(message, alertProperties);
};
