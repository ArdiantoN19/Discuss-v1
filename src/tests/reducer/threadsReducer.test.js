/**
 * Test scenario for threadsReducer
 *
 *  - threadsReducer function
 *      - should return the initial state when given by unknown action
 *      - should return the threads when given by RECEIVE_THREADS action
 *      - should return the threads with new thread when given by ADD_THREAD action
 *      - sholud return the threads with the toggle upvote thread when given by TOGGLE_UPVOTE_THREAD action
 *      - sholud return the threads with the toggle downvote thread when given by TOGGLE_DOWN_THREAD action
 */

import threadsReducer from "../../states/threads/reducer";

describe("threadsReducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    // Arrange
    const initialState = [];
    const action = { type: "unknown" };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it("should be return the threads when given by RECEIVE_THEADS action", () => {
    // Arrange
    const initialState = [];
    const action = {
      type: "RECEIVE_THREADS",
      payload: {
        threads: [
          {
            id: "thread-1",
            title: "Thread pertama",
            body: "Ini adalah thread pertama",
            category: "General",
            createdAt: "2021-06-21T07:00:00.000Z",
            ownerId: "users-1",
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
          {
            id: "thread-2",
            title: "Thread kedua",
            body: "Ini adalah thread kedua",
            category: "Redux",
            createdAt: "2021-06-21T07:00:00.000Z",
            ownerId: "users-2",
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it("should be return the threads with new thread when given by ADD_THREAD action", () => {
    // Arrange
    const initialState = [
      {
        id: "thread-1",
        title: "Thread pertama",
        body: "Ini adalah thread pertama",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "users-1",
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: "ADD_THREAD",
      payload: {
        thread: {
          id: "thread-2",
          title: "Thread kedua",
          body: "Ini adalah thread kedua",
          category: "Redux",
          createdAt: "2021-06-21T07:00:00.000Z",
          ownerId: "users-2",
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it("sholud return the threads with the toggle upvote thread when given by TOGGLE_UPVOTE_THREAD action", () => {
    // Arrange
    const initialState = [
      {
        id: "thread-1",
        title: "Thread pertama",
        body: "Ini adalah thread pertama",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "users-1",
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: "TOGGLE_UPVOTE_THREAD",
      payload: {
        threadId: "thread-1",
        userId: "users-1",
      },
    };

    // Action toggle upvote
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [...initialState[0].upVotesBy, action.payload.userId],
      },
    ]);

    // Action toggle disupvote
    const nextState2 = threadsReducer(nextState, action);

    // Assert
    expect(nextState2).toEqual(initialState);
  });

  it("should return the threads with the toggle downvote thread when given by TOGGLE_DOWNVOTE_THERAD action", () => {
    // Arrange
    const initialState = [
      {
        id: "thread-1",
        title: "Thread pertama",
        body: "Ini adalah thread pertama",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "users-1",
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: "TOGGLE_DOWNVOTE_THREAD",
      payload: {
        threadId: "thread-1",
        userId: "users-1",
      },
    };

    // Action upvote thread
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        downVotesBy: [...initialState[0].downVotesBy, action.payload.userId],
      },
    ]);

    // Action disdownvote
    const nextState2 = threadsReducer(nextState, action);

    // Assert
    expect(nextState2).toEqual(initialState);
  });
});
