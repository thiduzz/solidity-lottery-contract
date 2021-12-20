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
        return await join(address, value)
          .then((actionResult: LotteryAction) => {
            dispatch(actionResult)
            dispatch(setInProgress('join', false))
            return actionResult.receipt
          })
          .catch((e) => {
            throw e
          })
      } catch (e) {
        dispatch(setError(e as Error))
        throw e
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
        debugger // eslint-disable-line

        return await pickWinner(address)
          .then((actionResult: LotteryAction) => {
            dispatch(actionResult)
            dispatch(setInProgress('pickWinner', false))
            dispatch(setError(null))
            return actionResult.payload.winner
          })
          .catch((e) => {
            throw e
          })
      } catch (e) {
        dispatch(setError(e as Error))
        throw e
      }
    },
}

export default actions
