import { Link, useParams } from "react-router-dom";
import "../styles/Tab.css";
import { useAppContext } from "../AppContext.js";
import List from "./List.js";
import { State } from "../types/types.js";

function BlankPage() {
  return (
    <div id="empty-page-prompt">
      <h4 id="empty-page-text">This page is empty!</h4>Would you like to add a
      new list now?
      <Link to="/create-new/list">
        <button id="empty-page-button">OK &rarr;</button>
      </Link>
    </div>
  );
}

export default function Tab() {
  const { state } = useAppContext() as {
    state: State;
  };
  const { goals, tabs, isLoading } = state;
  const { tabName } = useParams();

  const normalizeName = (name) =>
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
  const goalsByList = tabGoals.reduce((acc, goal) => {
    // If the list_name doesn't exist in the accumulator, create a new array
    if (!acc[goal.list_name]) {
      acc[goal.list_name] = [];
    }
    // Add the current goal to the appropriate list_name group
    acc[goal.list_name].push(goal);
    return acc;
  }, {});

  console.log("GOALSBYLIST", goalsByList);
  // Get an array of all list names
  const tabLists = Object.keys(goalsByList);
  if (!tab) {
    return <p>Tab not found</p>;
  }
  console.log("TABLISTS", goalsByList);

  return (
    <>
      {!isLoading && (
        <>
          <h2 className="tab-header">⸻ {tab.name} ⸻</h2>
          <div className="all-lists-container">
            {tabLists && tabLists.length > 0 ? (
              tabLists.map((list) => (
                <List
                  key={list}
                  tab={tab}
                  list={list}
                  tabGoals={goalsByList[list]}
                />
              ))
            ) : (
              <div className="blank-prompt-container">
                <BlankPage />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
