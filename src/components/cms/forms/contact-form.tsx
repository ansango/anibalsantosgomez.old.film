"use client";

import type { FC } from "react";
import { useCallback, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import type { Template } from "tinacms";
import { z } from "zod";

import { onPostContactForm } from "../../../lib/api/services";
import { Container } from "../../container";
import { Section } from "../../section";
import { optionsDark, optionsLight } from "../backgrounds";

const validationSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "El nombre debe tener al menos 2 caracteres",
    })
    .max(100, {
      message: "El nombre no puede tener más de 100 caracteres",
    }),
  lastName: z
    .string()
    .min(2, {
      message: "El apellido debe tener al menos 2 caracteres",
    })
    .max(100, {
      message: "El apellido no puede tener más de 100 caracteres",
    }),
  email: z.string().email({
    message: "El email no es válido",
  }),
  subject: z
    .string()
    .min(10, {
      message: "El asunto debe tener al menos 10 caracteres",
    })
    .max(1000, {
      message: "El asunto no puede tener más de 1000 caracteres",
    }),
  privacy: z.boolean().refine((value) => value === true, {
    message: "Debes aceptar la política de privacidad",
  }),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

export type ContactFormProps = {
  backgroundLight?: string;
  backgroundDark?: string;
  offset?: boolean;
};

export const ContactForm: FC<ContactFormProps> = ({
  backgroundDark,
  backgroundLight,
  offset = false,
}) => {
  const cnOffset = offset ? "bg-offset" : "bg-default";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    mode: "all",
  });
  const areErrors = Object.keys(errors).length > 0;
  const disabled = isSubmitting || areErrors;
  const onSubmit: SubmitHandler<ValidationSchema> = useCallback(
    (data) => {
      setIsSubmitting(true);
      toast.promise(onPostContactForm(data), {
        loading: "Enviando mensaje...",
        success: () => {
          reset();
          setIsSubmitting(false);
          return "Mensaje enviado correctamente";
        },
        error: () => {
          setIsSubmitting(false);
          return "Error al enviar el mensaje";
        },
      });
    },
    [reset]
  );

  return (
    <>
      <Toaster />
      <Section className={`flex-none !py-20 ${cnOffset} ${backgroundLight} ${backgroundDark}`}>
        <Container>
          <form
            className="grid max-w-screen-lg grid-cols-12 gap-6 mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="col-span-12 md:col-span-6">
              <span>Nombre</span>
              <input
                className={offset ? "offset" : ""}
                type="text"
                placeholder=""
                {...register("firstName")}
              />
              <span className={`${errors.firstName?.message ? "error-text" : "helper-text"}`}>
                {errors.firstName?.message ?? ""}
              </span>
            </label>
            <label className="col-span-12 md:col-span-6">
              <span>Apellidos</span>
              <input
                className={offset ? "offset" : ""}
                type="text"
                placeholder=""
                {...register("lastName")}
              />
              <span className={`${errors.lastName?.message ? "error-text" : "helper-text"}`}>
                {errors.lastName?.message ?? ""}
              </span>
            </label>
            <label className="col-span-12">
              <span>Email</span>
              <input
                className={offset ? "offset" : ""}
                type="email"
                placeholder="john@example.com"
                {...register("email")}
              />
              <span className={`${errors.email?.message ? "error-text" : "helper-text"}`}>
                {errors.email?.message ?? ""}
              </span>
            </label>
            <label className="col-span-12">
              <span>Asunto</span>
              <textarea
                className={offset ? "offset" : ""}
                rows={4}
                placeholder="¿Cómo puedo ayudarte?"
                {...register("subject")}
              />
              <span className={`${errors.subject?.message ? "error-text" : "helper-text"}`}>
                {errors.subject?.message ?? ""}
              </span>
            </label>
            <div className="col-span-12">
              <div className="mt-2">
                <div>
                  <label className="items-center">
                    <input
                      type="checkbox"
                      className={offset ? "offset" : ""}
                      {...register("privacy")}
                    />
                    <span className="ml-2 text-sm">Acepto la política de privacidad</span>
                    <span className={`block ${errors.privacy?.message ? "error-text" : ""}`}>
                      {errors.privacy?.message ?? ""}
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <button className="col-span-12 md:max-w-xs btn btn-primary" disabled={disabled}>
              Enviar
            </button>
          </form>
        </Container>
      </Section>
    </>
  );
};

export const contactFormTemplate: Template = {
  label: "Contact Form",
  name: "contactForm",
  fields: [
    {
      name: "visible",
      label: "Visible",
      type: "boolean",
    },
    {
      name: "offset",
      label: "Offset",
      type: "boolean",
    },
    {
      type: "string",
      label: "Background Light",
      name: "backgroundLight",
      options: optionsLight,
    },
    {
      type: "string",
      label: "Background Dark",
      name: "backgroundDark",
      options: optionsDark,
    },
  ],
};
