import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
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

describe("SimpleListComponent", () => {
  it("renders a single simple list item correctly", () => {
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

  // it("displays correct completion status", () => {
  //   const completedList = createMockSimpleList({ complete: true });
  //   const { rerender } = render(<SimpleGoal item={completedList} />);

  //   expect(screen.getByRole("checkbox")).toBeChecked();

  //   const incompleteList = createMockSimpleList({ complete: false });
  //   rerender(<SimpleGoal item={incompleteList} />);

  //   expect(screen.getByRole("checkbox")).not.toBeChecked();
  // });
});
//   it("handles toggling completion status", async () => {
//     const user = userEvent.setup();
//     const onToggleMock = vi.fn();
//     const simpleList = createMockSimpleList({ complete: false });

//     render(
//       <SimpleListComponent item={simpleList} onToggleComplete={onToggleMock} />
//     );

//     const checkbox = screen.getByRole("checkbox");
//     await user.click(checkbox);

//     expect(onToggleMock).toHaveBeenCalledWith(simpleList.id);
//   });

//   it("renders multiple simple list items", () => {
//     const lists = createMockSimpleLists(3);
//     render(<SimpleListContainer items={lists} />);

//     lists.forEach((list) => {
//       expect(screen.getByText(list.list_name)).toBeInTheDocument();
//     });
//   });

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
