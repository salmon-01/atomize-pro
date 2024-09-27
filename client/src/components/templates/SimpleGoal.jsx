import { useEffect } from "react";
import "../../styles/SimpleGoal.css";
import { useAppContext } from "../../AppContext";
import { updateGoalProgress } from "../../ApiService";

export default function SimpleGoal({ goalID }) {
  const { state, dispatch } = useAppContext();
  // Get the goal from the global state using goalID
  const goal = state.goals.find((g) => g.id === goalID);

  useEffect(() => {
    if (!goal) {
      console.log(`Goal with ID ${goalID} not found`);
    } else {
      console.log("Goal updated:", goal); // Check if the goal updates correctly
    }
  }, [goal, goalID]); // Trigger whenever goal or goalID changes

  const completeGoal = () => {
    if (goal && !goal.complete) {
      // Dispatch action to update the global state
      dispatch({
        type: "UPDATE_GOAL",
        payload: { id: goal.id, updates: { complete: true } },
      });

      // Update goal progress on the backend
      updateGoalProgress(goal.name, goal.type, true);
    }
  };

  const renderSimpleGoal = (goal) => {
    const goalClass =
      goal.color === "red"
        ? "simple-red"
        : goal.color === "purple"
        ? "simple-purple"
        : "simple-orange";
    return (
      <div className="goal-container">
        <div className="simple-container">
          <div className={`simpleBlock ${goalClass}`} onClick={completeGoal}>
            <div
              className={`statusLight-simple ${
                goal.complete ? "isDone" : "isOff"
              }`}
              key={goal.name}
            ></div>
            <div className="simpleGoalText" onClick={completeGoal}>
              {goal.name}
            </div>
          </div>
          {/* <div className="more-options">
                    <img src={Skip} className={`options ${goalHovered ? null : 'hidden' }`} />
                    <img src={Edit} className={`options ${goalHovered ? null : 'hidden' }`} />
                    <img src={Delete} className={`options ${goalHovered ? null : 'hidden' }`} />
                </div> */}
        </div>
      </div>
    );
  };

  return renderSimpleGoal(goal);
}
