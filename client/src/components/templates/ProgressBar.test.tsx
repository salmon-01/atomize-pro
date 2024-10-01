import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ProgressBar from "./ProgressBar";
import { MockAppProvider } from "../../__mocks__/mockAppContext";
import { mockProgressBarData } from "../../__mocks__/mockProgressBar";

// Mock the updateGoalProgress API call
vi.mock("../../ApiService", () => ({
  updateGoalProgress: vi.fn(() => Promise.resolve()),
}));

describe("Progress Bar Component", () => {
  const mockGoal = mockProgressBarData[0];

  it("renders the progress bar and input field correctly", () => {
    render(
      <MockAppProvider>
        <ProgressBar goal={mockGoal} />
      </MockAppProvider>
    );

    // Provide default values for current_number and goal_number if undefined
    const currentNumber = mockGoal.current_number ?? 0;
    const goalNumber = mockGoal.goal_number ?? 1;

    // Check if the task name is rendered
    expect(screen.getByText(mockGoal.task_name)).toBeInTheDocument();

    // Check if the input field (number) and button are rendered
    expect(screen.getByRole("spinbutton")).toBeInTheDocument(); // For type="number" inputs
    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();

    // Check if the progress percentage is rendered correctly
    const progressText = screen.getByText(
      `${currentNumber} / ${goalNumber} ${mockGoal.units} — ${(
        (currentNumber / goalNumber) *
        100
      ).toFixed(2)}%`
    );
    expect(progressText).toBeInTheDocument();
  });

  // it("displays correct progress percentage based on current and goal numbers", () => {
  //   const goal = { ...mockGoal, current_number: 3, goal_number: 10 };

  //   render(
  //     <MockAppProvider>
  //       <ProgressBar goal={goal} />
  //     </MockAppProvider>
  //   );

  //   // Check the progress percentage displayed
  //   const progressText = screen.getByText("3 / 10 units — 30.00%");
  //   expect(progressText).toBeInTheDocument();
  // });

  // it("updates progress correctly on submission and dispatches action", () => {
  //   const mockDispatch = vi.fn();
  //   const goal = { ...mockGoal, current_number: 2, goal_number: 5 };

  //   render(
  //     <MockAppProvider
  //       value={{ state: { goals: [goal] }, dispatch: mockDispatch }}
  //     >
  //       <ProgressBar goal={goal} />
  //     </MockAppProvider>
  //   );

  //   // Enter a progress value in the input field
  //   const input = screen.getByRole("textbox");
  //   fireEvent.change(input, { target: { value: "2" } });

  //   // Click the submit button
  //   const submitButton = screen.getByRole("button", { name: "+" });
  //   fireEvent.click(submitButton);

  //   // Check if the dispatch function was called with the correct action
  //   expect(mockDispatch).toHaveBeenCalledWith({
  //     type: "UPDATE_GOAL",
  //     payload: {
  //       id: goal.id,
  //       updates: { current_number: 4 }, // 2 + 2 = 4
  //     },
  //   });

  //   // Check if the API call was made with the updated progress
  //   expect(updateGoalProgress).toHaveBeenCalledWith({
  //     ...goal,
  //     current_number: 4,
  //   });
  // });

  // it("prevents exceeding 1000% of the goal", () => {
  //   const mockDispatch = vi.fn();
  //   const goal = { ...mockGoal, current_number: 10, goal_number: 5 }; // Already at 200%

  //   render(
  //     <MockAppProvider
  //       value={{ state: { goals: [goal] }, dispatch: mockDispatch }}
  //     >
  //       <ProgressBar goal={goal} />
  //     </MockAppProvider>
  //   );

  //   // Enter a progress value that would exceed the limit
  //   const input = screen.getByRole("textbox");
  //   fireEvent.change(input, { target: { value: "100" } });

  //   // Click the submit button
  //   const submitButton = screen.getByRole("button", { name: "+" });
  //   fireEvent.click(submitButton);

  //   // Ensure the dispatch was not called because it exceeds the limit
  //   expect(mockDispatch).not.toHaveBeenCalled();

  //   // Ensure the progress doesn't exceed the allowed limit
  //   expect(updateGoalProgress).not.toHaveBeenCalled();
  // });

  // it("handles input changes correctly", () => {
  //   render(
  //     <MockAppProvider>
  //       <ProgressBar goal={mockGoal} />
  //     </MockAppProvider>
  //   );

  //   // Enter a progress value in the input field
  //   const input = screen.getByRole("textbox");
  //   fireEvent.change(input, { target: { value: "5" } });

  //   // Ensure the input field is updated
  //   expect(input.value).toBe("5");
  // });
});
