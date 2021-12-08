import { useCallback, useEffect, useState } from 'react'
import Web3Client from '../clients/web3'
import { LotteryContract } from '../contracts/lottery'

type Props = {
  client: Web3Client
}

export const Status = ({ client }: Props) => {
  const [manager, setManager] = useState<string>('')

  const fetchOwner = useCallback(async () => {
    // eslint-disable-next-line
    console.log(LotteryContract.options.address)
    const response = await LotteryContract.methods.manager().call()
    setManager(response)
  }, [])

  // eslint-disable-next-line
  console.log(client)

  useEffect(() => {
    fetchOwner()
  }, [fetchOwner])

  return (
    <div className="p-10 min-h-screen flex items-center justify-center bg-cool-gray-700">
      <h1 className="text-xl font-black text-white text-center">
        <span className="bg-gradient-to-r text-transparent bg-clip-text from-green-400 to-purple-500">
          {manager}
        </span>
      </h1>
    </div>
  )
}
