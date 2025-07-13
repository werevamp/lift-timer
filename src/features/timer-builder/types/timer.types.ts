export interface Duration {
  minutes: number
  seconds: number
}

export interface StandardTimer {
  type: 'standard'
  settings: {
    duration: Duration
  }
}

export interface FixedIntervalTimer {
  type: 'fixed-interval'
  settings: {
    activeTime: Duration
    restTime: Duration
    rounds: number
  }
}

export type Timer = StandardTimer | FixedIntervalTimer

export type TimerType = Timer['type']