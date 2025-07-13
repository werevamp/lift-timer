import { Timer } from '../types/timer.types'
import TimerBuilder from './TimerBuilder'
import styles from './TimerBuilderView.module.scss'

export default function TimerBuilderView() {
  const handleTimerSubmit = (timer: Timer) => {
    console.log('Timer created:', timer)
    // TODO: Handle timer creation (save to state, navigate, etc.)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Timer</h1>
      <TimerBuilder onSubmit={handleTimerSubmit} />
    </div>
  )
}