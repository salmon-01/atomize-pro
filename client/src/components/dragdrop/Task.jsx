import React from "react";
import './Task.css'
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

export const Task = ({ id, name }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || "transform 100ms ease", // Add a smooth transition
        zIndex: transform ? 1000 : "auto", // Elevate when dragging
      };
      
  
    return (
      <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <div className="task">{name}</div>
      </div>
    );
  };
