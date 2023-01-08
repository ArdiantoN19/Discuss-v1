/* eslint-disable consistent-return */

// const checkUpVoteThreadByUser = (store) => {
//   return (next) => (action) => {
//     if (action.type === "TOGGLE_UPVOTE_THREAD") {
//       const { threads } = store.getState();
//       const threadSelected = threads.find(
//         (thread) => thread.id === action.payload.threadId
//       );

//       const { downVotesBy } = threadSelected;
//       console.log(threadSelected.upVotesBy);
//       console.log(downVotesBy);

//       if (downVotesBy.includes(action.payload.userId)) {
//         downVotesBy.filter((id) => id !== action.type.userId);
//       }
//     }
//     return next(action);
//   };
// };

// const checkDownVoteThreadByUser = (store) => {
//   return (next) => (action) => {
//     if (action.type === "TOGGLE_DOWNVOTE_THREAD") {
//       const { threads } = store.getState();
//       const threadSelected = threads.find(
//         (thread) => thread.id === action.payload.threadId
//       );
//       const { upVotesBy } = threadSelected;
//       upVotesBy.filter((id) => id !== action.type.userId);
//     }
//     return next(action);
//   };
// };

const thunk = (store) => {
  return (next) => (action) => {
    if (typeof action === "function") {
      return action(store.dispatch, store.getState);
    }
    return next(action);
  };
};

export { thunk };
