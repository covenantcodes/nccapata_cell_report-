// import { useState } from 'react'
import "./App.css";
import Login from "./auth/Login";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";

const App = () => {
  return (
    <div>
      <Routes>
          <Route path="/src/auth/Login.tsx" Component={<Login/>}/>
          <Route path="/src/Dashboard/Dashboard.tsx" Component={<Dashboard/>}/>
      </Routes>
    </div>
    // <Login />
  );
};

export default App;
