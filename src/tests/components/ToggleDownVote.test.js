/**
 * Scenario test
 *
 *  - ToggleDownVote component
 *   - should render total downvote correctly
 *   - should render icon downVote correctly
 *   - should render icon downvoteFill when user voted
 *   - should render icon downVote when user unvoted
 */

import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";
import ToggleDownVote from "../../components/ToggleDownVote";

const toggleProps = {
  isVote: false,
  votesBy: ["users-1", "users-2", "users-3"],
};

describe("ToggleDownVote component", () => {
  it("should render total downvote correctly", async () => {
    // Arrange
    render(
      <ToggleDownVote
        downVoteHandler={() => {}}
        isThreadDownVote={toggleProps.isVote}
        downVotesBy={toggleProps.votesBy}
      />
    );

    // Action
    const toggleDownVote = await screen.getByTitle("downVote");

    // Assert
    expect(toggleDownVote).toHaveTextContent(toggleProps.votesBy.length);
  });

  it("should render icon downvote correctly", async () => {
    // Arrange
    render(
      <ToggleDownVote
        downVoteHandler={() => {}}
        isThreadDownVote={toggleProps.isVote}
        downVotesBy={toggleProps.votesBy}
      />
    );

    // Action
    const toggleDownVote = await screen.getByTitle("downVote");
    const svgElement = toggleDownVote.firstChild;

    // Assert
    expect(svgElement).toHaveAttribute("name", "downVote");
  });

  it("should render icon downVoteFill when user voted", async () => {
    // Arrange
    const downVoteHandler = jest.fn().mockImplementation(() => {
      toggleProps.isVote = true;
    });

    const { rerender } = render(
      <ToggleDownVote
        downVoteHandler={downVoteHandler}
        isThreadDownVote={toggleProps.isVote}
        downVotesBy={toggleProps.votesBy}
      />
    );

    const toggleDownVote = await screen.getByTitle("downVote");

    // Action
    await userEvent.click(toggleDownVote);

    rerender(
      <ToggleDownVote
        downVoteHandler={downVoteHandler}
        isThreadDownVote={toggleProps.isVote}
        downVotesBy={toggleProps.votesBy}
      />
    );

    const svgElement = toggleDownVote.firstChild;

    // Assert
    expect(downVoteHandler).toBeCalledTimes(1);
    expect(svgElement).toHaveAttribute("name", "downVoteFill");
  });

  it("should render icon downVote when user unvoted", async () => {
    // Arrange
    const downVoteHandler = jest.fn().mockImplementation(() => {
      toggleProps.isVote = false;
    });

    const { rerender } = render(
      <ToggleDownVote
        downVoteHandler={downVoteHandler}
        isThreadDownVote
        downVotesBy={toggleProps.votesBy}
      />
    );

    const toggleDownVote = await screen.getByTitle("downVote");

    // Action
    await userEvent.click(toggleDownVote);

    rerender(
      <ToggleDownVote
        downVoteHandler={downVoteHandler}
        isThreadDownVote={toggleProps.isVote}
        downVotesBy={toggleProps.votesBy}
      />
    );

    const svgElement = toggleDownVote.firstChild;

    // Assert
    expect(downVoteHandler).toBeCalledTimes(1);
    expect(svgElement).toHaveAttribute("name", "downVote");
  });
});
