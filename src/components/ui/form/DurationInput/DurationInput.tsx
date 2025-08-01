import { useFormContext } from 'react-hook-form'
import styles from './DurationInput.module.scss'

interface DurationInputProps {
  label: string
  minutesName: string
  secondsName: string
}

export default function DurationInput({ label, minutesName, secondsName }: DurationInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  // Get errors for both fields or the parent field
  const parentName = minutesName.split('.').slice(0, -1).join('.')
  const error =
    errors[minutesName]?.message ||
    errors[secondsName]?.message ||
    (parentName && errors[parentName]?.message)

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
            {...register(minutesName, {
              valueAsNumber: true,
              min: { value: 0, message: 'Minutes must be at least 0' },
              max: { value: 99, message: 'Minutes must be at most 99' },
            })}
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
            {...register(secondsName, {
              valueAsNumber: true,
              min: { value: 0, message: 'Seconds must be at least 0' },
              max: { value: 59, message: 'Seconds must be at most 59' },
            })}
          />
        </div>
      </div>
      {error && <span className={styles.error}>{error as string}</span>}
    </div>
  )
}
