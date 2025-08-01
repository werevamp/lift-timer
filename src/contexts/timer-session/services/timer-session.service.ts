import { timerStorage } from '@/utils/storage/timer-storage'
import type { Timer } from '@/features/timer-builder/types/timer.types'
import type { TimerSessionData } from '../types'

export class TimerSessionService {
  /**
   * Load session data from storage
   */
  static async loadSession(): Promise<TimerSessionData | null> {
    try {
      return timerStorage.getSession()
    } catch (error) {
      console.error('Failed to load session:', error)
      throw new Error('Failed to load timer session')
    }
  }

  /**
   * Save session data to storage
   */
  static async saveSession(data: TimerSessionData): Promise<void> {
    try {
      timerStorage.saveSession(data)
    } catch (error) {
      console.error('Failed to save session:', error)
      throw new Error('Failed to save timer session')
    }
  }

  /**
   * Start a new session with initial timer
   */
  static async startNewSession(timer: Timer, sessionName?: string): Promise<TimerSessionData> {
    const sessionData: TimerSessionData = {
      timers: [timer],
      currentTimerIndex: 0,
      sessionName,
    }

    await this.saveSession(sessionData)
    return sessionData
  }

  /**
   * Add a timer to the current session
   */
  static async addTimerToSession(
    currentSession: TimerSessionData,
    timer: Timer
  ): Promise<TimerSessionData> {
    const updatedSession: TimerSessionData = {
      ...currentSession,
      timers: [...currentSession.timers, timer],
    }

    await this.saveSession(updatedSession)
    return updatedSession
  }

  /**
   * Update current timer index
   */
  static async updateCurrentIndex(
    currentSession: TimerSessionData,
    index: number
  ): Promise<TimerSessionData> {
    if (index < 0 || index >= currentSession.timers.length) {
      throw new Error('Invalid timer index')
    }

    const updatedSession: TimerSessionData = {
      ...currentSession,
      currentTimerIndex: index,
    }

    await this.saveSession(updatedSession)
    return updatedSession
  }

  /**
   * Clear all session data
   */
  static async clearSession(): Promise<void> {
    try {
      timerStorage.deleteSession()
      timerStorage.clearAll()
    } catch (error) {
      console.error('Failed to clear session:', error)
      throw new Error('Failed to clear timer session')
    }
  }

  /**
   * Validate session data
   */
  static validateSession(data: TimerSessionData): boolean {
    return (
      Array.isArray(data.timers) &&
      data.timers.length > 0 &&
      typeof data.currentTimerIndex === 'number' &&
      data.currentTimerIndex >= 0 &&
      data.currentTimerIndex < data.timers.length
    )
  }
}
