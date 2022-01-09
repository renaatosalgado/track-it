import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../css/reset.css";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";

import UserContext from "../contexts/UserContext";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="sign-up" element={<SignUpPage />}/>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
