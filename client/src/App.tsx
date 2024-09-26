import { useState, useEffect, useReducer } from "react";
import { initialState, reducer } from "./store/reducer.js";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import CreateNew from "./components/CreateNew.jsx";
import CreateNewList from "./components/CreateNewList.jsx";
import CreateNewTab from "./components/CreateNewTab.jsx";
import CreateNewGoal from "./components/CreateNewGoal.jsx";
import MakeEdits from "./components/MakeEdits.jsx";
import HomePage from "./components/HomePage.jsx";
import Tab from "./components/Tab.jsx";
import { fetchAllTabs, fetchAllGoals } from "./ApiService.jsx";
import "./App.css";
import { AppContext } from "./AppContext.js";

function App() {
  // const [goals, setGoals] = useState([]);
  // const [lists, setLists] = useState([]);

  const [goalXPBar, setGoalXPBar] = useState(0);
  const [currentXP, setCurrentXP] = useState(0);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { goals, tabs } = state;

  const calculateXPGoal = (goals) => {
    goals.forEach((goal) => {
      goal.type === "Simple List" && setGoalXPBar((prev) => prev + 1);
      goal.type === "Levels" && setGoalXPBar((prev) => prev + 3);
      goal.type === "Sets" && setGoalXPBar((prev) => prev + goal.sets);
      goal.type === "Progress Bar" && setGoalXPBar((prev) => prev + 10);
    });
    goals.forEach((goal) => {
      goal.type === "Simple List" &&
        goal.complete &&
        setCurrentXP((prev) => prev + 1);
      goal.type === "Sets" &&
        setCurrentXP((prev) => prev + goal.completed_sets);
      goal.type === "Levels" && setCurrentXP((prev) => prev + goal.level);
      goal.type === "Progress Bar" &&
        setCurrentXP(
          (prev) => prev + Math.round((goal.current / goal.goal_number) * 10)
        );
    });
  };

  const loadTabs = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const data = await fetchAllTabs();
      dispatch({ type: "SET_TABS", payload: data });
    } catch (error) {
      console.error("There was an error loading tabs:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const loadGoals = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const fetchedGoals = await fetchAllGoals();
      if (
        fetchedGoals &&
        Array.isArray(fetchedGoals.simple) &&
        Array.isArray(fetchedGoals.progbars) &&
        Array.isArray(fetchedGoals.levels) &&
        Array.isArray(fetchedGoals.sets)
      ) {
        const allGoals = [
          ...fetchedGoals.simple,
          ...fetchedGoals.progbars,
          ...fetchedGoals.levels,
          ...fetchedGoals.sets,
        ];
        dispatch({ type: "SET_GOALS", payload: allGoals });
      } else {
        dispatch({ type: "SET_GOALS", payload: [] });
      }
    } catch (error) {
      console.error("There was an error loading tabs:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  useEffect(() => {
    loadTabs();
    loadGoals();
  }, []);

  useEffect(() => {
    if (goals.length > 0) {
      calculateXPGoal(goals);
    }
  }, [goals]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="wrapper">
        <NavBar goalXPBar={goalXPBar} currentXP={currentXP} />
        <Routes>
          <Route path="/home/*" element={<HomePage />} />
          <Route path="/create-new" element={<CreateNew />} />
          <Route
            path="/create-new/list"
            element={<CreateNewList loadGoals={loadGoals} />}
          />
          <Route path="/create-new/tab" element={<CreateNewTab />} />
          <Route path="/create-new/goal" element={<CreateNewGoal />} />
          <Route path="/edit" element={<MakeEdits />} />
          {tabs.length > 0 &&
            tabs.map((tab) => {
              if (tab.name) {
                const hyphenatedName = tab.name.replace(/\s+/g, "-");
                return (
                  <Route
                    key={hyphenatedName}
                    path={`/${hyphenatedName}`}
                    element={<Tab tab={tab} goals={goals} />}
                  />
                );
              }
              return null;
            })}
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
