import { useThemeContext } from '../providers/theme-provider';
import type { ThemeName } from '../types/theme.types';

export function useTheme() {
  const context = useThemeContext();
  
  return {
    // Current theme
    theme: context.theme,
    
    // Actual rendered theme (resolves 'system' to actual theme)
    resolvedTheme: context.theme === 'system' ? context.systemTheme : context.theme,
    
    // Theme setters
    setTheme: context.setTheme,
    toggleTheme: context.toggleTheme,
    
    // Theme information
    themes: context.themes,
    systemTheme: context.systemTheme,
    isSystemTheme: context.isSystemTheme,
    isDark: context.theme === 'dark' || 
            (context.theme === 'system' && context.systemTheme === 'dark'),
    
    // Theme management
    registerTheme: context.registerTheme,
    unregisterTheme: context.unregisterTheme,
  };
}

// Utility hook for theme-aware styles
export function useThemeStyles<T extends Record<string, any>>(
  lightStyles: T,
  darkStyles: T
): T {
  const { isDark } = useTheme();
  return isDark ? darkStyles : lightStyles;
}

// Hook to get CSS variable value
export function useThemeVariable(variableName: string): string {
  const { resolvedTheme } = useTheme();
  
  // This would need to be enhanced to actually read CSS variables
  // For now, it's a placeholder that shows the pattern
  if (typeof window !== 'undefined') {
    const styles = getComputedStyle(document.documentElement);
    return styles.getPropertyValue(`--${variableName}`).trim();
  }
  
  return '';
}