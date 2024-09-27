import {
  createSimpleList,
  getSimpleLists,
  editListNameInSimpleList,
  editTaskInSimpleList,
  removeTaskInSimpleList,
  removeSimpleList,
  updateTaskStatus,
} from "~/controllers/simpleListController";
import express from "express";

const router = express.Router();

router.get("/:id", getSimpleLists);
router.post("/", createSimpleList);
router.put("/:old_list_name", editListNameInSimpleList);
router.put("/task/:id", editTaskInSimpleList);
router.put('/task/:id/status', updateTaskStatus)
router.delete("/:list_name", removeSimpleList);
router.delete("/task/:id", removeTaskInSimpleList);

export default router;