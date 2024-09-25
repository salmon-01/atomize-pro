import React, {useState, useEffect} from "react";
import { updateGoalProgress } from "../../ApiService";
import '../../styles/LevelsBlock.css'

export default function LevelsBlock({ goal }) {
    const [progress, setProgress] = useState(goal.level);

    useEffect(() => {
        updateGoalProgress(goal.name, goal.type, progress);
    }, [progress]);

    const updateProgress = () => {
        setProgress(prev => (prev < 3 ? prev + 1 : prev));
    };

    const goalClass = goal.color === 'pink' ? 'levels-block-pink' : 'levels-block-purple';

    return (
        <div className="fullBlock">
            <div className={goalClass} key={goal.name} onClick={updateProgress}>{goal.name}</div>
            <div className="lightTracker">
                <div className={`statusLight ${progress === 3 ? 'isDone' : 'isOff'}`}></div>
                <div className={`statusLight ${progress === 3 ? 'isDone' : progress === 2 ? 'isPartway' : 'isOff'}`}></div>
                <div className={`statusLight ${progress === 3 ? 'isDone' : progress === 2 ? 'isPartway' : progress === 1 ? 'isStarted' : 'isOff'}`}></div>
            </div>
        </div>
    );
}
