import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './SettingsButton.module.scss'

interface SettingsButtonProps {
  onClick: () => void
}

export default function SettingsButton({ onClick }: SettingsButtonProps) {
  return (
    <button className={styles['settings-button']} onClick={onClick}>
      <FontAwesomeIcon icon={['fas', 'cog']} />
    </button>
  )
}
