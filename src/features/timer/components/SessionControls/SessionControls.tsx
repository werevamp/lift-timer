import { useNavigate } from '@tanstack/react-router'
import { useTimerSession } from '@/contexts/TimerSessionContext'
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
    currentSession,
    nextTimer,
    previousTimer,
    hasNextTimer,
    hasPreviousTimer,
  } = useTimerSession()

  // Handle navigation to timer builder
  const handleAddTimer = () => {
    if (!currentSession) return
    const returnUrl = `/timer/session?index=${currentSession.currentTimerIndex}`
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
      navigate({ to: '/' })
    }
  }

  if (!currentSession) {
    return null
  }

  const isLastTimer = !hasNextTimer

  return (
    <div className={styles.container}>
      {/* Session Progress */}
      <div className={styles.sessionProgress}>
        <span className={styles.sessionName}>{currentSession.name || 'Workout Session'}</span>
        <span className={styles.timerCount}>
          Timer {currentSession.currentTimerIndex + 1} of {currentSession.timerIds.length}
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