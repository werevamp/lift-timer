export type TimerPhase = 'work' | 'rest' | 'idle'

export interface PhaseConfig {
  color: string
  textColor: string
  label: string
}

export const PHASE_CONFIGS: Record<TimerPhase, PhaseConfig> = {
  work: { color: 'bg-red-500', textColor: 'text-red-600', label: 'Work' },
  rest: { color: 'bg-green-500', textColor: 'text-green-600', label: 'Rest' },
  idle: { color: 'bg-gray-500', textColor: 'text-gray-600', label: 'Ready to Start' }
}