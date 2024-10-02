import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useAuth } from "../context/authContext"; // Adjust the path to your authContext
import { useNavigate } from "react-router-dom";
import Login from "../components/Login"; // Adjust the path to your Login component

// Mock useAuth and useNavigate hooks
vi.mock("../context/authContext", () => ({
  useAuth: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

describe("Login Component", () => {
  const mockLogin = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    // Reset mocks before each test
    mockLogin.mockReset();
    mockNavigate.mockReset();
    (useAuth as any).mockReturnValue({
      login: mockLogin,
      isAuthenticated: false,
    });
    (useNavigate as any).mockReturnValue(mockNavigate);
  });

  it("renders the login form correctly", () => {
    render(<Login />);

    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("should call login with email and password when form is submitted", async () => {
    render(<Login />);

    // Simulate entering email and password
    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText("Login"));

    // Ensure login was called with correct arguments
    expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
  });

  it("displays an error if login fails", async () => {
    mockLogin.mockResolvedValue(false); // Mock login failure
    render(<Login />);

    // Simulate form submission
    fireEvent.click(screen.getByText("Login"));

    // Expect error message to appear
    expect(
      await screen.findByText(/Invalid email or password/i)
    ).toBeInTheDocument();
  });

  it("displays an error if fields are empty", async () => {
    render(<Login />);

    // Clear the fields and submit the form
    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByText("Login"));

    // Expect validation error message
    expect(
      await screen.findByText(/Both fields are required/i)
    ).toBeInTheDocument();
  });

  it("should redirect to /home if already authenticated", () => {
    (useAuth as any).mockReturnValue({
      login: mockLogin,
      isAuthenticated: true,
    });

    render(<Login />);

    // Check if navigate was called to redirect
    expect(mockNavigate).toHaveBeenCalledWith("/home", { replace: true });
  });

  it("displays a general error if login throws an exception", async () => {
    mockLogin.mockRejectedValue(new Error("Server error")); // Mock login failure
    render(<Login />);

    // Simulate form submission
    fireEvent.click(screen.getByText("Login"));

    // Expect error message to appear
    expect(
      await screen.findByText(/Something went wrong. Please try again later./i)
    ).toBeInTheDocument();
  });
});
