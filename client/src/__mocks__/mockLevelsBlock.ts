// mocks/mockProgressBarData.ts

import { mockTabData } from "./mockTabData"; // Assuming you already have mockTabData defined
import { Goal } from "../types/types"; // Import your Goal type

// Example of a mock progress bar goal
export const mockLevelsBlockData: Goal[] = [
  {
    id: 32,
    list_name: "List 1",
    task_name: "Task 1",
    complete: false,
    level: 0,
    type: "Levels",
    color: "green",
    last_completed: "2024-10-01T10:46:55.126Z",
    active: true,
    tab: 27,
  },
  {
    id: 33,
    list_name: "List 2",
    task_name: "Task 2",
    complete: true,
    level: 1,
    type: "Levels",
    color: "green",
    last_completed: "2024-10-01T10:46:55.126Z",
    active: true,
    tab: 27,
  },
];

// Create mock progress bar with overrides
export const createMockLevelsBlock = (overrides: Partial<Goal> = {}): Goal => {
  const defaultTab = mockTabData[0]; // Assuming your tab data has defaults

  return {
    id: 1,
    list_name: "Default Progress List",
    task_name: "Default Task",
    complete: false,
    color: "green",
    level: 0,
    type: "Level",
    last_completed: new Date().toISOString(),
    active: true,
    tab: defaultTab.id,
    ...overrides, // Allow overrides for flexibility
  };
};

// Create multiple mock progress bars
export const createMockLevelsBlocks = (count: number): Goal[] => {
  return Array.from({ length: count }, (_, index) => {
    const id = index + 1;
    return createMockLevelsBlock({
      id,
      list_name: `Levels ${id}`,
      task_name: `Task ${id}`,
    });
  });
};

// Example of using multiple mock progress bars
export const mockMultipleProgressBars = createMockLevelsBlocks(3);
