// ! HomePage-Planner isn't functional at the moment.
import { useState } from "react";
import { DndContext, useDroppable, rectIntersection } from "@dnd-kit/core";
import { Column } from "./dragdrop/Column";
import { useAppContext } from "../AppContext";

function Droppable({ id, children }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="task-slot">
      {children}
    </div>
  );
}

export default function HomePlanner() {
  const { state } = useAppContext();
  const { tabs, goals } = state;
  // This feature may have to be removed in the interest of saving time. Currently, either the drag is clunky and releases too soon OR it fails to drop the object.

  const [start, setStart] = useState(8);
  const [end, setEnd] = useState(18);

  const timeSlots = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  const [slotTasks, setSlotTasks] = useState(timeSlots.map(() => null));

  const [tasks, setTasks] = useState([
    { id: 1, name: "Work on app" },
    { id: 2, name: "Write" },
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeTaskId = parseInt(active.id, 10);
    const targetSlotId = over.id;
    const slotIndex = parseInt(targetSlotId.replace("slot-", ""), 10);

    setSlotTasks((prevSlotTasks) => {
      const updatedSlotTasks = [...prevSlotTasks];
      const draggedTask = tasks.find((task) => task.id === activeTaskId);
      updatedSlotTasks[slotIndex] = draggedTask;
      return updatedSlotTasks;
    });
  };

  return (
    <div className="plan-container">
      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={rectIntersection}
      >
        <div className="day-plan">
          {timeSlots.map((time, index) => (
            <div className="plan-row" key={index}>
              <div className="time-slot" key={time}>
                {time}:00
              </div>
              <Droppable className="task-slot" id={`slot-${index}`}>
                {slotTasks[index] ? (
                  <div className="task">{slotTasks[index].name}</div>
                ) : null}
              </Droppable>
            </div>
          ))}
        </div>
        <Column tasks={tasks} />
      </DndContext>
    </div>
  );
}
