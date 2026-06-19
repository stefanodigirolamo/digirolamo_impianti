"use client";

import emailjs from "@emailjs/browser";
import { useMutation } from "@tanstack/react-query";

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type EmailJSEnvironment = {
  serviceId: string;
  templateId: string;
  publicKey: string;
};

function getEmailJSEnvironment(): EmailJSEnvironment {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      "EmailJS environment variables are missing.",
    );
  }

  return {
    serviceId,
    templateId,
    publicKey,
  };
}

async function sendContactEmail(
  formData: ContactFormData,
): Promise<void> {
  const {
    serviceId,
    templateId,
    publicKey,
  } = getEmailJSEnvironment();

  await emailjs.send(
    serviceId,
    templateId,
    {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || "Non indicato",
      message: formData.message,
      reply_to: formData.email,
    },
    {
      publicKey,
    },
  );
}

export function useSendContactEmail() {
  return useMutation<void, Error, ContactFormData>({
    mutationKey: ["send-contact-email"],
    mutationFn: sendContactEmail,
    retry: false,
  });
}