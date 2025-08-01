import { FormField } from '../FormField'
import styles from './TextInput.module.scss'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function TextInput({ label, error, className, ...inputAttributes }: TextInputProps) {
  return (
    <FormField label={label} error={error}>
      <input {...inputAttributes} className={`${styles.textInput} ${className || ''}`} />
    </FormField>
  )
}
