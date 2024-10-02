import { describe, it, expect } from "vitest";
import { calculateGoalXP } from "./calcXP";
import { Goal } from "../types/types";

describe("calculateGoalXP", () => {
  it("should correctly calculate XP for Simple List goals", () => {
    const goals: Goal[] = [
      {
        type: "Simple List",
        complete: true,
        task_name: "",
        list_name: "",
        tab: 0,
        color: "",
        active: false,
        last_completed: null,
      },
      {
        type: "Simple List",
        complete: false,
        task_name: "",
        list_name: "",
        tab: 0,
        color: "",
        active: false,
        last_completed: null,
      },
    ];

    const result = calculateGoalXP(goals);

    expect(result.totalGoalXPBar).toBe(2); // 1 for each Simple List goal
    expect(result.totalCurrentXP).toBe(1); // 1 complete goal
  });

  it("should correctly calculate XP for Levels goals", () => {
    const goals: Goal[] = [
      {
        type: "Levels",
        level: 2,
        task_name: "",
        list_name: "",
        tab: 0,
        color: "",
        active: false,
        complete: false,
        last_completed: null,
      },
      {
        type: "Levels",
        level: 3,
        task_name: "",
        list_name: "",
        tab: 0,
        color: "",
        active: false,
        complete: false,
        last_completed: null,
      },
    ];

    const result = calculateGoalXP(goals);

    expect(result.totalGoalXPBar).toBe(6); // 3 for each Levels goal
    expect(result.totalCurrentXP).toBe(5); // Sum of levels
  });

  it("should correctly calculate XP for Sets goals", () => {
    const goals: Goal[] = [
      {
        type: "Sets",
        sets: 4,
        completed_sets: 3,
        task_name: "",
        list_name: "",
        tab: 0,
        color: "",
        active: false,
        complete: false,
        last_completed: null,
      },
      {
        type: "Sets",
        sets: 5,
        completed_sets: 4,
        task_name: "",
        list_name: "",
        tab: 0,
        color: "",
        active: false,
        complete: false,
        last_completed: null,
      },
    ];

    const result = calculateGoalXP(goals);

    expect(result.totalGoalXPBar).toBe(9); // Sum of all sets
    expect(result.totalCurrentXP).toBe(7); // Sum of completed sets
  });

  it("should correctly calculate XP for Progress Bar goals", () => {
    const goals: Goal[] = [
      {
        type: "Progress Bar",
        current_number: 5,
        goal_number: 10,
        task_name: "",
        list_name: "",
        tab: 0,
        color: "",
        active: false,
        complete: false,
        last_completed: null,
      },
      {
        type: "Progress Bar",
        current_number: 7,
        goal_number: 14,
        task_name: "",
        list_name: "",
        tab: 0,
        color: "",
        active: false,
        complete: false,
        last_completed: null,
      },
    ];

    const result = calculateGoalXP(goals);

    expect(result.totalGoalXPBar).toBe(20); // 10 for each Progress Bar goal
    expect(result.totalCurrentXP).toBe(10); // Progress of 5/10 and 7/14 rounds to 5 each
  });

  it("should return 0 XP if no goals are provided", () => {
    const goals: Goal[] = [];

    const result = calculateGoalXP(goals);

    expect(result.totalGoalXPBar).toBe(0);
    expect(result.totalCurrentXP).toBe(0);
  });

  it("should handle mixed types of goals", () => {
    const goals: Goal[] = [
      {
        type: "Simple List",
        complete: true,
        task_name: "",
        list_name: "",
        tab: 0,
        color: "",
        active: false,
        last_completed: null,
      },
      {
        type: "Sets",
        sets: 5,
        completed_sets: 4,
        task_name: "",
        list_name: "",
        tab: 0,
        color: "",
        active: false,
        complete: false,
        last_completed: null,
      },
      {
        type: "Levels",
        level: 2,
        task_name: "",
        list_name: "",
        tab: 0,
        color: "",
        active: false,
        complete: false,
        last_completed: null,
      },
      {
        type: "Progress Bar",
        current_number: 8,
        goal_number: 16,
        task_name: "",
        list_name: "",
        tab: 0,
        color: "",
        active: false,
        complete: false,
        last_completed: null,
      },
    ];

    const result = calculateGoalXP(goals);

    expect(result.totalGoalXPBar).toBe(19); // 1 + 5 + 3 + 10
    expect(result.totalCurrentXP).toBe(12); // 1 + 4 + 2 + 8/16 (5 rounded)
  });

  it("should handle edge cases for Progress Bar goals with 0 goal_number", () => {
    const goals: Goal[] = [
      {
        type: "Progress Bar",
        current_number: 5,
        goal_number: 0,
        task_name: "",
        list_name: "",
        tab: 0,
        color: "",
        active: false,
        complete: false,
        last_completed: null,
      },
    ];

    const result = calculateGoalXP(goals);

    expect(result.totalGoalXPBar).toBe(10); // 10 for Progress Bar
    expect(result.totalCurrentXP).toBe(0); // Progress should be 0 since goal_number is 0
  });
});
