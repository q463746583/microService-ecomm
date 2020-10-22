import express from "express";
import { requireAuth } from "../middleware/require-auth";

import { currentUser } from "../middleware/current-user";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, requireAuth, (req, res) => {
  res.send({ currentuser: req.currentUser || null });
});

export { router as currentUserRouter };
