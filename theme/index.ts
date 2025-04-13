// theme/index.ts
import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { THEMES } from './themes';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const lightColors = {
  brand: {
    primary: THEMES.light.accentColor,
    secondary: THEMES.light.accentSecondary,
  },
};

const darkColors = {
  brand: {
    primary: THEMES.nextDark.accentColor,
    secondary: THEMES.nextDark.accentSecondary,
  },
};

export const chakraThemes = {
  light: extendTheme({
    config,
    colors: lightColors,
    styles: {
      global: {
        body: {
          bg: THEMES.light.bg,
          color: THEMES.light.textColor,
        },
      },
    },
    fonts: {
      heading: THEMES.light.headingFont,
      body: THEMES.light.bodyFont,
    },
  }),

  nextDark: extendTheme({
    config: { ...config, initialColorMode: 'nextDark' },
    colors: darkColors,
    styles: {
      global: {
        body: {
          bg: THEMES.nextDark.bg,
          color: THEMES.nextDark.textColor,
        },
      },
    },
    fonts: {
      heading: THEMES.nextDark.headingFont,
      body: THEMES.nextDark.bodyFont,
    },
  }),
};

// ✅ This allows _document.tsx to import initial theme config safely
export const defaultTheme = chakraThemes.light;