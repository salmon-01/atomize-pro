import { React, useState, useEffect } from "react";
import Delete from "../assets/other/delete-button.png";
import Edit from "../assets/other/edit-button.png";
import {
  deleteTab,
  deleteGoal,
  insertListPosition,
  deleteListPosition,
} from "../ApiService.jsx";
import "../styles/MakeEdits.css";
import { useAppContext } from "../AppContext.js";

export default function MakeEdits() {
  const { state } = useAppContext();
  const { tabs, goals } = state;
  // Styling and rendering not fully complete. Will add 'edit' functionalities.

  const [selectedObject, setSelectedObject] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedTab, setSelectedTab] = useState([]);
  const [selectedList, setSelectedList] = useState("");

  const tabAttributes = [
    "col_one",
    "col_one_b",
    "col_two",
    "col_two_b",
    "col_three",
    "col_three_b",
  ];

  const handleSelectObject = (obj) => {
    setSelectedObject(obj);
    if (obj.icon) {
      setSelectedType("Tab");
      setSelectedTab(obj);
      setSelectedList("");
    } else if (obj.list) {
      setSelectedType("Goal");
    } else {
      setSelectedType("List");
      setSelectedList(obj);
    }
    console.log(obj);
  };

  const handleDelete = (obj) => {
    if (window.confirm(`Are you sure you want to delete "${obj.name}"?`)) {
      if (selectedType === "Tab") {
        goals.map((goal) =>
          goal.tab === obj.name ? deleteGoal(goal.name, goal.type) : null
        );
        deleteTab(obj.name);
      } else if (selectedType === "Goal") {
        const holdList = obj.list;
        deleteGoal(obj.name, obj.type);
        const listNotEmpty = goals.some((goal) => goal.list === holdList);
        if (!listNotEmpty) {
          deleteListPosition(selectedTab.name, holdList);
        }
      } else if (selectedType === "List") {
        goals.map((goal) =>
          goal.list === selectedList ? deleteGoal(goal.name, goal.type) : null
        );
        console.log(selectedTab.name, selectedList);
        deleteListPosition(selectedTab.name, selectedList);
      }
      setSelectedObject([]);
      setSelectedType("");
      window.location.reload();
    }
  };

  return (
    <div className="edit-container">
      <div className="all-data-box">
        <div className="all-stored-items-box">
          <div className="all-tabs">
            {tabs.map((tab) => (
              <div
                className={`selector-box ${
                  selectedObject === tab || selectedTab === tab
                    ? "item-chosen"
                    : null
                }`}
                onClick={() => {
                  handleSelectObject(tab);
                }}
              >
                <img src={tab.icon} className="tab-selector-icon" />
                <span className="selector-text">{tab.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="all-stored-items-box">
          {tabAttributes.map((attribute) => {
            const value = selectedTab[attribute];
            return value !== null ? (
              <div
                className={`selector-box ${
                  selectedObject === value || selectedList === value
                    ? "item-chosen"
                    : null
                }`}
                onClick={() => {
                  handleSelectObject(value);
                }}
                key={attribute}
              >
                <span className="selector-text">{value}</span>
              </div>
            ) : null;
          })}
        </div>
        <div className="all-stored-items-box">
          {goals.map((goal) =>
            goal.list === selectedList ? (
              <div
                className={`selector-box ${
                  selectedObject === goal ? "item-chosen" : null
                }`}
                onClick={() => {
                  handleSelectObject(goal);
                }}
              >
                <span className="selector-text">{goal.name}</span>
              </div>
            ) : null
          )}
        </div>
      </div>
      <div className="edit-options">
        <div className="selected-obj-info">
          <span id="selected-obj-name">
            SELECTED:{" "}
            {selectedType === "List" ? selectedList : selectedObject.name}
          </span>
        </div>
        <div className="edit-buttons">
          <button className="edit-item">
            <img src={Edit} className="action-icon" />
            EDIT
          </button>
          <button
            className="edit-item"
            onClick={() => {
              handleDelete(selectedObject);
            }}
          >
            <img src={Delete} className="action-icon" />
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
