import { ReactNode } from 'react'
import { FormProvider as RHFFormProvider, UseFormReturn, FieldValues } from 'react-hook-form'

interface FormProviderProps<TFieldValues extends FieldValues = FieldValues> {
  methods: UseFormReturn<TFieldValues>
  onSubmit: (data: TFieldValues) => void
  children: ReactNode
  className?: string
}

export default function FormProvider<TFieldValues extends FieldValues = FieldValues>({
  methods,
  onSubmit,
  children,
  className,
}: FormProviderProps<TFieldValues>) {
  return (
    <RHFFormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </RHFFormProvider>
  )
}
