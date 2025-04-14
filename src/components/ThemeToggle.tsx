
import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  // On mount, check if the user has a theme preference in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    // Default to light theme unless user has explicitly saved dark preference
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <button 
      onClick={toggleTheme}
      className="theme-toggle fixed bottom-4 left-4 bg-white dark:bg-[#1E1E1F] p-2 rounded-full shadow-lg hover:scale-105 transition-transform"
      aria-label="Toggle theme"
    >
      {isDark ? 
        <Sun size={20} className="text-[#D84B16] bg-transparent" /> : 
        <Moon size={20} className="text-[#D84B16] bg-transparent" />
      }
    </button>
  );
};
