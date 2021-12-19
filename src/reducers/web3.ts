import { TransactionReceipt } from 'web3-core'
import Web3Client, { IWeb3Client } from '../clients/web3'
import { IUser } from '../types/user'

enum Web3ActionKind {
  FETCH_BALANCE = 'FETCH_BALANCE',
  SET_USER = 'SET_USER',
  SET_PROGRESS = 'SET_PROGRESS',
  SET_ERROR = 'SET_ERROR',
  SET_CLIENT = 'SET_CLIENT',
}

export type Web3ProgressType = 'balance' | 'user'

export interface Web3Action {
  type: Web3ActionKind
  payload: any
  receipt?: TransactionReceipt
}

export interface IWeb3State {
  inProgress: IWeb3Progress
  client: IWeb3Client
  balance: string
  user: IUser
  error: Error | null
}

export interface IWeb3Progress {
  balance: boolean
  user: boolean
}

export interface Web3ProgressPayload {
  type: Web3ProgressType
  value: boolean
}

export const InitialWeb3State: IWeb3State = {
  user: {},
  error: null,
  client: new Web3Client(),
  balance: '',
  inProgress: {
    user: true,
    balance: false,
  },
}

export const setInProgress = (
  progressAction: Web3ProgressType,
  value: boolean,
) => ({
  type: Web3ActionKind.SET_PROGRESS,
  payload: <Web3ProgressPayload>{ type: progressAction, value },
})

export const setError = (error: Error | null) => ({
  type: Web3ActionKind.SET_ERROR,
  payload: { error },
})

export const setUser = (userAddress?: string) => ({
  type: Web3ActionKind.SET_USER,
  payload: { address: userAddress },
})

export const fetchBalance = async (
  client: IWeb3Client,
  contractAddress: string,
) => {
  const balance: string = client.convertFromWeiToEth(
    await client.getContractBalance(contractAddress),
  )

  return {
    type: Web3ActionKind.FETCH_BALANCE,
    payload: { balance },
  }
}

export const fetchUser = async (client: IWeb3Client) => {
  const accounts = await client.getCurrentUserAccounts()
  if (accounts !== undefined && accounts.length > 0) {
    return setUser(accounts[0])
  }
  return setUser(undefined)
}

const web3Reducer = (state: IWeb3State, action: Web3Action) => {
  const { type, payload } = action
  switch (type) {
    case Web3ActionKind.FETCH_BALANCE:
      return {
        ...state,
        balance: payload.balance,
      }
    case Web3ActionKind.SET_CLIENT:
      return {
        ...state,
        client: payload.client,
      }
    case Web3ActionKind.SET_USER:
      return {
        ...state,
        user: <IUser>{ address: payload.address },
      }
    case Web3ActionKind.SET_ERROR:
      return {
        ...state,
        error: payload.error,
      }
    case Web3ActionKind.SET_PROGRESS:
      const progressState = payload as Web3ProgressPayload
      return {
        ...state,
        inProgress: {
          ...state.inProgress,
          [progressState.type]: progressState.value,
        },
      }
    default:
      return state
  }
}

export default web3Reducer
