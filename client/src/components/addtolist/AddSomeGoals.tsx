import { useForm } from "react-hook-form";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddSomeSimple from "./AddSomeSimple";
import AddSomeBars from "./AddSomeBars";
import AddSomeLevels from "./AddSomeLevels";
import AddSomeSets from "./AddSomeSets";
import AddSomeMixed from "./AddSomeMixed";
import { createGoal, insertListPosition } from "../../ApiService.jsx";
import { Goal } from "../../types/types.js";
import { useFormContext } from "../../context/createListContext.js";

type FormData = {
  goals: Goal[];
};

export default function AddSomeGoals() {
  const navigate = useNavigate(); // For navigation
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
          order_no: 1,
          active: true,
          complete: false,
          last_completed: null,
        },
      ], // Set initial goal here
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
      // Send the entire form data (listName, template, selectedTab, and goals) to the backend
      const response = await createListWithGoals({
        listName,
        template,
        selectedTab,
        goals: data.goals,
      });

      if (response.success) {
        console.log("List and goals have been created successfully!");
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
