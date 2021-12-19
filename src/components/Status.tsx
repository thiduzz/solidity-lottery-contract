import { useLottery } from '../context/LotteryContext'

export const Status = () => {
  const { lottery, web3 } = useLottery()
  if (web3.state.inProgress.balance || lottery.state.inProgress.fetch) {
    return <div>Loading...</div>
  }
  return (
    <h1 className="text-xl font-black text-white text-center my-5">
      <p className="bg-gradient-to-r text-transparent bg-clip-text from-green-400 to-purple-500">
        Manager: {lottery.state.managerAddress}
      </p>
      <p className="bg-gradient-to-r text-transparent bg-clip-text from-green-400 to-purple-500">
        Joiners: {lottery.state.joiners.length}
      </p>
      <p className="bg-gradient-to-r text-transparent bg-clip-text from-green-400 to-purple-500">
        Lottery Fee:{' '}
        {web3.state.client.convertFromGweiToEth(lottery.state.fee.toString())}{' '}
        eth
      </p>
      <p className="bg-gradient-to-r text-transparent bg-clip-text from-green-400 to-purple-500">
        Lottery Pot: {web3.state.balance} ether
      </p>
    </h1>
  )
}
