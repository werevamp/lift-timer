import { TimerPhase } from '../types/timer'

interface TimerControlsProps {
  isRunning: boolean
  phase: TimerPhase
  onStart: () => void
  onPause: () => void
  onReset: () => void
}

export const TimerControls = ({ 
  isRunning, 
  phase, 
  onStart, 
  onPause, 
  onReset 
}: TimerControlsProps) => (
  <div className="flex gap-3 justify-center mb-8">
    {!isRunning ? (
      <button
        onClick={onStart}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
      >
        {phase === 'idle' ? 'Start' : 'Resume'}
      </button>
    ) : (
      <button
        onClick={onPause}
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
      >
        Pause
      </button>
    )}
    <button
      onClick={onReset}
      className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
    >
      Reset
    </button>
  </div>
)