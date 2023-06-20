import { toast } from "react-toastify";
import { ToastVariants } from "../utils/constants";

const useToast = () => {
  const showToast = (description, variant = "info") => {
    const toastOptions = {
      theme: "colored",
    };

    switch (variant) {
      case ToastVariants.success:
        toast.success(description, toastOptions);
        break;
      case ToastVariants.warning:
        toast.warn(description, toastOptions);
        break;
      case ToastVariants.error:
        toast.error(description, toastOptions);
        break;
      case ToastVariants.info:
        toast.info(description, toastOptions);
        break;
      default:
        toast.info(description, toastOptions);
    }
  };

  return {
    showToast,
  };
};

export default useToast;
