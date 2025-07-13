import { z } from 'zod'

const durationSchema = z.object({
  minutes: z.number().min(0).max(99),
  seconds: z.number().min(0).max(59),
})

export const standardTimerSchema = z.object({
  type: z.literal('standard'),
  settings: z.object({
    duration: durationSchema,
  }),
})

export const fixedIntervalTimerSchema = z.object({
  type: z.literal('fixed-interval'),
  settings: z.object({
    activeTime: durationSchema,
    restTime: durationSchema,
    rounds: z.number().min(1).max(99),
  }),
})

export const timerSchema = z.discriminatedUnion('type', [
  standardTimerSchema,
  fixedIntervalTimerSchema,
])

// Duration schema for form inputs
const formDurationSchema = z.object({
  minutes: z.union([z.string().transform((val) => parseInt(val, 10) || 0), z.number()]),
  seconds: z.union([z.string().transform((val) => parseInt(val, 10) || 0), z.number()]),
})

// Form schema for the timer builder
export const timerFormSchema = z
  .object({
    type: z.enum(['standard', 'fixed-interval']),
    duration: formDurationSchema.optional(),
    activeTime: formDurationSchema.optional(),
    restTime: formDurationSchema.optional(),
    rounds: z.union([z.string().transform((val) => parseInt(val, 10) || 1), z.number()]).optional(),
  })
  .refine(
    (data) => {
      if (data.type === 'standard') {
        return data.duration !== undefined
      }
      if (data.type === 'fixed-interval') {
        return (
          data.activeTime !== undefined && data.restTime !== undefined && data.rounds !== undefined
        )
      }
      return false
    },
    {
      message: 'Required fields are missing for the selected timer type',
    }
  )

export type TimerFormData = z.infer<typeof timerFormSchema>
