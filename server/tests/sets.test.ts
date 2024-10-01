import request from "supertest";
import app from "../index";
import { sequelize } from "../src/models/index";
import { Tabs } from "../src/models/tabs";
import { Sets } from "~/models/sets";
import { mockSet, mockSetWithSomeTasks, mockTab } from "./mocks";

describe("Sets", () => {
  let tab: Tabs;
  beforeEach(async () => {
    await sequelize.sync({ force: true });
    tab = await Tabs.create(mockTab);
    mockSet.tab = tab.id;
    mockSetWithSomeTasks.forEach((task) => (task.tab = tab.id));
  });

  afterAll(async () => {
    await sequelize.drop();
    await sequelize.close();
  });

  it("should create a set list", async () => {
    const res = await request(app).post("/api/sets").send(mockSet);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("list_name", mockSet.list_name);
    expect(res.body).toHaveProperty("task_name", mockSet.task_name);
    expect(res.body).toHaveProperty("sets", mockSet.sets);
    expect(res.body).toHaveProperty("completed_sets", mockSet.completed_sets);
    expect(res.body).toHaveProperty("reps", mockSet.reps);
    expect(res.body).toHaveProperty("color", mockSet.color);
    expect(res.body).toHaveProperty("tab", tab.id);
  });

  it("should create a set list with multiple tasks", async () => {
    for (const task of mockSetWithSomeTasks) {
      const res = await request(app).post("/api/sets").send(task);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("list_name", task.list_name);
      expect(res.body).toHaveProperty("task_name", task.task_name);
      expect(res.body).toHaveProperty("sets", task.sets);
      expect(res.body).toHaveProperty("completed_sets", task.completed_sets);
      expect(res.body).toHaveProperty("reps", task.reps);
      expect(res.body).toHaveProperty("color", task.color);
      expect(res.body).toHaveProperty("tab", tab.id);
    }

    const tasks = await Sets.findAll({
      where: { list_name: mockSetWithSomeTasks[0].list_name },
    });
    expect(tasks.length).toBe(mockSetWithSomeTasks.length);
    expect(tasks[0].task_name).toBe(mockSetWithSomeTasks[0].task_name);
    expect(tasks[1].task_name).toBe(mockSetWithSomeTasks[1].task_name);
  });

  it("should delete a task from a set list", async () => {
    const task1 = await Sets.create(mockSetWithSomeTasks[0]);
    const task2 = await Sets.create(mockSetWithSomeTasks[1]);

    const res = await request(app).delete(`/api/sets/task/${task1.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Task deleted successfully");

    const deletedTask = await Sets.findByPk(task1.id);
    expect(deletedTask).toBeNull();

    const remainingTask = await Sets.findByPk(task2.id);
    expect(remainingTask).not.toBeNull();
    expect(remainingTask?.task_name).toBe(mockSetWithSomeTasks[1].task_name);
  });

  it("should delete the set list", async () => {
    for (const task of mockSetWithSomeTasks) {
      await request(app).post("/api/sets").send(task);
    }

    const res = await request(app).delete(
      `/api/sets/${mockSetWithSomeTasks[0].list_name}`
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty(
      "message",
      "Sets list deleted successfully"
    );
  });

  it("should update the status of the set list", async () => {
    const task = await request(app).post("/api/sets").send(mockSet);

    const res = await request(app)
      .put(`/api/sets/task/${task.body.id}/status`)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Set updated successfully");

    const updatedTask = await Sets.findByPk(task.body.id);
    expect(updatedTask?.completed_sets).toBe(1);
    expect(updatedTask?.complete).toBe(false);
  });
});
