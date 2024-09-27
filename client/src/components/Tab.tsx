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

  // const normalizedTabName = decodeURIComponent(tabName).trim().toLowerCase();
  const normalizedTabName = decodeURIComponent(tabName ?? "")
    .trim()
    .toLowerCase();

  const tab = tabs.find(
    (tab) => tab.name.trim().toLowerCase() === normalizedTabName
  );

  const tabGoals = tab ? goals.filter((goal) => goal.tab === tab.name) : [];

  const tabLists = Array.from(new Set(tabGoals.map((goal) => goal.list)));

  if (!tab) {
    return <p>Tab not found</p>;
  }

  return (
    <>
      {!isLoading && (
        <>
          <h2 className="tab-header">⸻ {tab.name} ⸻</h2>
          {!tab.col_one &&
          !tab.col_one_b &&
          !tab.col_two &&
          !tab.col_two_b &&
          !tab.col_three &&
          !tab.col_three_b ? (
            <div className="blank-prompt-container">
              <BlankPage />
            </div>
          ) : (
            <div className="all-lists-container">
              {tabLists.map((list) => (
                <List key={list} tab={tab} list={list} tabGoals={tabGoals} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
