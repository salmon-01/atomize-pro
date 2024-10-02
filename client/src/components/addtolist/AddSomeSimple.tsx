import {
  useFieldArray,
  Control,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import OrangeDelete from "../../assets/other/orange-delete-button.png";
import { useFormContext } from "../../context/createListContext.js"; // Custom context
import { Goal } from "../../types/types.js";
import { ColorPicker } from "../ui/ColorPicker.js";

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
          {fields.map((_, index) => (
            <tr key={`goal-${index}`}>
              <td className="remove-by-index" onClick={() => remove(index)}>
                <img src={OrangeDelete} className="delete-icon" alt="Delete" />
              </td>
              <td>
                <input
                  type="text"
                  aria-label="Task Name"
                  className={`name-goal name-simple ${watchedGoals[index]?.color}`}
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
                  goalType="Simple List"
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
