import { TimerPhase, PHASE_CONFIGS } from '../types/timer'
import { formatTime } from '../utils/time'

interface TimerDisplayProps {
  phase: TimerPhase
  timeRemaining: number
}

export const TimerDisplay = ({ phase, timeRemaining }: TimerDisplayProps) => {
  const phaseConfig = PHASE_CONFIGS[phase]
  
  return (
    <div className={`${phaseConfig.color} text-white rounded-lg p-8 mb-6`}>
      <div className="text-2xl font-semibold mb-2 uppercase">
        {phaseConfig.label}
      </div>
      <div className="text-6xl font-bold font-mono">
        {formatTime(timeRemaining)}
      </div>
    </div>
  )
}