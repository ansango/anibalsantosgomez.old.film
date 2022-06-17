import cn from "classnames";
import { onPostContactForm } from "lib/services/contact";
import useTranslation from "next-translate/useTranslation";
import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";

type Props = {};

const ContactForm: FC = () => {
  const { t } = useTranslation("contact");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = useCallback(async (contactForm) => {
    try {
      const response = await onPostContactForm({ contactForm });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-10 grid-cols-12">
        <label className="block col-span-12 md:col-span-6">
          <input
            type="text"
            className={cn(
              errors.name
                ? "focus:ring-0 focus:border-red-500 dark:focus:border-red-500 border-red-200 dark:border-red-500"
                : "focus:ring-0 focus:border-gray-900 dark:focus:border-gray-100 border-gray-200 dark:border-gray-500",
              "mt-0 mb-1 block w-full px-0.5 bg-gray-100 dark:bg-gray-800 border-0 border-b-2"
            )}
            placeholder={t("form.fields.name.placeholder")}
            {...register("name", { required: true, minLength: 3 })}
          />
          {errors.name?.type === "required" && (
            <span className="text-red-600 dark:text-red-400">
              {t("form.fields.name.errors.required")}
            </span>
          )}
          {errors.name?.type === "minLength" && (
            <span className="text-red-600 dark:text-red-400">
              {t("form.fields.name.errors.minlength")}
            </span>
          )}
        </label>
        <label className="block col-span-12 md:col-span-6">
          <input
            type="email"
            className={cn(
              errors.email
                ? "focus:ring-0 focus:border-red-500 dark:focus:border-red-500 border-red-200 dark:border-red-500"
                : "focus:ring-0 focus:border-gray-900 dark:focus:border-gray-100 border-gray-200 dark:border-gray-500",
              "mt-0 mb-1 block w-full px-0.5 bg-gray-100 dark:bg-gray-800 border-0 border-b-2"
            )}
            placeholder={t("form.fields.email.placeholder")}
            {...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            })}
          />
          {errors.email?.type === "required" && (
            <span className="text-red-600 dark:text-red-400">
              {t("form.fields.email.errors.required")}
            </span>
          )}
          {errors.email?.type === "pattern" && (
            <span className="text-red-600 dark:text-red-400">
              {t("form.fields.email.errors.pattern")}
            </span>
          )}
        </label>
        <label className="block col-span-12">
          <textarea
            className={cn(
              errors.message
                ? "focus:ring-0 focus:border-red-500 dark:focus:border-red-500 border-red-200 dark:border-red-500"
                : "focus:ring-0 focus:border-gray-900 dark:focus:border-gray-100 border-gray-200 dark:border-gray-500",
              "mt-0 mb-1 block w-full px-0.5 bg-gray-100 dark:bg-gray-800 border-0 border-b-2"
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
        className="bg-gray-200 dark:bg-gray-800 hover:font-medium transition-all py-4 px-4 md:py-2 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        disabled={errors.name || errors.email || errors.message}
      >
        {t("form.submit")}
      </button>
    </form>
  );
};

export default ContactForm;
