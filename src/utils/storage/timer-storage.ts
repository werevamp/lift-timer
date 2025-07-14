import type { Timer } from '@/features/timer-builder/types/timer.types'

// Storage keys
const TIMER_PREFIX = 'timer-'
const CURRENT_SESSION_KEY = 'currentSession'

// Workout session interface
export interface WorkoutSession {
  name?: string
  timerIds: string[]
  currentTimerIndex: number
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
      localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(session))
    } catch (error) {
      console.error('Failed to save session:', error)
    }
  },

  getSession: (): WorkoutSession | null => {
    try {
      const data = localStorage.getItem(CURRENT_SESSION_KEY)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Failed to get session:', error)
      return null
    }
  },

  deleteSession: (): void => {
    try {
      localStorage.removeItem(CURRENT_SESSION_KEY)
    } catch (error) {
      console.error('Failed to delete session:', error)
    }
  },

  hasSession: (): boolean => {
    return localStorage.getItem(CURRENT_SESSION_KEY) !== null
  },

  updateSession: (updates: Partial<WorkoutSession>): void => {
    try {
      const session = timerStorage.getSession()
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


  // Utility functions

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

  // Clean up orphaned timers (not in the session)
  cleanupOrphanedTimers: (): void => {
    try {
      const session = timerStorage.getSession()
      const sessionTimerIds = new Set(session?.timerIds || [])
      const timers = timerStorage.getAllTimers()

      timers.forEach((timer) => {
        if (!sessionTimerIds.has(timer.id)) {
          timerStorage.deleteTimer(timer.id)
        }
      })
    } catch (error) {
      console.error('Failed to cleanup orphaned timers:', error)
    }
  },

  // Clear all timers in the current session
  clearSessionTimers: (): void => {
    try {
      const session = timerStorage.getSession()
      if (session) {
        session.timerIds.forEach((timerId) => {
          timerStorage.deleteTimer(timerId)
        })
        timerStorage.deleteSession()
      }
    } catch (error) {
      console.error('Failed to clear session timers:', error)
    }
  },
}
