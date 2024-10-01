import { Goal } from "../types/types";

export const mockGoalData: Goal[] = [
  {
    id: 1,
    task_name: "Complete project proposal",
    list_name: "Work",
    tab: 1,
    color: "#FF5733",
    active: true,
    complete: false,
    last_completed: null,
    type: "task",
  },
  {
    id: 2,
    task_name: "Go for a run",
    list_name: "Health",
    tab: 1,
    color: "#33FF57",
    active: true,
    complete: false,
    last_completed: null,
    type: "habit",
  },
  {
    id: 3,
    task_name: "Read a book",
    list_name: "Personal",
    tab: 2,
    color: "#3357FF",
    active: true,
    complete: false,
    last_completed: null,
    type: "task",
  },
];

export const createMockGoal = (overrides: Partial<Goal> = {}): Goal => ({
  id: Math.floor(Math.random() * 1000),
  task_name: "Default Task",
  list_name: "Default List",
  tab: 1,
  color: "#000000",
  active: true,
  complete: false,
  last_completed: null,
  type: "task",
  ...overrides,
});

export const createMockGoals = (count: number): Goal[] => {
  return Array.from({ length: count }, (_, index) =>
    createMockGoal({ id: index + 1, task_name: `Task ${index + 1}` })
  );
};
