import { createFileRoute } from '@tanstack/react-router'
import { TimerView } from '@/features/timer'
import { useTimerSession } from '@/contexts/TimerSessionContext'
import { useEffect } from 'react'
import { z } from 'zod'

// Search params schema
const searchSchema = z.object({
  index: z.number().optional()
})

export const Route = createFileRoute('/timer/session/$sessionId')({
  component: TimerSessionPage,
  validateSearch: searchSchema
})

function TimerSessionPage() {
  const { sessionId } = Route.useParams()
  const { index = 0 } = Route.useSearch()
  const navigate = Route.useNavigate()

  const {
    currentSession,
    activeTimer,
    loadSession,
    nextTimer,
    previousTimer,
    addTimerToSession
  } = useTimerSession()

  // Load session on mount or when sessionId changes
  useEffect(() => {
    loadSession(sessionId)
  }, [sessionId, loadSession])

  // Handle navigation to timer builder
  const handleAddTimer = () => {
    const returnUrl = `/timer/session/${sessionId}?index=${currentSession?.currentTimerIndex || 0}`
    navigate({
      to: '/timer-builder',
      search: {
        session: sessionId,
        returnUrl: encodeURIComponent(returnUrl)
      }
    })
  }

  // Handle timer completion
  const handleComplete = () => {
    if (currentSession && currentSession.currentTimerIndex < currentSession.timerIds.length - 1) {
      nextTimer()
    } else {
      // Last timer completed, could navigate to summary or home
      navigate({ to: '/' })
    }
  }

  if (!activeTimer || !currentSession) {
    return <div>Loading timer...</div>
  }

  // Prepare props for TimerView
  const timerViewProps = {
    timer: activeTimer,
    session: {
      id: currentSession.id,
      name: currentSession.name,
      currentIndex: currentSession.currentTimerIndex,
      totalTimers: currentSession.timerIds.length,
      hasNext: currentSession.currentTimerIndex < currentSession.timerIds.length - 1,
      hasPrevious: currentSession.currentTimerIndex > 0
    },
    onNextTimer: currentSession.currentTimerIndex < currentSession.timerIds.length - 1 ? nextTimer : undefined,
    onPreviousTimer: currentSession.currentTimerIndex > 0 ? previousTimer : undefined,
    onAddTimer: handleAddTimer,
    onComplete: handleComplete
  }

  return <TimerView {...timerViewProps} />
}