import { describe, it, expect, vi, beforeAll, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LevelsBlock from "./LevelsBlock";
import { MockAppProvider } from "../../__mocks__/mockAppContext";
import { mockLevelsBlockData } from "../../__mocks__/mockLevelsBlock";
import { updateGoalProgress } from "../../ApiService";

// Mock the updateGoalProgress API call
vi.mock("../../ApiService", () => ({
  updateGoalProgress: vi.fn(() => Promise.resolve()),
}));

describe("Levels Block Component", () => {
  // Mock global alert using Vitest's vi.fn()
  beforeAll(() => {
    window.alert = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks(); // Clear all mocks after each test
  });

  const mockGoal = { ...mockLevelsBlockData[0] };

  it("renders the task name and level status lights correctly", () => {
    render(
      <MockAppProvider>
        <LevelsBlock goal={mockGoal} />
      </MockAppProvider>
    );

    // Check if the task name is rendered
    expect(screen.getByText(mockGoal.task_name)).toBeInTheDocument();

    // Check if all 3 status lights are rendered
    const lights = document.querySelectorAll(".statusLight");
    expect(lights.length).toBe(3);

    // Initial state: all lights should be 'isOff'
    lights.forEach((light) => {
      expect(light).toHaveClass("isOff");
    });
  });

  it("updates progress correctly when clicked and dispatches action", () => {
    const mockDispatch = vi.fn();
    const goal = { ...mockGoal, level: 1 }; // Start at level 1
    const mockAppContextValue = {
      state: {
        goals: [goal],
        tabs: [],
        isLoading: false,
        goalXPBar: 0,
        currentXP: 0,
      },
      dispatch: mockDispatch, // Mock dispatch function
    };

    render(
      <MockAppProvider value={mockAppContextValue}>
        <LevelsBlock goal={goal} />
      </MockAppProvider>
    );

    // Click on the levels block to complete the next level
    const levelsBlock = screen.getByText(goal.task_name);
    fireEvent.click(levelsBlock);

    // Check if the dispatch function was called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "UPDATE_GOAL",
      payload: {
        id: goal.id,
        updates: { level: 2 }, // Progress should go from 1 to 2
      },
    });

    // Check if the API call was made with the updated progress
    expect(updateGoalProgress).toHaveBeenCalledWith({
      ...goal,
      level: 2,
    });
  });

  it("prevents exceeding the max level of 3", () => {
    const mockDispatch = vi.fn();
    const goal = { ...mockGoal, level: 3 }; // Already at the max level
    const mockAppContextValue = {
      state: {
        goals: [goal],
        tabs: [],
        isLoading: false,
        goalXPBar: 0,
        currentXP: 0,
      },
      dispatch: mockDispatch, // Mock dispatch function
    };

    render(
      <MockAppProvider value={mockAppContextValue}>
        <LevelsBlock goal={goal} />
      </MockAppProvider>
    );

    // Click on the levels block
    const levelsBlock = screen.getByText(goal.task_name);
    fireEvent.click(levelsBlock);

    // Ensure the dispatch was not called since progress is already maxed out
    expect(mockDispatch).not.toHaveBeenCalled();

    // Ensure the progress was not updated in the API either
    expect(updateGoalProgress).not.toHaveBeenCalled();
  });

  it("handles changes in level progress correctly", () => {
    const goal = { ...mockGoal, level: 2 }; // Start at level 2

    render(
      <MockAppProvider>
        <LevelsBlock goal={goal} />
      </MockAppProvider>
    );

    // Check if the correct status lights are on for level 2 initially
    const lights = document.querySelectorAll(".statusLight");

    expect(lights[0]).toHaveClass("isOff");
    expect(lights[1]).toHaveClass("isPartway");
    expect(lights[2]).toHaveClass("isPartway");

    // Click the levels block to advance progress
    const levelsBlock = screen.getByText(goal.task_name);
    fireEvent.click(levelsBlock);

    // Check if the correct status lights are on after the click (progress to level 3)
    expect(lights[0]).toHaveClass("isDone");
    expect(lights[1]).toHaveClass("isDone");
    expect(lights[2]).toHaveClass("isDone");
  });
});
