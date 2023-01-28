/**
 * Scenario test
 *
 *  - asyncPreloadProcess thunk function
 *   - should dispatch action correctly when data fetching success
 *   - should dispatch action correctly when data fetching failed
 */

import { showLoading, hideLoading } from "react-redux-loading-bar";
import { setAuthUserActionCreator } from "../../states/authUser/action";
import {
  asyncPreloadProcess,
  setIsPreloadActionCreator,
} from "../../states/isPreload/action";
import api from "../../utils/api";

const fakeAuthUserResponse = {
  id: "users-1",
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://generated-image-url.jpg",
};

const fakeErrorResponse = null;

describe("asyncPreloadProcess thunk function", () => {
  beforeEach(() => {
    api._getOwnProfile = api.getOwnProfile;
  });
  afterEach(() => {
    api._getOwnProfile = api.getOwnProfile;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    // Arrange
    api.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse);

    const dispatch = jest.fn();

    // Action
    await asyncPreloadProcess()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeAuthUserResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action correctly when data fetching failed", async () => {
    // Arrange
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);

    const dispatch = jest.fn();

    // Action
    await asyncPreloadProcess()(dispatch);

    // Asssert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeErrorResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
