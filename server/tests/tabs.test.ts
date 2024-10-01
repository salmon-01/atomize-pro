import request from "supertest";
import app from "../index";
import { sequelize } from "../src/models/index";
import { Tabs } from "../src/models/tabs";
import { mockTab, mockTabs, mockTabToDelete } from "./mocks";

describe("Tabs", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.drop();
    await sequelize.close();
  });

  it("should create a new tab", async () => {
    const res = await request(app).post("/api/tabs").send(mockTab);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("name", mockTab.name);
    expect(res.body).toHaveProperty("icon_name", mockTab.icon_name);
  });

  it("should get all tabs", async () => {
    for (const tab of mockTabs) {
      await Tabs.create(tab);
    }

    const res = await request(app).get("/api/tabs");

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThanOrEqual(mockTabs.length);
  });

  it("should delete a tab", async () => {
    const newTab = await Tabs.create(mockTabToDelete);

    const res = await request(app).delete(`/api/tabs/${newTab.id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Tab deleted successfully");

    const deletedTab = await Tabs.findByPk(newTab.id);
    expect(deletedTab).toBeNull();
  });
});
