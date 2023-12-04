import * as z from "zod";

export const SignupValidation = z.object({
  username: z.string().min(2, { message: "Too short" }),
  email: z.string().email(),
  name: z.string().min(2, { message: "Too short" }),
});
