import React, { useState, useEffect } from 'react';
import Delete from '../../assets/other/delete-button.png';
import ShinyDelete from '../../assets/other/shiny-delete-button.png';
import OrangeDelete from '../../assets/other/orange-delete-button.png';

export default function AddSomeSimple({
  listName,
  finalizeGoals,
  selectedTab,
}) {
  const [goals, setGoals] = useState([
    {
      name: '',
      list: listName,
      tab: selectedTab.name,
      type: 'Simple List',
      color: 'purple',
      order_no: 1,
      active: true,
      complete: false,
      last_completed: null,
    },
  ]);

  const handleGoalNameChange = (index, value) => {
    const updatedGoals = goals.map((goal, i) =>
      i === index ? { ...goal, name: value } : goal
    );
    setGoals(updatedGoals);
  };

  const handleGoalColorChange = (index, value) => {
    const updatedGoals = goals.map((goal, i) =>
      i === index ? { ...goal, color: value } : goal
    );
    setGoals(updatedGoals);
  };

  function openColorBox(event) {
    const colorChoices = event.target.nextElementSibling;
    colorChoices.style.display =
      colorChoices.style.display === 'block' ? 'none' : 'block';
  }

  function removeItem(indexToRemove) {
    const updatedGoals = goals.filter((goal, index) => index !== indexToRemove);
    setGoals(updatedGoals);
  }

  useEffect(() => {
    finalizeGoals(goals);
  }, [goals]);

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th> </th>
            <th>Goal name</th>
            <th>Color</th>
          </tr>
          {goals.map((goal, index) => (
            <tr key={`goal-${index}`}>
              <td
                className="remove-by-index"
                onClick={() => {
                  removeItem(index);
                }}
              >
                <img src={OrangeDelete} className="delete-icon" />
              </td>
              <td>
                <input
                  type="text"
                  className={`name-goal name-simple ${goal.color}`}
                  value={goal.name}
                  onChange={(e) => handleGoalNameChange(index, e.target.value)}
                />
              </td>
              <td>
                <div
                  className={`color-box ${goal.color}`}
                  value={goal.color}
                  onClick={openColorBox}
                ></div>
                <div className="color-choices">
                  <div
                    className="color-option purple"
                    onClick={() => {
                      handleGoalColorChange(index, 'purple');
                    }}
                  ></div>
                  <div
                    className="color-option yellow-green"
                    onClick={() => {
                      handleGoalColorChange(index, 'yellow-green');
                    }}
                  ></div>
                  <div
                    className="color-option orange"
                    onClick={() => {
                      handleGoalColorChange(index, 'orange');
                    }}
                  ></div>
                  <div
                    className="color-option red"
                    onClick={() => {
                      handleGoalColorChange(index, 'red');
                    }}
                  ></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        id="add-another-goal"
        onClick={() =>
          setGoals([
            ...goals,
            {
              name: '',
              list: listName,
              tab: selectedTab.name,
              type: 'Simple List',
              color: 'purple',
              order_no: goals.length + 1,
              active: true,
              complete: false,
              last_completed: null,
            },
          ])
        }
      >
        {' '}
        Add +{' '}
      </button>
    </>
  );
}
