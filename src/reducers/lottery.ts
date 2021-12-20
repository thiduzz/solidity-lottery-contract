import { TransactionReceipt } from 'web3-core'
import { LotteryContract } from '../contracts/lottery'

enum LotteryActionKind {
  FETCH = 'FETCH',
  JOIN = 'JOIN',
  PICK_WINNER = 'PICK_WINNER',
  SET_PRICE = 'SET_PRICE',
  SET_PROGRESS = 'SET_PROGRESS',
  SET_ERROR = 'SET_ERROR',
}

export interface LotteryAction {
  type: LotteryActionKind
  payload: any
  receipt?: TransactionReceipt
}
export type LotteryProgressType =
  | 'init'
  | 'fetch'
  | 'join'
  | 'pickWinner'
  | 'setPrice'

export interface LotteryProgressPayload {
  type: LotteryProgressType
  value: boolean
}

export interface ILotteryProgress {
  init: boolean
  fetch: boolean
  join: boolean
  pickWinner: boolean
  setPrice: boolean
}

export interface ILotteryState {
  managerAddress: string
  joiners: Array<string>
  fee: number
  inProgress: ILotteryProgress
  error: Error | null
}

export const InitialLotteryState: ILotteryState = {
  fee: 0,
  managerAddress: '',
  joiners: [],
  inProgress: {
    init: true,
    fetch: false,
    join: false,
    pickWinner: false,
    setPrice: false,
  },

  error: null,
}

export const setInProgress = (
  progressAction: LotteryProgressType,
  value: boolean,
) => ({
  type: LotteryActionKind.SET_PROGRESS,
  payload: <LotteryProgressPayload>{ type: progressAction, value },
})

export const setError = (error: Error | null) => ({
  type: LotteryActionKind.SET_ERROR,
  payload: { error },
})

export const setPrice = async (address: string, value: string) => {
  await LotteryContract.methods
    .setFee(value)
    .send({ from: address, gas: '1000000' })
  return {
    type: LotteryActionKind.SET_PRICE,
    payload: { fee: value },
  }
}

export const pickWinner = async (address: string) => {
  const winner = await LotteryContract.methods.pickWinner().send({
    from: address,
    gas: '1000000',
  })
  debugger // eslint-disable-line
  console.log(winner) // eslint-disable-line

  return {
    type: LotteryActionKind.PICK_WINNER,
    payload: { winner },
  }
}

export const fetch = async () => {
  const joiners = await LotteryContract.methods.getJoiners().call()

  const managerAddress: Lowercase<string> = await LotteryContract.methods
    .manager()
    .call()

  const fee: number = await LotteryContract.methods.gweiFee().call()

  return {
    type: LotteryActionKind.FETCH,
    payload: { joiners, fee, managerAddress },
  }
}

export const join = async (address: string, value: string) =>
  LotteryContract.methods
    .join()
    .send({
      from: address,
      gas: '1000000',
      value,
    })
    .then((receipt: TransactionReceipt) => ({
      type: LotteryActionKind.JOIN,
      payload: { address },
      receipt,
    }))

// Our reducer function that uses a switch statement to handle our actions
const lotteryReducer = (state: ILotteryState, action: LotteryAction) => {
  const { type, payload } = action
  switch (type) {
    case LotteryActionKind.FETCH:
      return {
        ...state,
        fee: payload.fee,
        joiners: payload.joiners,
        managerAddress: payload.managerAddress,
      }
    case LotteryActionKind.JOIN:
      return {
        ...state,
        joiners: [payload.address, ...state.joiners],
      }
    case LotteryActionKind.SET_ERROR:
      return {
        ...state,
        error: payload.error,
      }
    case LotteryActionKind.SET_PROGRESS:
      const progressState = payload as LotteryProgressPayload
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

export default lotteryReducer
