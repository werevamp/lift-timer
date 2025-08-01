import { DurationInput } from '@/components/ui/form'
import { TextInput } from '@/components/ui/form/react-hook-form'

export function StandardTimerFields() {
  return (
    <>
      <DurationInput
        label="Duration"
        minutesName="duration.minutes"
        secondsName="duration.seconds"
      />
      <TextInput label="test" name="test" placeholder="wooo" />
    </>
  )
}
