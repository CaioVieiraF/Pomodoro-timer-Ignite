import { produce } from 'immer'
import { CycleDispatch } from './actions'

export interface Cycle {
  id: string,
  task: string,
  minutesAmount: number,
  startDate: Date,
  interruptedDate?: Date,
  endDate?: Date,
}

interface CycleState {
  cycles: Cycle[]
  activeCycleID: string | null
}

export function cyclesReducer(state: CycleState, action: any) {
  switch (action.type) {
    case CycleDispatch.CreateNewCycle:
      return produce(state, draft => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleID = action.payload.newCycle.id
      })
    case CycleDispatch.InterruptCycle: {
      const currentCycleIndex = state.cycles.findIndex(cycle => cycle.id === state.activeCycleID)

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, draft => {
        draft.activeCycleID = null
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
      })
    }
    case CycleDispatch.MarkCurrentCycleAsFinished: {
      const currentCycleIndex = state.cycles.findIndex(cycle => cycle.id === state.activeCycleID)

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, draft => {
        draft.activeCycleID = null
        draft.cycles[currentCycleIndex].endDate = new Date()
      })
    }
    default:
      return state
  }
}
