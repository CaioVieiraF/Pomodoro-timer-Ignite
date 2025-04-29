import { CountdownInput, FormContainer, TaskInput } from "./styles";

export function NewCycleForm() {
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
			<CountdownInput id="minutesAmount" type="number" disabled={!!activeCycle} placeholder="00" step={5} min={1} max={60} {...register('minutesAmount', { valueAsNumber: true })} />

			<span>minutos.</span>
		</FormContainer>
	);
}
