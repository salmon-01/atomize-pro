import { useAppContext } from "../AppContext";
import HomePlanner from "./HomePage-Planner";
import HomeOverview from "./HomePage-Overview";
import { Routes, Route } from "react-router-dom";
import "../styles/HomePage.css";
// import {DndContext} from '@dnd-kit/core';
// import {Draggable} from './Draggable';
// import {Droppable} from './Droppable';

export default function HomePage() {
  const { state } = useAppContext();
  const { tabs, goals } = state;

  return (
    <div className="home-container">
      <Routes>
        <Route path="/plan" element={<HomePlanner />} />
        <Route path="/" element={<HomeOverview />} />
      </Routes>
    </div>
  );
}
