/**
 * Skenario testing
 *
 *  - AddThread component
 *   - should handle title typing correctly
 *   - should handle category typing correctly
 *   - should handle body typing correctly
 *   - should call addThread function when buat button is clicked
 */

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddThread from "./AddThread";

import "@testing-library/jest-dom";

describe("AddThread component", () => {
  it("should handle title typing correctly", async () => {
    // Arrange
    render(<AddThread addThread={() => {}} />);
    const titleInput = await screen.getByPlaceholderText("Judul");

    // Action
    await userEvent.type(titleInput, "judulTest");

    // Assert
    expect(titleInput).toHaveValue("judulTest");
  });

  it("should handle category typing correctly", async () => {
    // Arrange
    render(<AddThread addThread={() => {}} />);
    const categoryInput = await screen.getByPlaceholderText("Kategori");

    // Action
    await userEvent.type(categoryInput, "kategoriTest");

    // Assert
    expect(categoryInput).toHaveValue("kategoriTest");
  });

  it("should handle body typing correctly", async () => {
    // Arrange
    render(<AddThread addThread={() => {}} />);
    const bodyInput = await screen.getByPlaceholderText(
      "Apa yang kamu pikirkan?"
    );

    // Action
    await userEvent.type(bodyInput, "bodyTest");

    // Assert
    expect(bodyInput).toHaveValue("bodyTest");
  });

  it("should call addThread function when buat button is clicked", async () => {
    // Arrange
    const mockAddThread = jest.fn();
    render(<AddThread addThread={mockAddThread} />);

    const titleInput = await screen.getByPlaceholderText("Judul");
    await userEvent.type(titleInput, "judulTest");

    const categoryInput = await screen.getByPlaceholderText("Kategori");
    await userEvent.type(categoryInput, "kategoriTest");

    const bodyInput = await screen.getByPlaceholderText(
      "Apa yang kamu pikirkan?"
    );
    await userEvent.type(bodyInput, "bodyTest");

    const buatButton = await screen.getByRole("button", { name: "Buat" });

    // Action
    await fireEvent.submit(buatButton);

    // Assert
    expect(mockAddThread).toBeCalledWith({
      title: "judulTest",
      category: "kategoriTest",
      body: "bodyTest",
    });
  });
});
