import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { createMockTabs } from "../__mocks__/mockTabData";
import { createMockGoals } from "../__mocks__/mockGoalData";
import { MockAppProvider } from "../__mocks__/mockAppContext";
import MakeEdits from "./MakeEdits";

vi.mock("../ApiService.js", () => ({
  deleteTab: vi.fn(),
  deleteGoal: vi.fn(),
}));

describe("MakeEdits Component", () => {
  const mockDispatch = vi.fn();
  const mockState = {
    goals: createMockGoals(5),
    tabs: createMockTabs(3),
    isLoading: false,
    goalXPBar: 100,
    currentXP: 50,
  };

  const renderComponent = () => {
    render(
      <MockAppProvider value={{ state: mockState, dispatch: mockDispatch }}>
        <MakeEdits />
      </MockAppProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    window.confirm = vi.fn(() => true);
  });

  it("renders all tabs", () => {
    renderComponent();

    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
  });

  it("selects a tab when clicked", () => {
    renderComponent();

    const tab = screen.getByText(mockState.tabs[0].name);
    fireEvent.click(tab);

    expect(tab.parentElement).toHaveClass("item-chosen");
    expect(screen.getByText(mockState.tabs[0].name)).toBeInTheDocument();
  });

  it("filters lists based on selected tab", () => {
    renderComponent();

    // Select the first tab
    fireEvent.click(screen.getByText(mockState.tabs[0].name));

    const filteredLists = mockState.goals
      .filter((goal) => goal.tab === mockState.tabs[0].id)
      .map((goal) => goal.list_name);

    filteredLists.forEach((list) => {
      expect(screen.getByText(list)).toBeInTheDocument();
    });
  });
});
