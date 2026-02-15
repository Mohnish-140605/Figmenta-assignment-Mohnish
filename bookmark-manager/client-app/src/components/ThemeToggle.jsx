import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ darkMode, toggleTheme }) => {
    return (
        <button
            onClick={toggleTheme}
            className={`relative p-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-blue-100 hover:bg-blue-200'
                }`}
            aria-label="Toggle Dark Mode"
        >
            <div className="relative w-6 h-6">
                <motion.div
                    initial={false}
                    animate={{ scale: darkMode ? 0 : 1, rotate: darkMode ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center text-yellow-500"
                >
                    <Sun size={20} />
                </motion.div>
                <motion.div
                    initial={false}
                    animate={{ scale: darkMode ? 1 : 0, rotate: darkMode ? 0 : -90 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center text-blue-300"
                >
                    <Moon size={20} />
                </motion.div>
            </div>
        </button>
    );
};

export default ThemeToggle;
