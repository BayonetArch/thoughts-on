import commentSchema from "../schemas/commentSchema";
import validateBody from "../middleware/validate";
import { Router } from "express";
import {
  createComments,
  deleteComments,
  getComments,
  getCommentsByID,
} from "../controllers/commentController";

const commentRouter = Router();

/* GET /api/comments/ */
commentRouter.get("/", getComments);

/* GET /api/comments/:id */
commentRouter.get("/:id", getCommentsByID);

/* POST /api/comment/ */
commentRouter.post("/", validateBody(commentSchema), createComments);

commentRouter.delete("/:id", deleteComments);

export default commentRouter;
