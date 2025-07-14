import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'
import { useNavigate } from '@tanstack/react-router'
import type { Timer, TimerState, TimerStatus } from '@/features/timer-builder/types/timer.types'
import { timerStorage } from '@/utils/storage/timer-storage'

interface TimerSessionContextState {
  // Timer data
  timers: Timer[]
  currentTimerIndex: number
  sessionName?: string
  timerState: TimerState | null

  // Session management
  startSession: (timer: Timer, sessionName?: string) => void
  loadSession: () => void
  addTimer: (timer: Timer) => void
  clearSession: () => void

  // Timer navigation
  navigateToTimer: (index: number) => void
  nextTimer: () => void
  previousTimer: () => void

  // Timer state management
  updateTimerState: (state: Partial<TimerState>) => void
  completeCurrentTimer: () => void

  // Computed properties
  currentTimer: Timer | null
  hasNextTimer: boolean
  hasPreviousTimer: boolean
}

const TimerSessionContext = createContext<TimerSessionContextState | undefined>(undefined)

export const useTimerSession = () => {
  const context = useContext(TimerSessionContext)
  if (!context) {
    throw new Error('useTimerSession must be used within TimerSessionProvider')
  }
  return context
}

interface TimerSessionProviderProps {
  children: ReactNode
}

export const TimerSessionProvider: React.FC<TimerSessionProviderProps> = ({ children }) => {
  const navigate = useNavigate()
  const [timers, setTimers] = useState<Timer[]>([])
  const [currentTimerIndex, setCurrentTimerIndex] = useState(0)
  const [sessionName, setSessionName] = useState<string>()
  const [timerState, setTimerState] = useState<TimerState | null>(null)

  // Computed properties
  const currentTimer = timers.length > 0 ? timers[currentTimerIndex] : null
  const hasNextTimer = currentTimerIndex < timers.length - 1
  const hasPreviousTimer = currentTimerIndex > 0

  // Helper function to reset timer state
  const resetTimerState = useCallback(() => {
    setTimerState({
      status: 'idle',
      elapsedSeconds: 0,
    })
  }, [])

  // Load session on mount
  useEffect(() => {
    const sessionData = timerStorage.getSession()
    if (sessionData) {
      setTimers(sessionData.timers || [])
      setCurrentTimerIndex(sessionData.currentTimerIndex || 0)
      setSessionName(sessionData.sessionName)
      resetTimerState()
    }
  }, [resetTimerState])

  // Start new session with initial timer
  const startSession = useCallback(
    (timer: Timer, name?: string) => {
      // Clear any existing session
      setTimers([timer])
      setCurrentTimerIndex(0)
      setSessionName(name)
      resetTimerState()

      // Save to storage
      timerStorage.saveSession({
        timers: [timer],
        currentTimerIndex: 0,
        sessionName: name,
      })

      // Navigate to timer
      navigate({
        to: '/timer/session',
        search: { index: 0 },
      })
    },
    [navigate, resetTimerState]
  )

  // Load existing session
  const loadSession = useCallback(() => {
    const sessionData = timerStorage.getSession()
    if (sessionData) {
      setTimers(sessionData.timers || [])
      setCurrentTimerIndex(sessionData.currentTimerIndex || 0)
      setSessionName(sessionData.sessionName)
      resetTimerState()
    }
  }, [resetTimerState])

  // Add timer to current session
  const addTimer = useCallback(
    (timer: Timer) => {
      const newTimers = [...timers, timer]
      setTimers(newTimers)

      // Save to storage
      timerStorage.saveSession({
        timers: newTimers,
        currentTimerIndex,
        sessionName,
      })
    },
    [timers, currentTimerIndex, sessionName]
  )

  // Clear session
  const clearSession = useCallback(() => {
    timerStorage.deleteSession()
    timerStorage.clearAll()
    setTimers([])
    setCurrentTimerIndex(0)
    setSessionName(undefined)
    setTimerState(null)
  }, [])

  // Single navigation method
  const navigateToTimer = useCallback(
    (index: number) => {
      if (index < 0 || index >= timers.length) return

      setCurrentTimerIndex(index)
      resetTimerState()

      // Save to storage
      timerStorage.saveSession({
        timers,
        currentTimerIndex: index,
        sessionName,
      })

      // Update URL
      navigate({
        to: '/timer/session',
        search: { index },
      })
    },
    [timers, sessionName, navigate, resetTimerState]
  )

  // Convenience methods using navigateToTimer
  const nextTimer = useCallback(() => {
    if (hasNextTimer) {
      navigateToTimer(currentTimerIndex + 1)
    }
  }, [hasNextTimer, currentTimerIndex, navigateToTimer])

  const previousTimer = useCallback(() => {
    if (hasPreviousTimer) {
      navigateToTimer(currentTimerIndex - 1)
    }
  }, [hasPreviousTimer, currentTimerIndex, navigateToTimer])

  // Update timer state
  const updateTimerState = useCallback((state: Partial<TimerState>) => {
    setTimerState((prev) => (prev ? { ...prev, ...state } : null))
  }, [])

  // Complete current timer
  const completeCurrentTimer = useCallback(() => {
    // Mark timer as complete and potentially auto-advance
    updateTimerState({ status: 'completed' })
  }, [updateTimerState])

  return (
    <TimerSessionContext.Provider
      value={{
        timers,
        currentTimerIndex,
        sessionName,
        timerState,
        startSession,
        loadSession,
        addTimer,
        clearSession,
        navigateToTimer,
        nextTimer,
        previousTimer,
        updateTimerState,
        completeCurrentTimer,
        currentTimer,
        hasNextTimer,
        hasPreviousTimer,
      }}
    >
      {children}
    </TimerSessionContext.Provider>
  )
}
