import { Cycle } from './reducer'

export enum CycleDispatch {
  MarkCurrentCycleAsFinished = 'MARK_CURRENT_CYCLE_AS_FINISHED',
  CreateNewCycle = 'CREATE_NEW_CYCLE',
  InterruptCycle = 'INTERRUPT_CYCLE',
}

export function createNewCycleAction(newCycle: Cycle) {
  return {
    type: CycleDispatch.CreateNewCycle,
    payload: {
      newCycle,
    },
  }
}

export function interruptCycleAction() {
  return {
    type: CycleDispatch.InterruptCycle,
  }
}

export function markCurrentCycleAsFinishedAction() {
  return {
    type: CycleDispatch.MarkCurrentCycleAsFinished,
  }
}
