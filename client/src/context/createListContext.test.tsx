import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CreateListProvider, useFormContext } from "./createListContext"; // Adjust the path to your createListContext
import { ReactNode } from "react";
import { FormData } from "../types/types";

// Correct dummy form data to be used in tests, matching the actual FormData structure
const DUMMY_FORM_DATA: FormData = {
  listName: "Test List",
  selectedTab: 0,
  template: "Template A",
};

// A test component to use the CreateListContext
function TestComponent() {
  const { listName, selectedTab, template } = useFormContext();

  return (
    <div>
      <p>List Name: {listName}</p>
      <p>Selected Tab: {selectedTab}</p>
      <p>Template: {template}</p>
    </div>
  );
}

// Helper to render with CreateListProvider
function renderWithCreateListProvider(ui: ReactNode, formData: FormData) {
  return render(
    <CreateListProvider formData={formData}>{ui}</CreateListProvider>
  );
}

describe("CreateListProvider", () => {
  it("should provide the form data to its children", () => {
    renderWithCreateListProvider(<TestComponent />, DUMMY_FORM_DATA);

    // Check that the form data is passed correctly
    expect(screen.getByText(/List Name: Test List/i)).toBeInTheDocument();
    expect(screen.getByText(/Selected Tab: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/Template: Template A/i)).toBeInTheDocument();
  });

  it("should throw an error if useFormContext is used outside CreateListProvider", () => {
    const TestOutsideCreateList = () => {
      try {
        useFormContext();
      } catch (error) {
        return <p>{(error as Error).message}</p>;
      }
      return null;
    };

    render(<TestOutsideCreateList />);

    expect(
      screen.getByText(
        "useFormContext must be used within a CreateListProvider"
      )
    ).toBeInTheDocument();
  });
});
