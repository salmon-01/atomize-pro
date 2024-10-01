import { useState } from "react";
import "./ColorPicker.css";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const colorOptions = [
  { name: "turq-gradient", label: "Turquoise" },
  { name: "orange-gradient", label: "Orange" },
  { name: "purple-gradient", label: "Purple" },
  { name: "yellow-gradient", label: "Yellow" },
];

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleColorChange = (newColor: string) => {
    onChange(newColor);
    setIsOpen(false);
  };

  return (
    <div className="color-picker-container">
      <div
        className={`color-box ${color}`}
        onClick={toggleOpen}
        aria-haspopup="true"
        aria-expanded={isOpen}
      ></div>
      {isOpen && (
        <div className="color-choices">
          {colorOptions.map((option) => (
            <div
              key={option.name}
              className={`color-option ${option.name}`}
              onClick={() => handleColorChange(option.name)}
              aria-label={`Select ${option.label}`}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}
