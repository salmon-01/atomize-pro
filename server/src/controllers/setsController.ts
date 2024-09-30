import { Response, Request } from "express";
import { Sets } from "~/models/sets";
import { Tabs } from "~/models/tabs";

// create a sets list

export const createSetsList = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { list_name, task_name, tab, color, sets, reps } = req.body;
    console.log(req.body)
    if (!list_name || !task_name || !tab || !color || !sets || !reps) {
      res.status(400).send({
        message:
          "List name, a task name, task color, sets, reps and a tab are required",
      });
      return;
    }

    const existingTab = await Tabs.findByPk(tab);

    if (!existingTab) {
      res.status(404).send({ message: "Assigned tab doesn't exist" });
      return;
    }

    const newSetsList = await Sets.create({
      list_name,
      task_name,
      tab,
      color,
      sets,
      reps,
    });

    res.status(201).send(newSetsList);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
      return;
    }
    res.status(500).send({ error: "An unknown error occurred" });
    return;
  }
};

// get all sets from a tab

export const getSetsFromTab = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: tabId } = req.params;

    const sets = await Sets.findAll({ where: { id: tabId }, include: [Tabs] });

    if (sets.length === 0) {
      res.status(404).send({ message: "No tasks found for requested tab" });
      return;
    }

    res.status(200).send(sets);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
      return;
    }
    res.status(500).send({ error: "An unknown error occurred" });
    return;
  }
};

// update progress for sets

export const updateSetsStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const set = await Sets.findByPk(id);

    if (!set) {
      res.status(404).send({ message: "Set List not found" });
      return;
    }

    if (set.completed_sets >= set.sets) {
      res.status(400).send({ message: "Set is already completed" });
      return;
    }

    const updatedCompletedSets = set.completed_sets + 1;
    const isComplete = updatedCompletedSets >= set.sets;

    await set.update({
      completed_sets: updatedCompletedSets,
      complete: isComplete,
    });

    res.status(200).send({
      message: "Set updated successfully",
      completed_sets: updatedCompletedSets,
      complete: isComplete,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
      return;
    }
    res.status(500).send({ error: "An unknown error occurred" });
    return;
  }
};

// delete sets list

export const deleteSetsList = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { list_name } = req.params;

    const deletedList = await Sets.destroy({
      where: { list_name },
    });

    if (deletedList === 0) {
      res.status(404).send({ message: "Sets list not found" });
      return;
    }

    res.status(200).send({ message: "Sets list deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
      return;
    }
    res.status(500).send({ error: "An unknown error occurred" });
    return;
  }
};

// delete sets task

export const deleteSetsTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedTask = await Sets.destroy({
      where: { id },
    });

    if (deletedTask === 0) {
      res.status(404).send({ message: "Set task not found" });
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
