import { z } from "zod";

const thoughtUpdateSchema = z.object({
  thought: z.string().min(5, "thought must be atleast 5 characters long"),
});

export default thoughtUpdateSchema;
