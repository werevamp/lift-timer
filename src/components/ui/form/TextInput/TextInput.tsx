import { useFormContext } from 'react-hook-form'
import { FormField } from '../FormField'
import styles from './TextInput.module.scss'

interface TextInputProps {
  name: string
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'url'
  required?: boolean
  disabled?: boolean
  className?: string
}

export default function TextInput({
  name,
  label,
  placeholder,
  type = 'text',
  required,
  disabled,
  className,
}: TextInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]?.message as string | undefined

  return (
    <FormField label={label} error={error}>
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`${styles.textInput} ${className || ''}`}
        {...register(name, { required: required && `${label || name} is required` })}
      />
    </FormField>
  )
}
