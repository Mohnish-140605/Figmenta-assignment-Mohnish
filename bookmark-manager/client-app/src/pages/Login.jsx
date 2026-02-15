import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import RetroLoader from '../components/RetroLoader';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock Auth Logic
        if (email && password) {
            setIsLoading(true);
        }
    };

    const handleLoaderComplete = () => {
        onLogin(); // Set authenticated state
        navigate('/');
    };

    if (isLoading) {
        return <RetroLoader onComplete={handleLoaderComplete} />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] p-4 relative overflow-hidden">
            {/* Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900 p-8 rounded-sm shadow-[8px_8px_0_rgba(0,0,0,0.5)] w-full max-w-md border-4 border-slate-700 relative z-20"
            >
                <div className="text-center mb-8 border-b-4 border-slate-800 pb-6">
                    <div className="bg-red-900/30 w-16 h-16 rounded-sm border-2 border-red-600 flex items-center justify-center mx-auto mb-4 text-red-500 shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                        <LogIn size={32} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 font-retro drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                        FIGMENTA ACCESS
                    </h2>
                    <p className="text-slate-500 font-mono text-xs mt-2 uppercase tracking-widest">Enter the Imagination Sector</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-red-500 font-mono uppercase mb-2 tracking-wider">Identity (Email)</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-3 rounded-sm border-2 border-slate-600 bg-slate-800 text-white focus:outline-none focus:border-red-500 focus:shadow-[0_0_10px_rgba(220,38,38,0.3)] transition font-mono placeholder-slate-600"
                            placeholder="NAME@FIGMENTA.COM"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-red-500 font-mono uppercase mb-2 tracking-wider">Access Code</label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-3 rounded-sm border-2 border-slate-600 bg-slate-800 text-white focus:outline-none focus:border-red-500 focus:shadow-[0_0_10px_rgba(220,38,38,0.3)] transition font-mono placeholder-slate-600"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-3 rounded-sm font-bold font-retro uppercase tracking-wider hover:bg-red-700 transition border-b-4 border-red-800 active:border-b-0 active:translate-y-1 active:mt-1 shadow-[0_4px_0_rgba(0,0,0,0.5)]"
                    >
                        Authenticate
                    </button>
                </form>

                <p className="mt-8 text-center text-xs text-slate-500 font-mono uppercase tracking-wide">
                    Future Proof?{' '}
                    <Link to="/signup" className="text-orange-500 font-bold hover:text-orange-400 hover:underline">
                        Join Us
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
