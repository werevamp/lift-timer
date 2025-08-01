import { useFormContext } from 'react-hook-form'
import { TextInput } from '../TextInput'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string // force name to be required
  label?: string
  error?: string
}

export default function TextInputReactHookForms({
  name,
  label,
  required,
  className,
  ...textInputProps
}: TextInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]?.message as string | undefined

  return (
    <TextInput
      className={className || ''}
      error={error}
      label={label}
      {...textInputProps}
      {...register(name, { required: required && `${label || name} is required` })}
    />
  )
}
