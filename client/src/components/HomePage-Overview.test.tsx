import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MockAppProvider } from "../__mocks__/mockAppContext";
import { MemoryRouter } from "react-router-dom";
import { createMockGoals } from "../__mocks__/mockGoalData";
import { createMockTabs, mockTabData } from "../__mocks__/mockTabData";
import HomeOverview from "./HomePage-Overview";
import { State } from "../types/types";

const renderWithContext = (state: State) => {
  const mockDispatch = vi.fn();
  return render(
    <MockAppProvider value={{ state, dispatch: mockDispatch }}>
      <HomeOverview />
    </MockAppProvider>
  );
};

describe("HomeOverview Component", () => {
  it("renders the correct number of tabs", () => {
    const mockState: State = {
      tabs: createMockTabs(3), // Create 3 mock tabs
      goals: [],
      isLoading: false,
      goalXPBar: 100,
      currentXP: 50,
    };

    renderWithContext(mockState);

    // Expect 3 tab headers
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
    expect(screen.getByText("Tab 3")).toBeInTheDocument();
  });

  it("renders a message if no tabs are available", () => {
    const mockState: State = {
      tabs: [], // No tabs
      goals: [],
      isLoading: false,
      goalXPBar: 100,
      currentXP: 50,
    };

    renderWithContext(mockState);

    expect(screen.queryByText("tab 1")).not.toBeInTheDocument();
  });
});
