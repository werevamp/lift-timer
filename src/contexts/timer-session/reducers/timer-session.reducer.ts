import type { TimerSessionState, TimerSessionAction } from '../types'

export const initialTimerSessionState: TimerSessionState = {
  timers: [],
  currentTimerIndex: 0,
  sessionName: undefined,
  isLoading: false,
  error: null,
}

export function timerSessionReducer(
  state: TimerSessionState,
  action: TimerSessionAction
): TimerSessionState {
  switch (action.type) {
    case 'LOAD_SESSION':
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        error: null,
      }

    case 'START_SESSION':
      return {
        ...state,
        timers: [action.payload.timer],
        currentTimerIndex: 0,
        sessionName: action.payload.sessionName,
        error: null,
      }

    case 'ADD_TIMER':
      return {
        ...state,
        timers: [...state.timers, action.payload],
      }

    case 'CLEAR_SESSION':
      return initialTimerSessionState

    case 'SET_CURRENT_INDEX':
      if (action.payload < 0 || action.payload >= state.timers.length) {
        return state
      }
      return {
        ...state,
        currentTimerIndex: action.payload,
      }

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      }

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}
