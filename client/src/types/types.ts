export interface Tab {
  id?: number | null;
  name: string;
  icon_name: string;
  order_no: number;
}

export interface Goal {
  id?: number | string; // Might change to just number here...
  task_name: string;
  list_name: string;
  tab: number;
  color: string;
  active: boolean;
  complete: boolean;
  last_completed: string | null;
  type: string;
  current_number?: number; // Optional field for "Progress Bar"
  goal_number?: number; // Optional field for "Progress Bar"
  units?: string; // Optional field for "Progress Bar"
  sets?: number; // Optional field for 'Sets'
  completed_sets?: number; // Optional field for 'Sets'
  reps?: number; // Optional field for 'Sets'
  level?: number; // Optional field for 'Level'
}

export interface State {
  tabs: Tab[];
  goals: Goal[];
  isLoading: boolean;
  goalXPBar: number;
  currentXP: number;
}

export type Action =
  | { type: "SET_TABS"; payload: Tab[] }
  | { type: "SET_GOALS"; payload: Goal[] }
  | { type: "CREATE_TAB"; payload: Tab }
  | { type: "CREATE_GOAL"; payload: Goal }
  | { type: "CALCULATE_GOAL_XP"; payload: Goal[] }
  | { type: "UPDATE_GOAL"; payload: { id: number; updates: Partial<Goal> } } // New action to update goal
  // | { type: 'UPDATE_LIST'; payload: UNSURE_YET }
  | { type: "DELETE_TAB"; payload: { id: number } }
  | { type: "DELETE_GOAL"; payload: { id: number } }
  | { type: "DELETE_LIST"; payload: { list_name: string } }
  // | { type: 'DELETE_LIST_POSITION'; payload: UNSURE_YET };
  | { type: "SET_LOADING"; payload: boolean };

export type AppContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export interface FormData {
  listName: string;
  selectedTab: string | null;
}
