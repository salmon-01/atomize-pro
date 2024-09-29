import { useFieldArray } from "react-hook-form";
// import Delete from "../../assets/other/delete-button.png";
// import ShinyDelete from "../../assets/other/shiny-delete-button.png";
import OrangeDelete from "../../assets/other/orange-delete-button.png";
import { useFormContext } from "../../context/createListContext.js";

export default function AddSomeSimple({ control, register, setValue }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "goals", // The field array for goals
  });

  // Get values for listName and selectedTab from context
  const { listName, selectedTab } = useFormContext();

  const handleAddGoal = () => {
    append({
      task_name: "",
      list_name: listName,
      tab: selectedTab.id,
      type: "Simple List",
      color: "purple",
      // order_no: fields.length + 1,
      active: true,
      complete: false,
      last_completed: null,
    });
  };

  const openColorBox = (event: React.MouseEvent<HTMLDivElement>) => {
    const colorChoices = (event.target as HTMLDivElement)
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
                  className={`name-goal name-simple ${goal.color}`}
                  {...register(`goals[${index}].task_name`, {
                    required: "Goal name is required",
                  })}
                />
              </td>
              <td>
                <div
                  className={`color-box ${goal.color}`}
                  onClick={() =>
                    setValue(
                      `goals[${index}].color`,
                      goal.color === "purple" ? "orange" : "purple"
                    )
                  } // Toggle color between purple and orange (as an example)
                ></div>
                <div className="color-choices">
                  <div
                    className="color-option purple"
                    onClick={() => setValue(`goals[${index}].color`, "purple")}
                  ></div>
                  <div
                    className="color-option yellow-green"
                    onClick={() =>
                      setValue(`goals[${index}].color`, "yellow-green")
                    }
                  ></div>
                  <div
                    className="color-option orange"
                    onClick={() => setValue(`goals[${index}].color`, "orange")}
                  ></div>
                  <div
                    className="color-option red"
                    onClick={() => setValue(`goals[${index}].color`, "red")}
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
