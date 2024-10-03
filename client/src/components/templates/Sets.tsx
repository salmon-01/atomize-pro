import { useState } from "react";
// import "../../styles/Sets.css"; // Assuming you have some styles for this component
import { updateGoalProgress } from "../../ApiService";
import { Goal } from "../../types/types";
import { useAppContext } from "../../AppContext";

interface SetsProps {
  goal: Goal;
}

export default function Sets({ goal }: SetsProps) {
  const { dispatch } = useAppContext(); // Access dispatch from global context

  const completedSets = goal.completed_sets || 0;
  const totalSets = goal.sets || 0;

  // Handle clicking to complete the next set in the sequence
  const handleCompleteSet = () => {
    if (goal.sets !== undefined && completedSets < goal.sets) {
      const newCompletedSets = completedSets + 1;

      // Dispatch action to update the global state
      dispatch({
        type: "UPDATE_GOAL",
        payload: {
          id: goal.id as number,
          updates: { completed_sets: newCompletedSets },
        },
      });

      // Update the backend with the new progress
      updateGoalProgress({
        ...goal,
        completed_sets: newCompletedSets,
      });
    }
  };

  return (
    <div className="goal-container">
      <div className={`set-container ${goal.color}`}>
        <div className={`set-name-box`}>{goal.task_name}</div>
        <div className="set-tracker">
          {Array.from({ length: totalSets }).map((_, index) => (
            <div
              key={index}
              className={`set-circles ${
                index < completedSets ? "complete-set" : ""
              }`}
              onClick={handleCompleteSet} // Clicking any button adds to the completed sets
            >
              <span className="rep-number">{goal.reps || 0}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
