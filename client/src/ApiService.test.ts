import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  createGoal,
  createTab,
  fetchAllTabs,
  fetchAllGoals,
  updateGoalProgress,
  deleteTab,
  deleteGoal,
} from "./ApiService"; // Adjust the path to your API file
import axios from "axios";
import { Goal, Tab } from "./types/types";

vi.mock("axios");

const mockFetch = vi.fn();

global.fetch = mockFetch;

const BASE_URL = "http://localhost:3000/api";

describe("API Services", () => {
  let consoleLogSpy: vi.SpyInstance;
  let consoleErrorSpy: vi.SpyInstance;

  beforeEach(() => {
    mockFetch.mockReset();
    vi.clearAllMocks();

    // Mock console.log for each test
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.error after each test
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  describe("createGoal", () => {
    it("should create a goal successfully", async () => {
      const goal: Goal = { id: 1, type: "Simple List", title: "Test Goal" };
      const responseMock = { id: 123 };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => responseMock,
      });

      const result = await createGoal(goal);

      expect(mockFetch).toHaveBeenCalledWith(
        `${BASE_URL}/simplelists`,
        expect.any(Object)
      );
      expect(result.success).toBe(true);
      expect(result.data).toEqual(responseMock);
    });

    it("should handle error during goal creation", async () => {
      const goal: Goal = { id: 1, type: "Simple List", title: "Test Goal" };
      mockFetch.mockResolvedValueOnce({ ok: false });

      const result = await createGoal(goal);

      expect(result.success).toBe(false);
      expect(result.error).toBe("Failed to create goal");
    });
  });

  describe("createTab", () => {
    it("should create a tab successfully", async () => {
      const tab: Tab = { id: 1, name: "Tab 1" };
      const responseMock: Tab = { id: 1, name: "Tab 1" };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => responseMock,
      });

      const result = await createTab(tab);

      expect(mockFetch).toHaveBeenCalledWith(
        `${BASE_URL}/tabs/`,
        expect.any(Object)
      );
      expect(result).toEqual(responseMock);
    });

    it("should handle error during tab creation", async () => {
      const tab: Tab = { id: 1, name: "Tab 1" };
      mockFetch.mockResolvedValueOnce({ ok: false });

      await createTab(tab);

      expect(mockFetch).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith(
        "Network response when creating a tab was not OK"
      );
    });
  });

  describe("fetchAllTabs", () => {
    it("should fetch all tabs successfully", async () => {
      const tabs = [
        { id: 1, name: "Tab 1" },
        { id: 2, name: "Tab 2" },
      ];
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => tabs,
      });

      const result = await fetchAllTabs();

      expect(mockFetch).toHaveBeenCalledWith(
        `${BASE_URL}/tabs/`,
        expect.any(Object)
      );
      expect(result).toEqual(tabs);
    });

    it("should handle error during fetching tabs", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Fetch error"));

      const result = await fetchAllTabs();

      expect(console.log).toHaveBeenCalledWith(
        "Error fetching tabs:",
        expect.any(Error)
      );
      expect(result).toEqual([]);
    });
  });

  describe("fetchAllGoals", () => {
    it("should fetch all goals successfully", async () => {
      const goals = [
        { id: 1, title: "Goal 1" },
        { id: 2, title: "Goal 2" },
      ];
      (axios.get as vi.Mock).mockResolvedValueOnce({ data: goals });

      const result = await fetchAllGoals();

      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/tabs/lists/all`);
      expect(result).toEqual(goals);
    });

    it("should handle error during fetching goals", async () => {
      (axios.get as vi.Mock).mockRejectedValueOnce(new Error("Axios error"));

      await expect(fetchAllGoals()).rejects.toThrow("Axios error");
      expect(console.error).toHaveBeenCalledWith(
        "Error fetching goals:",
        expect.any(Error)
      );
    });
  });

  describe("updateGoalProgress", () => {
    it("should update goal progress successfully", async () => {
      const goal: Goal = {
        id: 1,
        type: "Simple List",
        title: "Goal 1",
        progress: 50,
      };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      await updateGoalProgress(goal);

      expect(mockFetch).toHaveBeenCalledWith(
        `${BASE_URL}/simplelists/task/1/status`,
        expect.any(Object)
      );
      expect(console.log).toHaveBeenCalledWith(
        "Goal progress updated successfully"
      );
    });

    it("should handle error during updating goal progress", async () => {
      const goal: Goal = {
        id: 1,
        type: "Simple List",
        title: "Goal 1",
        progress: 50,
      };
      mockFetch.mockRejectedValueOnce(new Error("Update error"));

      await updateGoalProgress(goal);

      expect(console.log).toHaveBeenCalledWith("Error storing goal progress");
    });
  });

  describe("deleteTab", () => {
    it("should delete a tab successfully", async () => {
      const tabId = 1;
      const responseMock = { message: "Tab deleted" };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => responseMock,
      });

      await deleteTab(tabId);

      expect(mockFetch).toHaveBeenCalledWith(
        `${BASE_URL}/tabs/1`,
        expect.any(Object)
      );
      expect(console.log).toHaveBeenCalledWith(
        "Tab deleted successfully:",
        responseMock
      );
    });

    it("should handle error during tab deletion", async () => {
      mockFetch.mockResolvedValueOnce({ ok: false });

      await deleteTab(1);

      expect(console.log).toHaveBeenCalledWith("Failed to delete the tab");
    });
  });

  describe("deleteGoal", () => {
    it("should delete a goal successfully", async () => {
      const goal: Goal = { id: 1, type: "Simple List", title: "Goal 1" };
      const responseMock = { message: "Goal deleted" };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => responseMock,
      });

      await deleteGoal(goal);

      expect(mockFetch).toHaveBeenCalledWith(
        `${BASE_URL}/simplelists/task/1`,
        expect.any(Object)
      );
      expect(console.log).toHaveBeenCalledWith(
        "Goal deleted successfully:",
        responseMock
      );
    });

    it("should handle error during goal deletion", async () => {
      const goal: Goal = { id: 1, type: "Simple List", title: "Goal 1" };
      mockFetch.mockResolvedValueOnce({ ok: false });

      await deleteGoal(goal);

      expect(console.log).toHaveBeenCalledWith("Failed to delete the goal");
    });
  });
});
