import { calculateGoalXP } from "../utils/calcXP";
import { Action, Goal, Tab, State } from "../types/types";

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
    case "UPDATE_GOAL":
      const updatedGoals = state.goals.map((goal) =>
        goal.id === action.payload.id
          ? { ...goal, ...action.payload.updates } // Create a new goal object
          : goal
      );
      return {
        ...state,
        goals: updatedGoals, // Create a new goals array
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
