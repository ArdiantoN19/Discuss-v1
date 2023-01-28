/**
 * Skenario test
 *
 *  - asyncReceiveLeaderboards thunk function
 *   - should dispatch action correctly when data fetching success
 *   - should dispatch action and call alert correctly when data fetcing failed
 */

import { showLoading, hideLoading } from "react-redux-loading-bar";
import {
  asyncReceiveLeaderboards,
  receiveLeaderboardsActionCreator,
} from "./action";
import api from "../../utils/api";

const fakeLeaderboardsResponse = [
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
];

const fakeErrorResponse = new Error("Ups, something went wrong");

describe("asyncLeaderboards thunk function", () => {
  beforeEach(() => {
    api._getLeaderboards = api.getLeaderBoards;
  });

  afterEach(() => {
    api._getLeaderboards = api.getLeaderBoards;
  });

  it("should dispatch action correctly when data fetching success ", async () => {
    // Arrange
    api.getLeaderBoards = () => Promise.resolve(fakeLeaderboardsResponse);

    const dispatch = jest.fn();

    // Action
    await asyncReceiveLeaderboards()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveLeaderboardsActionCreator(fakeLeaderboardsResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and alert correctly when data fetching failed", async () => {
    // Arrange
    api.getLeaderBoards = () => Promise.reject(fakeErrorResponse);

    const dispatch = jest.fn();

    window.alert = jest.fn();

    // Action
    await asyncReceiveLeaderboards()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
