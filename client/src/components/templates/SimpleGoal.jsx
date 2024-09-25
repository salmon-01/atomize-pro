import React, {useState, useEffect} from "react";
import '../../styles/SimpleGoal.css';
import { updateGoalProgress } from "../../ApiService";

export default function SimpleGoal({goal}) {

    const [goalStatus, setGoalStatus] = useState(goal.complete);

    useEffect(() => {
        updateGoalProgress(goal.name, goal.type, goalStatus);
    }, [goalStatus]);

    const completeGoal = () => {
        if (!goalStatus) {
            setGoalStatus(true); // Set it to complete
        }
    }

    const renderSimpleGoal = (goal) => {
        const goalClass = goal.color === 'red' ? 'simple-red' : goal.color === 'purple' ? 'simple-purple' : 'simple-orange';
        return (
            <div className='simple-container'>
                <div className={`simpleBlock ${goalClass}`} onClick={completeGoal}>
                    <div className={`statusLight-simple ${goalStatus ? 'isDone' : 'isOff'}`} key={goal.name}></div>
                    <div className="simpleGoalText" onClick={completeGoal}>{goal.name}</div>
                </div>
                {/* <div className="more-options">
                    <img src={Skip} className={`options ${goalHovered ? null : 'hidden' }`} />
                    <img src={Edit} className={`options ${goalHovered ? null : 'hidden' }`} />
                    <img src={Delete} className={`options ${goalHovered ? null : 'hidden' }`} />
                </div> */}
            </div>
        );
    };

    return (
        renderSimpleGoal(goal)
    )
}
