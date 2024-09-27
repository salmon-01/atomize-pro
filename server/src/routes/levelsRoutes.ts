import express from "express";
import {
  createLevelList,
  getLevelsFromTab,
  updateLevelsStatus,
  deleteLevelsList,
  deleteLevelsTask,
} from "~/controllers/levelsController";

const router = express.Router();

router.get("/:id", getLevelsFromTab);
router.post("/", createLevelList);
router.put("/task/:id/status", updateLevelsStatus);
router.delete("/:list_name", deleteLevelsList);
router.delete("/task/:id", deleteLevelsTask);

export default router;
