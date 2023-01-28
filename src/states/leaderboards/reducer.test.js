/**
 * Test scenario for leaderboardsReducer
 *
 *  - leaderboardsReducer function
 *      - should return the initial state when given by unknown action
 *      - should return the leaderboards when given by RECEIVE_LEADERBOARDS action
 */

import leaderboardsReducer from "./reducer";

describe("leaderboardsReducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    // Arrange
    const initialState = [];
    const action = {
      type: "unknown",
    };

    // Action
    const nextState = leaderboardsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it("should return the leaderboards when given by RECEIVE_LEADERBOARDS action", () => {
    // Arrange
    const initialState = [];
    const action = {
      type: "RECEIVE_LEADERBOARDS",
      payload: {
        leaderboards: [
          {
            user: {
              id: "users-1",
              name: "John Doe",
              email: "john@example.com",
              avatar: "https://generated-image-url.jpg",
            },
            score: 10,
          },
          {
            user: {
              id: "users-2",
              name: "Jane Doe",
              email: "jane@example.com",
              avatar: "https://generated-image-url.jpg",
            },
            score: 5,
          },
        ],
      },
    };

    // Action
    const nextState = leaderboardsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(action.payload.leaderboards);
  });
});
