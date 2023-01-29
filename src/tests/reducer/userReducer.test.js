/**
 * Scenario userReducer
 *
 *  - userReducer function
 *   - should return initialState when given by unknown action
 *   - should return users when given by RECEIVE_USERS action
 */

import usersReducer from "../../states/users/reducer";

describe("userReducer function", () => {
  it("should return initialState when given by unknown action", () => {
    // Arrange
    const initialState = [];
    const action = { type: "unknown" };

    // Action
    const nextState = usersReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it("should return users when given by RECEIVE_USERS action", () => {
    // Arrange
    const initialState = [];
    const action = {
      type: "RECEIVE_USERS",
      payload: {
        users: [
          {
            id: "john_doe",
            name: "John Doe",
            email: "john@example.com",
            avatar: "https://generated-image-url.jpg",
          },
          {
            id: "jane_doe",
            name: "Jane Doe",
            email: "jane@example.com",
            avatar: "https://generated-image-url.jpg",
          },
        ],
      },
    };

    // Action
    const nextState = usersReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(action.payload.users);
  });
});
