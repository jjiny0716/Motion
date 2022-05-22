import { Action } from '../types.js'

export function createAction(type: string, payload: any): Action {
  return {
    type,
    payload,
  }
}