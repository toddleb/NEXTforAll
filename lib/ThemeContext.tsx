// lib/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { chakraThemes } from '@/theme';
import { ThemeId } from '@/theme/themes';

type ThemeContextType = {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeId>('light');
  
  // Load theme from localStorage on client-side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('star-theme') as ThemeId | null;
      if (storedTheme === 'light' || storedTheme === 'nextDark') {
        setTheme(storedTheme);
      }
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);