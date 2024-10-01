import { useFieldArray } from "react-hook-form";
import { useFormContext } from "../../context/createListContext.js"; // Custom context

// import Delete from "../../assets/other/delete-button.png";
import OrangeDelete from "../../assets/other/orange-delete-button.png";
import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import "../../styles/AddSome.css";
import { Goal } from "../../types/types";
import { ColorPicker } from "../ui/ColorPicker.js";

type FormValues = {
  goals: Goal[];
};

interface AddSomeSetsProps {
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
}

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
          {fields.map((_, index) => (
            <tr key={`goal-${index}`}>
              <td className="remove-by-index" onClick={() => remove(index)}>
                <img src={OrangeDelete} className="delete-icon" />
              </td>
              <td>
                <input
                  type="text"
                  aria-label="Task Name"
                  className={`rounded-input name-small-input bar-input ${watchedGoals[index]?.color}`}
                  {...register(`goals.${index}.task_name` as const, {
                    required: "Goal name is required",
                  })}
                />
              </td>
              <td>
                <input
                  type="number"
                  className={`small-input rounded-input ${watchedGoals[index]?.color}`}
                  {...register(`goals.${index}.sets` as const, {
                    valueAsNumber: true,
                  })}
                />
              </td>
              <td>
                <input
                  type="number"
                  className={`small-input rounded-input ${watchedGoals[index]?.color}`}
                  {...register(`goals.${index}.reps` as const, {
                    valueAsNumber: true,
                  })}
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
