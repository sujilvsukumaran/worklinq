'use client';

import { useTheme } from '@/context/theme-context';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
    );
}