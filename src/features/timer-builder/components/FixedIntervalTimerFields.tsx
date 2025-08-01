import { DurationInput, NumberInput } from '@/components/ui/form'

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
