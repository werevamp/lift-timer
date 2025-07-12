import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './SettingsButton.module.scss'

export default function SettingsButton() {
  return (
    <div className={styles['settings-button']}>
      <FontAwesomeIcon icon="cog" className="icon" />
    </div>
  )
}
