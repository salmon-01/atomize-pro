import { useState, useEffect } from "react";
import { updateGoalProgress } from "../../ApiService";
import { Goal } from "../../types/types";
import { useAppContext } from "../../AppContext";

interface SetsProps {
  goal: Goal;
}

export default function Sets({ goal }: SetsProps) {
  const { dispatch } = useAppContext(); // Access dispatch from global context

  // const [circleSpacing, setCircleSpacing] = "standard-space";

  // Local state for completed sets, initially set to goal's completed_sets
  const [completedSets, setCompletedSets] = useState<number[]>(() =>
    Array(goal.sets)
      .fill(0)
      .map((_, i) => (i < goal.completed_sets ? 1 : 0))
  );
  const [setsToAdd, setSetsToAdd] = useState<string>("");

  // Total sets goal
  const totalSets = goal.sets || 1;

  const setSpacing = (numberOfSets: number) => {
    if (numberOfSets > 3) {
      return "smaller-space";
    }
  };

  // Handle toggling a set's completion status
  const toggleSetCompletion = (index: number) => {
    const updatedSets = [...completedSets];

    // Toggle the set (if completed, set it to 0, otherwise set it to 1)
    updatedSets[index] = updatedSets[index] === 1 ? 0 : 1;

    // Update the state
    setCompletedSets(updatedSets);

    // Count the total completed sets
    const newCompletedSets = updatedSets.reduce((acc, curr) => acc + curr, 0);

    // Dispatch action to update global state
    dispatch({
      type: "UPDATE_GOAL",
      payload: {
        id: goal.id,
        updates: { completed_sets: newCompletedSets },
      },
    });

    // Update the backend with the new progress
    updateGoalProgress(goal);
  };

  // useEffect(() => {
  //   setSpacing(goal.sets);
  // }, []);

  // const handleCompleteSet = () => {
  //   if (completedSets < sets) {
  //     setCompletedSets((prev) => prev + 1);
  //   }
  // };

  // useEffect(() => {
  //   updateGoalProgress(goal);
  // }, [completedSets]);

  return (
    <div className="goal-container">
      <div className="set-container">
        <div className="set-name-box">{goal.task_name}</div>
        <div className="set-tracker">
          {Array.from({ length: goal.sets }).map((_, index) => (
            <div
              className={`set-circles ${
                completedSets[index] === 1 ? "complete-set" : ""
              }`}
              // className={`set-circles ${
              //   index < completedSets ? "complete-set" : ""
              // }`}
              key={index}
              onClick={() => toggleSetCompletion(index)}
            >
              <span className="rep-number">{goal.reps}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
