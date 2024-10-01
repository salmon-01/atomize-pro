import request from "supertest";
import app from "../index";
import { sequelize } from "../src/models/index";
import { Tabs } from "../src/models/tabs";
import { mockSimpleList, mockSimpleListWithSomeTasks, mockTab } from "./mocks";
import { SimpleList } from "~/models/simpleList";

describe("Simple Lists", () => {
  let tab: Tabs;
  beforeEach(async () => {
    await sequelize.sync({ force: true });
    tab = await Tabs.create(mockTab);
    mockSimpleList.tab = tab.id;
    mockSimpleListWithSomeTasks.forEach((task) => (task.tab = tab.id));
  });

  afterAll(async () => {
    await sequelize.drop();
    await sequelize.close();
  });

  it("should create a simple list", async () => {
    const res = await request(app)
      .post("/api/simplelists")
      .send(mockSimpleList);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("list_name", mockSimpleList.list_name);
    expect(res.body).toHaveProperty("task_name", mockSimpleList.task_name);
    expect(res.body).toHaveProperty("tab", tab.id);
    expect(res.body).toHaveProperty("color", mockSimpleList.color);
  });

  it("should create a simple list with multiple tasks", async () => {
    for (const task of mockSimpleListWithSomeTasks) {
      const res = await request(app).post("/api/simplelists").send(task);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("list_name", task.list_name);
      expect(res.body).toHaveProperty("task_name", task.task_name);
      expect(res.body).toHaveProperty("color", task.color);
      expect(res.body).toHaveProperty("tab", tab.id);
    }

    const tasks = await SimpleList.findAll({
      where: { list_name: mockSimpleListWithSomeTasks[0].list_name },
    });
    expect(tasks.length).toBe(mockSimpleListWithSomeTasks.length);
    expect(tasks[0].task_name).toBe(mockSimpleListWithSomeTasks[0].task_name);
    expect(tasks[1].task_name).toBe(mockSimpleListWithSomeTasks[1].task_name);
  });

  it("should delete a task from a simple list", async () => {
    const task1 = await SimpleList.create(mockSimpleListWithSomeTasks[0]);
    const task2 = await SimpleList.create(mockSimpleListWithSomeTasks[1]);

    const res = await request(app).delete(`/api/simplelists/task/${task1.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Task deleted successfully");

    const deletedTask = await SimpleList.findByPk(task1.id);
    expect(deletedTask).toBeNull();

    const remainingTask = await SimpleList.findByPk(task2.id);
    expect(remainingTask).not.toBeNull();
    expect(remainingTask?.task_name).toBe(
      mockSimpleListWithSomeTasks[1].task_name
    );
  });

  it("should delete an entire simple list", async () => {
    for (const task of mockSimpleListWithSomeTasks) {
      await request(app).post("/api/simplelists").send(task);
    }

    const res = await request(app).delete(
      `/api/simplelists/${mockSimpleListWithSomeTasks[0].list_name}`
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty(
      "message",
      "Simple list deleted successfully"
    );
  });

  it("should update the status of the task to completed", async () => {
    const task = await request(app)
      .post("/api/simplelists")
      .send(mockSimpleList);

    const res = await request(app)
      .put(`/api/simplelists/task/${task.body.id}/status`)
      .send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty(
      "message",
      "Task status updated to completed successfully"
    );

    const updatedTask1 = await SimpleList.findByPk(task.body.id);
    expect(updatedTask1?.complete).toBe(true);
  });
});
