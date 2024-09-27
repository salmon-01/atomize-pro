import { Tabs } from "../models/tabs";
import { Request, Response } from "express";

// get all tabs

export const getAllTabs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allTabs = await Tabs.findAll();
    res.status(200).send(allTabs);
    return;
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    }
    res.status(500).send({ error: "An unknown error occurred" });
  }
};

// create tab

export const createTab = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, icon_name } = req.body;
    if (!name || !icon_name) {
      res.status(400).send({ message: "Name and icon name are required" });
      return;
    }
    const newTab = await Tabs.create({ name, icon_name });
    res.status(201).send(newTab);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    }
    res.status(500).send({ error: "An unknown error occurred" });
  }
};

// delete tab by id

export const deleteTab = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const tab = await Tabs.findByPk(id);

    if (!tab) {
      res.status(404).send({ message: "Tab with such id not found" });
      return;
    }

    await tab.destroy();

    res.status(200).send({ message: "Tab deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    }
    res.status(500).send({ error: "An unknown error occurred" });
  }
};
