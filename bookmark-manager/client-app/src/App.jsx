import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RetroLoader from './components/RetroLoader';
import RetroCursor from './components/RetroCursor';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const auth = localStorage.getItem('isAuthenticated');
        setIsAuthenticated(!!auth);
    }, []);

    // Dark Mode Effect
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const handleLogin = () => {
        localStorage.setItem('isAuthenticated', 'true');
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        setIsAuthenticated(false);
    };

    const toggleTheme = () => setDarkMode(!darkMode);

    if (initialLoad) {
        return <RetroLoader onComplete={() => setInitialLoad(false)} />;
    }

    return (
        <Router>
            <RetroCursor />
            <Routes>
                <Route
                    path="/login"
                    element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />}
                />
                <Route
                    path="/signup"
                    element={!isAuthenticated ? <Signup onLogin={handleLogin} /> : <Navigate to="/" />}
                />
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <Dashboard
                                darkMode={darkMode}
                                toggleTheme={toggleTheme}
                                onLogout={handleLogout}
                            />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
