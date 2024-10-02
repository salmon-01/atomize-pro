import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useFormContext } from "../../context/createListContext";
import { MockAppProvider } from "../../__mocks__/mockAppContext";
import AddSomeBars from "./AddSomeBars";
import { useFieldArray, useWatch } from "react-hook-form";
import { Control } from "react-hook-form";

// Mock necessary modules
vi.mock("react-hook-form", () => ({
  useFieldArray: vi.fn(),
  useWatch: vi.fn(),
}));
vi.mock("../../context/createListContext", () => ({
  useFormContext: vi.fn(),
}));
// Mock the ColorPicker component
vi.mock("../ui/ColorPicker", () => ({
  ColorPicker: vi.fn(({ onChange }) => (
    <div>
      <button aria-expanded="false" onClick={() => onChange("turq-gradient")}>
        Color Picker Mock
      </button>
      <div role="listbox">
        <button
          aria-label="Select Turquoise"
          onClick={() => onChange("turq-gradient")}
        >
          Turquoise
        </button>
      </div>
    </div>
  )),
}));

const mockControl = {
  _subjects: {},
  _removeUnmounted: vi.fn(),
  _names: {},
  _state: {},
  _proxy: {},
} as unknown as Control<any>;

describe("AddSomeBars Component", () => {
  beforeEach(() => {
    (useFormContext as any).mockReturnValue({
      listName: "Test List",
      selectedTab: 1,
    });

    (useFieldArray as any).mockReturnValue({
      fields: [{ id: "1" }],
      append: vi.fn(),
      remove: vi.fn(),
    });

    (useWatch as any).mockReturnValue([{ task_name: "", color: "purple" }]);
  });

  it("renders the initial form with a table and a button", () => {
    render(
      <MockAppProvider>
        <AddSomeBars
          control={mockControl}
          register={vi.fn()}
          setValue={vi.fn()}
        />
      </MockAppProvider>
    );

    // Ensure the table headers are rendered
    expect(screen.getByText(/Goal name/i)).toBeInTheDocument();
    expect(screen.getByText(/Daily Goal/i)).toBeInTheDocument();
    expect(screen.getByText(/Units/i)).toBeInTheDocument();
    expect(screen.getByText(/Fill/i)).toBeInTheDocument();

    // Ensure the ColorPicker is rendered
    expect(screen.getByText("Color Picker Mock")).toBeInTheDocument();

    // Ensure the 'Add +' button is rendered
    expect(screen.getByText(/Add \+/i)).toBeInTheDocument();
  });

  it("calls append when 'Add +' button is clicked", () => {
    const appendMock = vi.fn();
    (useFieldArray as any).mockReturnValue({
      fields: [{ id: "1" }],
      append: appendMock,
      remove: vi.fn(),
    });

    render(
      <MockAppProvider>
        <AddSomeBars
          control={mockControl}
          register={vi.fn()}
          setValue={vi.fn()}
        />
      </MockAppProvider>
    );

    // Click 'Add +' button
    fireEvent.click(screen.getByText(/Add \+/i));

    // Ensure append is called with the correct initial values
    expect(appendMock).toHaveBeenCalledWith({
      task_name: "",
      list_name: "Test List",
      tab: 1,
      type: "Progress Bar",
      color: "turq-gradient",
      active: true,
      complete: false,
      last_completed: null,
      current_number: 0,
      goal_number: 0,
      units: "",
    });
  });

  it("renders and updates task name input correctly", () => {
    const registerMock = vi.fn();
    render(
      <MockAppProvider>
        <AddSomeBars
          control={mockControl}
          register={registerMock}
          setValue={vi.fn()}
        />
      </MockAppProvider>
    );

    // Check for input field presence
    const input = screen.getByLabelText(/task name/i);
    expect(input).toBeInTheDocument();

    // Simulate input change
    fireEvent.change(input, { target: { value: "New Task" } });
    expect(registerMock).toHaveBeenCalled();
  });

  it("removes a goal when the delete button is clicked", () => {
    const removeMock = vi.fn();
    (useFieldArray as any).mockReturnValue({
      fields: [{ id: "1" }],
      append: vi.fn(),
      remove: removeMock,
    });

    render(
      <MockAppProvider>
        <AddSomeBars
          control={mockControl}
          register={vi.fn()}
          setValue={vi.fn()}
        />
      </MockAppProvider>
    );

    // Click on the delete icon
    fireEvent.click(screen.getByRole("img", { name: /delete/i }));

    // Ensure remove is called with the correct index
    expect(removeMock).toHaveBeenCalledWith(0);
  });

  it("updates color when ColorPicker value changes via handleClick", () => {
    const setValueMock = vi.fn();

    // Render the component with mocked setValue
    render(
      <MockAppProvider>
        <AddSomeBars
          control={mockControl}
          register={vi.fn()}
          setValue={setValueMock}
        />
      </MockAppProvider>
    );

    // Simulate opening the ColorPicker (using the color box with role="button")
    const colorBox = screen.getByRole("button", { expanded: false });
    fireEvent.click(colorBox); // Open color options

    // Simulate selecting a color (e.g., "Select Turquoise")
    const turquoiseOption = screen.getByLabelText("Select Turquoise");
    fireEvent.click(turquoiseOption);

    // Check if setValue was called with the correct color value
    expect(setValueMock).toHaveBeenCalledWith("goals.0.color", "turq-gradient");
  });
});
