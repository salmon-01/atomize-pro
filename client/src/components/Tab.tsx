import { useParams } from "react-router-dom";
import "../styles/Tab.css";
import { useAppContext } from "../AppContext.js";
import List from "./List.js";
import { Goal, State } from "../types/types.js";
import { BlankPage } from "./BlankPage.js";

type GoalsByList = {
  [listName: string]: Goal[];
};

export default function Tab() {
  const { state } = useAppContext() as {
    state: State;
  };
  const { goals, tabs, isLoading } = state;
  const { tabName } = useParams();

  const normalizeName = (name: string | undefined) =>
    decodeURIComponent(name ?? "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");

  const normalizedTabName = normalizeName(tabName);

  // Find the current tab based on the normalized name from the URL params
  const tab = tabs.find((tab) => normalizeName(tab.name) === normalizedTabName);

  // Filter goals for the current tab
  const tabGoals = tab ? goals.filter((goal) => goal.tab === tab.id) : [];

  // Group goals by list_name
  const goalsByList = tabGoals.reduce((acc: GoalsByList, goal: Goal) => {
    // If the list_name doesn't exist in the accumulator, create a new array
    if (!acc[goal.list_name]) {
      acc[goal.list_name] = [];
    }
    // Add the current goal to the appropriate list_name group
    acc[goal.list_name].push(goal);
    return acc;
  }, {});
  // console.log(goalsByList);
  // Get an array of all list names
  const tabLists = Object.keys(goalsByList);
  if (!tab) {
    return <p>Tab not found</p>;
  }

  return (
    <>
      {!isLoading && (
        <>
          <h2 className="tab-header">⸻ {tab.name} ⸻</h2>
          {tabLists && tabLists.length > 0 ? (
            <div className="all-lists-container">
              {tabLists.map((list) => (
                <List key={list} list={list} tabGoals={goalsByList[list]} />
              ))}
            </div>
          ) : (
            <div className="blank-prompt-container">
              <BlankPage />
            </div>
          )}
        </>
      )}
    </>
  );
}
