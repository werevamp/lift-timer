import { DurationInput } from '@/components/ui/form'
import { NumberInput } from '@/components/ui/form/react-hook-form'

export function FixedIntervalTimerFields() {
  return (
    <>
      <DurationInput
        label="Active Time"
        minutesName="activeTime.minutes"
        secondsName="activeTime.seconds"
      />
      <DurationInput
        label="Rest Time"
        minutesName="restTime.minutes"
        secondsName="restTime.seconds"
      />
      <NumberInput name="rounds" label="Rounds" min={1} max={99} required />
    </>
  )
}
