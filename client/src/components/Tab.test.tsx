import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Tab from "./Tab";
import * as reactRouterDom from "react-router-dom";
import * as AppContext from "../AppContext";
import { MockAppProvider } from "../__mocks__/mockAppContext";
import { createMockTabs } from "../__mocks__/mockTabData";
import { createMockGoals } from "../__mocks__/mockGoalData";

// Mock the react-router-dom module
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

describe("Tab Component", () => {
  const mockDispatch = vi.fn();
  const mockState = {
    goals: createMockGoals(5),
    tabs: createMockTabs(3), // Create 3 mock tabs
    isLoading: false,
    goalXPBar: 100,
    currentXP: 50,
  };

  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(AppContext, "useAppContext").mockReturnValue({
      state: mockState,
      dispatch: mockDispatch,
    });
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
      dispatch: mockDispatch,
    });

    render(
      <MockAppProvider>
        <Tab />
      </MockAppProvider>
    );

    expect(screen.queryByText(/⸻ Tab 1 ⸻/i)).not.toBeInTheDocument();
    expect(screen.queryAllByRole("list")).toHaveLength(0);
  });
});
