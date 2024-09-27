import express from "express";
import {
  getProgressBarsInTab,
  createProgressBar,
  updateProgressBarStatus,
  deleteProgressBarList,
  deleteProgressBarTask,
} from "~/controllers/progressBarController";

const router = express.Router();

router.get("/:id", getProgressBarsInTab);
router.post("/", createProgressBar);
router.put("/task/:id/status", updateProgressBarStatus);
router.delete("/:list_name", deleteProgressBarList);
router.delete("/task/:id", deleteProgressBarTask);

export default router;
