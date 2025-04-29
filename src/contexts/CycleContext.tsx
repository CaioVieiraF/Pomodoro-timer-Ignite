import { createContext, ReactNode, useReducer, useState } from "react"

interface Cycle {
  id: string,
  task: string,
  minutesAmount: number,
  startDate: Date,
  interruptedDate?: Date,
  endDate?: Date,
}

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

enum CycleDispatch {
  MarkCurrentCycleAsFinished,
  CreateNewCycle,
  InterruptCycle
}


export const CyclesContext = createContext({} as ICyclesContext)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
    if (action.type === CycleDispatch.CreateNewCycle) {
      return [...state, action.payload.newCycle]
    }

    return state
  }, [])
  const [activeCycleID, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleID)

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch({
      type: CycleDispatch.MarkCurrentCycleAsFinished,
      payload: {
        activeCycleID
      }
    })
    //setCycles(state =>
    //  state.map(cycle => {
    //    if (cycle.id === activeCycleID) {
    //      return { ...cycle, endDate: new Date() }
    //    } else {
    //      return cycle
    //    }
    //  })
    //)
  }

  function createNewCycle(data: CreateCycleData) {
    const newId = String(new Date().getTime())
    const newCycle: Cycle = {
      id: newId,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    dispatch({
      type: CycleDispatch.CreateNewCycle,
      payload: {
        newCycle
      }
    })
    //setCycles(state => [...state, newCycle])
    setActiveCycleId(newId)
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch({
      type: CycleDispatch.InterruptCycle,
      payload: {
        activeCycleID
      }
    })
    //setCycles(state =>
    //  state.map(cycle => {
    //    if (cycle.id === activeCycleID) {
    //      return { ...cycle, interruptedDate: new Date() }
    //    } else {
    //      return cycle
    //    }
    //  })
    //)

    setActiveCycleId(null)
  }

  return (
    <CyclesContext.Provider value={{ activeCycle, activeCycleID, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed, createNewCycle, interruptCurrentCycle, cycles }}>
      {children}
    </CyclesContext.Provider>
  )
}
