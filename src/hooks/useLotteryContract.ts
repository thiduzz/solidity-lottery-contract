import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import lotteryReducer, {
  ILotteryState,
  InitialLotteryState,
} from '../reducers/lottery'
import { actions, IActions } from '../reducers/lottery.action'

const useLotteryContract = () => {
  const state = useRef<ILotteryState>()
  const [lotteryState, lotteryDispatch] = useReducer(
    lotteryReducer,
    InitialLotteryState,
  )

  useEffect(() => {
    state.current = lotteryState
  }, [lotteryState])

  const initialActions = useMemo(() => {
    const funcs = <IActions>{}
    Object.keys(actions).forEach((key) => {
      funcs[key] = (...args: any) => {
        actions[key](...args)(lotteryDispatch, state.current)
      }
    })
    return funcs
  }, [])

  const [enhancedActions] = useState<IActions>(initialActions)

  useEffect(() => {
    enhancedActions.fetch()
  }, [enhancedActions])

  return {
    lottery: lotteryState,
    lotteryDispatch,
    actions: enhancedActions,
  }
}

export default useLotteryContract
