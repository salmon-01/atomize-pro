import {
  useFieldArray,
  Control,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import { useFormContext } from "../../context/createListContext.js"; // Custom context
// import Delete from "../../assets/other/delete-button.png";
import OrangeDelete from "../../assets/other/orange-delete-button.png";
import "../../styles/AddSome.css";
import { Goal } from "../../types/types";
import { ColorPicker } from "../ui/ColorPicker.js";

type FormValues = {
  goals: Goal[];
};

interface AddSomeLevelsProps {
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
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
      type: "Levels",
      color: "purple",
      // order_no: fields.length + 1, // Not sure what order_no is in this Levels
      active: true,
      complete: false,
      last_completed: null,
      level: 0,
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
