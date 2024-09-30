import { Response, Request } from "express";
import { ProgressBar } from "~/models/progressBar";
import { Tabs } from "~/models/tabs";

// get progress bars from the tab

export const getProgressBarsInTab = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: tabId } = req.params;
    const progressBars = await ProgressBar.findAll({
      where: { tab: tabId },
      include: [Tabs],
    });

    if (progressBars.length === 0) {
      res.status(404).send({ message: "No tasks found for requested tab" });
      return;
    }

    res.status(200).send(progressBars);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
      return;
    }
    res.status(500).send({ error: "An unknown error occurred" });
    return;
  }
};

// create a new progress bar

export const createProgressBar = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { list_name, task_name, goal_number, units, tab } = req.body;

    if (!list_name || !task_name || !goal_number || !units || !tab) {
      res.status(400).send({
        message:
          "List name, a task name, goal number, units, and a tab are required",
      });
      return;
    }

    const existingTab = await Tabs.findByPk(tab); // Note: Added `await`

    if (!existingTab) {
      res.status(404).send({ message: "Assigned tab does not exist" });
      return;
    }

    const newProgressBar = await ProgressBar.create({
      list_name,
      task_name,
      goal_number,
      units,
      tab,
    });

    // Explicitly return the `id` like in createSimpleList
    res.status(201).json({
      id: newProgressBar.id,  // Make sure the `id` is returned here
      list_name: newProgressBar.list_name,
      task_name: newProgressBar.task_name,
      goal_number: newProgressBar.goal_number,
      current_number: newProgressBar.current_number,
      units: newProgressBar.units,
      tab: newProgressBar.tab,
      message: "Progress bar created successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
      return;
    }
    res.status(500).send({ error: "An unknown error occurred" });
  }
};


// update progress bar status

export const updateProgressBarStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { current_number } = req.body;

    // Find the progress bar by its ID
    const progressBar = await ProgressBar.findByPk(id);

    // Log the received current_number
    console.log(current_number);

    // Validate the current_number: It must be a number, and it can't be NaN or below 0
    if (typeof current_number !== "number" || isNaN(current_number)) {
      res.status(400).send({
        message: "The current number must be a valid number.",
      });
      return;
    }

    if (!progressBar) {
      res.status(404).send({ message: "Progress bar not found" });
      return;
    }

    // Ensure current_number doesn't go below zero
    const updatedCurrentNumber = Math.max(0, current_number);

    // Determine if the progress is complete (current >= goal)
    const isComplete = updatedCurrentNumber >= progressBar.goal_number;

    // Update the progress bar with the new current number and completion status
    await progressBar.update({
      current_number: updatedCurrentNumber,
      complete: isComplete,
    });

    // Respond with success message, updated status, and new current number
    res.status(200).send({
      message: "Progress bar updated successfully",
      complete: isComplete,
      current_number: updatedCurrentNumber,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
      return;
    }
    res.status(500).send({ error: "An unknown error occurred" });
  }
};

// delete a progress bar list

export const deleteProgressBarList = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { list_name } = req.params;

    const deletedProgressBar = await ProgressBar.destroy({
      where: { list_name },
    });

    if (deletedProgressBar === 0) {
      res.status(404).send({ message: "Progress bar list not found" });
      return;
    }

    res.status(200).send({ message: "Progress Bar list deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
      return;
    }
    res.status(500).send({ error: "An unknown error occurred" });
    return;
  }
};

// delete a progress bar task

export const deleteProgressBarTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedTask = await ProgressBar.destroy({ where: { id } });

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
