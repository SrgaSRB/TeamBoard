import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import Teams from "../components/Teams";
import Projects from "../components/Projects";
import Tasks from "../components/Tasks";


const AdminPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="teams" element={<Teams/>} />
        <Route path="projects" element={<Projects />} />
        <Route path="tasks" element={<Tasks />} />
      </Routes>
    </>
  );
};

export default AdminPage;
