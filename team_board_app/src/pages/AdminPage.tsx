import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminNavbar from "../components/AdminSettings/adminNavbar";
import SettingsTeams from "../components/AdminSettings/settingsTeams";
import SettingsProjects from "../components/AdminSettings/settingsProjects";
import SettingsTasks from "../components/AdminSettings/settingsTasks";
import SettingsUsers from "../components/AdminSettings/settingsUsers";

const AdminPage: React.FC = () => {
  return (
    <>
      <AdminNavbar />
      <Routes>
        <Route path="teams" element={<SettingsTeams />} />
        <Route path="projects" element={<SettingsProjects />} />
        <Route path="tasks" element={<SettingsTasks />} />
        <Route path="users" element={<SettingsUsers/>} />
      </Routes>
    </>
  );
};

export default AdminPage;
