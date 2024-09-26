import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Tab.css';
import List from './List.jsx';

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

export default function Tab({ tab, goals }) {
  // Rendering and styling still incomplete

  const [tabGoals, setTabGoals] = useState([]);
  const [tabLists, setTabLists] = useState([]);

  const sortData = () => {
    const result = goals.filter((goal) => goal.tab === tab.name);
    setTabGoals(result);
    const uniqueLists = Array.from(new Set(result.map((goal) => goal.list)));
    setTabLists(uniqueLists);
  };
  useEffect(() => {
    sortData();
  }, []);

  return (
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
            <List tab={tab} list={list} tabGoals={tabGoals} />
          ))}
        </div>
      )}
    </>
  );
}
