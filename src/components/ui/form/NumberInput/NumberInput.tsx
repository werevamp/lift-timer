import { FormField } from '../FormField'
import styles from './NumberInput.module.scss'

interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function NumberInput({
  label,
  error,
  className,
  ...inputAttributes
}: NumberInputProps) {
  return (
    <FormField label={label} error={error}>
      <input
        {...inputAttributes}
        type="number"
        className={`${styles.numberInput} ${className || ''}`}
      />
    </FormField>
  )
}
