import SimpleGoal from "./templates/SimpleGoal";
import ProgressBar from "./templates/ProgressBar";
import LevelsBlock from "./templates/LevelsBlock";
import Sets from "./templates/Sets";

import { Goal } from "../types/types";

interface ListProps {
  list: string;
  tabGoals: Goal[];
}

export default function List({ list, tabGoals }: ListProps) {
  // Now using tabGoals prop passed from Tab component
  const listGoals = tabGoals.filter((goal) => goal.list_name === list);
  return (
    <div
      className="list-container">
      <div id="list-heading">{list}</div>
      <div className="goal-content-container">
        {listGoals.map((goal) =>
          goal.type === "Simple List" && goal.id !== undefined ? (
            <SimpleGoal goalID={Number(goal.id)} key={goal.id} />
          ) : goal.type === "Progress Bar" ? (
            <ProgressBar goal={goal} />
          ) : goal.type === "Levels" ? (
            <LevelsBlock goal={goal} />
          ) : goal.type === "Sets" ? (
            <Sets goal={goal} />
          ) : null
        )}
      </div>
    </div>
  );
}
