import type { Timer } from '@/features/timer-builder/types/timer.types'

export interface TimerSessionData {
  timers: Timer[]
  currentTimerIndex: number
  sessionName?: string
}

export interface TimerSessionState extends TimerSessionData {
  isLoading: boolean
  error: string | null
}

export interface TimerNavigationState {
  currentTimer: Timer | null
  hasNextTimer: boolean
  hasPreviousTimer: boolean
}

export type TimerSessionAction =
  | { type: 'LOAD_SESSION'; payload: TimerSessionData }
  | { type: 'START_SESSION'; payload: { timer: Timer; sessionName?: string } }
  | { type: 'ADD_TIMER'; payload: Timer }
  | { type: 'CLEAR_SESSION' }
  | { type: 'SET_CURRENT_INDEX'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
