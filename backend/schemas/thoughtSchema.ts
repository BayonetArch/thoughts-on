import { z } from "zod";

const thoughtSchema = z.object({
  user_id: z.string().min(1, "user_id is required"),
  thought: z.string().min(5, "thought must be atleast 5 characters long"),
});

export default thoughtSchema;
