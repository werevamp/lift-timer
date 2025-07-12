import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { ThemeContextValue, ThemeProviderProps, Theme, ThemeName } from '../types/theme.types'

// Simplified themes - colors are defined in SCSS
const BUILT_IN_THEMES: Theme[] = [
  {
    name: 'light',
    displayName: 'Light',
    isDark: false,
    colors: {} as any, // Colors defined in SCSS
  },
  {
    name: 'dark',
    displayName: 'Dark',
    isDark: true,
    colors: {} as any, // Colors defined in SCSS
  },
  {
    name: 'system',
    displayName: 'System',
    isDark: false,
    colors: {} as any, // Colors defined in SCSS
  },
]

// Create context
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeName>(defaultTheme)
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light')
  const [themes] = useState<Theme[]>(BUILT_IN_THEMES)

  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    // Set initial value
    handleChange(mediaQuery)

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Load theme from storage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey) as ThemeName
    if (savedTheme) {
      setThemeState(savedTheme)
    }
  }, [storageKey])

  // Apply theme to DOM
  useEffect(() => {
    const root = document.documentElement
    const actualTheme = theme === 'system' ? systemTheme : theme

    // Prevent transitions on initial load
    if (disableTransitionOnChange) {
      root.classList.add('no-transitions')
    }

    // Apply theme
    root.setAttribute('data-theme', actualTheme)
    root.style.colorScheme = actualTheme

    // Re-enable transitions after a frame
    if (disableTransitionOnChange) {
      requestAnimationFrame(() => {
        root.classList.remove('no-transitions')
      })
    }
  }, [theme, systemTheme, disableTransitionOnChange])

  const setTheme = useCallback(
    (newTheme: ThemeName) => {
      setThemeState(newTheme)
      localStorage.setItem(storageKey, newTheme)
    },
    [storageKey]
  )

  const toggleTheme = useCallback(() => {
    const actualTheme = theme === 'system' ? systemTheme : theme
    const newTheme = actualTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }, [theme, systemTheme, setTheme])

  const registerTheme = useCallback((newTheme: Theme) => {
    console.warn('Custom themes not supported in simplified version - define themes in SCSS')
  }, [])

  const unregisterTheme = useCallback((themeName: string) => {
    console.warn('Theme unregistration not supported in simplified version')
  }, [])

  const isSystemTheme = theme === 'system'

  const value: ThemeContextValue = {
    theme,
    setTheme,
    themes,
    systemTheme,
    isSystemTheme,
    toggleTheme,
    registerTheme,
    unregisterTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useThemeContext() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}