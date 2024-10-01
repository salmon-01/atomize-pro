import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { BlankPage } from "./BlankPage";
import { describe, it, expect } from "vitest";

describe("BlankPage component", () => {
  it("renders the correct elements", () => {
    render(
      <MemoryRouter>
        <BlankPage />
      </MemoryRouter>
    );

    const blankPage = screen.getByTestId("blank-page");
    expect(blankPage).toBeInTheDocument();

    expect(screen.getByText("This page is empty!")).toBeInTheDocument();
    expect(
      screen.getByText("Would you like to add a new list now?")
    ).toBeInTheDocument();

    const button = screen.getByRole("button", { name: "OK →" });
    expect(button).toBeInTheDocument();
  });

  it("renders a link with the correct path", () => {
    render(
      <MemoryRouter>
        <BlankPage />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /OK/i });
    expect(link).toHaveAttribute("href", "/create-new/list");
  });
});
