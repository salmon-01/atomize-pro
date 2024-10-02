import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CreateNew from "./CreateNew";
import { describe, it, expect } from "vitest";

describe("CreateNew component", () => {
  it("renders the header test and options", () => {
    render(
      <MemoryRouter>
        <CreateNew />
      </MemoryRouter>
    );

    expect(screen.getByText("CREATE A NEW...")).toBeInTheDocument();

    expect(screen.getByText("GOAL")).toBeInTheDocument();
    expect(screen.getByText("LIST")).toBeInTheDocument();
    expect(screen.getByText("TAB")).toBeInTheDocument();
    expect(screen.getByText("PLAN")).toBeInTheDocument();
  });

  it("renders the correct link for each option", () => {
    render(
      <MemoryRouter>
        <CreateNew />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: /GOAL/i })).toHaveAttribute(
      "href",
      "/create-new/goal"
    );
    expect(screen.getByRole("link", { name: /LIST/i })).toHaveAttribute(
      "href",
      "/create-new/list"
    );
    expect(screen.getByRole("link", { name: /TAB/i })).toHaveAttribute(
      "href",
      "/create-new/tab"
    );
    expect(screen.getByRole("link", { name: /PLAN/i })).toHaveAttribute(
      "href",
      "/create-new/plan"
    );
  });

  it("renders the images for each option", () => {
    render(
      <MemoryRouter>
        <CreateNew />
      </MemoryRouter>
    );

    expect(screen.getByAltText("goal")).toBeInTheDocument()
    expect(screen.getByAltText("list")).toBeInTheDocument()
    expect(screen.getByAltText("tab")).toBeInTheDocument()
    expect(screen.getByAltText("plan")).toBeInTheDocument()
  })
});
