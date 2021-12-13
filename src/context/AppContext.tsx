import { createContext, PropsWithChildren, useContext, useMemo } from 'react'
import { Loading, LoadingSizes, LoadingTypes } from '../components/ui/Loading'
import useWeb3 from '../hooks/useWeb3'
import { IUser } from '../types/user'
import Web3Client, { IWeb3Client } from '../clients/web3'

interface IAppContext {
  inProgress: boolean
  error: Error | null
  currentUser: IUser
  client: IWeb3Client
}

export const AppContext = createContext<IAppContext>({
  inProgress: true,
  error: null,
  currentUser: { address: '' },
  client: new Web3Client(),
})

export const AppProvider = ({
  children,
}: PropsWithChildren<Record<never, never>>) => {
  const { client, currentUser, error, inProgress } = useWeb3()

  const state = useMemo(
    () => ({
      inProgress,
      error,
      currentUser,
      client,
    }),
    [inProgress, error, currentUser, client],
  )

  if (inProgress) {
    return (
      <Loading size={LoadingSizes.FULLSCREEN} type={LoadingTypes.GRADIENT} />
    )
  }

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
