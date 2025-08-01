import { createContext, useContext, ReactNode } from 'react'
import type { Timer } from '@/features/timer-builder/types/timer.types'

interface TimerNavigationContextValue {
  // Session management
  startSession: (timer: Timer, sessionName?: string) => void
  loadSession: () => void
  addTimer: (timer: Timer) => void
  clearSession: () => void

  // Timer navigation
  navigateToTimer: (index: number) => void
  nextTimer: () => void
  previousTimer: () => void

  // Navigation state
  hasNextTimer: boolean
  hasPreviousTimer: boolean
}

const TimerNavigationContext = createContext<TimerNavigationContextValue | undefined>(undefined)

export const useTimerNavigation = () => {
  const context = useContext(TimerNavigationContext)
  if (!context) {
    throw new Error('useTimerNavigation must be used within TimerNavigationProvider')
  }
  return context
}

interface TimerNavigationProviderProps {
  children: ReactNode
  value: TimerNavigationContextValue
}

export function TimerNavigationProvider({ children, value }: TimerNavigationProviderProps) {
  return <TimerNavigationContext.Provider value={value}>{children}</TimerNavigationContext.Provider>
}
