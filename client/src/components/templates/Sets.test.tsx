import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Sets from "./Sets";
import { MockAppProvider } from "../../__mocks__/mockAppContext";
import { updateGoalProgress } from "../../ApiService";
import { mockGoalData } from "../../__mocks__/mockGoalData";

// Mock the updateGoalProgress API call
vi.mock("../../ApiService", () => ({
  updateGoalProgress: vi.fn(() => Promise.resolve()),
}));

describe("Sets Component", () => {
  const mockGoal = {
    ...mockGoalData[0],
    sets: 3,
    reps: 10,
    completed_sets: 0,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the task name and sets correctly", () => {
    render(
      <MockAppProvider>
        <Sets goal={mockGoal} />
      </MockAppProvider>
    );

    // Check if the task name is rendered
    expect(screen.getByText(mockGoal.task_name)).toBeInTheDocument();

    // Check if all the set circles are rendered
    const setCircles = screen.getAllByText(mockGoal.reps?.toString() || "0");
    expect(setCircles.length).toBe(mockGoal.sets);

    // Initially, none of the sets should be complete
    setCircles.forEach((circle) => {
      expect(circle.parentElement).not.toHaveClass("complete-set");
    });
  });

  it("completes a set on click and updates the global state", () => {
    const mockDispatch = vi.fn();
    const goal = { ...mockGoal, completed_sets: 0 };
    const mockAppContextValue = {
      state: {
        goals: [goal],
        tabs: [],
        isLoading: false,
        goalXPBar: 0,
        currentXP: 0,
      },
      dispatch: mockDispatch,
    };

    render(
      <MockAppProvider value={mockAppContextValue}>
        <Sets goal={goal} />
      </MockAppProvider>
    );

    // Click the first set circle to complete a set
    const setCircles = screen.getAllByText(goal.reps?.toString() || "0");
    fireEvent.click(setCircles[0]);

    // The first set should now be marked as complete
    expect(setCircles[0].parentElement).toHaveClass("complete-set");

    // Check if the dispatch function was called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "UPDATE_GOAL",
      payload: {
        id: goal.id,
        updates: { completed_sets: 1 }, // One set completed
      },
    });

    // Check if the API call was made with the updated progress
    expect(updateGoalProgress).toHaveBeenCalledWith({
      ...goal,
      completed_sets: 1,
    });
  });

  it("prevents completing more sets than the total", () => {
    const mockDispatch = vi.fn();
    const goal = { ...mockGoal, completed_sets: 3 }; // All sets are already completed
    const mockAppContextValue = {
      state: {
        goals: [goal],
        tabs: [],
        isLoading: false,
        goalXPBar: 0,
        currentXP: 0,
      },
      dispatch: mockDispatch,
    };

    render(
      <MockAppProvider value={mockAppContextValue}>
        <Sets goal={goal} />
      </MockAppProvider>
    );

    // Click a set circle when all sets are already completed
    const setCircles = screen.getAllByText(goal.reps?.toString() || "0");
    fireEvent.click(setCircles[0]);

    // Ensure the dispatch function was NOT called since all sets are complete
    expect(mockDispatch).not.toHaveBeenCalled();

    // Ensure the API call was NOT made
    expect(updateGoalProgress).not.toHaveBeenCalled();
  });

  it("updates multiple sets correctly on subsequent clicks", () => {
    const mockDispatch = vi.fn();
    const goal = { ...mockGoal, completed_sets: 1 }; // Start with 1 set already completed
    const mockAppContextValue = {
      state: {
        goals: [goal],
        tabs: [],
        isLoading: false,
        goalXPBar: 0,
        currentXP: 0,
      },
      dispatch: mockDispatch,
    };

    render(
      <MockAppProvider value={mockAppContextValue}>
        <Sets goal={goal} />
      </MockAppProvider>
    );

    // Check initial state: the first set should be complete
    const setCircles = screen.getAllByText(goal.reps?.toString() || "0");
    expect(setCircles[0].parentElement).toHaveClass("complete-set");

    // Click the second set circle to complete another set
    fireEvent.click(setCircles[1]);

    // The second set should now be marked as complete
    expect(setCircles[1].parentElement).toHaveClass("complete-set");

    // Check if the dispatch function was called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "UPDATE_GOAL",
      payload: {
        id: goal.id,
        updates: { completed_sets: 2 }, // Two sets now completed
      },
    });

    // Check if the API call was made with the updated progress
    expect(updateGoalProgress).toHaveBeenCalledWith({
      ...goal,
      completed_sets: 2,
    });
  });
});
