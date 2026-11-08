import thoughtSchema from "../schemas/thoughtSchema";
import validateBody from "../middleware/validateBody";
import { Router } from "express";
import {
  createThoughts,
  deleteThoughts,
  getThoughts,
  myThoughts,
  updatethoughts,
} from "../controllers/thoughtController";
import requireAuth from "../middleware/requireAuth";
import thoughtUpdateSchema from "../schemas/thoughtUpdateSchema";
import validateId from "../middleware/validateId";

const thoughtRouter = Router();

/* GET /api/thoughts/ */
thoughtRouter.get("/", getThoughts);

/* GET /api/thoughts/me/ */
thoughtRouter.get("/me/", requireAuth, myThoughts);

/* POST /api/thoughts/ */
thoughtRouter.post(
  "/",
  requireAuth,
  validateBody(
    thoughtSchema,
    "could not validate thought body. make sure thought and user_id field are present",
  ),
  createThoughts,
);

thoughtRouter.patch(
  "/:id",
  requireAuth,
  validateId,
  validateBody(thoughtUpdateSchema, "Could not update the thoughts"),
  updatethoughts,
);
thoughtRouter.delete("/:id", requireAuth, validateId, deleteThoughts);

export default thoughtRouter;
