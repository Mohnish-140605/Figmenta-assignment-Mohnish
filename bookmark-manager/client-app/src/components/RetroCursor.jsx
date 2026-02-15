import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const RetroCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('button') || e.target.closest('a')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
            animate={{
                x: mousePosition.x - 16,
                y: mousePosition.y - 16,
                scale: isHovering ? 1.5 : 1,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
            {/* Crosshair Cursor */}
            <div className="relative w-8 h-8">
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-500 transform -translate-y-1/2"></div>
                <div className="absolute left-1/2 top-0 h-full w-[2px] bg-red-500 transform -translate-x-1/2"></div>
                <div className="absolute inset-0 border-2 border-red-500 rounded-full opacity-50"></div>
            </div>
        </motion.div>
    );
};

export default RetroCursor;
