import { UseFormRegisterReturn } from 'react-hook-form'
import styles from './DurationInput.module.scss'

interface DurationInputProps {
  label: string
  minuteProps: UseFormRegisterReturn
  secondProps: UseFormRegisterReturn
  error?: string
}

export default function DurationInput({
  label,
  minuteProps,
  secondProps,
  error,
}: DurationInputProps) {
  return (
    <div className={styles.durationInput}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputGroup}>
        <div className={styles.inputWrapper}>
          <input
            className={styles.numberInput}
            type="number"
            min="0"
            max="99"
            placeholder="00"
            {...minuteProps}
          />
        </div>
        <span className={styles.separator}>:</span>
        <div className={styles.inputWrapper}>
          <input
            className={styles.numberInput}
            type="number"
            min="0"
            max="59"
            placeholder="00"
            {...secondProps}
          />
        </div>
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}
