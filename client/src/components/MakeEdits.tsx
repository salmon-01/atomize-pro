import { useState } from "react";
import Delete from "../assets/other/delete-button.png";
import Edit from "../assets/other/edit-button.png";
import {
  deleteTab,
  deleteGoal,
  insertListPosition,
  deleteListPosition,
} from "../ApiService.js";
import "../styles/MakeEdits.css";
import { useAppContext } from "../AppContext.js";
import { Action, State, Tab } from "../types/types.js";
import { useForm } from "react-hook-form";
import { Goal } from "../types/types.js";

interface FormData {
  selectedObject: Tab | Goal | string | null;
  selectedType: string;
}

export default function MakeEdits() {
  const { state, dispatch } = useAppContext() as {
    state: State;
    dispatch: (action: Action) => void;
  };
  const { tabs, goals } = state;
  // Styling and rendering not fully complete. Will add 'edit' functionalities.

  const { register, handleSubmit, setValue } = useForm<FormData>();

  // States in the form to track selected Tab, List or Goal
  const [selectedTab, setSelectedTab] = useState<Tab | null>(null);
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [selectedType, setSelectedType] = useState<string>("");

  const handleSelectObject = (type: string, obj: Tab | Goal | string) => {
    setSelectedType(type);

    if (type === "Tab") {
      setSelectedTab(obj as Tab);
      setSelectedList(null); // Reset list selection when tab changes
      setSelectedGoal(null); // Reset goal selection when tab changes
    } else if (type === "List") {
      setSelectedList(obj as string); // Set selected list
      setSelectedGoal(null); // Reset goal selection when list changes
    } else if (type === "Goal") {
      setSelectedGoal(obj as Goal); // Set selected goal
    }
  };

  // Function to delete a Tab and associated goals
  const deleteSelectedTab = () => {
    if (!selectedTab) return;

    // Delete all goals associated with the selected tab
    goals.forEach((goal) => {
      if (goal.tab === selectedTab.id) {
        deleteGoal(goal);
      }
    });

    // Delete the selected tab
    deleteTab(selectedTab.name);
  };

  const deleteSelectedGoal = () => {
    if (!selectedGoal) return;

    const holdList = selectedGoal.list_name;
    deleteGoal(selectedGoal);

    // Update global state by dispatching DELETE_GOAL
    dispatch({ type: "DELETE_GOAL", payload: { id: selectedGoal.id } });

    // Checking if the list is now empty
    const listNotEmpty = goals.some(
      (goal) => goal.list_name === holdList && goal.id !== selectedGoal.id
    );

    if (!listNotEmpty) {
      // If the list is empty, using the reducer to update global state
      dispatch({ type: "DELETE_LIST", payload: { list_name: holdList } });
    }
  };

  // Function to delete a List and associated goals
  const deleteSelectedList = () => {
    if (!selectedList) return;

    // Delete all goals associated with the selected list
    goals.forEach((goal) => {
      if (goal.list_name === selectedList) {
        deleteGoal(goal);
      }
    });

    // Delete the list position
    const goalForList = goals.find((g) => g.list_name === selectedList);
    if (goalForList) {
      deleteListPosition(goalForList.tab, selectedList);
    }
  };

  // Centralize reset logic after deletion
  const resetSelections = () => {
    setSelectedTab(null);
    setSelectedList(null);
    setSelectedGoal(null);
    setSelectedType("");
  };

  // Unified delete handler that delegates to the correct delete function
  const handleDelete = () => {
    if (!selectedType || (!selectedTab && !selectedList && !selectedGoal))
      return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${
        selectedTab?.name || selectedList || selectedGoal?.task_name
      }"?`
    );

    if (confirmDelete) {
      if (selectedType === "Tab") {
        deleteSelectedTab();
      } else if (selectedType === "Goal") {
        deleteSelectedGoal();
      } else if (selectedType === "List") {
        deleteSelectedList();
      }

      // Reset selections after deletion
      // resetSelections();
    }
  };

  // Filter lists based on the selected tab
  const uniqueLists = selectedTab
    ? Array.from(
        new Set(
          goals
            .filter((goal) => goal.tab === selectedTab.id)
            .map((goal) => goal.list_name)
        )
      )
    : [];

  return (
    <div className="edit-container">
      <div className="all-data-box">
        <div className="all-stored-items-box">
          <div className="all-tabs">
            {tabs.map((tab) => (
              <div
                key={tab.name}
                className={`selector-box ${
                  tab === selectedTab ? "item-chosen" : ""
                }`}
                onClick={() => handleSelectObject("Tab", tab)}
              >
                <img
                  src={`/icons/${tab.icon_name}`}
                  className="tab-selector-icon"
                  alt={tab.name}
                />
                <span className="selector-text">{tab.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Lists */}
        <div className="all-stored-items-box">
          {uniqueLists.map((list) => (
            <div
              key={list}
              className={`selector-box ${
                list === selectedList ? "item-chosen" : ""
              }`}
              onClick={() => handleSelectObject("List", list)}
            >
              <span className="selector-text">{list}</span>
            </div>
          ))}
        </div>

        {/* Column 3: Goals */}
        <div className="all-stored-items-box">
          {goals
            .filter((goal) => goal.list_name === selectedList)
            .map((goal) => (
              <div
                key={goal.id}
                className={`selector-box ${
                  goal === selectedGoal ? "item-chosen" : ""
                }`}
                onClick={() => handleSelectObject("Goal", goal)}
              >
                <span className="selector-text">{goal.task_name}</span>
              </div>
            ))}
        </div>
      </div>
      {/* Edit Options */}
      <div className="edit-options">
        <div className="selected-obj-info">
          <span id="selected-obj-name">
            SELECTED: {selectedList ? selectedList : ""}
          </span>
        </div>
        <div className="edit-buttons">
          <button className="edit-item">
            <img src={Edit} className="action-icon" alt="Edit" />
            EDIT
          </button>
          <button className="edit-item" onClick={handleDelete}>
            <img src={Delete} className="action-icon" alt="Delete" />
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
