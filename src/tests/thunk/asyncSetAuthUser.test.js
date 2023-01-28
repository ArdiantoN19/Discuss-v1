/**
 * Scenario test
 *
 *  - asyncSetAuthUser thunk function
 *   - should dispatch action correctly when data fetching success
 *   - should dispatch action and call alert correctly when data fethcing failed
 */

import { showLoading, hideLoading } from "react-redux-loading-bar";
import {
  asyncSetAuthUser,
  setAuthUserActionCreator,
} from "../../states/authUser/action";
import api from "../../utils/api";

const fakeTokenResponse = "23#dasjkndknqw!@dsanjkdwliy";

const fakeAuthUserResponse = {
  id: "users-1",
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://generated-image-url.jpg",
};

const fakeErrorResponse = new Error("Ups, something went wrong");

describe("asyncSetAuthUser thunk function", () => {
  beforeEach(() => {
    api._login = api.login;
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api._login = api.login;
    api._getOwnProfile = api.getOwnProfile;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    // Arrange
    api.login = () => Promise.resolve(fakeTokenResponse);
    api.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse);

    const dispatch = jest.fn();

    window.location.href = jest.fn();

    const user = {
      email: "testEmail@test.com",
      password: "testPassword",
    };

    // Action
    await asyncSetAuthUser(user)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeAuthUserResponse)
    );
    expect(window.location.href).toEqual("http://localhost/");
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and call alert correctly when data fethcing failed", async () => {
    // Arrange
    api.login = () => Promise.reject(fakeErrorResponse);
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);

    const dispatch = jest.fn();

    window.alert = jest.fn();

    const user = {
      email: "testEmail@test.com",
      password: "testPassword",
    };

    // Action
    await asyncSetAuthUser(user)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
