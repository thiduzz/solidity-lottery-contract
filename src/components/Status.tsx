import { useCallback, useEffect, useState } from 'react'
import Web3Client from '../clients/web3'

type Props = {
  client: Web3Client
}

export const Status = ({ client }: Props) => {
  const [account, setAccounts] = useState<string[]>([])

  const fetchAccounts = useCallback(async () => {
    const response = await client.getAccounts()
    setAccounts(response)
  }, [client])

  useEffect(() => {
    fetchAccounts()
  }, [fetchAccounts])

  return (
    <div className="p-10 min-h-screen flex items-center justify-center bg-cool-gray-700">
      <h1 className="text-xl font-black text-white text-center">
        <span className="bg-gradient-to-r text-transparent bg-clip-text from-green-400 to-purple-500">
          {account}
        </span>
      </h1>
    </div>
  )
}
