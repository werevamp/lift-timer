import { DurationInput } from '@/components/ui/form'

export function StandardTimerFields() {
  return (
    <DurationInput label="Duration" minutesName="duration.minutes" secondsName="duration.seconds" />
  )
}
