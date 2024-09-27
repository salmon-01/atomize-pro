import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddSomeSimple from "./AddSomeSimple";
import AddSomeBars from "./AddSomeBars";
import AddSomeLevels from "./AddSomeLevels";
import AddSomeSets from "./AddSomeSets";
import AddSomeMixed from "./AddSomeMixed";
import { createGoal, insertListPosition } from "../../ApiService.jsx";
import { Tab } from "../../types/types.js";

interface AddSomeGoalsProps {
  listName: string;
  template: string;
  selectedTab: Tab;
  loadGoals: string;
}

export default function AddSomeGoals({
  listName,
  template,
  selectedTab,
  loadGoals,
}: AddSomeGoalsProps) {
  const navigate = useNavigate(); // Must use at the top of the component

  const [finalGoals, setFinalGoals] = useState([]);

  const finalizeGoals = (childGoals) => {
    setFinalGoals(childGoals);
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

  const handleSubmit = async (goals) => {
    console.log(goals);
    try {
      await Promise.all(goals.map((goal) => createGoal(goal)));
      console.log("All goals have been submitted successfully");
      try {
        const col = findColPosition();
        await insertListPosition(selectedTab.name, listName, col);
      } catch (error) {
        console.log("Error inserting list position:", error);
      }
      const path = findPath();
      navigate(`/${path}`);
      loadGoals();
      window.location.reload();
    } catch (error) {
      console.log("Error submitting goals:", error);
    }
  };

  return (
    <>
      <div className="add-some-goals-container">
        <div id="list-title">{listName}</div>
        {template === "Simple List" ? (
          <AddSomeSimple
            listName={listName}
            finalizeGoals={finalizeGoals}
            selectedTab={selectedTab}
          />
        ) : template === "Progress Bar" ? (
          <AddSomeBars
            listName={listName}
            finalizeGoals={finalizeGoals}
            selectedTab={selectedTab}
          />
        ) : template === "Levels" ? (
          <AddSomeLevels
            listName={listName}
            finalizeGoals={finalizeGoals}
            selectedTab={selectedTab}
          />
        ) : template === "Sets" ? (
          <AddSomeSets
            listName={listName}
            finalizeGoals={finalizeGoals}
            selectedTab={selectedTab}
          />
        ) : template === "Mixed" ? (
          <AddSomeMixed
            listName={listName}
            finalizeGoals={finalizeGoals}
            selectedTab={selectedTab}
          />
        ) : null}
      </div>
      <button
        className="create-list-goals-button"
        id="submit-list-goals"
        onClick={() => {
          handleSubmit(finalGoals);
        }}
      >
        Create List &rarr;
      </button>
    </>
  );
}
