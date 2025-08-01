import { useFormContext } from 'react-hook-form'
import { FormField } from '../FormField'
import styles from './SelectInput.module.scss'

interface SelectOption {
  value: string | number
  label: string
}

interface SelectInputProps {
  name: string
  label?: string
  options: SelectOption[]
  placeholder?: string
  required?: boolean
  disabled?: boolean
  className?: string
}

export default function SelectInput({
  name,
  label,
  options,
  placeholder,
  required,
  disabled,
  className,
}: SelectInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]?.message as string | undefined

  return (
    <FormField label={label} error={error}>
      <select
        disabled={disabled}
        className={`${styles.selectInput} ${className || ''}`}
        {...register(name, { required: required && `${label || name} is required` })}
      >
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
