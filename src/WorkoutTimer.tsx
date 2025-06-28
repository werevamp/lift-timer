import { useWorkoutTimer } from './hooks/useWorkoutTimer'
import { TimerDisplay } from './components/TimerDisplay'
import { TimerControls } from './components/TimerControls'
import { DurationInput } from './components/DurationInput'

export default function WorkoutTimer() {
  const {
    workDuration,
    restDuration,
    timeRemaining,
    phase,
    isRunning,
    completedSets,
    setWorkDuration,
    setRestDuration,
    startTimer,
    pauseTimer,
    resetTimer
  } = useWorkoutTimer()

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Workout Timer</h1>
        
        <TimerDisplay phase={phase} timeRemaining={timeRemaining} />

        {/* Sets Counter */}
        <div className="mb-6">
          <span className="text-lg text-gray-700">Completed Sets: </span>
          <span className="text-2xl font-bold text-blue-600">{completedSets}</span>
        </div>

        <TimerControls 
          isRunning={isRunning}
          phase={phase}
          onStart={startTimer}
          onPause={pauseTimer}
          onReset={resetTimer}
        />

        {/* Duration Settings */}
        <div className="space-y-4 text-left">
          <DurationInput
            label="Work Duration"
            value={workDuration}
            onChange={setWorkDuration}
            disabled={isRunning}
          />
          <DurationInput
            label="Rest Duration"
            value={restDuration}
            onChange={setRestDuration}
            disabled={isRunning}
          />
        </div>

        {/* Instructions */}
        <p className="text-gray-500 text-sm mt-6">
          Set your work and rest durations, then press Start to begin your workout!
        </p>
      </div>
    </div>
  )
}