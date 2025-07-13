// Theme type definitions

export type ThemeName = 'light' | 'dark' | 'system'

export interface Theme {
  name: ThemeName
  displayName: string
  isDark: boolean
  colors: Record<string, never> // Empty - colors defined in SCSS
}

export interface ThemeContextValue {
  theme: ThemeName
  setTheme: (theme: ThemeName) => void
  themes: Theme[]
  systemTheme: 'light' | 'dark'
  isSystemTheme: boolean
  toggleTheme: () => void
  registerTheme: (theme: Theme) => void
  unregisterTheme: (themeName: string) => void
}

export interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: ThemeName
  storageKey?: string
  disableTransitionOnChange?: boolean
}
