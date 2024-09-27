import SimpleGoal from "./templates/SimpleGoal.jsx";
import ProgressBar from "./templates/ProgressBar.jsx";
import LevelsBlock from "./templates/LevelsBlock.jsx";
import Sets from "./templates/Sets.jsx";

export default function Goal({ goal }) {
  return (
    <div className="goal-container">
      {goal.type === "Simple List" ? (
        <SimpleGoal goal={goal} />
      ) : goal.type === "Progress Bar" ? (
        <ProgressBar goal={goal} />
      ) : goal.type === "Levels" ? (
        <LevelsBlock goal={goal} />
      ) : goal.type === "Sets" ? (
        <Sets goal={goal} />
      ) : null}
    </div>
  );
}
