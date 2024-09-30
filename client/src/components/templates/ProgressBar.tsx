import { useState, useEffect } from "react";
import "../../styles/ProgressBar.css";
import { updateGoalProgress } from "../../ApiService";
import { Goal } from "../../types/types";

interface ProgressBarProps {
  goal: Goal;
}

export default function ProgressBar({ goal }: ProgressBarProps) {
  const [current, setCurrent] = useState<number>(goal.current_number);
  const [progressToAdd, setToAdd] = useState<string>("");

  useEffect(() => {
    const percentage = (current / goal.goal_number) * 100;
    updateGoalProgress(goal.task_name, goal.type, current);
  }, [current]);

  function submitProgress() {
    const newProgress = current + Number(progressToAdd);
    const maxProgress = goal.goal_number * 10; // 1000% of the original goal

    if (newProgress > maxProgress) {
      alert(
        `The progress cannot exceed 1000% of the goal (${maxProgress} ${goal.units}).`
      );
      return;
    }

    setCurrent(newProgress);
    setToAdd("");
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
                current >= goal.goal_number
                  ? "green-fill"
                  : goal.color === "orange-gradient"
                  ? "orange-fill"
                  : "purple-gradient"
              }`}
              style={{ width: `${(current / goal.goal_number) * 100}%` }}
            ></div>
            <span className="progress-text">
              {current} / {goal.goal_number} {goal.units} —{" "}
              {((current / goal.goal_number) * 100).toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
