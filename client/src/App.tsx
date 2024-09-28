import { useState, useEffect, useReducer } from "react";
import { initialState, reducer } from "./store/reducer.js";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.js";
import CreateNew from "./components/CreateNew.js";
import CreateNewList from "./components/CreateNewList.js";
import CreateNewTab from "./components/CreateNewTab.js";
import CreateNewGoal from "./components/CreateNewGoal.js";
import MakeEdits from "./components/MakeEdits.js";
import HomePage from "./components/HomePage.js";
import Tab from "./components/Tab.js";
import { fetchAllTabs, fetchAllGoals } from "./ApiService.js";
import "./App.css";
import { AppContext } from "./AppContext.js";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { goals, tabs, isLoading } = state;

  // Combined function to fetch tabs and goal data
  const loadData = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      // Fetch tabs and goals simultaneously
      const [tabsData, fetchedGoals] = await Promise.all([
        fetchAllTabs(),
        fetchAllGoals(),
      ]);

      console.log("Fetched tabs:", tabsData);
      console.log("Fetched goals:", fetchedGoals);

      // Dispatch tabs data
      console.log("Dispatching tabs data:", tabsData);
      dispatch({ type: "SET_TABS", payload: tabsData });

      // Process and dispatch goals data
      if (
        fetchedGoals &&
        Array.isArray(fetchedGoals.simpleLists) &&
        Array.isArray(fetchedGoals.progressBars) &&
        Array.isArray(fetchedGoals.levels) &&
        Array.isArray(fetchedGoals.sets)
      ) {
        const allGoals = [
          ...fetchedGoals.simpleLists,
          ...fetchedGoals.progressBars,
          ...fetchedGoals.levels,
          ...fetchedGoals.sets,
        ];
        console.log("Dispatching all goals:", allGoals);
        dispatch({ type: "SET_GOALS", payload: allGoals });
      } else {
        dispatch({ type: "SET_GOALS", payload: [] });
      }
    } catch (error) {
      console.error("There was an error loading data:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Fetches tabs and goals once on app mount.
  useEffect(() => {
    loadData();
  }, []);

  // If there are any goals, calculates the goal XP and updates the centralised state.
  useEffect(() => {
    if (goals.length > 0) {
      dispatch({ type: "CALCULATE_GOAL_XP", payload: goals });
    }
  }, [goals, dispatch]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="wrapper">
        <NavBar />
        <Routes>
          <Route path="/home/*" element={<HomePage />} />
          <Route path="/create-new" element={<CreateNew />} />
          <Route path="/create-new/list" element={<CreateNewList />} />
          <Route path="/create-new/tab" element={<CreateNewTab />} />
          <Route path="/create-new/goal" element={<CreateNewGoal />} />
          <Route path="/edit" element={<MakeEdits />} />
          {!isLoading &&
            tabs.length > 0 &&
            tabs.map((tab) => {
              if (tab.name) {
                return (
                  <Route key={tab.name} path={`/:tabName`} element={<Tab />} />
                );
              }
            })}
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
