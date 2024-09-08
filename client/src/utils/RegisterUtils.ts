import * as z from "zod";

export const schema = z.object({
  first_name: z
    .string({ message: "First Name is required" })
    .min(4, { message: "First Name should contains 4 characters " }),
  last_name: z
    .string({ message: "Last Name is required" })
    .min(4, { message: "Last Name should contains 4 characters " }),
  email: z
    .string({ message: "email field is required" })
    .email({ message: "please enter a valid email" }),
  password: z
    .string()
    .min(6, { message: "password should contains 6 characters " }),
  occupation: z
    .string({ message: "occupation field should be a valid string" })
    .min(1, { message: "occupation is required" }),
  location: z
    .string({ message: "location field should be a valid string" })
    .min(1, { message: "location is required" }),
  picturePath: z.any(),
  picture: z.any(),
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
