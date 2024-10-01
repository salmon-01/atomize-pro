import { describe, it, expect, vi } from "vitest";
import { reducer, initialState } from "./reducer";
import { Action, Goal, Tab } from "../types/types";

describe("Reducer", () => {
  it("should return the initial state when no action is passed", () => {
    const result = reducer(undefined, {
      type: "" as any,
      payload: null as any,
    });
    expect(result).toEqual(initialState);
  });

  it("should handle SET_TABS action", () => {
    const tabs: Tab[] = [
      {
        id: 1,
        name: "Tab 1",
        icon_name: "",
      },
      {
        id: 2,
        name: "Tab 2",
        icon_name: "",
      },
    ];
    const action: Action = { type: "SET_TABS", payload: tabs };
    const newState = reducer(initialState, action);

    expect(newState.tabs).toEqual(tabs);
  });

  it("should handle SET_GOALS action", () => {
    const goals: Goal[] = [
      {
        id: 1,
        task_name: "Goal 1",
        list_name: "",
        tab: 0,
        color: "",
        active: false,
        complete: false,
        last_completed: null,
        type: "",
      },
      {
        id: 2,
        task_name: "Goal 2",
        list_name: "",
        tab: 0,
        color: "",
        active: false,
        complete: false,
        last_completed: null,
        type: "",
      },
    ];
    const action: Action = { type: "SET_GOALS", payload: goals };
    const newState = reducer(initialState, action);

    expect(newState.goals).toEqual(goals);
  });

  it("should handle CREATE_TAB action", () => {
    const tab: Tab = {
      id: 3,
      name: "New Tab",
      icon_name: "",
    };
    const action: Action = { type: "CREATE_TAB", payload: tab };
    const newState = reducer(initialState, action);

    expect(newState.tabs).toEqual([...initialState.tabs, tab]);
  });

  it("should handle CREATE_GOAL action", () => {
    const goal: Goal = {
      id: 3,
      task_name: "New Goal",
      list_name: "",
      tab: 0,
      color: "",
      active: false,
      complete: false,
      last_completed: null,
      type: "",
    };
    const action: Action = { type: "CREATE_GOAL", payload: goal };
    const newState = reducer(initialState, action);

    expect(newState.goals).toEqual([...initialState.goals, goal]);
  });

  it("should handle CALCULATE_GOAL_XP action", () => {
    // Mock the calculateGoalXP utility
    vi.mock("../utils/calcXP", () => ({
      calculateGoalXP: vi
        .fn()
        .mockReturnValue({ totalGoalXPBar: 100, totalCurrentXP: 50 }),
    }));

    const payload: Goal[] = [
      {
        id: 1,
        task_name: "Goal 1",
        progress: 50,
        list_name: "",
        tab: 0,
        color: "",
        active: false,
        complete: false,
        last_completed: null,
        type: "",
      },
    ];
    const action: Action = { type: "CALCULATE_GOAL_XP", payload };
    const newState = reducer(initialState, action);

    expect(newState.goalXPBar).toBe(100);
    expect(newState.currentXP).toBe(50);
  });

  it("should handle UPDATE_GOAL action", () => {
    const state = {
      ...initialState,
      goals: [
        {
          id: 1,
          task_name: "Old Goal",
          progress: 50,
          list_name: "",
          tab: 0,
          color: "",
          active: false,
          complete: false,
          last_completed: null,
          type: "",
        },
        {
          id: 2,
          task_name: "Another Goal",
          progress: 50,
          list_name: "",
          tab: 0,
          color: "",
          active: false,
          complete: false,
          last_completed: null,
          type: "",
        },
      ],
    };

    const updatedGoal = { id: 1, updates: { task_name: "Updated Goal" } };
    const action: Action = { type: "UPDATE_GOAL", payload: updatedGoal };
    const newState = reducer(state, action);

    expect(newState.goals).toEqual([
      { id: 1, task_name: "Updated Goal" },
      { id: 2, task_name: "Another Goal" },
    ]);
  });

  it("should handle DELETE_GOAL action", () => {
    const state = {
      ...initialState,
      goals: [
        {
          id: 1,
          task_name: "Goal 1",
          progress: 50,
          list_name: "",
          tab: 0,
          color: "",
          active: false,
          complete: false,
          last_completed: null,
          type: "",
        },
        {
          id: 2,
          task_name: "Goal 2",
          progress: 50,
          list_name: "",
          tab: 0,
          color: "",
          active: false,
          complete: false,
          last_completed: null,
          type: "",
        },
      ],
    };

    const action: Action = { type: "DELETE_GOAL", payload: { id: 1 } };
    const newState = reducer(state, action);

    expect(newState.goals).toEqual([{ id: 2, task_name: "Goal 2" }]);
  });

  it("should handle DELETE_LIST action", () => {
    const state = {
      ...initialState,
      goals: [
        {
          id: 1,
          task_name: "Goal 1",
          list_name: "List 1",
          progress: 50,
          tab: 0,
          color: "",
          active: false,
          complete: false,
          last_completed: null,
          type: "",
        },
        {
          id: 2,
          task_name: "Goal 2",
          list_name: "List 1",
          progress: 50,
          tab: 0,
          color: "",
          active: false,
          complete: false,
          last_completed: null,
          type: "",
        },
        {
          id: 3,
          task_name: "Goal 3",
          list_name: "List 2",
          progress: 50,
          tab: 0,
          color: "",
          active: false,
          complete: false,
          last_completed: null,
          type: "",
        },
      ],
    };

    const action: Action = {
      type: "DELETE_LIST",
      payload: { list_name: "List 1" },
    };
    const newState = reducer(state, action);

    expect(newState.goals).toEqual([
      { id: 3, task_name: "Goal 3", list_name: "List 2" },
    ]);
  });

  it("should handle DELETE_TAB action", () => {
    const state = {
      ...initialState,
      tabs: [
        { id: 1, name: "Tab 1", icon_name: "" },
        { id: 2, name: "Tab 2", icon_name: "" },
      ],
    };

    const action: Action = { type: "DELETE_TAB", payload: { id: 1 } };
    const newState = reducer(state, action);

    expect(newState.tabs).toEqual([{ id: 2, name: "Tab 2" }]);
  });

  it("should handle SET_LOADING action", () => {
    const action: Action = { type: "SET_LOADING", payload: true };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(true);
  });
});
