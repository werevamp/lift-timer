import { ThemeSwitcher } from '@/features/theme'
import styles from './Header.module.scss'
import SettingsButton from './SettingsButton'
import SettingsContent from './SettingsContent'

export default function Header() {
  return (
    <div className={styles.header}>
      <SettingsButton />
      <SettingsContent />
    </div>
  )
}
