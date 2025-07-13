import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { useNavigate } from '@tanstack/react-router'
import type { Timer, TimerState } from '@/features/timer-builder/types/timer.types'
import { timerStorage, type WorkoutSession } from '@/utils/storage/timer-storage'

interface TimerSessionContextState {
  // Current session data
  currentSession: WorkoutSession | null
  activeTimer: Timer | null
  timerState: TimerState | null

  // Session management
  createSession: (timer: Timer, sessionName?: string) => void
  loadSession: (sessionId: string) => void
  addTimerToSession: (timer: Timer) => void
  clearSession: () => void

  // Timer navigation
  nextTimer: () => void
  previousTimer: () => void
  goToTimer: (index: number) => void

  // Timer state management
  updateTimerState: (state: Partial<TimerState>) => void
  completeCurrentTimer: () => void
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

  // Load session from localStorage on mount or when session changes
  useEffect(() => {
    if (currentSession) {
      const timer = timerStorage.getTimer(currentSession.timerIds[currentSession.currentTimerIndex])
      setActiveTimer(timer)
    }
  }, [currentSession?.currentTimerIndex, currentSession?.timerIds])

  // Create new session with initial timer
  const createSession = useCallback((timer: Timer, sessionName?: string) => {
    const session: WorkoutSession = {
      id: crypto.randomUUID(),
      name: sessionName,
      timerIds: [timer.id],
      currentTimerIndex: 0,
      isActive: true,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }

    // Save to storage
    timerStorage.saveTimer(timer)
    timerStorage.saveSession(session)
    timerStorage.setActiveSessionId(session.id)

    // Update state
    setCurrentSession(session)
    setActiveTimer(timer)
    setTimerState({
      isRunning: false,
      isPaused: false,
      elapsedSeconds: 0
    })

    // Navigate to timer
    navigate({
      to: '/timer/session/$sessionId',
      params: { sessionId: session.id },
      search: { index: 0 }
    })
  }, [navigate])

  // Load existing session
  const loadSession = useCallback((sessionId: string) => {
    const session = timerStorage.getSession(sessionId)
    if (session) {
      setCurrentSession(session)
      timerStorage.setActiveSessionId(session.id)

      // Load current timer
      const timer = timerStorage.getTimer(session.timerIds[session.currentTimerIndex])
      if (timer) {
        setActiveTimer(timer)
        setTimerState({
          isRunning: false,
          isPaused: false,
          elapsedSeconds: 0
        })
      }
    }
  }, [])

  // Add timer to current session
  const addTimerToSession = useCallback((timer: Timer) => {
    if (!currentSession) return

    // Save timer
    timerStorage.saveTimer(timer)

    // Update session
    const updatedSession = {
      ...currentSession,
      timerIds: [...currentSession.timerIds, timer.id],
      updatedAt: Date.now()
    }

    timerStorage.saveSession(updatedSession)
    setCurrentSession(updatedSession)
  }, [currentSession])

  // Clear session
  const clearSession = useCallback(() => {
    timerStorage.clearActiveSessionId()
    setCurrentSession(null)
    setActiveTimer(null)
    setTimerState(null)
  }, [])

  // Navigate to next timer
  const nextTimer = useCallback(() => {
    if (!currentSession) return

    const nextIndex = currentSession.currentTimerIndex + 1
    if (nextIndex < currentSession.timerIds.length) {
      const updatedSession = {
        ...currentSession,
        currentTimerIndex: nextIndex,
        updatedAt: Date.now()
      }

      timerStorage.saveSession(updatedSession)
      setCurrentSession(updatedSession)

      // Reset timer state for new timer
      setTimerState({
        isRunning: false,
        isPaused: false,
        elapsedSeconds: 0
      })

      // Update URL
      navigate({
        to: '/timer/session/$sessionId',
        params: { sessionId: currentSession.id },
        search: { index: nextIndex }
      })
    }
  }, [currentSession, navigate])

  // Navigate to previous timer
  const previousTimer = useCallback(() => {
    if (!currentSession) return

    const prevIndex = currentSession.currentTimerIndex - 1
    if (prevIndex >= 0) {
      const updatedSession = {
        ...currentSession,
        currentTimerIndex: prevIndex,
        updatedAt: Date.now()
      }

      timerStorage.saveSession(updatedSession)
      setCurrentSession(updatedSession)

      // Reset timer state
      setTimerState({
        isRunning: false,
        isPaused: false,
        elapsedSeconds: 0
      })

      // Update URL
      navigate({
        to: '/timer/session/$sessionId',
        params: { sessionId: currentSession.id },
        search: { index: prevIndex }
      })
    }
  }, [currentSession, navigate])

  // Go to specific timer
  const goToTimer = useCallback((index: number) => {
    if (!currentSession || index < 0 || index >= currentSession.timerIds.length) return

    const updatedSession = {
      ...currentSession,
      currentTimerIndex: index,
      updatedAt: Date.now()
    }

    timerStorage.saveSession(updatedSession)
    setCurrentSession(updatedSession)

    // Reset timer state
    setTimerState({
      isRunning: false,
      isPaused: false,
      elapsedSeconds: 0
    })

    // Update URL
    navigate({
      to: '/timer/session/$sessionId',
      params: { sessionId: currentSession.id },
      search: { index }
    })
  }, [currentSession, navigate])

  // Update timer state
  const updateTimerState = useCallback((state: Partial<TimerState>) => {
    setTimerState(prev => prev ? { ...prev, ...state } : null)
  }, [])

  // Complete current timer
  const completeCurrentTimer = useCallback(() => {
    // Mark timer as complete and potentially auto-advance
    updateTimerState({ isRunning: false, isPaused: false })
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
        nextTimer,
        previousTimer,
        goToTimer,
        updateTimerState,
        completeCurrentTimer
      }}
    >
      {children}
    </TimerSessionContext.Provider>
  )
}