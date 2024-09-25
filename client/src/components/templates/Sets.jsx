import {React, useState, useEffect} from "react";
import { updateGoalProgress } from "../../ApiService";

export default function Sets({goal}) {

    const [circleSpacing, setCircleSpacing] = ('standard-space');
    const [sets, setSets] = useState(goal.sets);
    const [completedSets, setCompletedSets] = useState(goal.completed_sets);

    const setSpacing = (numberOfSets) => {
        if (numberOfSets > 3) {
            return 'smaller-space';
        }}

        useEffect(() => {
        setSpacing(goal.sets);
    }, []);

    const handleCompleteSet = () => {
        if (completedSets < sets) {
            setCompletedSets(prev => prev + 1);
        }
    }

    useEffect(() => {
        updateGoalProgress(goal.name, goal.type, completedSets);
      }, [completedSets]);

    return (
        <div className="set-container">
            <div className="set-name-box">{goal.name}</div>
            <div className="set-tracker">
                {Array.from({ length: goal.sets }).map((_, index) => (
                 <div className={`set-circles ${index < completedSets ? 'complete-set' : ''}`}
                 key={index}
                 onClick={() => handleCompleteSet(index)}>
                    <span className="rep-number">{goal.reps}</span>
                </div>
                ))}
            </div>         
        </div>
    )
}