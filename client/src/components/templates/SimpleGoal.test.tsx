import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SimpleGoal from "./SimpleGoal";
import {
  mockSimpleListData,
  createMockSimpleList,
  createMockSimpleLists,
  SimpleList,
} from "../../__mocks__/mockSimpleList";
import { AppContext } from "../../AppContext";
import {
  MockAppProvider,
  mockAppContextValue,
} from "../../__mocks__/mockAppContext";

describe("SimpleGoalComponent", () => {
  it("renders a single simple goal item correctly", () => {
    const simpleList = mockSimpleListData[0];
    const { id } = simpleList;
    // console.log("mockSimpleListData in test:", mockSimpleListData);

    render(
      <MockAppProvider>
        <SimpleGoal goalID={id} />
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
        <SimpleGoal goalID={id} />
      </MockAppProvider>
    );

    // Verify the goal's completion status (initially incomplete, should have the 'isOff' class)
    const statusLight = container.querySelector(".statusLight-simple");
    expect(statusLight).toHaveClass(
      completedList.complete ? "isDone" : "isOff"
    );
  });

  it("renders multiple simple list items correctly", () => {
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

    // Render the component inside the mock provider
    render(
      <MockAppProvider value={mockAppContextValue}>
        <SimpleGoal goalID={id} />
      </MockAppProvider>
    );

    // Check if each list item is rendered
    lists.forEach((list) => {
      expect(screen.getByText(list.task_name)).toBeInTheDocument();
    });
  });
});

//   it("filters lists by completion status", () => {
//     const lists = [
//       createMockSimpleList({ id: 1, complete: true }),
//       createMockSimpleList({ id: 2, complete: false }),
//     ];

//     const { rerender } = render(
//       <SimpleListContainer items={lists} filterComplete={true} />
//     );

//     expect(screen.getByText(lists[0].list_name)).toBeInTheDocument();
//     expect(screen.queryByText(lists[1].list_name)).not.toBeInTheDocument();

//     rerender(<SimpleListContainer items={lists} filterComplete={false} />);

//     expect(screen.getByText(lists[1].list_name)).toBeInTheDocument();
//     expect(screen.queryByText(lists[0].list_name)).not.toBeInTheDocument();
//   });
// });

// // Example of testing a custom hook if you have one
// import { renderHook, act } from "@testing-library/react";
// import { useSimpleLists } from "./useSimpleLists"; // adjust based on your actual hook

// describe("useSimpleLists hook", () => {
//   it("manages simple list state correctly", () => {
//     const { result } = renderHook(() => useSimpleLists(mockSimpleListData));

//     expect(result.current.lists).toEqual(mockSimpleListData);

//     act(() => {
//       result.current.addList(
//         createMockSimpleList({
//           id: 99,
//           list_name: "New List",
//         })
//       );
//     });

//     expect(result.current.lists).toHaveLength(2);
//     expect(result.current.lists[1].list_name).toBe("New List");
//   });
// });
