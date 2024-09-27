import { calculateGoalXP } from "../utils/calcXP";
import { Goal, Tab, State } from "../types/types";

export type Action =
  | { type: "SET_TABS"; payload: Tab[] }
  | { type: "SET_GOALS"; payload: Goal[] }
  | { type: "CREATE_TAB"; payload: Tab }
  | { type: "CREATE_GOAL"; payload: Goal }
  | { type: "CALCULATE_GOAL_XP"; payload: Goal[] }
  // | { type: 'UPDATE_GOAL'; payload: UNSURE_YET }
  // | { type: 'UPDATE_LIST'; payload: UNSURE_YET }
  // | { type: 'DELETE_TAB'; payload: UNSURE_YET };
  // | { type: 'DELETE_GOAL'; payload: UNSURE_YET };
  // | { type: 'DELETE_LIST_POSITION'; payload: UNSURE_YET };
  | { type: "SET_LOADING"; payload: boolean };

export const initialState: State = {
  tabs: [] as Tab[],
  goals: [] as Goal[],
  isLoading: false,
  goalXPBar: 0,
  currentXP: 0,
};

export function reducer(
  state: typeof initialState = initialState,
  action: Action
) {
  switch (action.type) {
    case "SET_TABS":
      return {
        ...state,
        tabs: action.payload,
      };
    case "SET_GOALS":
      return {
        ...state,
        goals: action.payload,
      };
    case "CREATE_TAB":
      return {
        ...state,
        tabs: [...state.tabs, action.payload],
      };
    case "CREATE_GOAL":
      return {
        ...state,
        goals: [...state.goals, action.payload],
      };
    case "CALCULATE_GOAL_XP":
      const { totalGoalXPBar, totalCurrentXP } = calculateGoalXP(
        action.payload
      );

      return {
        ...state,
        goalXPBar: totalGoalXPBar,
        currentXP: totalCurrentXP,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}
