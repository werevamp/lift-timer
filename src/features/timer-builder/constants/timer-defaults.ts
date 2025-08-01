import { TimerFormData } from '../schemas/timer.schema'

export const TIMER_TYPE_OPTIONS = [
  { value: 'standard', label: 'Standard' },
  { value: 'fixed-interval', label: 'Fixed Interval' },
]

export const DEFAULT_FORM_VALUES: TimerFormData = {
  type: 'standard',
  duration: { minutes: 10, seconds: 0 },
  activeTime: { minutes: 0, seconds: 30 },
  restTime: { minutes: 0, seconds: 10 },
  rounds: 10,
}
