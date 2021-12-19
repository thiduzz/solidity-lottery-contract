import useWeb3 from '../hooks/useWeb3'
import { useLottery } from '../context/LotteryContext'

export const Status = () => {
  const { state, stateWeb3 } = useLottery()
  const { client } = useWeb3()

  if (stateWeb3.inProgressBalance || state.inProgress.fetch) {
    return <div>Loading...</div>
  }
  return (
    <h1 className="text-xl font-black text-white text-center my-5">
      <p className="bg-gradient-to-r text-transparent bg-clip-text from-green-400 to-purple-500">
        Manager: {state.managerAddress}
      </p>
      <p className="bg-gradient-to-r text-transparent bg-clip-text from-green-400 to-purple-500">
        Joiners: {state.joiners.length}
      </p>
      <p className="bg-gradient-to-r text-transparent bg-clip-text from-green-400 to-purple-500">
        Lottery Fee: {client.convertFromGweiToEth(state.fee.toString())} eth
      </p>
      <p className="bg-gradient-to-r text-transparent bg-clip-text from-green-400 to-purple-500">
        Lottery Pot: {stateWeb3.balance} ether
      </p>
    </h1>
  )
}
