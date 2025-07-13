import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { DurationInput, FormField } from '@/components/ui/form'
import { TimerFormData } from '../schemas/timer.schema'
import styles from './TimerBuilder.module.scss'

interface FixedIntervalTimerFieldsProps {
  register: UseFormRegister<TimerFormData>
  errors: FieldErrors<TimerFormData>
}

export function FixedIntervalTimerFields({ register, errors }: FixedIntervalTimerFieldsProps) {
  return (
    <>
      <DurationInput
        label="Active Time"
        minuteProps={register('activeTime.minutes')}
        secondProps={register('activeTime.seconds')}
        error={errors.activeTime?.message}
      />
      <DurationInput
        label="Rest Time"
        minuteProps={register('restTime.minutes')}
        secondProps={register('restTime.seconds')}
        error={errors.restTime?.message}
      />
      <FormField label="Rounds" error={errors.rounds?.message}>
        <input type="number" min="1" max="99" {...register('rounds')} className={styles.input} />
      </FormField>
    </>
  )
}
