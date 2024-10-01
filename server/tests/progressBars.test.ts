import request from "supertest";
import app from "../index";
import { sequelize } from "../src/models/index";
import { Tabs } from "../src/models/tabs";
import { ProgressBar } from "~/models/progressBar";
import {
  mockProgressBar,
  mockProgressBarWithSomeTasks,
  mockTab,
} from "./mocks";

describe("Progress Bars", () => {
  let tab: Tabs;
  beforeEach(async () => {
    await sequelize.sync({ force: true });
    tab = await Tabs.create(mockTab);
    mockProgressBar.tab = tab.id;
    mockProgressBarWithSomeTasks.forEach((task) => (task.tab = tab.id));
  });

  afterAll(async () => {
    await sequelize.drop();
    await sequelize.close();
  });

  it("should create a progress bar", async () => {
    const res = await request(app)
      .post("/api/progressbars")
      .send(mockProgressBar);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("list_name", mockProgressBar.list_name);
    expect(res.body).toHaveProperty("task_name", mockProgressBar.task_name);
    expect(res.body).toHaveProperty("goal_number", mockProgressBar.goal_number);
    expect(res.body).toHaveProperty(
      "current_number",
      mockProgressBar.current_number
    );
    expect(res.body).toHaveProperty("units", mockProgressBar.units);
    expect(res.body).toHaveProperty("tab", tab.id);
  });

  it("should create a progress bar list with multiple progress bars", async () => {
    for (const task of mockProgressBarWithSomeTasks) {
      const res = await request(app).post("/api/progressbars").send(task);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("list_name", task.list_name);
      expect(res.body).toHaveProperty("task_name", task.task_name);
      expect(res.body).toHaveProperty("goal_number", task.goal_number);
      expect(res.body).toHaveProperty("current_number", task.current_number);
      expect(res.body).toHaveProperty("units", task.units);
      expect(res.body).toHaveProperty("tab", tab.id);
    }

    const tasks = await ProgressBar.findAll({
      where: { list_name: mockProgressBarWithSomeTasks[0].list_name },
    });
    expect(tasks.length).toBe(mockProgressBarWithSomeTasks.length);
    expect(tasks[0].task_name).toBe(mockProgressBarWithSomeTasks[0].task_name);
    expect(tasks[1].task_name).toBe(mockProgressBarWithSomeTasks[1].task_name);
  });

  it("should delete a progress bar from the progress bar list", async () => {
    const task1 = await ProgressBar.create(mockProgressBarWithSomeTasks[0]);
    const task2 = await ProgressBar.create(mockProgressBarWithSomeTasks[1]);

    const res = await request(app).delete(`/api/progressbars/task/${task1.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Task deleted successfully");

    const deletedTask = await ProgressBar.findByPk(task1.id);
    expect(deletedTask).toBeNull();

    const remainingTask = await ProgressBar.findByPk(task2.id);
    expect(remainingTask).not.toBeNull();
    expect(remainingTask?.task_name).toBe(
      mockProgressBarWithSomeTasks[1].task_name
    );
  });

  it("should delete a progress bar list", async () => {
    for (const task of mockProgressBarWithSomeTasks) {
      await request(app).post("/api/progressbars").send(task);
    }

    const res = await request(app).delete(
      `/api/progressbars/${mockProgressBarWithSomeTasks[0].list_name}`
    );

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty(
      "message",
      "Progress Bar list deleted successfully"
    );
  });

  it("should update the progress of a task", async () => {
    const task = await request(app)
      .post("/api/progressbars")
      .send(mockProgressBar);

    const res = await request(app)
      .put(`/api/progressbars/task/${task.body.id}/status`)
      .send({ current_number: 100 });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Progress bar updated successfully")

    const updatedTask = await ProgressBar.findByPk(task.body.id);
    expect(updatedTask?.current_number).toBe(100);
    expect(updatedTask?.complete).toBe(true);
  });
});
