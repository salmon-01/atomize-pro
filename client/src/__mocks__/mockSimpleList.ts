// mocks/simpleListData.ts

import { Tab, mockTabData, createMockTab } from "./mockTabData";

export interface SimpleList {
  id: number;
  list_name: string;
  task_name: string;
  complete: boolean;
  color: string;
  type: "Simple List";
  createdAt: string;
  updatedAt: string;
  tab: number;
  Tab: Tab;
}

export const mockSimpleListData: SimpleList[] = [
  {
    id: 1,
    list_name: "Simple List 1",
    task_name: "Task 1",
    complete: true,
    color: "purple",
    type: "Simple List",
    createdAt: "2024-09-30T16:41:21.515Z",
    updatedAt: "2024-09-30T16:41:22.814Z",
    tab: 27,
    Tab: mockTabData[0],
  },
];

export const createMockSimpleList = (
  overrides: Partial<SimpleList> = {}
): SimpleList => {
  const defaultTab = mockTabData[0];

  return {
    id: 1,
    list_name: "Default List",
    task_name: "Default Task",
    complete: false,
    color: "purple",
    type: "Simple List",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tab: defaultTab.id,
    Tab: defaultTab,
    ...overrides,
  };
};

export const createMockSimpleLists = (
  count: number,
  tabOverride?: Tab
): SimpleList[] => {
  return Array.from({ length: count }, (_, index) => {
    const id = index + 1;
    return createMockSimpleList({
      id,
      list_name: `List ${id}`,
      task_name: `Task ${id}`,
      Tab: tabOverride || mockTabData[0],
    });
  });
};

// Example of mock data usage
export const mockMultipleSimpleLists = createMockSimpleLists(4);
