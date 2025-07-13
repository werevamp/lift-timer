import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './SettingsButton.module.scss'

interface SettingsButtonProps {
  onClick: () => void
  isSettingsOpen?: boolean
}

export default function SettingsButton({ onClick, isSettingsOpen }: SettingsButtonProps) {
  return (
    <button className={styles['settings-button']} onClick={onClick}>
      {isSettingsOpen ? <FontAwesomeIcon icon="xmark" /> : <FontAwesomeIcon icon="cog" />}
    </button>
  )
}
