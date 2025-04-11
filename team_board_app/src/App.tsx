import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/admin/*" element={
                <ProtectedRoute>
                    <AdminPage />
                </ProtectedRoute>
            } />

            <Route path="/*" element={
                <ProtectedRoute>
                    <UserPage />
                </ProtectedRoute>
            } />
            
        </Routes>
    );
};

export default App;