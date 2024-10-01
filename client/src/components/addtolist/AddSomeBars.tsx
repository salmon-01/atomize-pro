import { useFieldArray } from "react-hook-form";
import OrangeDelete from "../../assets/other/orange-delete-button.png";
import { Goal } from "../../types/types";
import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import { useFormContext } from "../../context/createListContext.js"; // Custom context
import { ColorPicker } from "../ui/ColorPicker.js";

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

  // Watch for changes to the "goals" array to trigger re-renders when color changes
  const watchedGoals = useWatch({
    control,
    name: "goals",
  });

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
          {fields.map((_, index) => (
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
                  className={`small-input rounded-input ${watchedGoals[index]?.color}`}
                  {...register(`goals.${index}.goal_number` as const, {
                    valueAsNumber: true,
                  })}
                />
              </td>
              <td>
                <input
                  type="text"
                  className={`small-input rounded-input ${watchedGoals[index]?.color}`}
                  {...register(`goals.${index}.units` as const)}
                />
              </td>
              <td>
                <ColorPicker
                  color={watchedGoals[index]?.color}
                  onChange={(newColor) =>
                    setValue(`goals.${index}.color` as const, newColor)
                  }
                />
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
