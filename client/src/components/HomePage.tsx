import HomeOverview from "./HomePage-Overview";
import { Routes, Route } from "react-router-dom";
import "../styles/HomePage.css";

export default function HomePage() {
  return (
    <div className="home-container">
      <Routes>
        <Route path="/" element={<HomeOverview />} />
      </Routes>
    </div>
  );
}
