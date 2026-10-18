import { z } from "zod";

const thoughtSchema = z.object({
  name: z.string().min(1, "name is required"),
  thought: z.string().min(1, "a thought is required"),
});

export default thoughtSchema;
