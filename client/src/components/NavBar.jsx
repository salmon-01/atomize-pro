import {React, useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import HomeButton from '../assets/navigation/home-button.png';
import CreateButton from '../assets/navigation/createnew-button.png';
// import PlanetButton from '../assets/navigation/planet-button.png';
import EditButton from '../assets/navigation/edit-button.png';
import '../styles/ProgressBar.css';
import '../styles/NavBar.css';

export default function NavBar({tabs, goalXPBar, currentXP}) {

    // const [hoveredText, setHoveredText] = ('');

    const formattedDate = formatDate(new Date())

    return (
        <>
        <div className="nav-container">
            <div className="home">
                <Link to="/home"><img src={HomeButton} className="nav-icon"/></Link>
            </div>
            <div className='categories'>
                {tabs.length > 0 && tabs.map(tab => {
                    if (tab.name) {
                        const hyphenatedName = tab.name.replace(/\s+/g, '-');
                        return <Link to={`/${hyphenatedName}`} key={tab.name}><img src={tab.icon} className="nav-icon"/></Link>;
                    }
                    return null;
                })}
            </div>
            <div className={`${tabs.length ? 'categories' : null}`}>
                {/* <img src={PlanetButton} className="nav-icon" /> */}
                <Link to="/create-new"><img src={CreateButton} className="nav-icon" /></Link>
                <Link to="/edit"><img src={EditButton} className="nav-icon" /></Link>
            </div>
            <div className="date-display">{formattedDate}</div>
            <div className="barBox" id="nav-completion-bar-box">
                <div className="progress-container" id="nav-completion-bar">
                    <div className='progress-bar xpbar-fill' style={{ width: `${(currentXP / goalXPBar) * 100}%` }}></div>
                </div>
            </div>
        </div>
        {/* <span className="hover-text">{hoveredText}</span> */}
        </>
    )
}

const formatDate = (date) => {
    const dateFormat = date.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    const parts = dateFormat.split(' ');
    const dayOfWeek = parts[0];
    const restOfDate = parts.slice(1).join(' ');
    return `${dayOfWeek}, ${restOfDate}`;
}
