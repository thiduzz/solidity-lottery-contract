import { useCallback, useEffect, useState } from 'react'
import { LotteryContract } from '../contracts/lottery'
import { web3 } from '../clients/web3'

interface ILotteryState {
  managerAddress: string
  joiners: Array<string>
  balance: string
}

export const Status = () => {
  const [lotteryState, setLotteryState] = useState<ILotteryState>({
    managerAddress: '',
    joiners: [],
    balance: '',
  })

  const fetchOwner = useCallback(async () => {
    const joiners = await LotteryContract.methods.getJoiners().call()
    const balance = await web3.eth.getBalance(LotteryContract.options.address)
    const managerAddress = await LotteryContract.methods.manager().call()
    setLotteryState({
      managerAddress,
      joiners,
      balance,
    })
  }, [])

  useEffect(() => {
    fetchOwner()
  }, [fetchOwner])

  return (
    <h1 className="text-xl font-black text-white text-center">
      <p className="bg-gradient-to-r text-transparent bg-clip-text from-green-400 to-purple-500">
        Manager: {lotteryState.managerAddress}
      </p>
      <p className="bg-gradient-to-r text-transparent bg-clip-text from-green-400 to-purple-500">
        Joiners: {lotteryState.joiners.length}
      </p>
      <p className="bg-gradient-to-r text-transparent bg-clip-text from-green-400 to-purple-500">
        Lottery Pot: {web3.utils.fromWei(lotteryState.balance, 'ether')} ether
      </p>
    </h1>
  )
}
