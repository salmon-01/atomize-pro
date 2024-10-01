import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddSomeGoals from "./AddSomeGoals";
import { MockAppProvider } from "../../__mocks__/mockAppContext";
import { createGoal } from "../../ApiService";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { useFormContext } from "../../context/createListContext";

// Mock necessary modules
vi.mock("../../ApiService", () => ({
  createGoal: vi.fn(() => Promise.resolve({ success: true, data: { id: 1 } })),
}));
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));
vi.mock("../../context/createListContext", () => ({
  useFormContext: vi.fn(),
}));

describe("AddSomeGoals Component", () => {
  let mockNavigate: NavigateFunction;

  beforeEach(() => {
    mockNavigate = vi.fn();
    (useNavigate as any).mockReturnValue(mockNavigate);
    (useFormContext as any).mockReturnValue({
      listName: "Test List",
      template: "Simple List",
      selectedTab: 1,
    });
  });

  it("renders the correct form based on the template", () => {
    render(
      <MockAppProvider>
        <AddSomeGoals />
      </MockAppProvider>
    );

    // Expect the form for 'Simple List' template to be rendered
    expect(screen.getByText("Test List")).toBeInTheDocument(); // List name should be rendered
  });

  it("handles form submission and API call correctly", async () => {
    const mockDispatch = vi.fn();
    const mockAppContextValue = {
      state: {
        tabs: [{ id: 1, name: "Test Tab", icon_name: "" }],
        goals: [],
        isLoading: false,
        goalXPBar: 10,
        currentXP: 5,
      },
      dispatch: mockDispatch,
    };

    render(
      <MockAppProvider value={mockAppContextValue}>
        <AddSomeGoals />
      </MockAppProvider>
    );

    // Find the input for task name
    const taskInput = screen.getByRole("textbox", { name: /task name/i });

    // Fill out the form with some values
    fireEvent.change(taskInput, {
      target: { value: "New Goal" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /create list/i }));

    // Wait for the API call and state update
    await waitFor(() => {
      expect(createGoal).toHaveBeenCalledWith(
        expect.objectContaining({
          list_name: "Test List",
          task_name: "New Goal",
          tab: 1,
          color: "purple",
          type: "Simple List",
          active: true,
          complete: false,
          last_completed: null,
        })
      );

      // Check if dispatch was called with the correct payload (ignoring id here as well)
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "CREATE_GOAL",
        payload: expect.objectContaining({ task_name: "New Goal" }),
      });

      // Check if navigation happened
      expect(mockNavigate).toHaveBeenCalledWith("/Test-Tab");
    });
  });

  it("displays different components based on template type", () => {
    // Mock context to return different templates
    (useFormContext as any).mockReturnValueOnce({
      listName: "Test List",
      template: "Progress Bar",
      selectedTab: 1,
    });

    render(
      <MockAppProvider>
        <AddSomeGoals />
      </MockAppProvider>
    );

    // Expect Progress Bar specific component
    expect(screen.getByText("Test List")).toBeInTheDocument();
    // You could check specific elements that render only for Progress Bars, Levels, etc.
  });

  it("handles API error and shows appropriate message", async () => {
    // Mock API to return failure
    (createGoal as any).mockReturnValueOnce(
      Promise.resolve({ success: false, error: "API Error" })
    );

    const mockDispatch = vi.fn();
    const mockAppContextValue = {
      state: {
        tabs: [{ id: 1, name: "Test Tab", icon_name: "" }],
        goals: [],
        isLoading: false,
        goalXPBar: 10,
        currentXP: 5,
      },
      dispatch: mockDispatch,
    };

    render(
      <MockAppProvider value={mockAppContextValue}>
        <AddSomeGoals />
      </MockAppProvider>
    );

    fireEvent.change(screen.getByRole("textbox", { name: /task name/i }), {
      target: { value: "New Goal" },
    });

    fireEvent.click(screen.getByRole("button", { name: /create list/i }));

    await waitFor(() => {
      expect(createGoal).toHaveBeenCalled();
      // No dispatch or navigation should happen
      expect(mockDispatch).not.toHaveBeenCalledWith({ type: "CREATE_GOAL" });
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
