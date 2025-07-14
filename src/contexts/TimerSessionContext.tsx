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
import { timerStorage, type WorkoutSession } from '@/utils/storage/timer-storage'

interface TimerSessionContextState {
  // Current session data
  currentSession: WorkoutSession | null
  activeTimer: Timer | null
  timerState: TimerState | null

  // Session management
  createSession: (timer: Timer, sessionName?: string) => void
  loadSession: () => void
  addTimerToSession: (timer: Timer) => void
  clearSession: () => void

  // Timer navigation
  navigateToTimer: (index: number) => void
  nextTimer: () => void
  previousTimer: () => void

  // Timer state management
  updateTimerState: (state: Partial<TimerState>) => void
  completeCurrentTimer: () => void

  // Computed properties
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
  const [currentSession, setCurrentSession] = useState<WorkoutSession | null>(null)
  const [activeTimer, setActiveTimer] = useState<Timer | null>(null)
  const [timerState, setTimerState] = useState<TimerState | null>(null)

  // Computed properties
  const hasNextTimer = currentSession
    ? currentSession.currentTimerIndex < currentSession.timerIds.length - 1
    : false
  const hasPreviousTimer = currentSession ? currentSession.currentTimerIndex > 0 : false

  // Helper function to reset timer state
  const resetTimerState = useCallback(() => {
    setTimerState({
      status: 'idle',
      elapsedSeconds: 0,
    })
  }, [])

  // Load session on mount
  useEffect(() => {
    const session = timerStorage.getSession()
    if (session) {
      setCurrentSession(session)
      const timer = timerStorage.getTimer(session.timerIds[session.currentTimerIndex])
      if (timer) {
        setActiveTimer(timer)
        resetTimerState()
      }
    }
  }, [resetTimerState])

  // Load timer when session changes
  useEffect(() => {
    if (currentSession) {
      const timer = timerStorage.getTimer(currentSession.timerIds[currentSession.currentTimerIndex])
      setActiveTimer(timer)
    }
  }, [currentSession?.currentTimerIndex, currentSession?.timerIds])

  // Create new session with initial timer
  const createSession = useCallback(
    (timer: Timer, sessionName?: string) => {
      const session: WorkoutSession = {
        name: sessionName,
        timerIds: [timer.id],
        currentTimerIndex: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }

      // Save to storage
      timerStorage.saveTimer(timer)
      timerStorage.saveSession(session)

      // Update state
      setCurrentSession(session)
      setActiveTimer(timer)
      resetTimerState()

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
    const session = timerStorage.getSession()
    if (session) {
      setCurrentSession(session)

      // Load current timer
      const timer = timerStorage.getTimer(session.timerIds[session.currentTimerIndex])
      if (timer) {
        setActiveTimer(timer)
        resetTimerState()
      }
    }
  }, [resetTimerState])

  // Add timer to current session
  const addTimerToSession = useCallback(
    (timer: Timer) => {
      if (!currentSession) return

      // Save timer
      timerStorage.saveTimer(timer)

      // Update session
      const updatedSession = {
        ...currentSession,
        timerIds: [...currentSession.timerIds, timer.id],
        updatedAt: Date.now(),
      }

      timerStorage.saveSession(updatedSession)
      setCurrentSession(updatedSession)
    },
    [currentSession]
  )

  // Clear session
  const clearSession = useCallback(() => {
    timerStorage.deleteSession()
    setCurrentSession(null)
    setActiveTimer(null)
    setTimerState(null)
  }, [])

  // Single navigation method
  const navigateToTimer = useCallback(
    (index: number) => {
      if (!currentSession || index < 0 || index >= currentSession.timerIds.length) return

      const updatedSession = {
        ...currentSession,
        currentTimerIndex: index,
        updatedAt: Date.now(),
      }

      timerStorage.saveSession(updatedSession)
      setCurrentSession(updatedSession)
      resetTimerState()

      // Update URL
      navigate({
        to: '/timer/session',
        search: { index },
      })
    },
    [currentSession, navigate, resetTimerState]
  )

  // Convenience methods using navigateToTimer
  const nextTimer = useCallback(() => {
    if (currentSession && hasNextTimer) {
      navigateToTimer(currentSession.currentTimerIndex + 1)
    }
  }, [currentSession, hasNextTimer, navigateToTimer])

  const previousTimer = useCallback(() => {
    if (currentSession && hasPreviousTimer) {
      navigateToTimer(currentSession.currentTimerIndex - 1)
    }
  }, [currentSession, hasPreviousTimer, navigateToTimer])

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
        currentSession,
        activeTimer,
        timerState,
        createSession,
        loadSession,
        addTimerToSession,
        clearSession,
        navigateToTimer,
        nextTimer,
        previousTimer,
        updateTimerState,
        completeCurrentTimer,
        hasNextTimer,
        hasPreviousTimer,
      }}
    >
      {children}
    </TimerSessionContext.Provider>
  )
}
