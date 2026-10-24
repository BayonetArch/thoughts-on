import { z } from "zod";

const thoughtSchema = z.object({
  thought: z.string().min(5, "thought must be atleast 5 characters long"),
});

export default thoughtSchema;
