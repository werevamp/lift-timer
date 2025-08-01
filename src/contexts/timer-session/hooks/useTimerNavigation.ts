import { useCallback } from 'react'
import { useNavigate } from '@tanstack/react-router'
import type { TimerSessionState } from '../types'

interface UseTimerNavigationProps {
  state: TimerSessionState
  onNavigate: (index: number) => void
}

export function useTimerNavigation({ state, onNavigate }: UseTimerNavigationProps) {
  const navigate = useNavigate()
  const { timers, currentTimerIndex } = state

  const navigateToTimer = useCallback(
    (index: number) => {
      if (index < 0 || index >= timers.length) return

      onNavigate(index)

      // Update URL
      navigate({
        to: '/timer/session',
        search: { index },
      })
    },
    [timers.length, navigate, onNavigate]
  )

  const nextTimer = useCallback(() => {
    const hasNext = currentTimerIndex < timers.length - 1
    if (hasNext) {
      navigateToTimer(currentTimerIndex + 1)
    }
  }, [currentTimerIndex, timers.length, navigateToTimer])

  const previousTimer = useCallback(() => {
    const hasPrevious = currentTimerIndex > 0
    if (hasPrevious) {
      navigateToTimer(currentTimerIndex - 1)
    }
  }, [currentTimerIndex, navigateToTimer])

  const goToTimer = useCallback(
    (index: number) => {
      navigateToTimer(index)
    },
    [navigateToTimer]
  )

  return {
    navigateToTimer,
    nextTimer,
    previousTimer,
    goToTimer,
    hasNextTimer: currentTimerIndex < timers.length - 1,
    hasPreviousTimer: currentTimerIndex > 0,
  }
}
