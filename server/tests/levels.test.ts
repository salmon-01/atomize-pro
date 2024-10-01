import request from "supertest";
import app from "../index";
import { sequelize } from "../src/models/index";
import { Tabs } from "../src/models/tabs";
import { Levels } from "~/models/levels";
import { mockLevel, mockLevelWithSomeTasks, mockTab } from "./mocks";

describe("Levels", () => {
  let tab: Tabs;
  beforeEach(async () => {
    await sequelize.sync({ force: true });
    tab = await Tabs.create(mockTab);
    mockLevel.tab = tab.id;
    mockLevelWithSomeTasks.forEach((task) => (task.tab = tab.id));
  });

  afterAll(async () => {
    await sequelize.drop();
    await sequelize.close();
  });

  it("should create a levels list", async () => {
    const res = await request(app).post("/api/levels").send(mockLevel);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("list_name", mockLevel.list_name);
    expect(res.body).toHaveProperty("task_name", mockLevel.task_name);
    expect(res.body).toHaveProperty("color", mockLevel.color);
    expect(res.body).toHaveProperty("level", mockLevel.level);
    expect(res.body).toHaveProperty("tab", tab.id);
  });

  it("should create a levels list with multiple tasks", async () => {
    for (const task of mockLevelWithSomeTasks) {
      const res = await request(app).post("/api/levels").send(task);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("list_name", task.list_name);
      expect(res.body).toHaveProperty("task_name", task.task_name);
      expect(res.body).toHaveProperty("color", task.color);
      expect(res.body).toHaveProperty("level", task.level);
      expect(res.body).toHaveProperty("tab", tab.id);
    }

    const tasks = await Levels.findAll({
      where: { list_name: mockLevelWithSomeTasks[0].list_name },
    });
    expect(tasks.length).toBe(mockLevelWithSomeTasks.length);
    expect(tasks[0].task_name).toBe(mockLevelWithSomeTasks[0].task_name);
    expect(tasks[1].task_name).toBe(mockLevelWithSomeTasks[1].task_name);
  });

  it("should delete a task from levels list", async () => {
    const task1 = await Levels.create(mockLevelWithSomeTasks[0]);
    const task2 = await Levels.create(mockLevelWithSomeTasks[1]);

    const res = await request(app).delete(`/api/levels/task/${task1.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Task deleted successfully");

    const deletedTask = await Levels.findByPk(task1.id);
    expect(deletedTask).toBeNull();

    const remainingTask = await Levels.findByPk(task2.id);
    expect(remainingTask).not.toBeNull();
    expect(remainingTask?.task_name).toBe(mockLevelWithSomeTasks[1].task_name);
  });

  it("should delete the levels list", async () => {
    for (const task of mockLevelWithSomeTasks) {
      await request(app).post("/api/levels").send(task);
    }

    const res = await request(app).delete(
      `/api/levels/${mockLevelWithSomeTasks[0].list_name}`
    );

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty(
      "message",
      "Levels list deleted successfully"
    );
  });

  it("should update the status of levels list", async () => {
    const task = await request(app).post("/api/levels").send(mockLevel);

    const res = await request(app)
      .put(`/api/levels/task/${task.body.id}/status`)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Level updated successfully");

    const updatedTask = await Levels.findByPk(task.body.id);
    expect(updatedTask?.level).toBe(1);
    expect(updatedTask?.complete).toBe(false);
  });
});
