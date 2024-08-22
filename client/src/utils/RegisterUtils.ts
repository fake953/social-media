import * as z from "zod";

export const schema = z.object({
  first_name: z.string().min(4),
  last_name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  occupation: z.string(),
  location: z.string(),
  picturePath: z.any(),
});

export type formFieldsType = {
  value: string;
  placeHolder: string;
  registerValue: string;
};
export type formFields = z.infer<typeof schema>;

export const formFields: formFieldsType[] = [
  {
    value: "First Name",
    placeHolder: "John",
    registerValue: "first_name",
  },
  {
    value: "Last Name",
    placeHolder: "Doe",
    registerValue: "last_name",
  },
  {
    value: "Email",
    placeHolder: "JohnDoe@gmail.com",
    registerValue: "email",
  },
  {
    value: "Password",
    placeHolder: "password",
    registerValue: "password",
  },
  {
    value: "Occupation",
    placeHolder: "Teacher",
    registerValue: "occupation",
  },

  {
    value: "Location",
    placeHolder: "San Fran, CA",
    registerValue: "location",
  },
];
