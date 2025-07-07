// Theme type definitions

export type ThemeName = 'light' | 'dark' | 'high-contrast' | 'system' | string;

export interface Theme {
  name: ThemeName;
  displayName: string;
  colors: ThemeColors;
  isDark: boolean;
}

export interface ThemeColors {
  // Primary colors
  primary: string;
  primaryLight: string;
  primaryDark: string;
  
  // Secondary colors
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  
  // Tertiary color
  tertiary: string;
  
  // Background and surface
  background: string;
  backgroundSecondary: string;
  surface: string;
  surfaceVariant: string;
  
  // Text colors
  text: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;
  
  // Border colors
  border: string;
  borderLight: string;
  
  // State colors
  success: string;
  warning: string;
  danger: string;
}

export interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  themes: Theme[];
  systemTheme: 'light' | 'dark';
  isSystemTheme: boolean;
  toggleTheme: () => void;
  registerTheme: (theme: Theme) => void;
  unregisterTheme: (themeName: string) => void;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeName;
  storageKey?: string;
  disableTransitionOnChange?: boolean;
}

export interface CustomThemeConfig {
  name: string;
  displayName: string;
  colors: Partial<ThemeColors>;
  extends?: ThemeName;
}