import { toast, Bounce } from "react-toastify";

const showToast = (message, type) => {
  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  };

  switch (type) {
    case "success":
      toast.success(message, toastOptions);
      break;
    case "info":
      toast.info(message, toastOptions);
      break;
    case "warning":
      toast.warn(message, toastOptions);
      break;
    case "error":
      toast.error(message, toastOptions);
      break;
    default:
      toast(message, toastOptions);
  }
};

export default showToast;
