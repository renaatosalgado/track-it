import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../css/reset.css";
import Habits from "./Habits";
import HabitsToday from "./HabitsToday";
import History from "./History";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import UserContext from "../contexts/UserContext";
import DailyProgressContext from "../contexts/DailyProgressContext";

export default function App() {
  const [user, setUser] = useState(null);
  const [dailyProgress, setDailyProgress] = useState(0);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
        </Routes>
        <DailyProgressContext.Provider
          value={{ dailyProgress, setDailyProgress }}
        >
          <Routes>
            <Route path="/habits" element={<Habits />} />
            <Route path="/today" element={<HabitsToday />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </DailyProgressContext.Provider>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
