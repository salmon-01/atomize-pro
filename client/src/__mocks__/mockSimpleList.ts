// mocks/simpleListData.ts

import { mockTabData } from "./mockTabData";
import { Goal } from "../types/types";

export const mockSimpleListData: Goal[] = [
  {
    id: 1,
    list_name: "Simple List 1",
    task_name: "Task 1",
    complete: false,
    color: "purple",
    active: true,
    type: "Simple List",
    last_completed: "2024-09-30T16:41:21.515Z",
    tab: 1,
  },
  {
    id: 2,
    list_name: "Simple List 1",
    task_name: "Task 2",
    complete: false,
    active: true,
    color: "purple",
    type: "Simple List",
    last_completed: "2024-09-30T16:41:21.515Z",
    tab: 1,
  },
];

export const createMockSimpleList = (overrides: Partial<Goal> = {}): Goal => {
  const defaultTab = mockTabData[0];

  return {
    id: 1,
    list_name: "Default List",
    task_name: "Default Task",
    complete: false,
    color: "purple",
    type: "Simple List",
    active: true,
    last_completed: new Date().toISOString(),
    tab: defaultTab.id,
    ...overrides,
  };
};

export const createMockSimpleLists = (count: number): Goal[] => {
  return Array.from({ length: count }, (_, index) => {
    const id = index + 1;
    return createMockSimpleList({
      id,
      list_name: `List ${id}`,
      task_name: `Task ${id}`,
    });
  });
};

// Example of mock data usage
export const mockMultipleSimpleLists = createMockSimpleLists(4);
