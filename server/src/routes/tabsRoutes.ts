import express from "express";
import {
  getAllTabs,
  createTab,
  deleteTab,
  getAllListsFromTab,
} from "../controllers/tabController";

const router = express.Router();

router.get("/", getAllTabs);
router.get("/:tabId/lists", getAllListsFromTab);
router.post("/", createTab);
router.delete("/:id", deleteTab);

export default router;
