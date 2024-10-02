import { describe, it, expect } from "vitest";
import { authReducer, initialState } from "./authReducer"; // Adjust the path as necessary
import { AuthAction, AuthState } from "../types/types";

describe("authReducer", () => {
  it("should handle LOGIN action", () => {
    const user = {
      id: 1,
      name: "Sara",
      email: "sara@example.com",
      password: "qwerty21312321",
      avatar: "https://i.pravatar.cc/100?u=zz",
    };
    const action: AuthAction = { type: "LOGIN", payload: user };
    const expectedState: AuthState = {
      user,
      isAuthenticated: true,
    };

    const newState = authReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it("should handle LOGOUT action", () => {
    const loggedInState: AuthState = {
      user: {
        name: "Sara",
        email: "sara@example.com",
        password: "qwerty21312321",
        avatar: "https://i.pravatar.cc/100?u=zz",
      },
      isAuthenticated: true,
    };
    const action: AuthAction = { type: "LOGOUT" };
    const expectedState: AuthState = {
      user: null,
      isAuthenticated: false,
    };

    const newState = authReducer(loggedInState, action);
    expect(newState).toEqual(expectedState);
  });

  it("should throw an error for unknown actions", () => {
    const action: AuthAction = { type: "UNKNOWN_ACTION" as any };

    expect(() => authReducer(initialState, action)).toThrowError(
      "Unknown action"
    );
  });
});
