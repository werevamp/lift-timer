import { Timer } from '@/features/timer-builder/types/timer.types'
import styles from './TimerView.module.scss'

export interface TimerViewProps {
  // Current timer configuration
  timer: Timer

  // Session information (if part of a workout sequence)
  session?: {
    id: string
    name?: string
    currentIndex: number
    totalTimers: number
    hasNext: boolean
    hasPrevious: boolean
  }

  // Navigation callbacks
  onNextTimer?: () => void
  onPreviousTimer?: () => void
  onAddTimer?: () => void
  onComplete?: () => void
}

export function TimerView({
  timer,
  session,
  onNextTimer,
  onPreviousTimer,
  onAddTimer,
  onComplete,
}: TimerViewProps) {
  // TODO: Implement timer display and controls
  // This is a placeholder for your teammate to implement the actual timer UI

  return (
    <div className={styles.container}>
      <h1>Timer: {timer.name || 'Unnamed Timer'}</h1>

      {/* Display timer type and configuration */}
      <div className={styles.timerInfo}>
        <p>Type: {timer.type}</p>
        <p>ID: {timer.id}</p>

        {timer.type === 'standard' && (
          <p>
            Duration: {timer.settings.duration.minutes}m {timer.settings.duration.seconds}s
          </p>
        )}

        {timer.type === 'fixed-interval' && (
          <>
            <p>
              Active: {timer.settings.activeTime.minutes}m {timer.settings.activeTime.seconds}s
            </p>
            <p>
              Rest: {timer.settings.restTime.minutes}m {timer.settings.restTime.seconds}s
            </p>
            <p>Rounds: {timer.settings.rounds}</p>
          </>
        )}
      </div>

      {/* Display session info if part of a workout */}
      {session && (
        <div className={styles.sessionInfo}>
          <h2>Workout: {session.name || 'Unnamed Workout'}</h2>
          <p>
            Timer {session.currentIndex + 1} of {session.totalTimers}
          </p>
        </div>
      )}

      {/* Navigation controls */}
      <div className={styles.controls}>
        {session?.hasPrevious && onPreviousTimer && (
          <button onClick={onPreviousTimer}>Previous Timer</button>
        )}

        {session?.hasNext && onNextTimer && <button onClick={onNextTimer}>Next Timer</button>}

        {onAddTimer && <button onClick={onAddTimer}>Add Timer</button>}

        {onComplete && <button onClick={onComplete}>Complete</button>}
      </div>

      {/* TODO: Implement actual timer countdown/interval logic here */}
      <div className={styles.timerDisplay}>
        <p>Timer implementation goes here</p>
      </div>
    </div>
  )
}
