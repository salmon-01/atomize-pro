import { React, useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import CreateNew from './components/CreateNew';
import CreateNewList from './components/CreateNewList';
import CreateNewTab from './components/CreateNewTab';
import CreateNewGoal from './components/CreateNewGoal.jsx';
import MakeEdits from './components/MakeEdits.jsx';
import HomePage from './components/HomePage';
import Tab from './components/Tab';
import { fetchAllTabs, fetchAllGoals } from "./ApiService.jsx";
import './App.css'

function App() {

  const [tabs, setTabs] = useState([]);
  const [goals, setGoals] = useState([]);
  // const [lists, setLists] = useState([]);

  const [goalXPBar, setGoalXPBar] = useState(0);
  const [currentXP, setCurrentXP] = useState(0);

  const calculateXPGoal = (goals) => {
    goals.forEach(goal => {
      goal.type === 'Simple List' && setGoalXPBar(prev => prev + 1);
      goal.type === 'Levels' && setGoalXPBar(prev => prev + 3);
      goal.type === 'Sets' && setGoalXPBar(prev => prev + goal.sets);
      goal.type === 'Progress Bar' && setGoalXPBar(prev => prev + 10);
    });
    goals.forEach(goal => {
      goal.type === 'Simple List' && goal.complete && setCurrentXP(prev => prev + 1);
      goal.type === 'Sets' && setCurrentXP(prev => prev + goal.completed_sets);
      goal.type === 'Levels' && setCurrentXP(prev => prev + goal.level);
      goal.type === 'Progress Bar' && setCurrentXP(prev => prev + Math.round(goal.current / goal.goal_number * 10));
    });
  };

  const loadTabs = async () => {
    try {
      const fetchedTabs = await fetchAllTabs();
      if (fetchedTabs && fetchedTabs.length > 0) {
          setTabs(fetchedTabs);
      } else {
          setTabs([]);
      }
  } catch (error) {
      console.error("Error fetching tabs:", error);
      setTabs([]);
    }
  };

  const loadGoals = async () => {
    try {
        const fetchedGoals = await fetchAllGoals();
        if (fetchedGoals && Array.isArray(fetchedGoals.simple) && Array.isArray(fetchedGoals.progbars) && Array.isArray(fetchedGoals.levels) && Array.isArray(fetchedGoals.sets)) {
            const allGoals = [
                ...fetchedGoals.simple,
                ...fetchedGoals.progbars,
                ...fetchedGoals.levels,
                ...fetchedGoals.sets
            ];
            setGoals(allGoals);
        } else {
            setGoals([]);
        }
    } catch (error) {
        console.error("Error fetching goals:", error);
        setGoals([]);
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
    <div className="wrapper">
      <NavBar goalXPBar={goalXPBar} currentXP={currentXP} tabs={tabs}/>
      <Routes>
        <Route path="/home/*" element={<HomePage tabs={tabs} goals={goals} />} />
        <Route path="/create-new" element={<CreateNew />} />
        <Route path="/create-new/list" element={<CreateNewList loadGoals={loadGoals} tabs={tabs} />} />
        <Route path="/create-new/tab" element={<CreateNewTab tabs={tabs}/>} />
        <Route path="/create-new/goal" element={<CreateNewGoal tabs={tabs}/>} />
        <Route path="/edit" element={<MakeEdits tabs={tabs} goals={goals}/>} />
        {tabs.length > 0 && tabs.map(tab => {
          if (tab.name) {
            const hyphenatedName = tab.name.replace(/\s+/g, '-');
            return <Route key={hyphenatedName} path={`/${hyphenatedName}`} element={<Tab tab={tab} goals={goals} />} />;
        }
          return null;
        })}
      </Routes>
    </div>
  )
}

export default App
