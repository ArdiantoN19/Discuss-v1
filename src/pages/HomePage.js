import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Plus } from "../components/icons/Plus";
import ThreadList from "../components/ThreadList";
import { asyncPopulateUsersAndThreads } from "../states/shared/action";
import {
  asyncToggleUpVote,
  asyncToggleDownVote,
} from "../states/threads/action";

const HomePage = () => {
  const {
    threads = [],
    users = [],
    authUser = null,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [category, setCategory] = useState("");

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const handleOnClickUpVoteThread = (id) => {
    dispatch(asyncToggleUpVote(id));
  };

  const handleOnClickDownVoteThread = (id) => {
    dispatch(asyncToggleDownVote(id));
  };

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser?.id,
  }));

  const handleOnClickCategory = (value) => {
    if (category !== value) {
      setCategory(value);
    } else {
      setCategory("");
    }
  };

  const filteredThreadList = threadList.filter((thread) => {
    return thread.category.toLowerCase().includes(category.toLowerCase());
  });

  return (
    <div className="container px-8">
      <div className="mb-10 pt-5">
        <h2 className="text-base mb-3">Kategori popular</h2>
        <div className="flex justify-start items-center flex-wrap gap-2">
          {threadList.map((thread) => (
            <button
              type="button"
              key={thread.id}
              className={`border border-navy py-1 px-3 rounded ${
                category === thread.category ? "bg-secondary" : ""
              }`}
              onClick={({ target: { value } }) => handleOnClickCategory(value)}
              value={thread.category}
            >
              #{thread.category}
            </button>
          ))}
        </div>
      </div>
      <div className="pb-20">
        <h2 className="mb-5 font-semibold text-2xl">Diskusi tersedia</h2>
        {category === "" ? (
          <ThreadList
            threads={threadList}
            upVote={handleOnClickUpVoteThread}
            downVote={handleOnClickDownVoteThread}
          />
        ) : (
          <ThreadList
            threads={filteredThreadList}
            upVote={handleOnClickUpVoteThread}
            downVote={handleOnClickDownVoteThread}
          />
        )}
      </div>
      {authUser !== null ? (
        <Link
          to={"/new"}
          className="fixed bottom-24 right-7 lg:right-52 xl:right-[26rem]"
        >
          <div className="border py-2 px-[.60rem] rounded-full bg-navy text-white">
            <Plus />
          </div>
        </Link>
      ) : null}
    </div>
  );
};

export default HomePage;
