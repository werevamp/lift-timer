import { useNavigate } from '@tanstack/react-router'
import { useTimerSession } from '@/contexts/timer-session'
import { Button } from '@/components/ui/Button'
import {
  faChevronLeft,
  faChevronRight,
  faPlus,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons'
import styles from './SessionControls.module.scss'

export function SessionControls() {
  const navigate = useNavigate()
  const {
    timers,
    currentTimerIndex,
    sessionName,
    nextTimer,
    previousTimer,
    hasNextTimer,
    hasPreviousTimer,
    clearSession,
  } = useTimerSession()

  // Handle navigation to timer builder
  const handleAddTimer = () => {
    const returnUrl = `/timer/session?index=${currentTimerIndex}`
    navigate({
      to: '/timer-builder',
      search: {
        returnUrl: encodeURIComponent(returnUrl),
      },
    })
  }

  // Handle session completion
  const handleComplete = () => {
    if (hasNextTimer) {
      nextTimer()
    } else {
      clearSession()
      navigate({ to: '/' })
    }
  }

  if (timers.length === 0) {
    return null
  }

  const isLastTimer = !hasNextTimer

  return (
    <div className={styles.container}>
      {/* Session Progress */}
      <div className={styles.sessionProgress}>
        <span className={styles.sessionName}>{sessionName || 'Workout Session'}</span>
        <span className={styles.timerCount}>
          Timer {currentTimerIndex + 1} of {timers.length}
        </span>
      </div>

      {/* Navigation Controls */}
      <div className={styles.controls}>
        <div className={styles.navigationGroup}>
          {hasPreviousTimer && (
            <Button
              variant="secondary"
              size="medium"
              icon={faChevronLeft}
              onClick={previousTimer}
              aria-label="Previous timer"
            >
              Previous
            </Button>
          )}

          {hasNextTimer && (
            <Button
              variant="secondary"
              size="medium"
              icon={faChevronRight}
              iconPosition="right"
              onClick={nextTimer}
              aria-label="Next timer"
            >
              Next
            </Button>
          )}

          {isLastTimer && (
            <Button
              variant="primary"
              size="medium"
              icon={faCheckCircle}
              onClick={handleComplete}
              aria-label="Complete workout"
            >
              Complete Workout
            </Button>
          )}
        </div>

        {/* Add Timer Button */}
        <Button
          variant="ghost"
          size="medium"
          icon={faPlus}
          onClick={handleAddTimer}
          aria-label="Add timer to session"
        >
          Add Timer
        </Button>
      </div>
    </div>
  )
}
