import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LeaderboardsPage from "./pages/LeaderboardsPage";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { asyncUnsetAuthUser } from "./states/authUser/action";
import Loading from "./components/Loading";
import NotFoundPage from "./pages/NotFoundPage";
import AddPage from "./pages/AddPage";

function App() {
  const { authUser = null, isPreload = false } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <header>
          <Header />
        </header>
        <Loading />
        <main className="mt-20 bg-white lg:bg-slate-100 lg:min-h-screen">
          <div className="w-full">
            <div className="lg:bg-white lg:max-w-2xl xl:max-w-3xl mx-auto min-h-screen">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/threads/:id" element={<DetailPage />} />
                <Route path="/leaderboards" element={<LeaderboardsPage />} />
                <Route path="/*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </div>
        </main>
        <footer>
          <Navbar authUser={authUser} onLogout={onLogout} />
        </footer>
      </>
    );
  }

  return (
    <>
      <header>
        <Header />
      </header>
      <Loading />
      <main className="mt-20 bg-white lg:bg-slate-100 lg:min-h-screen">
        <div className="w-full">
          <div className="lg:bg-white lg:max-w-2xl xl:max-w-3xl mx-auto min-h-screen">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/threads/:id" element={<DetailPage />} />
              <Route path="/leaderboards" element={<LeaderboardsPage />} />
              <Route path="/new" element={<AddPage />} />
              <Route path="/*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </main>
      <footer>
        <Navbar authUser={authUser} onLogout={onLogout} />
      </footer>
    </>
  );
}

export default App;
