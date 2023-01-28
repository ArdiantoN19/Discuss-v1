/**
 * Tes scenario fro authUserReducer
 *
 *  - authUserReducer function
 *   - should return initialState when given by unknown action
 *   - should return authUser when given by SET_AUTH_USER action
 *   - should clear state when given by UNSET_AUTH_USER
 */

import authUserReducer from "../../states/authUser/reducer";

describe("authUserReducer function", () => {
  it("should return initialState when given by unknown action", () => {
    // Arrange
    const initialState = null;
    const action = { type: "unknown" };

    // Action
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it("should return authUser when given by SET_AUTH_USER action", () => {
    // Arrange
    const initialState = null;
    const authUser = {
      id: "users-1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://generated-image-url.jpg",
    };
    const action = {
      type: "authUser/set",
      payload: {
        authUser,
      },
    };

    // Action
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(action.payload.authUser);
  });

  it("should clear state when given by UNSET_AUTH_USER", () => {
    // Arrange
    const initialState = {
      id: "users-1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://generated-image-url.jpg",
    };
    const action = {
      type: "UNSET_AUTH_USER",
      payload: {
        authUser: null,
      },
    };

    // Action
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(action.payload.authUser);
  });
});
