import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useAppContext } from "../AppContext";
import "../styles/HomePage-Planner.css";

const timeSlots = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

// Helper function to reorder items in a list (for drag-and-drop within the same list)
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// Helper function to move items between lists
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export default function HomePlanner() {
  const { state } = useAppContext(); // Get global context
  const { goals: globalGoals } = state;

  // Local state for goals to manage the disappearing feature
  const [goals, setGoals] = useState(globalGoals);

  // State for tasks assigned to time slots
  const [slotTasks, setSlotTasks] = useState(
    timeSlots.reduce((acc, time) => {
      acc[`slot-${time}`] = []; // Initialize each time slot with an empty array
      return acc;
    }, {})
  );

  // Handle drag-and-drop
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Dropped outside any droppable area
    if (!destination) return;

    // Dropping within the same list (reorder)
    if (source.droppableId === destination.droppableId) {
      const reorderedTasks = reorder(
        source.droppableId === "tasks" ? goals : slotTasks[source.droppableId],
        source.index,
        destination.index
      );
      if (source.droppableId !== "tasks") {
        setSlotTasks({
          ...slotTasks,
          [source.droppableId]: reorderedTasks,
        });
      }
    } else {
      // Moving between lists (move task from task list to a time slot)
      const result = move(
        source.droppableId === "tasks" ? goals : slotTasks[source.droppableId],
        destination.droppableId === "tasks"
          ? goals
          : slotTasks[destination.droppableId],
        source,
        destination
      );

      // Update slotTasks state
      setSlotTasks({
        ...slotTasks,
        [source.droppableId]: result[source.droppableId],
        [destination.droppableId]: result[destination.droppableId],
      });

      // Remove the item from the goals list if it was dropped into a time slot
      if (source.droppableId === "tasks") {
        const newGoals = Array.from(goals);
        const movedGoal = newGoals.splice(source.index, 1)[0]; // Remove the task that was moved

        // Add the task to the destination slot with the color property intact
        const destinationSlot = result[destination.droppableId];
        destinationSlot[droppableDestination.index] = {
          ...movedGoal, // Preserve the task name and color
        };

        setGoals(newGoals);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="plan-container">
        {/* Time Slots on the left */}
        <div className="day-plan">
          {timeSlots.map((time) => (
            <div key={time} className="plan-row">
              <div className="time-slot">{time}:00</div>
              <Droppable droppableId={`slot-${time}`}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`task-slot ${
                      snapshot.isDraggingOver ? "dragging-over" : ""
                    }`}
                  >
                    {slotTasks[`slot-${time}`].map((task, index) => (
                      <Draggable
                        key={task.id.toString()}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`task ${task.color} ${
                              snapshot.isDragging ? "dragging" : ""
                            }`}
                          >
                            {task.task_name}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>

        {/* Task List on the right */}
        <Droppable droppableId="tasks">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`task-list ${
                snapshot.isDraggingOver ? "dragging-over" : ""
              }`}
            >
              <h2>Goals</h2>
              {goals.map((goal, index) => (
                <Draggable
                  key={goal.id.toString()}
                  draggableId={goal.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`task ${goal.color} ${
                        snapshot.isDragging ? "dragging" : ""
                      }`}
                    >
                      {goal.task_name}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
