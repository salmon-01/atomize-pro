import {
  useFieldArray,
  Control,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import OrangeDelete from "../../assets/other/orange-delete-button.png";
import { useFormContext } from "../../context/createListContext.js"; // Custom context
import { Goal } from "../../types/types.js";

type FormValues = {
  goals: Goal[];
};

interface AddSomeSimpleProps {
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
}

export default function AddSomeSimple({
  control,
  register,
  setValue,
}: AddSomeSimpleProps) {
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
      type: "Simple List",
      color: "purple",
      active: true,
      complete: false,
      last_completed: null,
    });
  };

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
                <img src={OrangeDelete} className="delete-icon" alt="Delete" />
              </td>
              <td>
                <input
                  type="text"
                  aria-label="Task Name"
                  className={`name-goal name-simple ${goal.color}`}
                  {...register(`goals.${index}.task_name` as const, {
                    required: "Goal name is required",
                  })}
                />
              </td>
              <td>
                <div
                  className={`color-box ${goal.color}`}
                  onClick={() =>
                    setValue(
                      `goals.${index}.color` as const,
                      goal.color === "purple" ? "orange" : "purple"
                    )
                  }
                ></div>
                <div className="color-choices">
                  <div
                    className="color-option purple"
                    onClick={() =>
                      setValue(`goals.${index}.color` as const, "purple")
                    }
                  ></div>
                  <div
                    className="color-option yellow-green"
                    onClick={() =>
                      setValue(`goals.${index}.color` as const, "yellow-green")
                    }
                  ></div>
                  <div
                    className="color-option orange"
                    onClick={() =>
                      setValue(`goals.${index}.color` as const, "orange")
                    }
                  ></div>
                  <div
                    className="color-option red"
                    onClick={() =>
                      setValue(`goals.${index}.color` as const, "red")
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
