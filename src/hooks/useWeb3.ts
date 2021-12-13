import { useCallback, useEffect, useState } from 'react'
import Web3Client, { IWeb3Client } from '../clients/web3'
import { IUser } from '../types/user'
import { useLottery } from '../context/LotteryContext'

const useWeb3 = () => {
  const { lottery } = useLottery()
  const [currentUser, setCurrentUser] = useState<IUser>({
    address: '',
  })
  const [error, setError] = useState<Error | null>(null)
  const [inProgress, setInProgress] = useState(true)
  const [client] = useState<IWeb3Client>(new Web3Client())

  const retrieveUser = useCallback(async () => {
    try {
      const accounts = await client.getCurrentUserAccounts()
      if (accounts !== undefined && accounts.length > 0) {
        // eslint-disable-next-line
        debugger
        setCurrentUser({
          address: accounts[0],
        })
      }
    } catch (e) {
      setError(e as Error)
    } finally {
      setInProgress(false)
    }
  }, [client])

  const onAccountChange = useCallback((accounts: Array<string>) => {
    // eslint-disable-next-line
    debugger
    if (accounts.length > 0) {
      setCurrentUser({
        address: accounts[0],
      })
    } else {
      setCurrentUser({ address: '' })
    }
  }, [])

  useEffect(() => {
    window.ethereum.on('connect', retrieveUser)
    window.ethereum.on('disconnect', () => {
      setCurrentUser({ address: '' })
    })
    window.ethereum.on('accountsChanged', onAccountChange)
  }, [onAccountChange, retrieveUser])

  useEffect(() => {
    retrieveUser()
  }, [retrieveUser, lottery.managerAddress])

  return {
    client,
    inProgress,
    error,
    currentUser,
  }
}

export default useWeb3
