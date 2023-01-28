/**
 * Skenario test
 *
 *  - asyncAddThread thunk function
 *   - should dispatch action correctly when data fetching success
 *   - should dispatch action and call alert correctly when data fetcing failed
 *
 */

import { showLoading, hideLoading } from "react-redux-loading-bar";
import { asyncAddThread, addThreadActionCreator } from "./action";
import api from "../../utils/api";

const fakeThreadResponse = {
  id: "thread-1",
  title: "Thread Pertama",
  body: "Ini adalah thread pertama",
  category: "General",
  createdAt: "2021-06-21T07:00:00.000Z",
  ownerId: "users-1",
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

const fakeErrorResponse = new Error("Ups, something went wrong");

describe("asyncAddThread thunk function", () => {
  beforeEach(() => {
    api._createThread = api.createThread;
  });

  afterEach(() => {
    api._createThread = api.createThread;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    // Arrange
    api.createThread = () => Promise.resolve(fakeThreadResponse);

    const dispatch = jest.fn();

    const newThread = {
      title: "Thread Pertama",
      body: "Ini adalah thread pertama",
      category: "General",
    };

    // Action
    await asyncAddThread(newThread)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      addThreadActionCreator(fakeThreadResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch and call alert action correctly when data fetching failed", async () => {
    // Arrange
    api.createThread = () => Promise.reject(fakeErrorResponse);

    const dispatch = jest.fn();

    window.alert = jest.fn();

    const newThread = {
      title: "Thread Pertama",
      body: "Ini adalah thread pertama",
      category: "General",
    };

    // Action
    await asyncAddThread(newThread)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
