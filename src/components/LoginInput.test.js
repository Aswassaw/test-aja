/* eslint-disable testing-library/no-await-sync-query */
/* eslint-disable testing-library/no-unnecessary-act */
/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle username typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginInput from "./LoginInput";

import "@testing-library/jest-dom";

describe("LoginInput component", () => {
  it("should handle username typing correctly", async () => {
    // Arrange
    await act(async () => render(<LoginInput login={() => {}} />));
    const usernameInput = await screen.getByPlaceholderText("Username");

    // Action
    await act(async () =>
      userEvent.type(usernameInput, "usernametest input hahaha")
    );

    // Assert
    expect(usernameInput).toHaveValue("usernametest input hahaha");
  });

  it("should handle password typing correctly", async () => {
    // Arrange
    await act(async () => render(<LoginInput login={() => {}} />));
    const passwordInput = await screen.getByPlaceholderText("Password");

    // Action
    await act(async () =>
      userEvent.type(passwordInput, "passwordtest input hahaha")
    );

    // Assert
    expect(passwordInput).toHaveValue("passwordtest input hahaha");
  });

  it("should call login function when login button is clicked", async () => {
    // Arrange
    const mockLogin = jest.fn();
    await act(async () => render(<LoginInput login={mockLogin} />));
    const usernameInput = screen.getByPlaceholderText("Username");
    await act(async () => userEvent.type(usernameInput, "usernametest"));
    const passwordInput = screen.getByPlaceholderText("Password");
    await act(async () => userEvent.type(passwordInput, "passwordtest"));
    const loginButton = screen.getByRole("button", { name: "Login" });

    // Action
    await act(async () => userEvent.click(loginButton));

    // Assert
    expect(mockLogin).toBeCalledWith({
      id: "usernametest",
      password: "passwordtest",
    });
  });
});
