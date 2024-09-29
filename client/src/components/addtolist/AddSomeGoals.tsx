import { useForm } from "react-hook-form";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddSomeSimple from "./AddSomeSimple";
import AddSomeBars from "./AddSomeBars";
import AddSomeLevels from "./AddSomeLevels";
import AddSomeSets from "./AddSomeSets";
import AddSomeMixed from "./AddSomeMixed";
import { createGoal, insertListPosition } from "../../ApiService.jsx";
import { Goal, Tab } from "../../types/types.js";
import { useFormContext } from "../../context/createListContext.js";

type FormData = {
  goals: Goal[];
};

export default function AddSomeGoals() {
  const navigate = useNavigate(); // Must use at the top of the component#
  const { listName, template, selectedTab } = useFormContext();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  // const finalizeGoals = (childGoals) => {
  //   setFinalGoals(childGoals);
  // };

  const findPath = () => {
    return selectedTab?.name.replace(/\s+/g, "-");
  };

  const onSubmit = async (data: FormData) => {
    const { goals } = data;

    try {
      // Send the entire form data (listName, template, selectedTab, and goals) to the backend
      const response = await createListWithGoals({
        listName,
        template,
        selectedTab,
        goals,
      });

      if (response.success) {
        console.log("List and goals have been created successfully!");
      }
    } catch (error) {
      console.log("Error submitting list and goals:", error);
    }
  };

  // const handleSubmit = async (goals: Goal[]) => {
  //   console.log(goals);
  //   try {
  //     await Promise.all(goals.map((goal: Goal) => createGoal(goal)));
  //     console.log("All goals have been submitted successfully");
  //     try {
  //       const col = findColPosition();
  //       await insertListPosition(selectedTab.name, listName, col);
  //     } catch (error) {
  //       console.log("Error inserting list position:", error);
  //     }
  //     const path = findPath();
  //     navigate(`/${path}`);
  //     loadGoals();
  //     window.location.reload();
  //   } catch (error) {
  //     console.log("Error submitting goals:", error);
  //   }
  // };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="add-some-goals-container">
          <div id="list-title">{listName}</div>
          {template === "Simple List" ? (
            <AddSomeSimple />
          ) : template === "Progress Bar" ? (
            <AddSomeBars />
          ) : template === "Levels" ? (
            <AddSomeLevels />
          ) : template === "Sets" ? (
            <AddSomeSets />
          ) : template === "Mixed" ? (
            <AddSomeMixed />
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
