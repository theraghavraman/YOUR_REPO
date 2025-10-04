import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const preferredTheme = savedTheme || 'dark';
    setTheme(preferredTheme);
    document.documentElement.classList.toggle('light', preferredTheme === 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 transition-all duration-300 neon-border"
      aria-label="Toggle theme"
      data-testid="theme-toggle"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-primary" />
      ) : (
        <Moon className="w-5 h-5 text-secondary" />
      )}
    </button>
  );
};

export default ThemeToggle;
