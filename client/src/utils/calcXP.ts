import { Goal } from "../types/types";

export function calculateGoalXP(goals: Goal[]) {
  let totalGoalXPBar = 0;
  let currentXP = 0;

  goals.forEach((goal) => {
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
      currentXP += 1;
    }
    if (goal.type === "Sets" && goal.completed_sets !== undefined) {
      currentXP += goal.completed_sets;
    }
    if (goal.type === "Levels" && goal.level !== undefined) {
      currentXP += goal.level;
    }
    if (
      goal.type === "Progress Bar" &&
      goal.current_number !== undefined &&
      goal.goal_number !== undefined
    ) {
      const progress =
        goal.goal_number > 0
          ? Math.round((goal.current_number / goal.goal_number) * 10)
          : 0;
      currentXP += progress;
    }
  });

  return {
    totalGoalXPBar,
    currentXP,
  };
}
