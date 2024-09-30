import { useState } from "react";
import "../../styles/ProgressBar.css";
import { updateGoalProgress } from "../../ApiService";
import { Goal } from "../../types/types";
import { useAppContext } from "../../AppContext";

interface ProgressBarProps {
  goal: Goal;
}

export default function ProgressBar({ goal }: ProgressBarProps) {
  const { dispatch } = useAppContext(); // Access dispatch from global context

  // Local state for the current progress, initially set to goal's current_number
  const [current, setCurrent] = useState<number>(goal.current_number || 0);
  const [progressToAdd, setToAdd] = useState<string>("");

  // Ensure goal.goal_number has a default fallback value
  const goalNumber = goal.goal_number || 1;

  // This function is triggered when the user submits the progress
  function submitProgress() {
    const parsedValue = progressToAdd === "" ? 1 : Number(progressToAdd);

    if (isNaN(parsedValue)) {
      alert("Please enter a valid number.");
      return;
    }

    const newProgress = current + parsedValue;
    const maxProgress = goalNumber * 10; // Limit progress to 1000% of the original goal

    // Validation: ensure the new progress doesn't exceed 1000% of the goal
    if (newProgress > maxProgress) {
      alert(
        `The progress cannot exceed 1000% of the goal (${maxProgress} ${goal.units}).`
      );
      return;
    }

    // Ensure the progress doesn't go below zero
    if (newProgress < 0) {
      alert(`The progress cannot be less than 0.`);
      return;
    }

    // Update local state to reflect the new progress
    setCurrent(newProgress);

    // Dispatch action to update the global state with new progress
    dispatch({
      type: "UPDATE_GOAL",
      payload: {
        id: goal.id,
        updates: { current_number: newProgress },
      },
    });

    // Make the API call to update the progress on the backend
    updateGoalProgress({
      ...goal,
      current_number: newProgress, // Send the updated progress to the backend
    });

    // Clear the input field
    setToAdd("");
  }

  // Handle input changes
  function handleDayProgress(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setToAdd(value === "" ? "" : value);
  }

  // Handle key press to submit on "Enter"
  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      submitProgress(); // Trigger submit when Enter is pressed
    }
  }

  return (
    <div className="goal-container">
      <div className="fullBar">
        <div className="left-box-prog">
          <div className="goalName">{goal.task_name}</div>
          <div className="inputBox">
            <input
              type="number"
              className="progressIncrease"
              value={progressToAdd}
              onChange={handleDayProgress}
              onKeyPress={handleKeyPress}
            />
            <button className="addProgress" onClick={submitProgress}>
              +
            </button>
          </div>
        </div>
        <div className="barBox">
          <div className="progress-container">
            <div
              className={`progress-bar ${
                current >= goalNumber
                  ? "green-fill"
                  : goal.color === "orange-gradient"
                  ? "orange-fill"
                  : "purple-gradient"
              }`}
              style={{ width: `${(current / goalNumber) * 100}%` }}
            ></div>
            <span className="progress-text">
              {current} / {goalNumber} {goal.units} —{" "}
              {((current / goalNumber) * 100).toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
