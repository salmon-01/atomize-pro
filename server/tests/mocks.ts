// Mocks for tabs

export const mockTab = {
  name: "Test Tab 1",
  icon_name: "icon-name-1",
};

export const mockTabs = [
  { name: "Test Tab 2", icon_name: "icon-name-2" },
  { name: "Test Tab 3", icon_name: "icon-name-3" },
  { name: "Test Tab 4", icon_name: "icon-name-4" },
];

export const mockTabToDelete = {
  name: "Tab to Delete",
  icon_name: "icon-delete",
};

// Mocks for simple lists

export const mockSimpleList = {
  list_name: "Test Simple List 1",
  task_name: "Task 1",
  color: "purple",
  tab: 1,
};

export const mockSimpleListWithSomeTasks = [
  {
    list_name: "Test Simple List 2",
    task_name: "Task 1",
    color: "purple",
    tab: 1,
  },
  {
    list_name: "Test Simple List 2",
    task_name: "Task 2",
    color: "purple",
    tab: 1,
  },
];

// Mocks for progress bars

export const mockProgressBar = {
  list_name: "Test Progress Bar 1",
  task_name: "Task 1",
  goal_number: 100,
  current_number: 0,
  units: "reps",
  tab: 1,
};

export const mockProgressBarWithSomeTasks = [
  {
    list_name: "Test Progress Bar 2",
    task_name: "Task 1",
    goal_number: 20,
    current_number: 0,
    units: "reps",
    tab: 1,
  },
  {
    list_name: "Test Progress Bar 2",
    task_name: "Task 2",
    goal_number: 50,
    current_number: 0,
    units: "reps",
    tab: 1,
  },
];

// Mocks for sets

export const mockSet = {
  list_name: "Test Set 1",
  task_name: "Task 1",
  sets: 5,
  completed_sets: 0,
  reps: 10,
  color: "purple",
  tab: 1,
};

export const mockSetWithSomeTasks = [
  {
    list_name: "Test Set 2",
    task_name: "Task 1",
    sets: 15,
    completed_sets: 0,
    reps: 3,
    color: "purple",
    tab: 1,
  },
  {
    list_name: "Test Set 2",
    task_name: "Task 2",
    sets: 4,
    completed_sets: 0,
    reps: 15,
    color: "green",
    tab: 1,
  },
];

// Mocks for levels

export const mockLevel = {
  list_name: "Test Levels 1",
  task_name: "Task 1",
  color: "blue",
  level: 0,
  tab: 1,
};

export const mockLevelWithSomeTasks = [
  {
    list_name: "Test Levels 2",
    task_name: "Task 1",
    color: "blue",
    level: 0,
    tab: 1,
  },
  {
    list_name: "Test Levels 2",
    task_name: "Task 2",
    color: "pink",
    level: 0,
    tab: 1,
  },
];
