import { web3 } from '../clients/web3'
import { useLottery } from '../context/LotteryContext'

export const Status = () => {
  const { managerAddress, joiners, balance } = useLottery()

  return (
    <h1 className="text-xl font-black text-white text-center my-5">
      <p className="bg-gradient-to-r text-transparent bg-clip-text from-green-400 to-purple-500">
        Manager: {managerAddress}
      </p>
      <p className="bg-gradient-to-r text-transparent bg-clip-text from-green-400 to-purple-500">
        Joiners: {joiners.length}
      </p>
      <p className="bg-gradient-to-r text-transparent bg-clip-text from-green-400 to-purple-500">
        Lottery Pot: {web3.utils.fromWei(balance, 'ether')} ether
      </p>
    </h1>
  )
}
