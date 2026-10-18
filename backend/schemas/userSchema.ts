import { z } from "zod";

const userSchema = z.object({
  username: z
    .string()
    .min(5, "username must be at least 5 characters long")
    .max(20, "username must be at most 20 characters long"),
  password: z
    .string()
    .min(8, "password must be at least 8 characters long")
    .max(64, "password must be at most 64 characters long"),
});

export default userSchema;
