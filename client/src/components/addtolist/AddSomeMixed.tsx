import React, { useState, useEffect } from "react";
import AddSomeSimple from "./AddSomeSimple";
import AddSomeLevels from "./AddSomeLevels";
import AddSomeSets from "./AddSomeSets";
import AddSomeBars from "./AddSomeBars";
import "../../styles/AddSome.css";
import { Goal, Tab } from "../../types/types";

interface AddSomeMixedProps {
  listName: string;
  selectedTab: Tab;
  finalizeGoals: (goals: Goal[]) => void;
}

export default function AddSomeMixed({
  listName,
  finalizeGoals,
  selectedTab,
}: AddSomeMixedProps) {
  // This component has not yet been updated to reflect changes in other goal AddSome components.

  const [goals, setGoals] = useState([]);

  const [firstBlock, setFirstBlock] = useState("");
  const [secondBlock, setSecondBlock] = useState("");
  const [thirdBlock, setThirdBlock] = useState("");

  useEffect(() => {
    finalizeGoals(goals);
  }, [goals]);

  return (
    <>
      {firstBlock ? <div className="section-header">{firstBlock}</div> : null}
      {!firstBlock ? (
        <div className="first-block add">
          <div className="block-text">+ Add Block</div>
          <div className="goal-options">
            <span
              className="goal-option-button"
              onClick={() => setFirstBlock("Simple List")}
            >
              Simple List
            </span>
            <span
              className="goal-option-button"
              onClick={() => setFirstBlock("Progress Bar")}
            >
              Progress Bar
            </span>
            <span
              className="goal-option-button"
              onClick={() => setFirstBlock("Levels")}
            >
              Levels
            </span>
            <span
              className="goal-option-button"
              onClick={() => setFirstBlock("Set")}
            >
              Set
            </span>
          </div>
        </div>
      ) : null}
      {firstBlock === "Simple List" ? (
        <>
          <AddSomeSimple
            listName={listName}
            selectedTab={selectedTab}
            finalizeGoals={finalizeGoals}
          />
          <br></br>
        </>
      ) : firstBlock === "Progress Bar" ? (
        <AddSomeBars
          listName={listName}
          selectedTab={selectedTab}
          finalizeGoals={finalizeGoals}
        />
      ) : firstBlock === "Levels" ? (
        <AddSomeLevels
          listName={listName}
          selectedTab={selectedTab}
          finalizeGoals={finalizeGoals}
        />
      ) : firstBlock === "Set" ? (
        <AddSomeSets
          listName={listName}
          selectedTab={selectedTab}
          finalizeGoals={finalizeGoals}
        />
      ) : null}
      {secondBlock ? <div className="section-header">{secondBlock}</div> : null}
      {!secondBlock ? (
        <div className="second-block add">
          <div className="block-text">+ Add Block</div>
          <div className="goal-options">
            <span
              className="goal-option-button"
              onClick={() => setSecondBlock("Simple List")}
            >
              Simple List
            </span>
            <span
              className="goal-option-button"
              onClick={() => setSecondBlock("Progress Bar")}
            >
              Progress Bar
            </span>
            <span
              className="goal-option-button"
              onClick={() => setSecondBlock("Levels")}
            >
              Levels
            </span>
            <span
              className="goal-option-button"
              onClick={() => setSecondBlock("Set")}
            >
              Set
            </span>
          </div>
        </div>
      ) : null}
      {secondBlock === "Simple List" ? (
        <>
          <AddSomeSimple
            listName={listName}
            selectedTab={selectedTab}
            finalizeGoals={finalizeGoals}
          />
          <br></br>
        </>
      ) : secondBlock === "Progress Bar" ? (
        <AddSomeBars
          listName={listName}
          selectedTab={selectedTab}
          finalizeGoals={finalizeGoals}
        />
      ) : secondBlock === "Levels" ? (
        <AddSomeLevels
          listName={listName}
          selectedTab={selectedTab}
          finalizeGoals={finalizeGoals}
        />
      ) : secondBlock === "Set" ? (
        <AddSomeSets
          listName={listName}
          selectedTab={selectedTab}
          finalizeGoals={finalizeGoals}
        />
      ) : null}
      {thirdBlock ? <div className="section-header">{thirdBlock}</div> : null}
      {!thirdBlock ? (
        <div className="third-block add">
          <div className="block-text">+ Add Block</div>
          <div className="goal-options">
            <span
              className="goal-option-button"
              onClick={() => setThirdBlock("Simple List")}
            >
              Simple List
            </span>
            <span
              className="goal-option-button"
              onClick={() => setThirdBlock("Progress Bar")}
            >
              Progress Bar
            </span>
            <span
              className="goal-option-button"
              onClick={() => setThirdBlock("Levels")}
            >
              Levels
            </span>
            <span
              className="goal-option-button"
              onClick={() => setThirdBlock("Set")}
            >
              Set
            </span>
          </div>
        </div>
      ) : null}
      {thirdBlock === "Simple List" ? (
        <>
          <AddSomeSimple
            listName={listName}
            selectedTab={selectedTab}
            finalizeGoals={finalizeGoals}
          />
          <br></br>
        </>
      ) : thirdBlock === "Progress Bar" ? (
        <AddSomeBars
          listName={listName}
          selectedTab={selectedTab}
          finalizeGoals={finalizeGoals}
        />
      ) : thirdBlock === "Levels" ? (
        <AddSomeLevels
          listName={listName}
          selectedTab={selectedTab}
          finalizeGoals={finalizeGoals}
        />
      ) : thirdBlock === "Set" ? (
        <AddSomeSets
          listName={listName}
          selectedTab={selectedTab}
          finalizeGoals={finalizeGoals}
        />
      ) : null}
    </>
  );
}
