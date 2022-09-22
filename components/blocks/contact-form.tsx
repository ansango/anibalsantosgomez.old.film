import { onPostContactForm } from "../../lib/services/contact";
import { FC, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Container } from "..//util/container";
import { TinaTemplate } from "tinacms";

import {
  baseInputStyles,
  monoBordersColors,
  monoTextColors,
  monoRestColors,
  primaryHoverTextColors,
} from "../styles";
import { useTheme } from "../layout";

type Props = {
  lang?: string;
  data: any;
  parentField: string;
};

const toastSuccess = () =>
  toast("your message was sent! thanks!", {
    className: "rounded-none text-green-600 w-full",
    duration: 4000,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  });

const toastError = () =>
  toast("error sending your message.", {
    className: "rounded-none text-red-600", //TODO: MAQUETAR
    duration: 4000,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ),
  });

export const ContactForm: FC<Props> = ({ data, lang = "en" }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { mono, color } = useTheme();

  const [isSubmitting, setIsSubmitting] = useState(false); // TODO: Refactorizar
  const onSubmit = useCallback(
    async (contactForm) => {
      setIsSubmitting(true);
      try {
        await onPostContactForm({ contactForm, lang });
        setIsSubmitting(false);
        reset();
        toastSuccess();
      } catch (error) {
        setIsSubmitting(false);
        toastError();
      }
    },
    [reset, lang]
  );
  const areErrors = Object.keys(errors).length > 0;
  const disabled = isSubmitting || areErrors;
  return (
    <Container>
      <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 space-y-10 md:space-y-0 md:gap-10">
          <label className="col-span-12 md:col-span-6">
            <input
              type="text"
              className={`${baseInputStyles} ${
                errors.name
                  ? "focus:ring-0 focus:border-red-500 border-red-200"
                  : `${monoTextColors[600][mono]} ${monoRestColors.inputBg[mono]}`
              }`}
              placeholder="enter your name"
              {...register("name", { required: true, minLength: 3 })}
            />
            {errors.name?.type === "required" && (
              <span className="text-red-600">please enter your name</span>
            )}
            {errors.name?.type === "minLength" && (
              <span className="text-red-600">
                your name must be at least 3 characters long
              </span>
            )}
          </label>
          <label className="col-span-12 md:col-span-6">
            <input
              type="email"
              className={`${baseInputStyles} ${
                errors.mail
                  ? "focus:ring-0 focus:border-red-500 border-red-200"
                  : `${monoTextColors[600][mono]} ${monoRestColors.inputBg[mono]}`
              }`}
              placeholder="enter your email"
              {...register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              })}
            />
            {errors.email?.type === "required" && (
              <span className="text-red-600">please enter your email</span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="text-red-600">
                please enter a valid email address
              </span>
            )}
          </label>
          <label className="col-span-12">
            <textarea
              className={`${baseInputStyles} ${
                errors.message
                  ? "focus:ring-0 focus:border-red-500 border-red-200"
                  : `${monoTextColors[600][mono]} ${monoRestColors.inputBg[mono]}`
              }`}
              placeholder="say hello!"
              {...register("message", { required: true, minLength: 10 })}
              rows={4}
            ></textarea>
            {errors.message?.type === "required" && (
              <span className="text-red-600 dark:text-red-400">
                please enter a message
              </span>
            )}
            {errors.message?.type === "minLength" && (
              <span className="text-red-600 dark:text-red-400">
                your message must be at least 10 characters long
              </span>
            )}
          </label>
        </div>
        <button
          className="bg-gray-200 dark:bg-gray-800 hover:font-medium transition-all py-4 px-4 md:py-2 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          type="submit"
          disabled={disabled}
        >
          {isSubmitting && (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          send
        </button>
        <button
          type="submit"
          className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign in
        </button>
      </form>
    </Container>
  );
};

// TODO:  ACABAR y meter labels

export const contactFormSchema: TinaTemplate = {
  label: "Contact Form",
  name: "contactForm",
  fields: [
    {
      label: "Name",
      name: "name",
      type: "object",
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string",
        },
        {
          label: "Placeholder",
          name: "placeholder",
          type: "string",
        },
      ],
    },
    {
      label: "Email",
      name: "email",
      type: "object",
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string",
        },
        {
          label: "Placeholder",
          name: "placeholder",
          type: "string",
        },
      ],
    },
    {
      label: "Message",
      name: "message",
      type: "object",

      fields: [
        {
          label: "Label",
          name: "label",
          type: "string",
        },
        {
          label: "Placeholder",
          name: "placeholder",
          type: "string",
        },
      ],
    },
    {
      label: "Submit Button",
      name: "submit",
      type: "object",
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string",
        },

        {
          label: "Disabled",
          name: "disabled",
          type: "boolean",
        },
      ],
    },
  ],
};
