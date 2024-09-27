import { Link } from "react-router-dom";
import { useAppContext } from "../AppContext";
import { State } from "../types/types";

export default function HomeOverview() {
  // Home will show a simple overview of all tabs and the lists inside them.

  const { state } = useAppContext() as {
    state: State;
  };
  const { tabs, goals } = state;

  return (
    <div className="overview-container">
      {tabs.map((tab) => (
        <div className="tab-overview-box" key={tab.name}>
          <h4 className="overview-header">{tab.name}</h4>
          <div className="goals-overview">
            {goals.map((goal) =>
              goal.tab === tab.name ? <span key={goal.name}>O</span> : null
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
