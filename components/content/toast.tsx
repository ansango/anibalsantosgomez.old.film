import { type FC } from "react";
import toast, { Toaster, ToasterProps } from "react-hot-toast";
import { useMounted } from "lib/hooks";
import { Icon } from "components";

export const Toast: FC<ToasterProps> = ({ position, ...props }) => {
  const isMounted = useMounted();
  return <>{isMounted && <Toaster position={position} {...props} />}</>;
};

export const baseToast = ({ message, duration, className, icon }) =>
  toast(message, {
    className: `toast ${className}`,
    duration,
    icon,
  });

export const toastSuccess = ({ duration = 4000, message = "Success!" }) =>
  baseToast({
    message,
    className: "toast-success",
    duration,
    icon: (
      <Icon
        data={{
          name: "check",
          size: "sm",
        }}
        className="toast-success"
      />
    ),
  });

export const toastError = ({ duration = 4000, message = "Error!" }) =>
  baseToast({
    message,
    className: "toast-error",
    duration,
    icon: (
      <Icon
        data={{
          name: "close",
          size: "sm",
        }}
        className="toast-error"
      />
    ),
  });
