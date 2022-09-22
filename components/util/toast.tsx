import { FC, useEffect, useState } from "react";
import toast, { Toaster, ToasterProps } from "react-hot-toast";
import { Icon } from "./icon";

export const Toast: FC<ToasterProps> = ({ position, ...props }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  return <>{isMounted && <Toaster position={position} {...props} />}</>;
};

export const baseToast = ({ message, duration, colorText, icon }) =>
  toast(message, {
    className: `rounded-xl bg-transparent w-full max-w-sm bg-neutral-50 dark:bg-neutral-800 ${colorText}`,
    duration,
    icon,
  });

export const toastSuccess = ({ duration = 4000, message = "Success!" }) =>
  baseToast({
    message,
    colorText: "text-green-600 dark:text-green-500",
    duration,
    icon: (
      <Icon
        data={{
          name: "check",
          size: "sm",
        }}
        className="text-green-600 dark:text-green-500"
      />
    ),
  });

export const toastError = ({ duration = 4000, message = "Error!" }) =>
  baseToast({
    message,
    colorText: "text-red-600 dark:text-red-500",
    duration,
    icon: (
      <Icon
        data={{
          name: "close",
          size: "sm",
        }}
        className="text-red-600 dark:text-red-500"
      />
    ),
  });
