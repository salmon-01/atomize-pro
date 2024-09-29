import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AddSomeSimple from "./AddSomeSimple";
import AddSomeBars from "./AddSomeBars";
import AddSomeLevels from "./AddSomeLevels";
import AddSomeSets from "./AddSomeSets";
import AddSomeMixed from "./AddSomeMixed";
import { createGoal } from "../../ApiService.jsx";
import { Goal } from "../../types/types.js";
import { useFormContext } from "../../context/createListContext.js";

type FormData = {
  goals: Goal[];
};

export default function AddSomeGoals() {
  const navigate = useNavigate();
  const { listName, template, selectedTab } = useFormContext();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      goals: [
        {
          task_name: "",
          list_name: listName,
          tab: selectedTab,
          type: template,
          color: "purple",
          active: true,
          complete: false,
          last_completed: null,
        },
      ],
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("Form Data on Submit:", {
      listName,
      template,
      selectedTab,
      goals: data.goals,
    });

    try {
      const promises = data.goals.map(async (goal) => {
        // Make an API call for each goal
        const response = await createGoal({
          list_name: listName, // Pass the list name
          task_name: goal.task_name, // Pass the goal task_name
          tab: selectedTab, // Pass the selected tab ID
          color: goal.color, // Pass the goal color
          type: goal.type,
        });

        return response;
      });

      // Wait for all the requests to be completed
      const results = await Promise.all(promises);

      const allSuccess = results.every((res) => res.success);

      if (allSuccess) {
        console.log("All goals have been created successfully!");
      } else {
        console.log("Some goals failed to be created.");
      }
    } catch (error) {
      console.log("Error submitting list and goals:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="add-some-goals-container">
          <div id="list-title">{listName}</div>
          {template === "Simple List" ? (
            <AddSomeSimple
              control={control}
              register={register}
              setValue={setValue}
            />
          ) : template === "Progress Bar" ? (
            <AddSomeBars
              control={control}
              register={register}
              setValue={setValue}
            />
          ) : template === "Levels" ? (
            <AddSomeLevels
              control={control}
              register={register}
              setValue={setValue}
            />
          ) : template === "Sets" ? (
            <AddSomeSets
              control={control}
              register={register}
              setValue={setValue}
            />
          ) : template === "Mixed" ? (
            <AddSomeMixed
              control={control}
              register={register}
              setValue={setValue}
            />
          ) : null}
        </div>
        <button
          className="create-list-goals-button"
          id="submit-list-goals"
          type="submit"
        >
          Create List &rarr;
        </button>
      </form>
    </>
  );
}
