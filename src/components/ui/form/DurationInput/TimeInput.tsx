import styles from './TimeInput.module.css'

export default function TimeInput() {
  return (
    <input
      className={styles.numberInput}
      type="number"
      min="0"
      max="99"
      placeholder="00"
      {...minuteProps}
    />
  )
}
