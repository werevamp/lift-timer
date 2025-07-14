import { useTimerSession } from '@/contexts/TimerSessionContext'
import { SessionControls } from './SessionControls'
import styles from './TimerView.module.scss'

export function TimerView() {
  const { currentSession, activeTimer } = useTimerSession()

  if (!activeTimer || !currentSession) {
    return <div>Loading timer...</div>
  }

  const timer = activeTimer
  // TODO: Implement timer display and controls
  // NOTE: Remove test data once you start implementing the timer logic
  return (
    <div className={styles.container}>
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

      {/* TODO: Implement actual timer countdown/interval logic here */}
      <div className={styles.timerDisplay}>
        <p>Timer implementation goes here</p>
        <p>You can also delete the data above, its here just to</p>
      </div>

      {/* Session Navigation Controls */}
      <SessionControls />
    </div>
  )
}
