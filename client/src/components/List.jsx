import { React, useState, useEffect } from "react";
import { useAppContext } from "../AppContext";
import Goal from "./Goal";

export default function List({ list, tabGoals, tab }) {
  const { state } = useAppContext();
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
        {listGoals.map((goal) => (
          <Goal key={goal.name} goal={goal} />
        ))}
      </div>
    </div>
  );
}
