import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SimpleGoal from "./SimpleGoal";
import {
  mockSimpleListData,
  createMockSimpleLists,
} from "../../__mocks__/mockSimpleList";
import { MockAppProvider } from "../../__mocks__/mockAppContext";

describe("SimpleGoalComponent", () => {
  it("renders a single simple goal item correctly", () => {
    const simpleList = mockSimpleListData[0];
    const { id } = simpleList;
    // console.log("mockSimpleListData in test:", mockSimpleListData);

    render(
      <MockAppProvider>
        <SimpleGoal goalID={id as number} />
      </MockAppProvider>
    );

    expect(screen.queryByText(simpleList.task_name)).not.toBeNull(); // Alternative to toBeInTheDocument
    expect(screen.queryByText(simpleList.task_name)).not.toBeNull(); // Alternative to toBeInTheDocument
  });

  it("displays correct completion status", () => {
    const completedList = mockSimpleListData[0]; // Assume it's incomplete initially
    const { id } = completedList;

    // Render the component inside the mock provider
    const { container } = render(
      <MockAppProvider>
        <SimpleGoal goalID={id as number} />
      </MockAppProvider>
    );

    // Verify the goal's completion status (initially incomplete, should have the 'isOff' class)
    const statusLight = container.querySelector(".statusLight-simple");
    expect(statusLight).toHaveClass(
      completedList.complete ? "isDone" : "isOff"
    );
  });

  it("renders multiple simple goals correctly", () => {
    // Create a mock list with 3 items
    const lists = createMockSimpleLists(3);
    console.log(lists);
    // Update the global state with the mock data (goals/lists)
    const mockAppContextValue = {
      state: {
        goals: lists, // Assuming 'goals' is the global state key for the lists
        tabs: [],
        isLoading: false,
        goalXPBar: 0,
        currentXP: 0,
      },
      dispatch: vi.fn(), // Mock dispatch function if needed
    };

    // Loop through the list and render each SimpleGoal component individually
    lists.forEach((list) => {
      render(
        <MockAppProvider value={mockAppContextValue}>
          <SimpleGoal goalID={list.id} />
        </MockAppProvider>
      );

      // Check if each goal's task_name is rendered
      expect(screen.getByText(list.task_name)).toBeInTheDocument();
    });
  });
});
