import { Request, Response } from "express";
import { SimpleList } from "~/models/simpleList";
import { Tabs } from "~/models/tabs";

// create simple list

export const createSimpleList = async (
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

    const newSimpleList = await SimpleList.create({
      list_name,
      task_name,
      tab,
      color,
    });
    res.status(201).send(newSimpleList);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
      return;
    }
    res.status(500).send({ error: "An unknown error occurred" });
    return;
  }
};

// get simple list with tasks

export const getSimpleLists = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: tabId } = req.params;

    const simpleLists = await SimpleList.findAll({
      where: { tab: tabId },
      include: [Tabs],
    });

    if (simpleLists.length === 0) {
      res.status(404).send({ message: "No tasks found for requested tab" });
      return;
    }

    res.status(200).send(simpleLists);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
      return;
    }
    res.status(500).send({ error: "An unknown error occurred" });
    return;
  }
};

// edit the list name

export const editListNameInSimpleList = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { new_list_name } = req.body;
    const { old_list_name } = req.params;

    if (!new_list_name) {
      res.status(400).send({ message: "New list name is required" });
      return;
    }

    const updateTheListNames = await SimpleList.update(
      { list_name: new_list_name },
      { where: { list_name: old_list_name } }
    );
    if (updateTheListNames[0] === 0) {
      res
        .status(404)
        .send({ message: "Nothing to update, check entered list name" });
      return;
    }
    res.status(200).send({ message: "List names updated successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
      return;
    }
    res.status(500).send({ error: "An unknown error occurred" });
    return;
  }
};

// edit task in a simple list

export const editTaskInSimpleList = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log(req.body)
    const { task_name } = req.body;
    const { id } = req.params;

    if (!task_name) {
      res.status(400).send({ message: "Task name is required" });
      return;
    }

    const updatedTask = await SimpleList.update(
      { task_name },
      { where: { id } }
    );

    if (updatedTask[0] === 0) {
      res.status(404).send({ message: "Task with such id not found" });
      return;
    }

    res.status(200).send("Task name updated successfully");
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
      return;
    }
    res.status(500).send({ error: "An unknown error occurred" });
    return;
  }
};

// delete task from simple list

export const removeTaskInSimpleList = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedTask = await SimpleList.destroy({ where: { id } });

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

// delete entire simple list

export const removeSimpleList = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { list_name } = req.params;

    const deletedSimpleList = await SimpleList.destroy({
      where: { list_name },
    });

    if (deletedSimpleList === 0) {
      res
        .status(404)
        .send({ message: "Simple list with such list name not found" });
      return;
    }

    res.status(200).send({ message: "Simple list deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
      return;
    }
    res.status(500).send({ error: "An unknown error occurred" });
    return;
  }
};

// update simple list task status

export const updateTaskStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    console.log(`ID received: ${id}, type: ${typeof id}`);

console.log(`ID received: ${id}`);
const task = await SimpleList.findByPk(id);
console.log(`Task fetched: ${task}`);

    if (!task) {
      res.status(404).send({ message: "Task not found" });
      return;
    }

    if (task.complete === true) {
      res.status(400).send({ message: "Task is already completed" });
      return;
    }

    await task.update({ complete: true });
    res
      .status(200)
      .send({ message: "Task status updated to completed successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
      return;
    }
    res.status(500).send({ error: "An unknown error occurred" });
    return;
  }
};
