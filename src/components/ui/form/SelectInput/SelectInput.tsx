import { FormField } from '../FormField'
import styles from './SelectInput.module.scss'

export interface SelectOption {
  value: string | number
  label: string
}

interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
}

export default function SelectInput({
  label,
  error,
  options,
  placeholder,
  className,
  ...selectAttributes
}: SelectInputProps) {
  return (
    <FormField label={label} error={error}>
      <select {...selectAttributes} className={`${styles.selectInput} ${className || ''}`}>
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  )
}
