import { onPostContactForm } from "../lib/services/contact";
import { FC, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  lang: string;
};

const ContactForm: FC<Props> = ({ lang = "en" }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = useCallback(
    async (contactForm) => {
      setIsSubmitting(true);
      try {
        await onPostContactForm({ contactForm, lang });
        setIsSubmitting(false);
        reset();
        toast(t("form.success"), {
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          ),
        });
      } catch (error) {
        setIsSubmitting(false);
        toast(t("form.error"), {
          className: "rounded-none text-red-600",
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
      }
    },
    [reset, t, lang]
  );
  return (
    <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-12 space-y-10 md:space-y-0 md:gap-10">
        <label className="col-span-12 md:col-span-6">
          <input
            type="text"
            className={cn(
              errors.name
                ? "focus:ring-0 focus:border-red-500 border-red-200"
                : "focus:ring-0 focus:border-gray-900 border-gray-200",
              "mt-0 mb-1 w-full px-0.5 bg-gray-100 border-0 border-b-2"
            )}
            placeholder={t("form.fields.name.placeholder")}
            {...register("name", { required: true, minLength: 3 })}
          />
          {errors.name?.type === "required" && (
            <span className="text-red-600">
              {t("form.fields.name.errors.required")}
            </span>
          )}
          {errors.name?.type === "minLength" && (
            <span className="text-red-600">
              {t("form.fields.name.errors.minlength")}
            </span>
          )}
        </label>
        <label className="col-span-12 md:col-span-6">
          <input
            type="email"
            className={cn(
              errors.email
                ? "focus:ring-0 focus:border-red-500 border-red-200"
                : "focus:ring-0 focus:border-gray-900 border-gray-200",
              "mt-0 mb-1 w-full px-0.5 bg-gray-100 border-0 border-b-2"
            )}
            placeholder={t("form.fields.email.placeholder")}
            {...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            })}
          />
          {errors.email?.type === "required" && (
            <span className="text-red-600">
              {t("form.fields.email.errors.required")}
            </span>
          )}
          {errors.email?.type === "pattern" && (
            <span className="text-red-600">
              {t("form.fields.email.errors.pattern")}
            </span>
          )}
        </label>
        <label className="col-span-12">
          <textarea
            className={cn(
              errors.message
                ? "focus:ring-0 focus:border-red-500 border-red-200"
                : "focus:ring-0 focus:border-gray-900  border-gray-200",
              "mt-0 mb-1 w-full px-0.5 bg-gray-100 border-0 border-b-2"
            )}
            placeholder={t("form.fields.message.placeholder")}
            {...register("message", { required: true, minLength: 10 })}
            rows={4}
          ></textarea>
          {errors.message?.type === "required" && (
            <span className="text-red-600 dark:text-red-400">
              {t("form.fields.message.errors.required")}
            </span>
          )}
          {errors.message?.type === "minLength" && (
            <span className="text-red-600 dark:text-red-400">
              {t("form.fields.message.errors.minlength")}
            </span>
          )}
        </label>
      </div>
      <button
        className="bg-gray-200 dark:bg-gray-800 hover:font-medium transition-all py-4 px-4 md:py-2 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        type="submit"
        disabled={errors.name || errors.email || errors.message || isSubmitting}
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
        {t("form.submit")}
      </button>
    </form>
  );
};

export default ContactForm;
