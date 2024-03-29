/**
 * Scenario testing
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginInput from "../../components/LoginInput";

import "@testing-library/jest-dom";

describe("LoginInput component", () => {
  it("should handle email typing correctly", async () => {
    // Arrange
    render(<LoginInput login={() => {}} />);
    const emailInput = await screen.getByPlaceholderText("Email");

    // Action
    await userEvent.type(emailInput, "emailTest@gmail.com");

    // Assert
    expect(emailInput).toHaveValue("emailTest@gmail.com");
  });

  it("should handle password typing correctly", async () => {
    // Arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText("Password");

    // Action
    await userEvent.type(passwordInput, "passwordTest");

    // Assert
    expect(passwordInput).toHaveValue("passwordTest");
  });

  it("should should call login function when login button is clicked", async () => {
    // Arrange
    const mockLogin = jest.fn();
    render(<LoginInput login={mockLogin} />);

    const emailInput = await screen.getByPlaceholderText("Email");
    await userEvent.type(emailInput, "emailTest@gmail.com");

    const passwordInput = await screen.getByPlaceholderText("Password");
    await userEvent.type(passwordInput, "passwordTest");

    const loginButton = await screen.getByRole("button", { name: "Login" });

    // Action
    await userEvent.click(loginButton);

    // Assert
    expect(mockLogin).toBeCalledWith({
      email: "emailTest@gmail.com",
      password: "passwordTest",
    });
  });
});
