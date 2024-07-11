import React, { useState, useEffect } from "react";
import { initBrevoTracker } from "./lib/trackerBrevo";
import "./styles/App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import About from "./pages/About";

const App: React.FC = () => {
  const [title, setTitle] = useState("");
  useEffect(() => {
    initBrevoTracker();
  }, []);
  return (
    <Router>
      <div className="templateRow">
        <div className="columnOne">
          <Sidebar onChangeSideBar={(title: string) => setTitle(title)} />
        </div>
        <div className="templateColumn">
          <Header title={title} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/about/" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
