import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CreateNewTab from "./CreateNewTab";
import { State } from "../types/types";
import { MockAppProvider } from "../__mocks__/mockAppContext";

// Mock the dependencies
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

vi.mock("../ApiService", () => ({
  createTab: vi.fn(),
}));

const renderWithContext = (state: Partial<State> = {}) => {
  const mockState: State = {
    tabs: [],
    goals: [],
    isLoading: false,
    goalXPBar: 100,
    currentXP: 50,
    ...state,
  };
  const mockDispatch = vi.fn();
  return render(
    <MemoryRouter>
      <MockAppProvider value={{ state: mockState, dispatch: mockDispatch }}>
        <CreateNewTab />
      </MockAppProvider>
    </MemoryRouter>
  );
};

describe("CreateNewTab", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the form elements", () => {
    renderWithContext();
    expect(screen.getByText("Name your tab")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter tab name")).toBeInTheDocument();
    expect(screen.getByText("Choose your tab icon:")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create Tab" })
    ).toBeInTheDocument();
  });

  it("displays all icon options", () => {
    renderWithContext();
    const icons = screen.getAllByRole("img");
    expect(icons).toHaveLength(12);
  });

  it("allows entering a tab name", () => {
    renderWithContext();
    const input = screen.getByPlaceholderText(
      "Enter tab name"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "My New Tab" } });
    expect(input.value).toBe("My New Tab");
  });

  it("allows selecting an icon", () => {
    renderWithContext();
    const firstIcon = screen.getAllByRole("img")[0];
    fireEvent.click(firstIcon);
    expect(firstIcon).toHaveClass("icon-chosen");
  });
});
