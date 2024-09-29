import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createTab } from "../ApiService.js";
import { useAppContext } from "../AppContext.js";
import { State, Action, Tab } from "../types/types.js";

export default function CreateNewTab() {
  const navigate = useNavigate();
  // const { state, dispatch } = useAppContext();
  const { state, dispatch } = useAppContext() as {
    state: State;
    dispatch: (action: Action) => void;
  };
  const { tabs } = state;

  const [chosenIcon, setChosenIcon] = useState("");
  const [tabName, setTabName] = useState("");
  const [tabData, setTabData] = useState({
    name: tabName,
    icon_name: chosenIcon,
    order_no: tabs.length + 1,
  });

  const allIcons = [
    "rocket-icon.png",
    "sprout-icon.png",
    "book-icon.png",
    "meal-icon.png",
    "moneybag-icon.png",
    "star-icon.png",
    "barbell-icon.png",
    "sun-icon.png",
    "piggybank-icon.png",
    "lightning-icon.png",
    "lightbulb-icon.png",
    "plane-globe-icon.png",
  ];

  const handleTabNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTabName(event.target.value);
  };

  const handleChooseIcon = (icon: string) => {
    setChosenIcon(icon);
  };

  const findPath = () => {
    return tabData.name.replace(/\s+/g, "-");
  };

  useEffect(() => {
    setTabData({ ...tabData, icon_name: chosenIcon });
  }, [chosenIcon]);

  useEffect(() => {
    setTabData({ ...tabData, name: tabName });
  }, [tabName]);

  console.log(tabData);

  const handleCreateTab = async (tab: Tab) => {
    if (!tabName) {
      alert("Please choose a name for your tab");
      return;
    }
    if (!chosenIcon) {
      alert("Please choose an icon");
      return;
    }
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      // Create the tab object using the updated tabData
      const newTab = {
        // ...tabData,
        name: tabName,
        icon_name: chosenIcon,
        // order_no: tabs.length + 1, // Use the current length of tabs to define order_no
      };

      // Dispatch the action to create the tab
      createTab(newTab);
      dispatch({ type: "CREATE_TAB", payload: newTab });

      console.log("New tab has been created successfully");

      const path = findPath();
      navigate(`/${path}`);
    } catch (error) {
      console.log("Error submitting tab:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <div className="new-tab-container">
      <span className="create-tab-text">Name your tab</span>
      <input
        type="text"
        id="name-tab"
        value={tabName}
        onChange={handleTabNameChange}
      ></input>
      <span className="create-tab-text">Choose your tab icon:</span>
      <div className="icon-list">
        {allIcons.map((icon) => (
          <img
            src={`/icons/${icon}`}
            className={`icon-choice ${
              chosenIcon === icon ? "icon-chosen" : "null"
            }`}
            onClick={() => {
              handleChooseIcon(icon);
            }}
          />
        ))}
      </div>
      <button
        id="submit-new-tab"
        onClick={() => {
          handleCreateTab(tabData);
        }}
      >
        Create Tab
      </button>
    </div>
  );
}
