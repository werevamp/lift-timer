import type { Timer } from '@/features/timer-builder/types/timer.types'

// Storage key prefixes
const TIMER_PREFIX = 'timer-'
const SESSION_PREFIX = 'session-'
const ACTIVE_SESSION_KEY = 'activeSessionId'

// Workout session interface
export interface WorkoutSession {
  id: string
  name?: string
  timerIds: string[]
  currentTimerIndex: number
  isActive: boolean
  createdAt: number
  updatedAt: number
}

// Timer storage functions
export const timerStorage = {
  // Timer operations
  saveTimer: (timer: Timer): void => {
    try {
      localStorage.setItem(`${TIMER_PREFIX}${timer.id}`, JSON.stringify(timer))
    } catch (error) {
      console.error('Failed to save timer:', error)
    }
  },

  getTimer: (timerId: string): Timer | null => {
    try {
      const data = localStorage.getItem(`${TIMER_PREFIX}${timerId}`)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Failed to get timer:', error)
      return null
    }
  },

  deleteTimer: (timerId: string): void => {
    try {
      localStorage.removeItem(`${TIMER_PREFIX}${timerId}`)
    } catch (error) {
      console.error('Failed to delete timer:', error)
    }
  },

  // Session operations
  saveSession: (session: WorkoutSession): void => {
    try {
      localStorage.setItem(`${SESSION_PREFIX}${session.id}`, JSON.stringify(session))
    } catch (error) {
      console.error('Failed to save session:', error)
    }
  },

  getSession: (sessionId: string): WorkoutSession | null => {
    try {
      const data = localStorage.getItem(`${SESSION_PREFIX}${sessionId}`)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Failed to get session:', error)
      return null
    }
  },

  deleteSession: (sessionId: string): void => {
    try {
      localStorage.removeItem(`${SESSION_PREFIX}${sessionId}`)
    } catch (error) {
      console.error('Failed to delete session:', error)
    }
  },

  updateSession: (sessionId: string, updates: Partial<WorkoutSession>): void => {
    try {
      const session = timerStorage.getSession(sessionId)
      if (session) {
        const updatedSession = {
          ...session,
          ...updates,
          updatedAt: Date.now(),
        }
        timerStorage.saveSession(updatedSession)
      }
    } catch (error) {
      console.error('Failed to update session:', error)
    }
  },

  // Active session management
  setActiveSessionId: (sessionId: string): void => {
    try {
      localStorage.setItem(ACTIVE_SESSION_KEY, sessionId)
    } catch (error) {
      console.error('Failed to set active session:', error)
    }
  },

  getActiveSessionId: (): string | null => {
    try {
      return localStorage.getItem(ACTIVE_SESSION_KEY)
    } catch (error) {
      console.error('Failed to get active session:', error)
      return null
    }
  },

  clearActiveSessionId: (): void => {
    try {
      localStorage.removeItem(ACTIVE_SESSION_KEY)
    } catch (error) {
      console.error('Failed to clear active session:', error)
    }
  },

  // Utility functions
  getAllSessions: (): WorkoutSession[] => {
    try {
      const sessions: WorkoutSession[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith(SESSION_PREFIX)) {
          const data = localStorage.getItem(key)
          if (data) {
            sessions.push(JSON.parse(data))
          }
        }
      }
      return sessions.sort((a, b) => b.updatedAt - a.updatedAt)
    } catch (error) {
      console.error('Failed to get all sessions:', error)
      return []
    }
  },

  getAllTimers: (): Timer[] => {
    try {
      const timers: Timer[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith(TIMER_PREFIX)) {
          const data = localStorage.getItem(key)
          if (data) {
            timers.push(JSON.parse(data))
          }
        }
      }
      return timers
    } catch (error) {
      console.error('Failed to get all timers:', error)
      return []
    }
  },

  // Clean up orphaned timers (not in any session)
  cleanupOrphanedTimers: (): void => {
    try {
      const sessions = timerStorage.getAllSessions()
      const allTimerIds = new Set(sessions.flatMap((s) => s.timerIds))
      const timers = timerStorage.getAllTimers()

      timers.forEach((timer) => {
        if (!allTimerIds.has(timer.id)) {
          timerStorage.deleteTimer(timer.id)
        }
      })
    } catch (error) {
      console.error('Failed to cleanup orphaned timers:', error)
    }
  },
}
