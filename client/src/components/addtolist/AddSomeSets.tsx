import { useFieldArray } from "react-hook-form";
import { useFormContext } from "../../context/createListContext.js"; // Custom context

// import Delete from "../../assets/other/delete-button.png";
import OrangeDelete from "../../assets/other/orange-delete-button.png";
import { Control, UseFormRegister, UseFormSetValue } from "react-hook-form";
import "../../styles/AddSome.css";
import { Goal } from "../../types/types";

interface AddSomeSetsProps {
  control: Control<{ goals: Goal[] }>;
  register: UseFormRegister<{ goals: Goal[] }>;
  setValue: UseFormSetValue<{ goals: Goal[] }>;
}

type GoalField = "name" | "sets" | "reps";

export default function AddSomeSets({
  control,
  register,
  setValue,
}: AddSomeSetsProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "goals", // The field array for goals
  });

  const { listName, selectedTab } = useFormContext();

  const handleAddGoal = () => {
    append({
      task_name: "",
      list_name: listName,
      tab: selectedTab,
      type: "Sets",
      color: "turq-gradient",
      active: true,
      complete: false,
      last_completed: null,
      completed_sets: 0,
      sets: 0,
      reps: 0,
    });
  };

  function openColorBox(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const colorChoices = (event.target as HTMLDivElement)
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
            <th>Sets</th>
            <th>Reps</th>
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
                <input
                  type="number"
                  className={`small-input rounded-input ${goal.color}`}
                  {...register(`goals[${index}].sets`, {
                    valueAsNumber: true,
                  })}
                />
              </td>
              <td>
                <input
                  type="number"
                  className={`small-input rounded-input ${goal.color}`}
                  {...register(`goals[${index}].reps`, {
                    valueAsNumber: true,
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
                    className="color-option turq-gradient"
                    onClick={() =>
                      setValue(`goals[${index}].color`, "turq-gradient")
                    }
                  ></div>
                  <div
                    className="color-option orange-gradient"
                    onClick={() =>
                      setValue(`goals[${index}].color`, "orange-gradient")
                    }
                  ></div>
                  <div
                    className="color-option purple-gradient"
                    onClick={() =>
                      setValue(`goals[${index}].color`, "purple-gradient")
                    }
                  ></div>
                  <div
                    className="color-option yellow-gradient"
                    onClick={() =>
                      setValue(`goals[${index}].color`, "yellow-gradient")
                    }
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
