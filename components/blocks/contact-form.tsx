import { onPostContactForm } from "lib/services/contact";
import { type FC, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  useTheme,
  Section,
  Spinner,
  Toast,
  toastError,
  toastSuccess,
} from "components";

import {
  baseInputStyles,
  monoTextColors,
  monoRestColors,
  baseButtonStyles,
  buttonPrimaryColors,
  monoBordersColors,
} from "constant/styles";

import eEvents from "lib/ga";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

type Props = {
  lang?: string;
  data: any;
  parentField: string;
};

export const ContactForm: FC<Props> = ({ data, parentField, lang = "es" }) => {
  const { mono, color } = useTheme();
  const { email, fullName, message, submit } = data;
  const { eContact } = eEvents;
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const areErrors = Object.keys(errors).length > 0;
  const disabled = isSubmitting || areErrors;

  const onSubmit = async (contactForm: any) => {
    setIsSubmitting(true);
    try {
      if (!executeRecaptcha) {
        toastError({ message: "Execute recaptcha not yet available" });
        setIsSubmitting(false);
        return;
      }
      const token = await executeRecaptcha("contact_form");
      await onPostContactForm({ contactForm, lang, token });
      setIsSubmitting(false);
      reset();
      toastSuccess({ message: "Tu menaje se envió!" });
      eContact({ label: "success" });
    } catch (error) {
      setIsSubmitting(false);
      toastError({ message: "Un error ocurrió" });
      eContact({ label: "error" });
    }
  };

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
                  Introduce tu nombre
                </div>
              )}
              {errors.name?.type === "minLength" && (
                <div className="text-red-600 dark:text-red-500">
                  Tu nombre debe tener al menos 3 caracteres
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
                  Introduce tu email
                </div>
              )}
              {errors.email?.type === "pattern" && (
                <div className="text-red-600 dark:text-red-500">
                  Introduce un email válido
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
                  Introduce tu mensaje
                </div>
              )}
              {errors.message?.type === "minLength" && (
                <div className="text-red-600 dark:text-red-500">
                  Tu mensaje debe tener al menos 10 caracteres
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
