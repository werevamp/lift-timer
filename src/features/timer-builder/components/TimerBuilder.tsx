import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormField } from '@/components/ui/form'
import { Timer } from '../types/timer.types'
import { timerFormSchema, TimerFormData } from '../schemas/timer.schema'
import { createTimerFromFormData } from '../utils/timer-creation'
import { TIMER_TYPE_OPTIONS, DEFAULT_FORM_VALUES } from '../constants/timer-defaults'
import { StandardTimerFields } from './StandardTimerFields'
import { FixedIntervalTimerFields } from './FixedIntervalTimerFields'
import styles from './TimerBuilder.module.scss'

interface TimerBuilderProps {
  onSubmit: (timer: Timer) => void
}

export default function TimerBuilder({ onSubmit }: TimerBuilderProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TimerFormData>({
    resolver: zodResolver(timerFormSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  })

  const selectedType = watch('type')

  const handleFormSubmit = (data: TimerFormData) => {
    const timer = createTimerFromFormData(data)
    if (timer) {
      onSubmit(timer)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <FormField label="Timer Type" error={errors.type?.message}>
        <select {...register('type')} className={styles.select}>
          {TIMER_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FormField>

      {selectedType === 'standard' && (
        <StandardTimerFields register={register} errors={errors} />
      )}

      {selectedType === 'fixed-interval' && (
        <FixedIntervalTimerFields register={register} errors={errors} />
      )}

      <button type="submit" className={styles.submitButton}>
        Create Timer
      </button>
    </form>
  )
}

