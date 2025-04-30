import { createContext, ReactNode, useEffect, useReducer, useState } from 'react'
import { createNewCycleAction, interruptCycleAction, markCurrentCycleAsFinishedAction } from '../reducers/cycles/actions'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import { differenceInSeconds } from 'date-fns'

interface CreateCycleData {
  task: string,
  minutesAmount: number
}

interface ICyclesContext {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleID: string | null
  markCurrentCycleAsFinished: () => void
  amountSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as ICyclesContext)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleID: null,
  }, (initialState) => {
    const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')

    if (storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON)
    }
    return initialState
  })

  const { cycles, activeCycleID } = cyclesState
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleID)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function createNewCycle(data: CreateCycleData) {
    const newId = String(new Date().getTime())
    const newCycle: Cycle = {
      id: newId,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(createNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCycleAction())
  }

  return (
    <CyclesContext.Provider value={{ activeCycle, activeCycleID, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed, createNewCycle, interruptCurrentCycle, cycles }}>
      {children}
    </CyclesContext.Provider>
  )
}
