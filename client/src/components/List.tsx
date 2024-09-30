import { useAppContext } from "../AppContext";
import SimpleGoal from "./templates/SimpleGoal";
import ProgressBar from "./templates/ProgressBar";
import LevelsBlock from "./templates/LevelsBlock";
import Sets from "./templates/Sets";

import { Tab, Goal } from "../types/types";

interface ListProps {
  list: string;
  tab: Tab;
  tabGoals: Goal[];
}

export default function List({ list, tab, tabGoals }: ListProps) {
  // Now using tabGoals prop passed from Tab component
  const listGoals = tabGoals.filter((goal) => goal.list_name === list);
  return (
    <div
      className="list-container"
      id={`${
        (tab.col_one === list && "col1") ||
        (tab.col_two === list && "col2") ||
        "col3"
      }`}
    >
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
