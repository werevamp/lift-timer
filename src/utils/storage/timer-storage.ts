import type { Timer } from '@/features/timer-builder/types/timer.types'

// Storage keys
const TIMER_PREFIX = 'timer-'
const CURRENT_SESSION_KEY = 'currentSession'

// Session data interface
export interface SessionData {
  timers: Timer[]
  currentTimerIndex: number
  sessionName?: string
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
  saveSession: (session: SessionData): void => {
    try {
      localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(session))
    } catch (error) {
      console.error('Failed to save session:', error)
    }
  },

  getSession: (): SessionData | null => {
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

  updateSession: (updates: Partial<SessionData>): void => {
    try {
      const session = timerStorage.getSession()
      if (session) {
        const updatedSession = {
          ...session,
          ...updates,
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

  // Clear all data
  clearAll: (): void => {
    try {
      timerStorage.deleteSession()
      // Clear all timer keys
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i)
        if (key?.startsWith(TIMER_PREFIX)) {
          localStorage.removeItem(key)
        }
      }
    } catch (error) {
      console.error('Failed to clear all data:', error)
    }
  },
}
