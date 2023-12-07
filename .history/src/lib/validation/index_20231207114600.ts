import * as z from "zod";

export const SignupValidation = z.object({
  username: z.string().min(2, { message: "Too short" }),
  email: z.string().email(),
  name: z.string().min(2, { message: "Too short" }),
  password: z
    .string()
    .min(2, { message: "Password must be at least 8 characters" }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(2, { message: "Password must be at least 8 characters" }),
});

export const PostValidation = z.object({});
