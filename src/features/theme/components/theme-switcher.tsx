import { useTheme } from '../hooks/use-theme'
import styles from './theme-switcher.module.scss'

export function ThemeSwitcher() {
  const { setTheme, isDark } = useTheme()

  return (
    <div className={styles.themeSwitcher}>
      <button
        className={styles.themeToggle}
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        aria-label="Toggle theme"
      >
        {isDark ? <div>Sun</div> : <div>Moon</div>}
      </button>
    </div>
  )
}

export function ThemeSelector() {
  const { theme, setTheme, themes } = useTheme()

  return (
    <select
      id="theme-select"
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className={styles.themeSelect}
    >
      <option value="system">System</option>
      {themes.map((t) => (
        <option key={t.name} value={t.name}>
          {t.displayName}
        </option>
      ))}
    </select>
  )
}

