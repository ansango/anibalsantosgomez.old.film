import type { Template } from "tinacms";

export const contact: Template = {
  label: "Contact Form",
  name: "contactForm",
  ui: {
    previewSrc: "",
    defaultItem: {
      titleForm: {
        label: "Hablemos",
        active: true,
      },
      fullName: {
        label: "Nombre",
        placeholder: "Tu nombre completo",
      },
      email: {
        label: "Email",
        placeholder: "Tu dirección de email",
      },
      message: {
        label: "Mensaje",
        placeholder: "Di hola!",
      },
      submit: {
        label: "Enviar",
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
