import React, { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { useFormContext } from "../../context/createListContext.js"; // Custom context
import OrangeDelete from "../../assets/other/orange-delete-button.png";
import { Control, UseFormRegister, UseFormSetValue } from "react-hook-form";
import "../../styles/AddSome.css";
import { Goal } from "../../types/types";

type FormValues = {
  goals: Goal[];
};

interface AddSomeMixedProps {
  // control: Control<{ goals: Goal[] }>;
  // register: UseFormRegister<{ goals: Goal[] }>;
  // setValue: UseFormSetValue<{ goals: Goal[] }>;
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
}

export default function AddSomeMixed({
  control,
  register,
  setValue,
}: AddSomeMixedProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "goals",
  });

  const { listName, selectedTab } = useFormContext();

  // Track selected goal type from the dropdown for each task
  const [goalTypes, setGoalTypes] = useState<string[]>([]);

  const handleAddGoalBlock = () => {
    append({
      task_name: "",
      list_name: listName,
      tab: selectedTab,
      type: "", // Initially no type is selected
      color: "default-gradient",
      active: true,
      complete: false,
      last_completed: null,
    });
    setGoalTypes((prev) => [...prev, ""]); // Keep track of goal types
  };

  const handleGoalTypeChange = (index: number, value: string) => {
    const newGoalTypes = [...goalTypes];
    newGoalTypes[index] = value;
    setGoalTypes(newGoalTypes);

    // Update the goal type in the form field
    setValue(`goals.${index}.type` as const, value);
  };

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th> </th>
            <th>Task Name</th>
            <th>Type</th>
            <th>Details</th>
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
                  className="task-name-input"
                  aria-label="Task Name"
                  placeholder="Task Name"
                  {...register(`goals.${index}.task_name` as const, {
                    required: "Task name is required",
                  })}
                />
              </td>
              <td>
                <select
                  value={goalTypes[index] || ""}
                  onChange={(e) => handleGoalTypeChange(index, e.target.value)}
                >
                  <option value="">-- Select Type --</option>
                  <option value="Simple List">Simple List</option>
                  <option value="Progress Bar">Progress Bar</option>
                  <option value="Levels">Levels</option>
                  <option value="Set">Set</option>
                </select>
              </td>
              <td>
                {/* Conditionally render fields based on the selected goal type */}
                {goalTypes[index] === "Set" && (
                  <>
                    <input
                      type="number"
                      className="small-input"
                      placeholder="Sets"
                      {...register(`goals.${index}.sets` as const, {
                        valueAsNumber: true,
                        required: "Sets are required for this task",
                      })}
                    />
                    <input
                      type="number"
                      className="small-input"
                      placeholder="Reps"
                      {...register(`goals.${index}.reps` as const, {
                        valueAsNumber: true,
                        required: "Reps are required for this task",
                      })}
                    />
                  </>
                )}
                {goalTypes[index] === "Progress Bar" && (
                  <>
                    <input
                      type="number"
                      className="small-input"
                      placeholder="Progress"
                      {...register(`goals.${index}.progress` as const, {
                        valueAsNumber: true,
                      })}
                    />
                  </>
                )}
                {goalTypes[index] === "Levels" && (
                  <>
                    <input
                      type="number"
                      className="small-input"
                      placeholder="Level"
                      {...register(`goals.${index}.level` as const, {
                        valueAsNumber: true,
                      })}
                    />
                  </>
                )}
                {/* Add more conditions as needed for other goal types */}
              </td>
              <td>
                <div
                  className={`color-box ${goal.color}`}
                  onClick={(e) => openColorBox(e)}
                ></div>
                <div className="color-choices">
                  <div
                    className="color-option turq-gradient"
                    onClick={() =>
                      setValue(`goals.${index}.color` as const, "turq-gradient")
                    }
                  ></div>
                  <div
                    className="color-option orange-gradient"
                    onClick={() =>
                      setValue(
                        `goals.${index}.color` as const,
                        "orange-gradient"
                      )
                    }
                  ></div>
                  <div
                    className="color-option purple-gradient"
                    onClick={() =>
                      setValue(
                        `goals.${index}.color` as const,
                        "purple-gradient"
                      )
                    }
                  ></div>
                  <div
                    className="color-option yellow-gradient"
                    onClick={() =>
                      setValue(
                        `goals.${index}.color` as const,
                        "yellow-gradient"
                      )
                    }
                  ></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="goal-type-dropdown">
        <button onClick={handleAddGoalBlock}>Add Goal Block</button>
      </div>
    </>
  );
}

function openColorBox(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  const colorChoices = (event.target as HTMLDivElement)
    .nextElementSibling as HTMLElement;
  colorChoices.style.display =
    colorChoices.style.display === "block" ? "none" : "block";
}
