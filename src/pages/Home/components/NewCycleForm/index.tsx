import { useContext } from 'react'
import { CountdownInput, FormContainer, TaskInput } from './styles'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CycleContext'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task"> Vou trabalhar em</label>
      <TaskInput id="task" list="task-suggestion" disabled={!!activeCycle} placeholder="Dê um nome para o seu projeto" {...register('task')} />

      <datalist id="task-suggestion">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
        <option value="Banana" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <CountdownInput id="minutesAmount" type="number" disabled={!!activeCycle} placeholder="00" step={5} min={5} max={60} {...register('minutesAmount', { valueAsNumber: true })} />

      <span>minutos.</span>
    </FormContainer>
  )
}
