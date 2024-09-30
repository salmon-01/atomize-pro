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

  // State to track the number of completed sets
  const [completedSets, setCompletedSets] = useState(goal.completed_sets || 0);

  // Handle clicking to complete the next set in the sequence
  const handleCompleteSet = () => {
    if (completedSets < goal.sets) {
      const newCompletedSets = completedSets + 1;

      // Update the state with the new number of completed sets
      setCompletedSets(newCompletedSets);

      // Dispatch action to update the global state
      dispatch({
        type: "UPDATE_GOAL",
        payload: {
          id: goal.id,
          updates: { completed_sets: newCompletedSets },
        },
      });

      // Update the backend with the new progress
      updateGoalProgress(goal);
    }
  };

  return (
    <div className="goal-container">
      <div className="set-container">
        <div className="set-name-box">{goal.task_name}</div>
        <div className="set-tracker">
          {Array.from({ length: goal.sets }).map((_, index) => (
            <div
              key={index}
              className={`set-circles ${
                index < completedSets ? "complete-set" : ""
              }`}
              onClick={handleCompleteSet} // Clicking any button adds to the completed sets
            >
              <span className="rep-number">{goal.reps}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
