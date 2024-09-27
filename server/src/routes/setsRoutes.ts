import express from "express";
import {
  createSetsList,
  getSetsFromTab,
  updateSetsStatus,
  deleteSetsList,
  deleteSetsTask,
} from "~/controllers/setsController";

const router = express.Router();

router.post("/", createSetsList);
router.get("/:id", getSetsFromTab);
router.put("/task/:id/status", updateSetsStatus);
router.delete("/:list_name", deleteSetsList);
router.delete("/task/:id", deleteSetsTask);

export default router;
