// IMPORT TAB, GOAL AS TYPES

export type Action =
  | { type: "SET_TABS"; payload: Tab[] }
  | { type: "SET_GOALS"; payload: Goal[] }
  | { type: "CREATE_TAB"; payload: Tab }
  | { type: "CREATE_GOAL"; payload: Goal }
  | { type: "CALCULATE_GOAL_XP"; payload: Goal[] } // New action
  // | { type: 'UPDATE_GOAL'; payload: UNSURE_YET }
  // | { type: 'UPDATE_LIST'; payload: UNSURE_YET }
  // | { type: 'DELETE_TAB'; payload: UNSURE_YET };
  // | { type: 'DELETE_GOAL'; payload: UNSURE_YET };
  // | { type: 'DELETE_LIST_POSITION'; payload: UNSURE_YET };
  | { type: "SET_LOADING"; payload: boolean };

export const initialState = {
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
        tabs: [...state.goals, action.payload],
      };
    case "CALCULATE_GOAL_XP":
      // Perform XP calculations
      let totalGoalXPBar = 0;
      let totalCurrentXP = 0;

      action.payload.forEach((goal) => {
        if (goal.type === "Simple List") {
          totalGoalXPBar += 1;
        }
        if (goal.type === "Levels" && goal.level !== undefined) {
          totalGoalXPBar += 3;
        }
        if (goal.type === "Sets" && goal.sets !== undefined) {
          totalGoalXPBar += goal.sets;
        }
        if (goal.type === "Progress Bar") {
          totalGoalXPBar += 10;
        }

        // Calculate XP based on completion
        if (goal.type === "Simple List" && goal.complete) {
          totalCurrentXP += 1;
        }
        if (goal.type === "Sets" && goal.completed_sets !== undefined) {
          totalCurrentXP += goal.completed_sets;
        }
        if (goal.type === "Levels" && goal.level !== undefined) {
          totalCurrentXP += goal.level;
        }
        if (
          goal.type === "Progress Bar" &&
          goal.current !== undefined &&
          goal.goal_number !== undefined
        ) {
          const progress =
            goal.goal_number > 0
              ? Math.round((goal.current / goal.goal_number) * 10)
              : 0;
          totalCurrentXP += progress;
        }
      });

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
