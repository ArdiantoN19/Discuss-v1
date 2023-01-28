/**
 * Skenario test
 *
 *  - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register  function when register button is clicked
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterInput from "./RegisterInput";

import "@testing-library/jest-dom";

describe("RegisterInput component", () => {
  it("should handle name typing correctly", async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const nameInput = await screen.getByPlaceholderText("Name");

    // Action
    await userEvent.type(nameInput, "nameTest");

    // Assert
    expect(nameInput).toHaveValue("nameTest");
  });

  it("should handle email typing correctly", async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const emailInput = await screen.getByPlaceholderText("Email");

    // Action
    await userEvent.type(emailInput, "emailTest");

    // Assert
    expect(emailInput).toHaveValue("emailTest");
  });

  it("should handle password typing correctly", async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText("Password");

    // Action
    await userEvent.type(passwordInput, "passwordTest");

    // Assert
    expect(passwordInput).toHaveValue("passwordTest");
  });

  it("should call register function when register button is clicked", async () => {
    // Arrange
    const mockRegister = jest.fn();
    render(<RegisterInput register={mockRegister} />);

    const nameInput = await screen.getByPlaceholderText("Name");
    await userEvent.type(nameInput, "nameTest");

    const emailInput = await screen.getByPlaceholderText("Email");
    await userEvent.type(emailInput, "emailTest");

    const passwordInput = await screen.getByPlaceholderText("Password");
    await userEvent.type(passwordInput, "passwordTest");

    const registerButton = await screen.getByText("Register");

    // Action
    await userEvent.click(registerButton);

    // Assert
    expect(mockRegister).toBeCalledWith({
      name: "nameTest",
      email: "emailTest",
      password: "passwordTest",
    });
  });
});
