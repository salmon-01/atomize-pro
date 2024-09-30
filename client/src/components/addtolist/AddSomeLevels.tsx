import { useFieldArray } from "react-hook-form";
import { useFormContext } from "../../context/createListContext.js"; // Custom context
import { useState, useEffect } from "react";
// import Delete from "../../assets/other/delete-button.png";
import OrangeDelete from "../../assets/other/orange-delete-button.png";
import "../../styles/AddSome.css";
import { Goal, Tab } from "../../types/types";

interface AddSomeLevelsProps {
  listName: string;
  selectedTab: Tab;
  finalizeGoals: (goals: Goal[]) => void;
}

export default function AddSomeLevels({
  control,
  register,
  setValue,
}: AddSomeLevelsProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "goals", // The field array for goals
  });

  const { listName, selectedTab } = useFormContext();

  const handleAddGoal = () => {
    append({
      name: "",
      list: listName,
      tab: selectedTab,
      type: "Levels",
      color: "purple",
      order_no: fields.length + 1,
      active: true,
      complete: false,
      last_completed: null,
      level: 0,
    });
  };

  function openColorBox(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const colorChoices = (event.target as HTMLElement)
      .nextElementSibling as HTMLElement;
    colorChoices.style.display =
      colorChoices.style.display === "block" ? "none" : "block";
  }

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th> </th>
            <th>Goal name</th>
            <th>Color</th>
          </tr>
          {fields.map((goal, index) => (
            <tr key={`goal-${index}`}>
              <td className="remove-by-index" onClick={() => remove(index)}>
                <img src={OrangeDelete} className="delete-icon" />
              </td>
              <td>
                <input
                  type="text"
                  className={`rounded-input name-small-input bar-input ${goal.color}`}
                  {...register(`goals[${index}].task_name`, {
                    required: "Goal name is required",
                  })}
                />
              </td>
              <td>
                <div
                  className={`color-box ${goal.color}`}
                  onClick={openColorBox}
                ></div>
                <div className="color-choices">
                  <div
                    className="color-option purple"
                    onClick={() => setValue(`goals[${index}].color`, "purple")}
                  ></div>
                  <div
                    className="color-option pink"
                    onClick={() => setValue(`goals[${index}].color`, "pink")}
                  ></div>
                  <div
                    className="color-option blue"
                    onClick={() => setValue(`goals[${index}].color`, "blue")}
                  ></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button id="add-another-goal" onClick={handleAddGoal}>
        Add +
      </button>
    </>
  );
}
