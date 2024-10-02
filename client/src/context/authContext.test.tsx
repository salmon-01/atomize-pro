import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthProvider, useAuth } from "./authContext"; // Adjust path to your authContext
import { DUMMY_USER } from "../store/dummyData";
import { ReactNode } from "react";

// A test component to use the AuthContext
function TestComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      <p>User: {user ? user.email : "No user"}</p>
      <p>Authenticated: {isAuthenticated ? "Yes" : "No"}</p>
      <button onClick={() => login(DUMMY_USER.email, DUMMY_USER.password)}>
        Login
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

// Helper to render with AuthProvider
function renderWithAuthProvider(ui: ReactNode) {
  return render(<AuthProvider>{ui}</AuthProvider>);
}

describe("AuthProvider", () => {
  it("should initialize with no user and not authenticated", () => {
    renderWithAuthProvider(<TestComponent />);

    // Check that the initial state is correct
    expect(screen.getByText(/User: No user/i)).toBeInTheDocument();
    expect(screen.getByText(/Authenticated: No/i)).toBeInTheDocument();
  });

  it("should login the user with correct credentials", () => {
    renderWithAuthProvider(<TestComponent />);

    // Simulate clicking the login button
    fireEvent.click(screen.getByText("Login"));

    // Check that the user is logged in
    expect(screen.getByText(`User: ${DUMMY_USER.email}`)).toBeInTheDocument();
    expect(screen.getByText(/Authenticated: Yes/i)).toBeInTheDocument();
  });

  it("should logout the user", () => {
    renderWithAuthProvider(<TestComponent />);

    // Simulate login first
    fireEvent.click(screen.getByText("Login"));

    // Now simulate logout
    fireEvent.click(screen.getByText("Logout"));

    // Check that the user is logged out
    expect(screen.getByText(/User: No user/i)).toBeInTheDocument();
    expect(screen.getByText(/Authenticated: No/i)).toBeInTheDocument();
  });

  it("should throw an error if useAuth is used outside AuthProvider", () => {
    const TestOutsideAuth = () => {
      try {
        useAuth();
      } catch (error) {
        return <p>{(error as Error).message}</p>;
      }
      return null;
    };

    render(<TestOutsideAuth />);

    expect(
      screen.getByText("AuthContext was used outside the AuthProvider!")
    ).toBeInTheDocument();
  });
});
