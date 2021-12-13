import { useCallback, useEffect, useState } from 'react'
import useWeb3 from '../hooks/useWeb3'
import { LotteryContract } from '../contracts/lottery'
import { useLottery } from '../context/LotteryContext'

export const Status = () => {
  const { lottery } = useLottery()
  const { client } = useWeb3()
  const [balance, setBalance] = useState<string>('')

  const retrieveBalance = useCallback(async () => {
    const value = client.convertFromWeiToEth(
      await client.getContractBalance(LotteryContract.options.address),
    )
    setBalance(value)
  }, [client])

  useEffect(() => {
    retrieveBalance()
  }, [retrieveBalance])

  return (
    <h1 className="text-xl font-black text-white text-center my-5">
      <p className="bg-gradient-to-r text-transparent bg-clip-text from-green-400 to-purple-500">
        Manager: {lottery.managerAddress}
      </p>
      <p className="bg-gradient-to-r text-transparent bg-clip-text from-green-400 to-purple-500">
        Joiners: {lottery.joiners.length}
      </p>
      <p className="bg-gradient-to-r text-transparent bg-clip-text from-green-400 to-purple-500">
        Lottery Pot: {balance} ether
      </p>
    </h1>
  )
}
