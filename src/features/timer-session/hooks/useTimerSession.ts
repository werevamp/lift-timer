import { useTimerData } from '../contexts/TimerDataContext'
import { useTimerControl } from '../contexts/TimerControlContext'

/**
 * Main hook that provides access to all timer session functionality
 * Combines data and control contexts for a unified API
 */
export function useTimerSession() {
  const data = useTimerData()
  const control = useTimerControl()

  return {
    // Timer data
    ...data,

    // Control methods
    ...control,
  }
}
