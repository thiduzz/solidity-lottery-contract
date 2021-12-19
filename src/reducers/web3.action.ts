import { Dispatch } from 'react'
import {
  setUser,
  setError,
  setInProgress,
  IWeb3State,
  fetchUser,
  fetchBalance,
  Web3Action,
} from './web3'

export interface IActions {
  fetchBalance(contractAddress: string): void
  fetchUser(): void
  setUser(address: string | undefined): void
}

export interface IEnhancedActions {
  fetchBalance(
    address: string,
    dispatch: Dispatch<Web3Action>,
    state: IWeb3State,
  ): void
  fetchUser(
    address: string,
    dispatch: Dispatch<Web3Action>,
    state: IWeb3State,
  ): void
  setUser(address: string | undefined, dispatch: Dispatch<Web3Action>): void
}

export const actions: IEnhancedActions = {
  fetchUser:
    () => async (dispatch: Dispatch<Web3Action>, state: IWeb3State) => {
      try {
        dispatch(setInProgress('user', true))
        dispatch(await fetchUser(state.client))
      } catch (e) {
        dispatch(setError(e as Error))
      } finally {
        dispatch(setInProgress('user', false))
      }
    },
  setUser:
    (address: string | undefined) => async (dispatch: Dispatch<Web3Action>) => {
      dispatch(setUser(address))
    },
  fetchBalance:
    (address: string) =>
    async (dispatch: Dispatch<Web3Action>, state: IWeb3State) => {
      try {
        dispatch(setInProgress('balance', true))
        dispatch(await fetchBalance(state.client, address))
      } catch (e) {
        dispatch(setError(e as Error))
      } finally {
        dispatch(setInProgress('balance', false))
      }
    },
}

export default actions
