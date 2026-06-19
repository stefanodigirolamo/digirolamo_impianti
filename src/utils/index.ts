export const spaceUnit = 8;

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
  website?: string;
};

export type ContactResponse = {
  message: string;
};