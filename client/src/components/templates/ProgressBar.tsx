import { useState, useEffect } from "react";
import "../../styles/ProgressBar.css";
import { updateGoalProgress } from "../../ApiService";
import { Goal } from "../../types/types";

interface ProgressBarProps {
  goal: Goal;
}

export default function ProgressBar({ goal }: ProgressBarProps) {
  const [current, setCurrent] = useState<number>(goal.current_number || 0);
  const [progressToAdd, setToAdd] = useState<string>("");

  // Ensure goal.goal_number has a default fallback value
  const goalNumber = goal.goal_number || 1; // Default to 1 if undefined

  useEffect(() => {
    // const percentage = (current / goalNumber) * 100;
    updateGoalProgress(goal);
  }, [current, goal]);

  function submitProgress() {
    const newProgress = current + Number(progressToAdd);
    const maxProgress = goalNumber * 10; // Progress is limited to 1000% of the original goal

    if (newProgress > maxProgress) {
      alert(
        `The progress cannot exceed 1000% of the goal (${maxProgress} ${goal.units}).`
      );
      return;
    }

    setCurrent(newProgress); // Update progress state
    setToAdd(""); // Clear input field after submission
  }

  function handleDayProgress(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setToAdd(value === "" ? "" : value);
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
