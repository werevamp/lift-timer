import { Button } from '@/components/ui'
import { useTimerSession } from '@/contexts/timer-session'
import { useNavigate } from '@tanstack/react-router'

export default function ClearTimers({ closeSettings }: { closeSettings: () => void }) {
  const { clearSession } = useTimerSession()
  const navigate = useNavigate()

  const clearSessionAndRedirect = () => {
    clearSession()
    navigate({
      to: '/timer-builder',
    })
    closeSettings()
  }

  return (
    <div>
      <Button variant="outline" onClick={clearSessionAndRedirect}>
        Clear all timers
      </Button>
    </div>
  )
}
