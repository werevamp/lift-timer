import { useTheme } from '../hooks/use-theme'
import { ThemeName } from '../types/theme.types'
import styles from './ThemeSwitcher.module.scss'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div className={styles.themeSwitcher}>
      <div>
        <input
          id="theme-system"
          type="radio"
          name="theme"
          value="system"
          checked={theme === 'system'}
          onChange={() => setTheme('system')}
        />
        <label htmlFor="theme-system">System</label>
      </div>
      <div>
        <input
          id="theme-light"
          type="radio"
          name="theme"
          value="light"
          checked={theme === 'light'}
          onChange={() => setTheme('light')}
        />
        <label htmlFor="theme-light">Light</label>
      </div>
      <div>
        <input
          id="theme-dark"
          type="radio"
          name="theme"
          value="dark"
          checked={theme === 'dark'}
          onChange={() => setTheme('dark')}
        />
        <label htmlFor="theme-dark">Dark</label>
      </div>
    </div>
  )
}

export function ThemeSelector() {
  const { theme, setTheme, themes } = useTheme()

  return (
    <select
      id="theme-select"
      value={theme}
      onChange={(e) => setTheme(e.target.value as ThemeName)}
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
