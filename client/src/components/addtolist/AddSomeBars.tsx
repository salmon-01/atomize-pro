import { useFieldArray } from "react-hook-form";
import OrangeDelete from "../../assets/other/orange-delete-button.png";
import { Goal } from "../../types/types";
import { Control, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useFormContext } from "../../context/createListContext.js"; // Custom context

type FormValues = {
  goals: Goal[];
};

interface AddSomeBarsProps {
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
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

  const { listName, selectedTab } = useFormContext();

  const handleAddGoal = () => {
    append({
      task_name: "",
      list_name: listName,
      tab: selectedTab,
      type: "Progress Bar",
      color: "turq-gradient",
      active: true,
      complete: false,
      last_completed: null,
      current_number: 0,
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
                  aria-label="Task Name"
                  className={`rounded-input name-small-input bar-input ${goal.color}`}
                  {...register(`goals.${index}.task_name` as const, {
                    required: "Goal name is required",
                  })}
                />
              </td>
              <td>
                <input
                  type="number"
                  className={`small-input rounded-input ${goal.color}`}
                  {...register(`goals.${index}.goal_number` as const, {
                    valueAsNumber: true,
                  })}
                />
              </td>
              <td>
                <input
                  type="text"
                  className={`small-input rounded-input ${goal.color}`}
                  {...register(`goals.${index}.units` as const)}
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
      <button id="add-another-goal" onClick={handleAddGoal}>
        Add +
      </button>
    </>
  );
}
