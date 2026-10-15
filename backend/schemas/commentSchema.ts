import { z } from "zod";

const commentSchema = z.object({
  name: z.string().min(1, "name is required"),
  comment: z.string().min(1, "comment is required"),
});

export default commentSchema;
