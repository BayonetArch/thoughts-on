import thoughtSchema from "../schemas/thoughtSchema";
import validateBody from "../middleware/validateBody";
import { Router } from "express";
import {
  createThoughts,
  deleteThoughts,
  getThoughts,
  getThoughtsByID,
} from "../controllers/thoughtController";

const thoughtRouter = Router();

/* GET /api/thoughts/ */
thoughtRouter.get("/", getThoughts);

/* GET /api/thoughts/:id */
thoughtRouter.get("/:id", getThoughtsByID);

/* POST /api/thoughts/ */
thoughtRouter.post(
  "/",
  validateBody(
    thoughtSchema,
    "could not validate thought body. make sure name and thought fileds are present.",
  ),
  createThoughts,
);

thoughtRouter.delete("/:id", deleteThoughts);

export default thoughtRouter;
