import { ReactNode } from 'react'
import styles from './FormField.module.scss'

interface FormFieldProps {
  label?: string
  error?: string
  children: ReactNode
}

export default function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className={styles.formField}>
      {label && <label className={styles.label}>{label}</label>}
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}