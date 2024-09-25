import React from "react";
import { Link } from 'react-router-dom';

export default function HomeOverview({tabs, goals}) {

    // Home will show a simple overview of all tabs and the lists inside them.

    return (
        <div className="overview-container">
            {tabs.map(tab => (
                <div className="tab-overview-box" key={tab.name}>
                    <h4 className="overview-header">{tab.name}</h4>
                    <div className="goals-overview">
                        {goals.map(goal => 
                            goal.tab === tab.name ? <span key={goal.name}>O</span> : null
                        )}
                    </div>
                </div>
            ))}

            {/* <Link to="/home/plan">Click here to go to the planner</Link>
            Here's an overview of all goals */}
        </div>
    )
}