import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, SelectInput } from '@/components/ui/form'
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
  const methods = useForm<TimerFormData>({
    resolver: zodResolver(timerFormSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  })

  const selectedType = methods.watch('type')

  const handleFormSubmit = (data: TimerFormData) => {
    const timer = createTimerFromFormData(data)
    if (timer) {
      onSubmit(timer)
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleFormSubmit} className={styles.form}>
      <SelectInput name="type" label="Timer Type" options={TIMER_TYPE_OPTIONS} />

      {selectedType === 'standard' && <StandardTimerFields />}

      {selectedType === 'fixed-interval' && <FixedIntervalTimerFields />}

      <button type="submit" className={styles.submitButton}>
        Create Timer
      </button>
    </FormProvider>
  )
}
