import styles from './SettingsContent.module.scss'
import { ThemeSwitcher } from '@/features/theme'
import ClearTimers from './ClearTimers'

export default function SettingsContent({ closeSettings }: { closeSettings: () => void }) {
  return (
    <div className={styles.settingsContent}>
      <ThemeSwitcher />
      <ClearTimers closeSettings={closeSettings} />
    </div>
  )
}
