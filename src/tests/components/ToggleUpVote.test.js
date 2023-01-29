/**
 * Scenario test
 *
 *  - ToggleUpVote component
 *   - should render total upvote correctly
 *   - should render icon upVote correctly
 *   - should render icon upVoteFill when user voted
 *   - should render icon upVote when user unvoted
 */

import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";
import ToggleUpVote from "../../components/ToggleUpVote";

const toggleProps = {
  isVote: false,
  VotesBy: ["users-1", "users-2", "users-3"],
};

describe("ToggleUpVote component", () => {
  it("should render total upvote correctly", async () => {
    // Arrange
    render(
      <ToggleUpVote
        upVoteHandler={() => {}}
        isThreadUpVote={toggleProps.isVote}
        upVotesBy={toggleProps.VotesBy}
      />
    );

    // Action
    const toggleUpVote = await screen.getByTitle("upVote");

    // Assert
    expect(toggleUpVote).toHaveTextContent(toggleProps.VotesBy.length);
  });

  it("should render icon upVote correctly ", async () => {
    // Arrange
    render(
      <ToggleUpVote
        upVoteHandler={() => {}}
        isThreadUpVote={toggleProps.isVote}
        upVotesBy={toggleProps.VotesBy}
      />
    );

    // Action
    const toggleUpVote = await screen.getByTitle("upVote");
    const svgElement = toggleUpVote.firstChild;

    // Assert
    expect(svgElement).toHaveAttribute("name", "upVote");
  });

  it("should render icon upVoteFill when user voted ", async () => {
    const upVoteHandler = jest.fn().mockImplementation(() => {
      toggleProps.isVote = true;
    });

    const { rerender } = render(
      <ToggleUpVote
        upVoteHandler={upVoteHandler}
        isThreadUpVote={toggleProps.isVote}
        upVotesBy={toggleProps.VotesBy}
      />
    );

    const toggleUpVote = await screen.getByTitle("upVote");

    // Action
    await userEvent.click(toggleUpVote);

    rerender(
      <ToggleUpVote
        upVoteHandler={upVoteHandler}
        isThreadUpVote={toggleProps.isVote}
        upVotesBy={toggleProps.VotesBy}
      />
    );

    const svgElement = toggleUpVote.firstChild;

    // Assert
    expect(upVoteHandler).toBeCalledTimes(1);
    expect(svgElement).toHaveAttribute("name", "upVoteFill");
  });

  it("should render icon upVote when user unvoted ", async () => {
    const upVoteHandler = jest.fn().mockImplementation(() => {
      toggleProps.isVote = false;
    });

    const { rerender } = render(
      <ToggleUpVote
        upVoteHandler={upVoteHandler}
        isThreadUpVote
        upVotesBy={toggleProps.VotesBy}
      />
    );

    const toggleUpVote = await screen.getByTitle("upVote");

    // Action
    await userEvent.click(toggleUpVote);

    rerender(
      <ToggleUpVote
        upVoteHandler={upVoteHandler}
        isThreadUpVote={toggleProps.isVote}
        upVotesBy={toggleProps.VotesBy}
      />
    );

    const svgElement = toggleUpVote.firstChild;

    // Assert
    expect(upVoteHandler).toBeCalledTimes(1);
    expect(svgElement).toHaveAttribute("name", "upVote");
  });
});
