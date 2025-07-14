import { Timer } from '../types/timer.types'
import TimerBuilder from './TimerBuilder'
import styles from './TimerBuilderView.module.scss'
import { useTimerSession } from '@/contexts/TimerSessionContext'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { z } from 'zod'

// Search params schema
const searchSchema = z.object({
  returnUrl: z.string().optional(),
})

export default function TimerBuilderView() {
  const navigate = useNavigate()
  const searchParams = useSearch({ strict: false }) as z.infer<typeof searchSchema>
  const { returnUrl } = searchParams
  const { createSession, addTimerToSession, currentSession } = useTimerSession()

  const handleTimerSubmit = (timer: Timer) => {
    // Add ID to timer
    const timerWithId: Timer = {
      ...timer,
      id: crypto.randomUUID(),
    }

    if (currentSession) {
      // Adding to existing session
      addTimerToSession(timerWithId)

      // Navigate back to timer page
      if (returnUrl) {
        window.location.href = decodeURIComponent(returnUrl)
      } else {
        navigate({
          to: '/timer/session',
          search: { index: currentSession.timerIds.length - 1 },
        })
      }
    } else {
      // Creating new session
      createSession(timerWithId, `Workout ${new Date().toLocaleDateString()}`)
      // Navigation happens automatically in createSession
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{currentSession ? 'Add Timer to Workout' : 'Create Timer'}</h1>
      <TimerBuilder onSubmit={handleTimerSubmit} />
    </div>
  )
}
