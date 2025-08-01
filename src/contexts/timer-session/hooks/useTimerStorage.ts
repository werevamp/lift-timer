import { useCallback } from 'react'
import { TimerSessionService } from '../services'
import type { Timer } from '@/features/timer-builder/types/timer.types'
import type { TimerSessionData } from '../types'

export function useTimerStorage() {
  const loadSession = useCallback(async (): Promise<TimerSessionData | null> => {
    try {
      return await TimerSessionService.loadSession()
    } catch (error) {
      console.error('Failed to load session:', error)
      return null
    }
  }, [])

  const saveSession = useCallback(async (data: TimerSessionData): Promise<boolean> => {
    try {
      await TimerSessionService.saveSession(data)
      return true
    } catch (error) {
      console.error('Failed to save session:', error)
      return false
    }
  }, [])

  const startNewSession = useCallback(
    async (timer: Timer, sessionName?: string): Promise<TimerSessionData | null> => {
      try {
        return await TimerSessionService.startNewSession(timer, sessionName)
      } catch (error) {
        console.error('Failed to start new session:', error)
        return null
      }
    },
    []
  )

  const clearSession = useCallback(async (): Promise<boolean> => {
    try {
      await TimerSessionService.clearSession()
      return true
    } catch (error) {
      console.error('Failed to clear session:', error)
      return false
    }
  }, [])

  return {
    loadSession,
    saveSession,
    startNewSession,
    clearSession,
  }
}
