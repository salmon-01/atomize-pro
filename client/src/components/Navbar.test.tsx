import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { mockTabData, createMockTabs } from "../__mocks__/mockTabData";
import { mockGoalData, createMockGoals } from "../__mocks__/mockGoalData";
import { MockAppProvider } from "../__mocks__/mockAppContext";
import * as AppContext from "../AppContext";
import { MemoryRouter } from "react-router-dom";
import NavBar from "./NavBar";

describe("Navbar Component", () => {
  const mockState = {
    goals: createMockGoals(5),
    tabs: createMockTabs(3), // Create 3 mock tabs
    isLoading: false,
    goalXPBar: 100, // Set your goal XP
    currentXP: 50, //
  };

  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(AppContext, "useAppContext").mockReturnValue({ state: mockState });
  });

  it("renders create and edit buttons", () => {
    render(
      <MemoryRouter>
        <MockAppProvider value={{ state: mockState }}>
          <NavBar />
        </MockAppProvider>
      </MemoryRouter>
    );

    const createButton = screen.getByAltText(/create new/i); // Make sure to set alt text in your image
    const editButton = screen.getByAltText(/edit/i); // Make sure to set alt text in your image

    expect(createButton).toBeInTheDocument();
    expect(createButton.closest("a")).toHaveAttribute("href", "/create-new");
    expect(editButton).toBeInTheDocument();
    expect(editButton.closest("a")).toHaveAttribute("href", "/edit");
  });

  it("displays the correct formatted date", () => {
    render(
      <MemoryRouter>
        <MockAppProvider value={{ state: mockState }}>
          <NavBar />
        </MockAppProvider>
      </MemoryRouter>
    );

    const dateDisplay = screen.getByText(/^\w+, \d{2} \w+ \d{4}$/);
    expect(dateDisplay).toBeInTheDocument();
  });

  it("renders the progress bar correctly", () => {
    render(
      <MemoryRouter>
        <MockAppProvider value={{ state: mockState }}>
          <NavBar />
        </MockAppProvider>
      </MemoryRouter>
    );

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveStyle({ width: "50%" });
  });
});
