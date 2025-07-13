import { useState } from 'react'
import styles from './Header.module.scss'
import SettingsButton from './SettingsButton'
import SettingsContent from './SettingsContent'

export default function Header() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen)
  }

  return (
    <div className={styles.header}>
      <SettingsButton onClick={toggleSettings} isSettingsOpen={isSettingsOpen} />
      {isSettingsOpen && <SettingsContent />}
      {isSettingsOpen && <div className={styles.clickAwayBox} onClick={toggleSettings} />}
    </div>
  )
}
