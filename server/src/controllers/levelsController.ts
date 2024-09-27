import { Response, Request } from "express";
import { Levels } from "~/models/levels";
import { Tabs } from "~/models/tabs";

// create a level list

export const createLevelList = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { list_name, task_name, tab, color } = req.body;

    if (!list_name || !task_name || !tab || !color) {
      res.status(400).send({
        message: "List name, a task name, task color and a tab are required",
      });
      return;
    }

    const existingTab = await Tabs.findByPk(tab);

    if (!existingTab) {
      res.status(404).send({ message: "Assigned tab doesn't exist" });
      return;
    }

    const newLevelsList = await Levels.create({
      list_name,
      task_name,
      tab,
      color,
    });

    res.status(201).send(newLevelsList);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
      return;
    }
    res.status(500).send({ error: "An unknown error occurred" });
    return;
  }
};

// get all levels from tab

export const getLevelsFromTab = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: tabId } = req.params;

    const levels = await Levels.findAll({
      where: { tab: tabId },
      include: [Tabs],
    });

    if (levels.length === 0) {
      res.status(404).send({ message: "No tasks found for requested tab" });
      return;
    }

    res.status(200).send(levels);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
      return;
    }
    res.status(500).send({ error: "An unknown error occurred" });
    return;
  }
};

// update progress for levels

export const updateLevelsStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const level = await Levels.findByPk(id);

    if (!level) {
      res.status(404).send({ message: "Levels List not found" });
      return;
    }

    if (level.level > 3) {
      res
        .status(400)
        .send({ message: "Levels task is already at maximum value of 3" });
      return;
    }

    const updatedLevel = level.level + 1;
    await level.update({ level: updatedLevel });

    res
      .status(200)
      .send({ message: "Level updated successfully", level: updatedLevel });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
      return;
    }
    res.status(500).send({ error: "An unknown error occurred" });
    return;
  }
};

// delete a levels list

export const deleteLevelsList = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { list_name } = req.params;

    const deletedLevels = await Levels.destroy({
      where: { list_name },
    });

    if (deletedLevels === 0) {
      res.status(404).send({ message: "Levels list not found" });
      return;
    }

    res.status(200).send({ message: "Levels list deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
      return;
    }
    res.status(500).send({ error: "An unknown error occurred" });
    return;
  }
};

// delete a levels task

export const deleteLevelsTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedTask = await Levels.destroy({ where: { id } });

    if (deletedTask === 0) {
      res.status(404).send({ message: "Task not found" });
      return;
    }
    res.status(200).send({ message: "Task deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
      return;
    }
    res.status(500).send({ error: "An unknown error occurred" });
    return;
  }
};
