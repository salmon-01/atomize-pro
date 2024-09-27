export interface Tab {
  name: string;
  icon: string;
  order_no: number;
  col_one: string | null;
  col_one_b: string | null;
  col_three: string | null;
  col_three_b: string | null;
  col_two: string | null;
  col_two_b: string | null;
}

export interface Goal {
  id?: number | string;
  name: string;
  current?: number;
  list: string;
  tab: string;
  color: string;
  order_no: number;
  active: boolean;
  complete: boolean;
  last_completed: string | null;
  type: string;
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
  // | { type: 'DELETE_TAB'; payload: UNSURE_YET };
  // | { type: 'DELETE_GOAL'; payload: UNSURE_YET };
  // | { type: 'DELETE_LIST_POSITION'; payload: UNSURE_YET };
  | { type: "SET_LOADING"; payload: boolean };
