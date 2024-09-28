import express from "express";
import {
  getAllTabs,
  createTab,
  deleteTab,
  getAllListsFromTab,
  getAllListsForAllTabs
} from "../controllers/tabController";

const router = express.Router();

router.get("/", getAllTabs);
router.get("/:tabId/lists", getAllListsFromTab);
router.get('/lists/all', getAllListsForAllTabs);
router.post("/", createTab);
router.delete("/:id", deleteTab);

export default router;
