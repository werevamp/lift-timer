import { ThemeSwitcher } from '@/features/theme'
import styles from './SettingsContent.module.scss'

export default function SettingsContent() {
  return (
    <div className={styles.settingsContent}>
      <ThemeSwitcher />
    </div>
  )
}
