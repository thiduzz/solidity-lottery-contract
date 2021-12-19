import { Dispatch } from 'react'
import {
  fetch,
  join,
  LotteryAction,
  pickWinner,
  setError,
  setInProgress,
  setPrice,
} from './lottery'

export interface IActions {
  fetch(): void
  join(address: string, value: string): void
  setPrice(address: string, value: string): void
  pickWinner(address: string): void
}

export interface IEnhancedActions {
  fetch(dispatch: Dispatch<LotteryAction>): void
  join(address: string, value: string, dispatch: Dispatch<LotteryAction>): void
  setPrice(
    address: string,
    value: string,
    dispatch: Dispatch<LotteryAction>,
  ): void
  pickWinner(address: string, dispatch: Dispatch<LotteryAction>): void
}

export const actions: IEnhancedActions = {
  fetch: () => async (dispatch: Dispatch<LotteryAction>) => {
    try {
      dispatch(setInProgress('fetch', true))
      dispatch(await fetch())
    } catch (e) {
      dispatch(setError(e as Error))
    } finally {
      dispatch(setInProgress('fetch', false))
      dispatch(setInProgress('init', false))
    }
  },
  join:
    (address: string, value: string) =>
    async (dispatch: Dispatch<LotteryAction>) => {
      try {
        dispatch(setInProgress('join', false))
        dispatch(setError(null))
        dispatch(await join(address, value))
      } catch (e) {
        dispatch(setError(e as Error))
      } finally {
        dispatch(setInProgress('join', false))
      }
    },
  setPrice:
    (address: string, value: string) =>
    async (dispatch: Dispatch<LotteryAction>) => {
      try {
        dispatch(setError(null))
        dispatch(setInProgress('setPrice', true))
        dispatch(await setPrice(address, value))
      } catch (e) {
        dispatch(setError(e as Error))
      } finally {
        dispatch(setInProgress('setPrice', false))
      }
    },
  pickWinner:
    (address: string) => async (dispatch: Dispatch<LotteryAction>) => {
      try {
        dispatch(await pickWinner(address))
        dispatch(setInProgress('pickWinner', false))
        dispatch(setError(null))
      } catch (e) {
        dispatch(setError(e as Error))
      } finally {
        dispatch(setInProgress('pickWinner', false))
      }
    },
}

export default actions
