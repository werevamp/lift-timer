import { useTimerData } from '../contexts/TimerDataContext'
import { useTimerNavigation } from '../contexts/TimerNavigationContext'

/**
 * Main hook that provides access to all timer session functionality
 * Combines data and navigation contexts for a unified API
 */
export function useTimerSession() {
  const data = useTimerData()
  const navigation = useTimerNavigation()

  return {
    // Timer data
    ...data,

    // Navigation and session methods
    ...navigation,
  }
}
