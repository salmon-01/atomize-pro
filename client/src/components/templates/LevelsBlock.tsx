import { useState } from "react";
import "../../styles/LevelsBlock.css";
import { updateGoalProgress } from "../../ApiService";
import { Goal } from "../../types/types";
import { useAppContext } from "../../AppContext";

interface LevelsBlockProps {
  goal: Goal;
}

export default function LevelsBlock({ goal }: LevelsBlockProps) {
  const { dispatch } = useAppContext();
  const maxLevel = 3;

  // State to track number of completed levels
  const progress = goal.level || 0;

  const handleCompletedLevels = () => {
    if (progress < maxLevel) {
      const newCompletedLevels = progress + 1;

      // Dispatch action to update the global state
      dispatch({
        type: "UPDATE_GOAL",
        payload: {
          id: goal.id as number,
          updates: { level: newCompletedLevels },
        },
      });

      dispatch({ type: "CALCULATE_GOAL_XP" }); // Recalculate XP

      // Update the backend with the new progress
      updateGoalProgress({ ...goal, level: newCompletedLevels });
    }
  };

  const goalClass =
    goal.color === "pink" ? "levels-block-pink" : "levels-block-purple";

  return (
    <div className="goal-container">
      <div className="fullBlock">
        <div
          className={goalClass}
          key={goal.id}
          onClick={handleCompletedLevels}
        >
          {goal.task_name}
        </div>
        <div className="lightTracker">
          <div
            className={`statusLight ${progress === 3 ? "isDone" : "isOff"}`}
          ></div>
          <div
            className={`statusLight ${
              progress === 3 ? "isDone" : progress === 2 ? "isPartway" : "isOff"
            }`}
          ></div>
          <div
            className={`statusLight ${
              (progress === 3 && "isDone") ||
              (progress === 2 && "isPartway") ||
              (progress === 1 && "isStarted") ||
              "isOff"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
}
