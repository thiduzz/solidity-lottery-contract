import { useCallback, useEffect, useState } from 'react'
import { LotteryContract } from '../contracts/lottery'
import { web3 } from '../clients/web3'

export const Status = () => {
  const [manager, setManager] = useState<string>('')
  const [joinersCount, setJoinersCount] = useState<number>(0)
  const [balance, setBalance] = useState<string>('')

  const fetchOwner = useCallback(async () => {
    const joiners = await LotteryContract.methods.getJoiners().call()
    setManager(await LotteryContract.methods.manager().call())
    setJoinersCount(joiners.length)
    setBalance(await web3.eth.getBalance(LotteryContract.options.address))
  }, [])

  useEffect(() => {
    fetchOwner()
  }, [fetchOwner])

  return (
    <div className="p-10 min-h-screen flex items-center justify-center bg-cool-gray-700">
      <h1 className="text-xl font-black text-white text-center">
        <p className="bg-gradient-to-r text-transparent bg-clip-text from-green-400 to-purple-500">
          Manager: {manager}
        </p>
        <p className="bg-gradient-to-r text-transparent bg-clip-text from-green-400 to-purple-500">
          Joiners: {joinersCount}
        </p>
        <p className="bg-gradient-to-r text-transparent bg-clip-text from-green-400 to-purple-500">
          Lottery Pot: {web3.utils.fromWei(balance, 'ether')} ether
        </p>
      </h1>
    </div>
  )
}
