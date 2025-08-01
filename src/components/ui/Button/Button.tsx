import { ButtonHTMLAttributes, ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import styles from './Button.module.scss'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
  size?: 'small' | 'medium' | 'large'
  icon?: IconProp
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    disabled ? styles.disabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={buttonClasses} disabled={disabled} {...props}>
      {icon && iconPosition === 'left' && <FontAwesomeIcon icon={icon} className={styles.icon} />}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <FontAwesomeIcon icon={icon} className={styles.icon} />}
    </button>
  )
}
