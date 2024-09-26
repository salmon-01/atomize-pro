import { React, useState, useEffect } from 'react';
import Goal from './Goal';

export default function List({ list, tabGoals, tab }) {
  // Rendering and styling still incomplete

  const [listGoals, setListGoals] = useState([]);

  let blockCount = 0;

  const sortGoals = () => {
    const thisListGoals = tabGoals.filter((goal) => goal.list === list);
    setListGoals(thisListGoals);
    thisListGoals.map((goal) => (goal.type === 'Levels' ? blockCount++ : null));
  };

  useEffect(() => {
    sortGoals();
  }, []);

  return (
    <div
      className="list-container"
      id={`${
        (tab.col_one === list && 'col1') ||
        (tab.col_two === list && 'col2') ||
        'col3'
      }`}
    >
      <div id="list-heading">{list}</div>
      <div className="goal-content-container">
        {listGoals.map((goal) => (
          <Goal key={goal.name} goal={goal} blockCount={blockCount} />
        ))}
      </div>
    </div>
  );
}
