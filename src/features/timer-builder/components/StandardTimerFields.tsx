import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { DurationInput } from '@/components/ui/form'
import { TimerFormData } from '../schemas/timer.schema'

interface StandardTimerFieldsProps {
  register: UseFormRegister<TimerFormData>
  errors: FieldErrors<TimerFormData>
}

export function StandardTimerFields({ register, errors }: StandardTimerFieldsProps) {
  return (
    <DurationInput
      label="Duration"
      minuteProps={register('duration.minutes')}
      secondProps={register('duration.seconds')}
      error={errors.duration?.message}
    />
  )
}