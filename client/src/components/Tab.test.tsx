import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Tab from "./Tab";
import * as reactRouterDom from "react-router-dom";
import * as AppContext from "../AppContext";
import { MockAppProvider } from "../__mocks__/mockAppContext";
import { mockTabData, createMockTabs } from "../__mocks__/mockTabData";
import { mockGoalData, createMockGoals } from "../__mocks__/mockGoalData";

// Mock the react-router-dom module
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

// Mock the AppContext
// vi.mock("../AppContext", () => ({
//   useAppContext: vi.fn(),
// }));

describe("Tab Component", () => {
  const mockState = {
    goals: createMockGoals(5),
    tabs: createMockTabs(3), // Create 3 mock tabs
    isLoading: false,
  };

  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(AppContext, "useAppContext").mockReturnValue({ state: mockState });
  });

  it("renders the Tab component with valid tabName", () => {
    vi.spyOn(reactRouterDom, "useParams").mockReturnValue({ tabName: "tab-1" });

    render(
      <MockAppProvider>
        <Tab />
      </MockAppProvider>
    );

    expect(screen.getByText(/⸻ Tab 1 ⸻/i)).toBeInTheDocument();
    expect(screen.getByText("Default List")).toBeInTheDocument();
  });

  it("displays 'Tab not found' when tabName is invalid", () => {
    vi.spyOn(reactRouterDom, "useParams").mockReturnValue({
      tabName: "invalid-tab",
    });

    render(
      <MockAppProvider>
        <Tab />
      </MockAppProvider>
    );

    expect(screen.getByText("Tab not found")).toBeInTheDocument();
  });

  it("doesn't render content when isLoading is true", () => {
    vi.spyOn(reactRouterDom, "useParams").mockReturnValue({ tabName: "tab-1" });
    vi.spyOn(AppContext, "useAppContext").mockReturnValue({
      state: { ...mockState, isLoading: true },
    });

    render(
      <MockAppProvider>
        <Tab />
      </MockAppProvider>
    );

    expect(screen.queryByText(/⸻ Tab 1 ⸻/i)).not.toBeInTheDocument();
    expect(screen.queryAllByRole("list")).toHaveLength(0);
  });

  // Currently not working...
  // it("renders BlankPage when tab has no goals", () => {
  //   const stateWithNoGoalsForTab3 = {
  //     ...mockState,
  //     goals: mockState.goals.filter((goal) => goal.tab !== 3), // Ensure no goals for tab 3
  //   };

  //   vi.spyOn(AppContext, "useAppContext").mockReturnValue({
  //     state: stateWithNoGoalsForTab3,
  //   });
  //   vi.spyOn(reactRouterDom, "useParams").mockReturnValue({ tabName: "tab-3" });

  //   render(
  //     <MockAppProvider>
  //       <Tab />
  //     </MockAppProvider>
  //   );

  //   expect(screen.getByText(/⸻ Tab 3 ⸻/i)).toBeInTheDocument();
  //   expect(screen.getByTestId("blank-page")).toBeInTheDocument(); // Check for the BlankPage using data-testid
  // });
});
