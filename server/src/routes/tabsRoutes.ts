import express from "express";
import { getAllTabs, createTab, deleteTab } from "../controllers/tabController";

const router = express.Router();

router.get("/", getAllTabs);
router.post("/", createTab);
router.delete("/:id", deleteTab);

export default router;
