import { useAppContext } from "../AppContext";
import SimpleGoal from "./templates/SimpleGoal";
import ProgressBar from "./templates/ProgressBar";
import LevelsBlock from "./templates/LevelsBlock";
import Sets from "./templates/Sets";

import { State, Tab } from "../types/types";

interface ListProps {
  list: string;
  tab: Tab;
}

export default function List({ list, tab }: ListProps) {
  console.log(tab);

  const { state } = useAppContext() as {
    state: State;
  };
  const { goals } = state;
  // Rendering and styling still incomplete

  const listGoals = goals.filter((goal) => goal.list === list);

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
