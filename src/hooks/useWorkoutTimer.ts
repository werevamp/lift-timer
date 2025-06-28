import { useState, useEffect, useRef } from 'react'
import { TimerPhase } from '../types/timer'

interface UseWorkoutTimerReturn {
  workDuration: number
  restDuration: number
  timeRemaining: number
  phase: TimerPhase
  isRunning: boolean
  completedSets: number
  setWorkDuration: (duration: number) => void
  setRestDuration: (duration: number) => void
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
}

export const useWorkoutTimer = (
  initialWorkDuration = 30,
  initialRestDuration = 10
): UseWorkoutTimerReturn => {
  const [workDuration, setWorkDuration] = useState(initialWorkDuration)
  const [restDuration, setRestDuration] = useState(initialRestDuration)
  const [timeRemaining, setTimeRemaining] = useState(initialWorkDuration)
  const [phase, setPhase] = useState<TimerPhase>('idle')
  const [isRunning, setIsRunning] = useState(false)
  const [completedSets, setCompletedSets] = useState(0)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isRunning) return

    if (timeRemaining > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeRemaining((time) => time - 1)
      }, 1000)
    } else {
      handlePhaseTransition()
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, timeRemaining])

  const handlePhaseTransition = () => {
    if (phase === 'work') {
      setPhase('rest')
      setTimeRemaining(restDuration)
      setCompletedSets((sets) => sets + 1)
    } else if (phase === 'rest') {
      setPhase('work')
      setTimeRemaining(workDuration)
    }
  }

  const startTimer = () => {
    if (phase === 'idle') {
      setPhase('work')
      setTimeRemaining(workDuration)
    }
    setIsRunning(true)
  }

  const pauseTimer = () => setIsRunning(false)

  const resetTimer = () => {
    setIsRunning(false)
    setPhase('idle')
    setTimeRemaining(workDuration)
    setCompletedSets(0)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const handleWorkDurationChange = (value: number) => {
    setWorkDuration(value)
    if (phase === 'idle') setTimeRemaining(value)
  }

  return {
    workDuration,
    restDuration,
    timeRemaining,
    phase,
    isRunning,
    completedSets,
    setWorkDuration: handleWorkDurationChange,
    setRestDuration,
    startTimer,
    pauseTimer,
    resetTimer
  }
}