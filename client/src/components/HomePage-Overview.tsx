import { useAppContext } from "../AppContext";
import { State } from "../types/types";

export default function HomeOverview() {
  // Home will show a simple overview of all tabs and the lists inside them.

  const { state } = useAppContext() as {
    state: State;
  };
  const { tabs, goals } = state;

  const groupedGoals = goals.reduce((acc, goal) => {
    if (!acc[goal.list_name]) {
      acc[goal.list_name] = [];
    }
    acc[goal.list_name].push(goal);
    return acc;
  }, {} as Record<string, typeof goals>);

  return (
    <div className="overview-container">
      {tabs.map((tab) => (
        <div className="tab-overview-box" key={tab.name}>
          <h4 className="overview-header">{tab.name}</h4>
          <div className="goals-overview">
            {Object.entries(groupedGoals).map(([listName, listGoals]) => {
              const tabGoals = listGoals.filter((goal) => goal.tab === tab.id);
              if (tabGoals.length === 0) {
                return null;
              }
              return (
                <div className="goal-group" key={listName}>
                  <div className="goal-list-header">{listName}</div>
                  <div className="goal-statuses">
                    {tabGoals.map((goal) => (
                      <span key={goal.task_name}>
                        {goal.complete ? "✅" : "❌"}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
