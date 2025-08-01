import { useReducer, useCallback, useEffect, ReactNode } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { TimerDataProvider, TimerNavigationProvider } from '../../contexts'
import { timerSessionReducer, initialTimerSessionState } from '../../reducers/timer-session.reducer'
import { timerSessionActions } from '../../reducers/timer-session.actions'
import { useTimerStorage, useTimerNavigation } from '../../hooks'
import { TimerSessionService } from '../../services'
import { getNavigationState } from '../../utils'
import type { Timer } from '@/features/timer-builder/types/timer.types'

interface TimerSessionProviderProps {
  children: ReactNode
}

export function TimerSessionProvider({ children }: TimerSessionProviderProps) {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(timerSessionReducer, initialTimerSessionState)
  const storage = useTimerStorage()

  // Load session on mount
  useEffect(() => {
    const loadInitialSession = async () => {
      dispatch(timerSessionActions.setLoading(true))
      try {
        const sessionData = await storage.loadSession()
        if (sessionData && TimerSessionService.validateSession(sessionData)) {
          dispatch(timerSessionActions.loadSession(sessionData))
        }
      } catch (error) {
        dispatch(timerSessionActions.setError('Failed to load session'))
      } finally {
        dispatch(timerSessionActions.setLoading(false))
      }
    }

    loadInitialSession()
  }, [])

  // Session management
  const startSession = useCallback(
    async (timer: Timer, sessionName?: string) => {
      dispatch(timerSessionActions.startSession(timer, sessionName))

      const sessionData = await storage.startNewSession(timer, sessionName)
      if (sessionData) {
        navigate({
          to: '/timer/session',
          search: { index: 0 },
        })
      }
    },
    [navigate, storage]
  )

  const loadSession = useCallback(async () => {
    const sessionData = await storage.loadSession()
    if (sessionData && TimerSessionService.validateSession(sessionData)) {
      dispatch(timerSessionActions.loadSession(sessionData))
    }
  }, [storage])

  const addTimer = useCallback(
    async (timer: Timer) => {
      dispatch(timerSessionActions.addTimer(timer))

      await storage.saveSession({
        timers: [...state.timers, timer],
        currentTimerIndex: state.currentTimerIndex,
        sessionName: state.sessionName,
      })
    },
    [state, storage]
  )

  const clearSession = useCallback(async () => {
    dispatch(timerSessionActions.clearSession())
    await storage.clearSession()
  }, [storage])

  // Navigation handler
  const handleNavigate = useCallback(
    async (index: number) => {
      dispatch(timerSessionActions.setCurrentIndex(index))

      await storage.saveSession({
        timers: state.timers,
        currentTimerIndex: index,
        sessionName: state.sessionName,
      })
    },
    [state, storage]
  )

  const navigation = useTimerNavigation({
    state,
    onNavigate: handleNavigate,
  })

  // Get navigation state
  const navState = getNavigationState(state)

  const navigationValue = {
    // Session management
    startSession,
    loadSession,
    addTimer,
    clearSession,

    // Timer navigation
    navigateToTimer: navigation.navigateToTimer,
    nextTimer: navigation.nextTimer,
    previousTimer: navigation.previousTimer,

    // Navigation state
    hasNextTimer: navigation.hasNextTimer,
    hasPreviousTimer: navigation.hasPreviousTimer,
  }

  return (
    <TimerDataProvider
      timers={state.timers}
      currentTimerIndex={state.currentTimerIndex}
      sessionName={state.sessionName}
    >
      <TimerNavigationProvider value={navigationValue}>{children}</TimerNavigationProvider>
    </TimerDataProvider>
  )
}
