import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import Login from './components/Login';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/*" element={<UserPage />} />
            <Route path="/login" element={<Login />} />
            {/* Add other routes here */}
        </Routes>
    );
};

export default App;