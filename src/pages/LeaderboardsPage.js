import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeaderboardItem from "../components/LeaderboardItem";
import { asyncReceiveLeaderboards } from "../states/leaderboards/action";

const LeaderboardsPage = () => {
  const { leaderboards = [] } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <div className="container px-8 w-full">
      <h2 className="text-2xl text-navy font-semibold mb-6 pt-3">
        Klasmen Pengguna Aktif
      </h2>
      <div className="flex justify-between items-center mb-3">
        <p className="text-lg">Pengguna</p>
        <p className="text-lg">Skor</p>
      </div>
      <div>
        {leaderboards.map((leaderboard) => (
          <LeaderboardItem
            {...leaderboard.user}
            score={leaderboard.score}
            key={leaderboard.user.id}
          />
        ))}
      </div>
    </div>
  );
};

export default LeaderboardsPage;
