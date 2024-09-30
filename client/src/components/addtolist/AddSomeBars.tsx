import { useFieldArray } from "react-hook-form";
import OrangeDelete from "../../assets/other/orange-delete-button.png";
import { Goal } from "../../types/types";
import { Control, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface AddSomeBarsProps {
  control: Control<{ goals: Goal[] }>;
  register: UseFormRegister<{ goals: Goal[] }>;
  setValue: UseFormSetValue<{ goals: Goal[] }>;
}

export default function AddSomeBars({
  control,
  register,
  setValue,
}: AddSomeBarsProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "goals", // The field array for goals
  });

  const handleAddGoal = () => {
    append({
      task_name: "",
      list_name: "",
      tab,
      type: "Progress Bar",
      color: "turq-gradient",
      active: true,
      complete: false,
      last_completed: null,
      current: 0,
      goal_number: 0,
      units: "",
    });
  };

  const openColorBox = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const colorChoices = (event.target as HTMLElement)
      .nextElementSibling as HTMLElement;
    colorChoices.style.display =
      colorChoices.style.display === "block" ? "none" : "block";
  };

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th> </th>
            <th>Goal name</th>
            <th>Daily Goal</th>
            <th>Units</th>
            <th>Fill</th>
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
                  {...register(`goals[${index}].goal_number`, {
                    valueAsNumber: true,
                  })}
                />
              </td>
              <td>
                <input
                  type="text"
                  className={`small-input rounded-input ${goal.color}`}
                  {...register(`goals[${index}].units`)}
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
