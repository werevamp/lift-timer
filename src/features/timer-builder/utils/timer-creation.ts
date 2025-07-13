import { TimerFormData } from '../schemas/timer.schema'
import { StandardTimer, FixedIntervalTimer, Duration } from '../types/timer.types'

/**
 * Safely converts form duration data to Duration type
 */
function toDuration(duration: { minutes: string | number; seconds: string | number }): Duration {
  return {
    minutes:
      typeof duration.minutes === 'number' ? duration.minutes : parseInt(duration.minutes) || 0,
    seconds:
      typeof duration.seconds === 'number' ? duration.seconds : parseInt(duration.seconds) || 0,
  }
}

/**
 * Creates a StandardTimer from form data
 */
export function createStandardTimer(data: TimerFormData): StandardTimer | null {
  if (data.type !== 'standard' || !data.duration) {
    return null
  }

  return {
    type: 'standard',
    settings: {
      duration: toDuration(data.duration),
    },
  }
}

/**
 * Creates a FixedIntervalTimer from form data
 */
export function createFixedIntervalTimer(data: TimerFormData): FixedIntervalTimer | null {
  if (data.type !== 'fixed-interval' || !data.activeTime || !data.restTime || !data.rounds) {
    return null
  }

  return {
    type: 'fixed-interval',
    settings: {
      activeTime: toDuration(data.activeTime),
      restTime: toDuration(data.restTime),
      rounds: typeof data.rounds === 'number' ? data.rounds : parseInt(data.rounds) || 1,
    },
  }
}

/**
 * Creates a Timer from form data based on the selected type
 */
export function createTimerFromFormData(data: TimerFormData) {
  if (data.type === 'standard') {
    return createStandardTimer(data)
  } else if (data.type === 'fixed-interval') {
    return createFixedIntervalTimer(data)
  }
  return null
}
