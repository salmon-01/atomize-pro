import { Goal } from "../types/types";

export function calculateGoalXP(goals: Goal[]) {
  let totalGoalXPBar = 0;
  let totalCurrentXP = 0;

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
    totalGoalXPBar,
    totalCurrentXP,
  };
}
