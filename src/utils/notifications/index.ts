import { toast } from "react-hot-toast";

const successNotification = (message: string, id?: string) => {
  return toast.success(message, {
    id,
    style: {
      textAlign: "center",
    },
  });
};

const blankNotification = (message: string, id?: string): string => {
  return toast(message, {
    id,
    style: {
      textAlign: "center",
    },
  });
};

const errorNotification = (message: string, id?: string): string => {
  return toast.error(message, {
    id,
    style: {
      textAlign: "center",
    },
  });
};

const loadingNotification = (message: string, id?: string): string => {
  return toast.loading(message, {
    id,
    style: {
      textAlign: "center",
    },
  });
};

export { blankNotification, errorNotification, loadingNotification, successNotification };
