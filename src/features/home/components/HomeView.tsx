import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useTimerSession } from '@/contexts/timer-session'
import styles from './HomeView.module.scss'

export const HomeView = () => {
  const navigate = useNavigate()
  const { currentTimer } = useTimerSession()

  useEffect(() => {
    // Redirect based on whether there's a current timer
    if (currentTimer) {
      // If there's an active timer, go to the timer page
      navigate({ to: '/timer/session' })
    } else {
      // If no timer, go to the timer builder
      navigate({ to: '/timer-builder' })
    }
  }, [currentTimer, navigate])

  // Show a loading state while checking and redirecting
  return (
    <div className={styles.container}>
      <div className={styles.loading}>
        <p>Loading...</p>
      </div>
    </div>
  )
}
