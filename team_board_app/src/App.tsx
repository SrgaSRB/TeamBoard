import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
//import UserPage from './pages/UserPage';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/admin/*" element={<AdminPage />} />
            {/* Add other routes here */}
        </Routes>
    );
};

export default App;