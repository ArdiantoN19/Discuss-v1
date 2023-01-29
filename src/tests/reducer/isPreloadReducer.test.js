/**
 * Scenario isPreloadReducer
 *
 *  - isPreloadReducer function
 *   - should return initialState when given by unknown action
 *   - should return isPreload when given by SET_IS_PRELOAD
 */

import isPreloadReducer from "../../states/isPreload/reducer";

describe("isPreloadReducer function", () => {
  it("should return initialState when given by unknown action", () => {
    // Arrange
    const initialState = true;
    const action = {
      type: "unknown",
    };

    // Action
    const nextState = isPreloadReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it("should return isPreload when given by SET_IS_PRELOAD", () => {
    // Arrange
    const initialState = true;
    const action = {
      type: "SET_IS_PRELOAD",
      payload: {
        isPreload: false,
      },
    };

    // Action
    const nextState = isPreloadReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(action.payload.isPreload);
  });
});
