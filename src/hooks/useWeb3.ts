import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'

import web3Reducer, { InitialWeb3State, IWeb3State } from '../reducers/web3'
import { actions, IActions } from '../reducers/web3.action'

const useWeb3 = (initialContractAddress?: string | undefined) => {
  const memoContractAddress = useMemo<string | undefined>(
    () => initialContractAddress,
    [initialContractAddress],
  )

  const state = useRef<IWeb3State>()
  const [web3State, web3Dispatch] = useReducer(web3Reducer, InitialWeb3State)

  useEffect(() => {
    state.current = web3State
    return () => {}
  }, [web3State])

  const initialActions = useMemo(() => {
    const funcs = <IActions>{}
    Object.keys(actions).forEach((key) => {
      funcs[key] = async (...args: any) =>
        actions[key](...args)(web3Dispatch, state.current)
    })
    return funcs
  }, [])

  const [enhancedActions] = useState<IActions>(initialActions)

  const onAccountChange = useCallback(
    (accounts: Array<string>) => {
      if (accounts.length > 0) {
        enhancedActions.setUser(accounts[0])
      } else {
        enhancedActions.setUser(undefined)
      }
    },
    [enhancedActions],
  )

  useEffect(() => {
    window.ethereum.on('connect', () => enhancedActions.fetchUser())
    window.ethereum.on('disconnect', () => {
      enhancedActions.setUser(undefined)
    })
    window.ethereum.on('accountsChanged', onAccountChange)

    return () => {}
  }, [onAccountChange, enhancedActions])

  useEffect(() => {
    enhancedActions.fetchUser()
    if (memoContractAddress) {
      enhancedActions.fetchBalance(memoContractAddress)
    }
    return () => {}
  }, [enhancedActions, memoContractAddress])

  return {
    web3: web3State,
    web3Dispatch,
    actions: enhancedActions,
  }
}

export default useWeb3
