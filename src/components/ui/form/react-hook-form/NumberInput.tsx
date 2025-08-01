import { useFormContext } from 'react-hook-form'
import { NumberInput } from '../NumberInput'

interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string // force name to be required
  label?: string
  error?: string
}

export default function NumberInputReactHookForms({
  name,
  label,
  required,
  min,
  max,
  className,
  ...numberInputProps
}: NumberInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]?.message as string | undefined

  return (
    <NumberInput
      className={className || ''}
      error={error}
      label={label}
      {...numberInputProps}
      {...register(name, {
        required: required && `${label || name} is required`,
        valueAsNumber: true,
        min: min !== undefined ? { value: min, message: `Must be at least ${min}` } : undefined,
        max: max !== undefined ? { value: max, message: `Must be at most ${max}` } : undefined,
      })}
    />
  )
}
