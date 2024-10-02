import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ColorPicker } from "./ColorPicker";

describe("ColorPicker Component", () => {
  it("renders the color picker with the initial color", () => {
    const initialColor = "turq-gradient";
    const mockOnChange = vi.fn();

    render(<ColorPicker color={initialColor} onChange={mockOnChange} />);

    // Check if the color box is rendered with the initial color class
    const colorBox = screen.getByRole("button", { expanded: false });
    expect(colorBox).toHaveClass(initialColor);
  });

  it("toggles the color options when clicked", () => {
    const initialColor = "turq-gradient";
    const mockOnChange = vi.fn();

    render(<ColorPicker color={initialColor} onChange={mockOnChange} />);

    // Initially, color options should not be visible
    const colorChoices = screen.queryByRole("listbox");
    expect(colorChoices).not.toBeInTheDocument();

    // Click the color box to open the color options
    const colorBox = screen.getByRole("button", { expanded: false });
    fireEvent.click(colorBox);

    // Now the color options should be visible
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("calls onChange with the selected color and closes the options", () => {
    const initialColor = "turq-gradient";
    const mockOnChange = vi.fn();

    render(<ColorPicker color={initialColor} onChange={mockOnChange} />);

    // Click to open the color options
    const colorBox = screen.getByRole("button", { expanded: false });
    fireEvent.click(colorBox);

    // Click on the orange color option
    const orangeOption = screen.getByLabelText("Select Orange");
    fireEvent.click(orangeOption);

    // Check if onChange was called with the correct color
    expect(mockOnChange).toHaveBeenCalledWith("simple-orange");

    // The color options should be closed after a color is selected
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
