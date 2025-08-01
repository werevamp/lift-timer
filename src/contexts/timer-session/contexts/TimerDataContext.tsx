import { createContext, useContext, ReactNode } from 'react'
import type { Timer } from '@/features/timer-builder/types/timer.types'

interface TimerDataContextValue {
  timers: Timer[]
  currentTimerIndex: number
  sessionName?: string
  currentTimer: Timer | null
}

const TimerDataContext = createContext<TimerDataContextValue | undefined>(undefined)

export const useTimerData = () => {
  const context = useContext(TimerDataContext)
  if (!context) {
    throw new Error('useTimerData must be used within TimerDataProvider')
  }
  return context
}

interface TimerDataProviderProps {
  children: ReactNode
  timers: Timer[]
  currentTimerIndex: number
  sessionName?: string
}

export function TimerDataProvider({
  children,
  timers,
  currentTimerIndex,
  sessionName,
}: TimerDataProviderProps) {
  const currentTimer = timers.length > 0 ? timers[currentTimerIndex] : null

  return (
    <TimerDataContext.Provider
      value={{
        timers,
        currentTimerIndex,
        sessionName,
        currentTimer,
      }}
    >
      {children}
    </TimerDataContext.Provider>
  )
}
