import { useState } from "react";
import "./ColorPicker.css";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const colorOptions = [
  { name: "turq-gradient", label: "Turquoise" },
  { name: "orange-gradient", label: "Orange-g" },
  { name: "purple-gradient", label: "Purple" },
  { name: "yellow-gradient", label: "Yellow" },
  { name: "simple-red", label: "Red" },
  { name: "simple-purple", label: "Purple" },
  { name: "simple-orange", label: "Orange" },
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
        role="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      ></div>
      {isOpen && (
        <div className="color-choices" role="listbox">
          {colorOptions.map((option) => (
            <div
              key={option.name}
              role="button"
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
