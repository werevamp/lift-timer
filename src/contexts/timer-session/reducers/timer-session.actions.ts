import type { Timer } from '@/features/timer-builder/types/timer.types'
import type { TimerSessionData, TimerSessionAction } from '../types'

export const timerSessionActions = {
  loadSession: (data: TimerSessionData): TimerSessionAction => ({
    type: 'LOAD_SESSION',
    payload: data,
  }),

  startSession: (timer: Timer, sessionName?: string): TimerSessionAction => ({
    type: 'START_SESSION',
    payload: { timer, sessionName },
  }),

  addTimer: (timer: Timer): TimerSessionAction => ({
    type: 'ADD_TIMER',
    payload: timer,
  }),

  clearSession: (): TimerSessionAction => ({
    type: 'CLEAR_SESSION',
  }),

  setCurrentIndex: (index: number): TimerSessionAction => ({
    type: 'SET_CURRENT_INDEX',
    payload: index,
  }),

  setLoading: (isLoading: boolean): TimerSessionAction => ({
    type: 'SET_LOADING',
    payload: isLoading,
  }),

  setError: (error: string | null): TimerSessionAction => ({
    type: 'SET_ERROR',
    payload: error,
  }),
}
