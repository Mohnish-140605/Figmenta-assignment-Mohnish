import React from 'react';
import { Search } from 'lucide-react'; // Assuming lucide-react for the Search icon

function SearchBar({ value, onChange }) {
    return (
        <div className="relative w-full md:w-96 group">
            <Search className="absolute left-3 top-2.5 text-slate-400 group-focus-within:text-red-500 transition" size={18} />
            <input
                type="text"
                placeholder="SEARCH FOR IMAGINATION..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-slate-300 rounded-sm focus:outline-none focus:border-red-500 bg-white dark:bg-slate-900 dark:border-slate-600 dark:text-slate-50 dark:placeholder-slate-500 font-mono text-sm uppercase tracking-wider transition-colors"
            />
        </div>
    );
}

export default SearchBar;
