import { useFormContext } from 'react-hook-form'
import { SelectInput, type SelectOption } from '../SelectInput'

interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string // force name to be required
  label?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
}

export type { SelectOption } from '../SelectInput'

export default function SelectInputReactHookForms({
  name,
  label,
  required,
  options,
  placeholder,
  className,
  ...selectInputProps
}: SelectInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]?.message as string | undefined

  return (
    <SelectInput
      className={className || ''}
      error={error}
      label={label}
      options={options}
      placeholder={placeholder}
      {...selectInputProps}
      {...register(name, { required: required && `${label || name} is required` })}
    />
  )
}
