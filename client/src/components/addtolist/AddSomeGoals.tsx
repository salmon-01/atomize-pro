import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddSomeSimple from "./AddSomeSimple.js";
import AddSomeBars from "./AddSomeBars.js";
import AddSomeLevels from "./AddSomeLevels.js";
import AddSomeSets from "./AddSomeSets.js";
import AddSomeMixed from "./AddSomeMixed.js";
import { createGoal, insertListPosition } from "../../ApiService.js";
import { Goal, State, Action } from "../../types/types.js";
import { useAppContext } from "../../AppContext.js";

interface AddSomeGoalsProps {
  listName: string;
  selectedTab: SelectedTab;
  template: string;
}
interface SelectedTab {
  name: string;
  col_one?: boolean;
  col_two?: boolean;
  col_three?: boolean;
}

export default function AddSomeGoals({
  listName,
  selectedTab,
  template,
}: AddSomeGoalsProps) {
  const navigate = useNavigate(); // Must use at the top of the component

  const { state, dispatch } = useAppContext() as {
    state: State;
    dispatch: (action: Action) => void;
  }; // Access global state and dispatch

  // Dispatch action to add goals to the global state
  const finalizeGoals = (childGoals: Goal[]) => {
    childGoals.forEach((goal) => {
      dispatch({ type: "CREATE_GOAL", payload: goal });
    });
  };

  const findPath = () => {
    return selectedTab.name.replace(/\s+/g, "-");
  };

  const findColPosition = () => {
    if (!selectedTab.col_one) {
      return "col_one";
    } else if (!selectedTab.col_two) {
      return "col_two";
    } else if (!selectedTab.col_three) {
      return "col_three";
    }
  };

  const handleSubmit = async () => {
    try {
      // Use state.goals instead of finalGoals
      await Promise.all(state.goals.map((goal) => createGoal(goal)));
      console.log("All goals have been submitted successfully");

      try {
        const col = findColPosition();
        await insertListPosition(selectedTab.name, listName, col);
      } catch (error) {
        console.log("Error inserting list position:", error);
      }

      const path = findPath();
      navigate(`/${path}`);
    } catch (error) {
      console.log("Error submitting goals:", error);
    }
  };

  return (
    <>
      <div className="add-some-goals-container">
        <div id="list-title">{listName}</div>
        {template === "Simple List" && (
          <AddSomeSimple
            listName={listName}
            finalizeGoals={finalizeGoals}
            selectedTab={selectedTab}
          />
        )}
        {template === "Progress Bar" && (
          <AddSomeBars
            listName={listName}
            finalizeGoals={finalizeGoals}
            selectedTab={selectedTab}
          />
        )}
        {template === "Levels" && (
          <AddSomeLevels
            listName={listName}
            finalizeGoals={finalizeGoals}
            selectedTab={selectedTab}
          />
        )}
        {template === "Sets" && (
          <AddSomeSets
            listName={listName}
            finalizeGoals={finalizeGoals}
            selectedTab={selectedTab}
          />
        )}
        {template === "Mixed" && (
          <AddSomeMixed
            listName={listName}
            finalizeGoals={finalizeGoals}
            selectedTab={selectedTab}
          />
        )}
      </div>
      <button
        className="create-list-goals-button"
        id="submit-list-goals"
        onClick={handleSubmit}
      >
        Create List &rarr;
      </button>
    </>
  );
}
