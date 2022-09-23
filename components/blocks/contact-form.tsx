import { onPostContactForm } from "../../lib/services/contact";
import { FC, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Container } from "..//util/container";
import { TinaTemplate } from "tinacms";

import {
  baseInputStyles,
  monoTextColors,
  monoRestColors,
  baseButtonStyles,
  buttonPrimaryColors,
  monoBordersColors,
} from "../styles";
import { useTheme } from "../layout";
import { Section } from "../util/section";
import { Spinner } from "../util/spinner";
import { Toast, toastError, toastSuccess } from "../util/toast";

type Props = {
  lang?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  parentField: string;
};

export const ContactForm: FC<Props> = ({ data, parentField, lang = "en" }) => {
  const { mono, color } = useTheme();
  const { email, fullName, message, submit } = data;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const areErrors = Object.keys(errors).length > 0;
  const disabled = isSubmitting || areErrors;

  const onSubmit = useCallback(
    async (contactForm) => {
      setIsSubmitting(true);
      try {
        await onPostContactForm({ contactForm, lang });
        setIsSubmitting(false);
        reset();
        toastSuccess({ message: "Your message has been sent!" });
      } catch (error) {
        setIsSubmitting(false);
        toastError({ message: "Error sending your message!" });
      }
    },
    [reset, lang]
  );
  console.log("data", data);
  return (
    <Section>
      <Container className="space-y-8">
        {data.titleForm && data.titleForm.active && (
          <div className={`pb-4 border-b ${monoBordersColors[600][mono]}`}>
            <h2
              className={`text-2xl font-semibold leading-6 ${monoTextColors[800][mono]}`}
              data-tinafield={`${parentField}.title`}
            >
              {data.titleForm.label}
            </h2>
          </div>
        )}
        <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 space-y-10 md:space-y-0 md:gap-10">
            <div className="space-y-1 col-span-12 md:col-span-6">
              <label
                className={`block text-sm font-medium ${monoTextColors[600][mono]}`}
                htmlFor="name"
              >
                {fullName?.label}
              </label>
              <input
                type="text"
                className={`${baseInputStyles} ${
                  errors.name
                    ? `${monoTextColors[600][mono]} ${monoRestColors.inputBgOnError[mono]}`
                    : `${monoTextColors[600][mono]} ${monoRestColors.inputBg[mono]}`
                }`}
                placeholder={fullName?.placeholder}
                {...register("name", { required: true, minLength: 3 })}
              />
              {errors.name?.type === "required" && (
                <div className="text-red-600 dark:text-red-500">
                  Please enter your name
                </div>
              )}
              {errors.name?.type === "minLength" && (
                <div className="text-red-600 dark:text-red-500">
                  Your name must be at least 3 characters long
                </div>
              )}
            </div>
            <div className="space-y-1 col-span-12 md:col-span-6">
              <label
                className={`block text-sm font-medium ${monoTextColors[600][mono]}`}
                htmlFor="email"
              >
                {email?.label}
              </label>
              <input
                type="email"
                className={`${baseInputStyles} ${
                  errors.email
                    ? `${monoTextColors[600][mono]} ${monoRestColors.inputBgOnError[mono]}`
                    : `${monoTextColors[600][mono]} ${monoRestColors.inputBg[mono]}`
                }`}
                placeholder={email?.placeholder}
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                })}
              />
              {errors.email?.type === "required" && (
                <div className="text-red-600 dark:text-red-500">
                  Please enter your email
                </div>
              )}
              {errors.email?.type === "pattern" && (
                <div className="text-red-600 dark:text-red-500">
                  Please enter a valid email address
                </div>
              )}
            </div>
            <div className="space-y-1 col-span-12">
              <label
                className={`block text-sm font-medium ${monoTextColors[600][mono]}`}
                htmlFor="message"
              >
                {message?.label}
              </label>
              <textarea
                className={`${baseInputStyles} ${
                  errors.message
                    ? `${monoTextColors[600][mono]} ${monoRestColors.inputBgOnError[mono]}`
                    : `${monoTextColors[600][mono]} ${monoRestColors.inputBg[mono]}`
                }`}
                placeholder={message?.placeholder}
                {...register("message", { required: true, minLength: 10 })}
                rows={4}
              ></textarea>
              {errors.message?.type === "required" && (
                <div className="text-red-600 dark:text-red-500">
                  Please enter a message
                </div>
              )}
              {errors.message?.type === "minLength" && (
                <div className="text-red-600 dark:text-red-500">
                  Your message must be at least 10 characters long
                </div>
              )}
            </div>
          </div>
          <div className="sm:flex">
            <div>
              <button
                type="submit"
                className={`${baseButtonStyles} ${buttonPrimaryColors[color]}`}
                disabled={disabled}
              >
                {isSubmitting && <Spinner />}
                {submit?.label}
              </button>
            </div>
          </div>
        </form>
        <Toast position="top-right" />
      </Container>
    </Section>
  );
};

export const contactFormSchema: TinaTemplate = {
  label: "Contact Form",
  name: "contactForm",
  ui: {
    previewSrc: "",
    defaultItem: {
      titleForm: {
        label: "Contact Us",
        active: true,
      },
      fullName: {
        label: "Name",
        placeholder: "Enter your name",
      },
      email: {
        label: "Email",
        placeholder: "Enter your email",
      },
      message: {
        label: "Message",
        placeholder: "Say hello!",
      },
      submit: {
        label: "Send",
        disabled: false,
      },
    },
  },
  fields: [
    {
      label: "Title Form",
      name: "titleForm",
      type: "object",
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string",
        },
        {
          label: "Active",
          name: "active",
          type: "boolean",
        },
      ],
    },
    {
      label: "Full Name",
      name: "fullName",
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
