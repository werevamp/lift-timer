export interface Duration {
  minutes: number
  seconds: number
}

export interface BaseTimer {
  id: string
  name?: string
}

export interface StandardTimer extends BaseTimer {
  type: 'standard'
  settings: {
    duration: Duration
  }
}

export interface FixedIntervalTimer extends BaseTimer {
  type: 'fixed-interval'
  settings: {
    activeTime: Duration
    restTime: Duration
    rounds: number
  }
}

export type Timer = StandardTimer | FixedIntervalTimer

export type TimerType = Timer['type']

export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed'

export interface TimerState {
  status: TimerStatus
  elapsedSeconds: number
  startedAt?: number
  pausedAt?: number
}
