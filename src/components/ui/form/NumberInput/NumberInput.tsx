import { useFormContext } from 'react-hook-form'
import { FormField } from '../FormField'
import styles from './NumberInput.module.scss'

interface NumberInputProps {
  name: string
  label?: string
  placeholder?: string
  min?: number
  max?: number
  step?: number
  required?: boolean
  disabled?: boolean
  className?: string
}

export default function NumberInput({
  name,
  label,
  placeholder,
  min,
  max,
  step,
  required,
  disabled,
  className,
}: NumberInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]?.message as string | undefined

  return (
    <FormField label={label} error={error}>
      <input
        type="number"
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={`${styles.numberInput} ${className || ''}`}
        {...register(name, {
          required: required && `${label || name} is required`,
          valueAsNumber: true,
          min: min !== undefined ? { value: min, message: `Must be at least ${min}` } : undefined,
          max: max !== undefined ? { value: max, message: `Must be at most ${max}` } : undefined,
        })}
      />
    </FormField>
  )
}
