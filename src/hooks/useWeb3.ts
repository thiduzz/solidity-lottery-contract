import { useCallback, useEffect, useState } from 'react'
import Web3Client, { IWeb3Client } from '../clients/web3'
import { IUser } from '../types/user'

export interface ILotteryStateWeb3 {
  balance: string
  inProgressBalance: boolean
}

const useWeb3 = (initialContractAddress?: string) => {
  const [currentUser, setCurrentUser] = useState<IUser>({
    address: '',
  })
  const [error, setError] = useState<Error | null>(null)
  const [inProgress, setInProgress] = useState(true)
  const [balance, setBalance] = useState<string>('')
  const [inProgressBalance, setInProgressBalance] = useState(false)
  const [client] = useState<IWeb3Client>(new Web3Client())

  const retrieveUser = useCallback(async () => {
    try {
      const accounts = await client.getCurrentUserAccounts()
      if (accounts !== undefined && accounts.length > 0) {
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

  const retrieveBalance = useCallback(
    async (contractAddress: string) => {
      setInProgressBalance(true)
      await setBalance(
        client.convertFromWeiToEth(
          await client.getContractBalance(contractAddress),
        ),
      )
      setInProgressBalance(false)
    },
    [client],
  )

  const onAccountChange = useCallback((accounts: Array<string>) => {
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
    if (initialContractAddress) {
      retrieveBalance(initialContractAddress)
    }
  }, [retrieveUser, retrieveBalance, initialContractAddress])

  return {
    client,
    inProgress,
    error,
    currentUser,
    balance,
    inProgressBalance,
    actions: { retrieveUser, retrieveBalance },
  }
}

export default useWeb3
