import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AddSomeSimple from "./AddSomeSimple";
import AddSomeBars from "./AddSomeBars";
import AddSomeLevels from "./AddSomeLevels";
import AddSomeSets from "./AddSomeSets";
import AddSomeMixed from "./AddSomeMixed";
import { createGoal } from "../../ApiService.js";
import { Goal } from "../../types/types.js";
import { useFormContext } from "../../context/createListContext.js";
import { useAppContext } from "../../AppContext.js";
import { Tab } from "../../types/types.js";

type FormData = {
  goals: Goal[];
};

export default function AddSomeGoals() {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const { listName, template, selectedTab } = useFormContext();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    // formState: { errors },
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
    dispatch({ type: "SET_LOADING", payload: true });

    const selectedTabObj = state.tabs.find(
      (tab: Tab) => tab.id === selectedTab
    );

    if (!selectedTabObj) {
      console.log("Tab not found");
      dispatch({ type: "SET_LOADING", payload: false });
      return;
    }

    try {
      console.log("Starting to create goals...");

      // Create an array of promises from the API calls
      const promises = data.goals.map(async (goal) => {
        console.log("Creating goal for:", goal.task_name);

        const goalData: any = {
          list_name: listName,
          task_name: goal.task_name,
          tab: selectedTab,
          color: goal.color,
          type: goal.type,
          active: goal.active,
          complete: goal.complete,
          last_completed: goal.last_completed,
        };

        if (goal.type === "Progress Bar") {
          goalData.current_number = goal.current_number;
          goalData.goal_number = goal.goal_number;
          goalData.units = goal.units;
        }

        if (goal.type === "Sets") {
          goalData.sets = goal.sets;
          goalData.reps = goal.reps;
        }

        if (goal.type === "Levels") {
          goalData.level = goal.level;
        }

        console.log("Sending API request for:", goalData);

        // Send the goal creation request and get the response
        const response = await createGoal(goalData);

        if (response.success) {
          goalData.id = response.data.id;
          dispatch({ type: "CREATE_GOAL", payload: goalData });
          return response.data.id;
        } else {
          throw new Error(response.error || "Failed to create goal");
        }
      });

      // Wait for all API calls to finish
      const goalIds = await Promise.all(promises);
      console.log("Created goal IDs:", goalIds);

      // Trigger XP recalculation after all goals are created
      dispatch({ type: "CALCULATE_GOAL_XP", payload: state.goals });

      // Navigate only after all state updates and API calls are done
      const normalizedTabName = encodeURIComponent(
        selectedTabObj.name.replace(/\s+/g, "-")
      );
      if (goalIds) {
        navigate(`/${normalizedTabName}`);
      }
    } catch (error) {
      console.log("Error submitting list and goals:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="add-goals">
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
