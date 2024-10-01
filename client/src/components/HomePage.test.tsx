import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MockAppProvider } from "../__mocks__/mockAppContext";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";
import { createMockGoals } from "../__mocks__/mockGoalData";
import { createMockTabs } from "../__mocks__/mockTabData";

describe("Home Page", () => {
  const mockDispatch = vi.fn();
  const mockState = {
    goals: createMockGoals(5),
    tabs: createMockTabs(3),
    isLoading: false,
    goalXPBar: 100,
    currentXP: 50,
  };

  it("renders HomePage without crashing", () => {
    render(
      <MemoryRouter>
        <MockAppProvider value={{ state: mockState, dispatch: mockDispatch }}>
          <HomePage />
        </MockAppProvider>
      </MemoryRouter>
    );
  });

  it("renders HomeOverview on default route '/' with tabs and goals", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <MockAppProvider value={{ state: mockState, dispatch: mockDispatch }}>
          <HomePage />
        </MockAppProvider>
      </MemoryRouter>
    );

    // Check if the tab names are rendered
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
  });
});
