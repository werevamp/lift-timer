import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { ThemeContextValue, ThemeProviderProps, Theme, ThemeName } from '../types/theme.types'

// Default themes
const BUILT_IN_THEMES: Theme[] = [
  {
    name: 'light',
    displayName: 'Light',
    isDark: false,
    colors: {
      primaryHue: 217,
      primarySaturation: '100%',
      primaryLightness: '61%',
      secondaryHue: 192,
      secondarySaturation: '100%',
      secondaryLightness: '62%',
      background: 'hsl(0, 0%, 100%)',
      backgroundSecondary: 'hsl(0, 0%, 98%)',
      surface: 'hsl(0, 0%, 100%)',
      surfaceVariant: 'hsl(210, 16%, 96%)',
      text: 'hsl(222, 13%, 16%)',
      textSecondary: 'hsl(216, 12%, 40%)',
      textMuted: 'hsl(216, 12%, 60%)',
      textInverse: 'hsl(0, 0%, 100%)',
      border: 'hsl(216, 12%, 84%)',
      borderLight: 'hsl(216, 12%, 92%)',
      success: 'hsl(144, 69%, 53%)',
      warning: 'hsl(45, 100%, 51%)',
      danger: 'hsl(354, 81%, 60%)',
    },
  },
  {
    name: 'dark',
    displayName: 'Dark',
    isDark: true,
    colors: {
      primaryHue: 217,
      primarySaturation: '90%',
      primaryLightness: '65%',
      secondaryHue: 192,
      secondarySaturation: '90%',
      secondaryLightness: '65%',
      background: 'hsl(222, 16%, 12%)',
      backgroundSecondary: 'hsl(222, 16%, 10%)',
      surface: 'hsl(222, 16%, 16%)',
      surfaceVariant: 'hsl(222, 16%, 20%)',
      text: 'hsl(0, 0%, 95%)',
      textSecondary: 'hsl(216, 12%, 70%)',
      textMuted: 'hsl(216, 12%, 50%)',
      textInverse: 'hsl(222, 16%, 12%)',
      border: 'hsl(216, 12%, 24%)',
      borderLight: 'hsl(216, 12%, 20%)',
      success: 'hsl(144, 65%, 58%)',
      warning: 'hsl(45, 95%, 55%)',
      danger: 'hsl(354, 75%, 65%)',
    },
  },
  {
    name: 'high-contrast',
    displayName: 'High Contrast',
    isDark: false,
    colors: {
      primaryHue: 217,
      primarySaturation: '100%',
      primaryLightness: '50%',
      secondaryHue: 192,
      secondarySaturation: '100%',
      secondaryLightness: '50%',
      background: 'hsl(0, 0%, 100%)',
      backgroundSecondary: 'hsl(0, 0%, 100%)',
      surface: 'hsl(0, 0%, 100%)',
      surfaceVariant: 'hsl(0, 0%, 95%)',
      text: 'hsl(0, 0%, 0%)',
      textSecondary: 'hsl(0, 0%, 0%)',
      textMuted: 'hsl(0, 0%, 20%)',
      textInverse: 'hsl(0, 0%, 100%)',
      border: 'hsl(0, 0%, 0%)',
      borderLight: 'hsl(0, 0%, 30%)',
      success: 'hsl(120, 100%, 35%)',
      warning: 'hsl(45, 100%, 40%)',
      danger: 'hsl(0, 100%, 45%)',
    },
  },
  {
    name: 'high-contrast-dark',
    displayName: 'High Contrast Dark',
    isDark: true,
    colors: {
      primaryHue: 217,
      primarySaturation: '100%',
      primaryLightness: '70%',
      secondaryHue: 192,
      secondarySaturation: '100%',
      secondaryLightness: '70%',
      background: 'hsl(0, 0%, 0%)',
      backgroundSecondary: 'hsl(0, 0%, 0%)',
      surface: 'hsl(0, 0%, 5%)',
      surfaceVariant: 'hsl(0, 0%, 10%)',
      text: 'hsl(0, 0%, 100%)',
      textSecondary: 'hsl(0, 0%, 100%)',
      textMuted: 'hsl(0, 0%, 80%)',
      textInverse: 'hsl(0, 0%, 0%)',
      border: 'hsl(0, 0%, 100%)',
      borderLight: 'hsl(0, 0%, 70%)',
      success: 'hsl(120, 100%, 60%)',
      warning: 'hsl(45, 100%, 60%)',
      danger: 'hsl(0, 100%, 65%)',
    },
  },
]

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'app-theme',
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeName>(defaultTheme)
  const [themes, setThemes] = useState<Theme[]>(BUILT_IN_THEMES)
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light')

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

    // Remove all theme classes
    root.removeAttribute('data-theme')

    // Apply new theme
    root.setAttribute('data-theme', actualTheme)

    // Re-enable transitions after a frame
    if (disableTransitionOnChange) {
      requestAnimationFrame(() => {
        root.classList.remove('no-transitions')
      })
    }

    // Update color-scheme meta
    const colorScheme =
      actualTheme === 'dark' || (actualTheme === 'high-contrast' && systemTheme === 'dark')
        ? 'dark'
        : 'light'
    root.style.colorScheme = colorScheme
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
    setThemes((prev) => [...prev.filter((t) => t.name !== newTheme.name), newTheme])
  }, [])

  const unregisterTheme = useCallback(
    (themeName: string) => {
      // Prevent removing built-in themes
      if (['light', 'dark', 'system'].includes(themeName)) {
        console.warn(`Cannot unregister built-in theme: ${themeName}`)
        return
      }

      setThemes((prev) => prev.filter((t) => t.name !== themeName))

      // If current theme is being removed, switch to system
      if (theme === themeName) {
        setTheme('system')
      }
    },
    [theme, setTheme]
  )

  const value: ThemeContextValue = {
    theme,
    setTheme,
    themes,
    systemTheme,
    isSystemTheme: theme === 'system',
    toggleTheme,
    registerTheme,
    unregisterTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useThemeContext() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider')
  }
  return context
}

