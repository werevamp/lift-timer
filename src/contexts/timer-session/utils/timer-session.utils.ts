import type { Timer } from '@/features/timer-builder/types/timer.types'
import type { TimerSessionState, TimerNavigationState } from '../types'

/**
 * Get navigation state from session state
 */
export function getNavigationState(state: TimerSessionState): TimerNavigationState {
  const { timers, currentTimerIndex } = state

  return {
    currentTimer: timers.length > 0 ? timers[currentTimerIndex] : null,
    hasNextTimer: currentTimerIndex < timers.length - 1,
    hasPreviousTimer: currentTimerIndex > 0,
  }
}

/**
 * Get the total duration of a timer in seconds
 */
export function getTimerDuration(timer: Timer): number {
  switch (timer.type) {
    case 'standard':
      return timer.settings.duration.minutes * 60 + timer.settings.duration.seconds

    case 'fixed-interval': {
      const { activeTime, restTime, rounds } = timer.settings
      const activeSec = activeTime.minutes * 60 + activeTime.seconds
      const restSec = restTime.minutes * 60 + restTime.seconds
      return (activeSec + restSec) * rounds
    }

    default:
      return 0
  }
}

/**
 * Calculate progress percentage
 */
export function calculateProgress(elapsedSeconds: number, totalSeconds: number): number {
  if (totalSeconds === 0) return 0
  return Math.min((elapsedSeconds / totalSeconds) * 100, 100)
}

/**
 * Format time for display
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

/**
 * Get timer display name
 */
export function getTimerDisplayName(timer: Timer, index: number): string {
  return timer.name || `Timer ${index + 1}`
}
