import { render, screen } from "@testing-library/react";
import List from "./List";
import { describe, it, expect, vi } from "vitest";

// Import mock data
import { mockSimpleListData } from "../__mocks__/mockSimpleList";
import { mockProgressBarData } from "../__mocks__/mockProgressBar";
import { mockLevelsBlockData } from "../__mocks__/mockLevelsBlock";

// Mock child components
vi.mock("./templates/SimpleGoal", () => ({
  default: () => <div data-testid="SimpleGoal" />,
}));

vi.mock("./templates/ProgressBar", () => ({
  default: () => <div data-testid="ProgressBar" />,
}));

vi.mock("./templates/LevelsBlock", () => ({
  default: () => <div data-testid="LevelsBlock" />,
}));

vi.mock("./templates/Sets", () => ({
  default: () => <div data-testid="Sets" />,
}));

describe("List component", () => {
  it("renders the correct heading", () => {
    render(<List list="Simple List 1" tabGoals={mockSimpleListData} />);
    
    expect(screen.getByText("Simple List 1")).toBeInTheDocument();
  });

  it("renders the correct heading for a different list", () => {
    render(<List list="Simple List 2" tabGoals={mockSimpleListData} />);
    
    expect(screen.getByText("Simple List 2")).toBeInTheDocument();
  });

  it("renders SimpleGoal components based on the list", () => {
    render(<List list="Simple List 1" tabGoals={mockSimpleListData} />);
    
    const simpleGoals = screen.getAllByTestId("SimpleGoal");
    expect(simpleGoals).toHaveLength(mockSimpleListData.length);
  });

  it("renders ProgressBar components based on the goal type", () => {
    render(<List list="List 1" tabGoals={mockProgressBarData} />);
    
    expect(screen.getByText("List 1")).toBeInTheDocument();
  });

  it("renders Levels components based on the goal type", () => {
    render(<List list="List 1" tabGoals={mockLevelsBlockData} />);
    
    expect(screen.getByText("List 1")).toBeInTheDocument();
  });

  it("renders no goals when there are no matching goals for the list", () => {
    render(<List list="Empty List" tabGoals={[]} />);
    
    expect(screen.queryByTestId("SimpleGoal")).not.toBeInTheDocument();
    expect(screen.queryByTestId("ProgressBar")).not.toBeInTheDocument();
    expect(screen.queryByTestId("LevelsBlock")).not.toBeInTheDocument();
    expect(screen.queryByTestId("Sets")).not.toBeInTheDocument();
  });
});
