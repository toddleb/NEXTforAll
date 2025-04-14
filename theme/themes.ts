// theme/themes.ts

export const THEMES = {
  light: {
    id: 'light',
    label: 'NEXT Light Theme',
    accentColor: '#6200ee',
    accentSecondary: '#03dac6',
    bg: '#ffffff',
    textColor: '#1a1a1a',
    cardBg: '#f9f9f9',
    headingFont: 'Inter, sans-serif',
    bodyFont: 'Inter, sans-serif',
  },

  nextDark: {
    id: 'nextDark',
    label: 'NEXT Dark Theme',
    accentColor: '#bb86fc',
    accentSecondary: '#03dac6',
    bg: '#0b0f1a',
    textColor: '#ffffff',
    cardBg: '#1c1f2e',
    headingFont: 'Inter, sans-serif',
    bodyFont: 'Inter, sans-serif',
  }
};

export type ThemeId = keyof typeof THEMES;