import React from "react";
import { Link } from 'react-router-dom';
import '../styles/CreateNew.css'
import Goal from '../assets/other/goal.png';
import List from '../assets/other/list.png';
import Plan from '../assets/other/plan.png';
import Tab from '../assets/other/tab.png';

export default function CreateNew({tabs}) {

    return (
        <div className="create-container">
            <p id="create-question">
                CREATE A NEW...
            </p>
            <div className="createChoices">
                <Link to="/create-new/goal">
                    <div className="choice">
                        <div className="choice-text">GOAL</div>
                        <img src={Goal} className="choice-image"/>
                    </div>
                </Link>
                <Link to="/create-new/list">
                    <div className="choice">
                        <div className="choice-text">LIST</div>
                        <img src={List} className="choice-image"/>
                    </div>
                </Link>
                <Link to="/create-new/tab">
                    <div className="choice">
                        <div className="choice-text">TAB</div>
                        <img src={Tab} className="choice-image"/>
                    </div>
                </Link>
                <Link to="/create-new/plan">
                    <div className="choice">
                        <div className="choice-text">PLAN</div>
                        <img src={Plan} className="choice-image"/>
                    </div>
                </Link>
            </div>
        </div>
    )
}