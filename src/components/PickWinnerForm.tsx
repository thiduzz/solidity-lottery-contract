import { useCallback, useState } from 'react'
import { Loading, LoadingSizes, LoadingTypes } from './ui/Loading'
import { useLottery } from '../context/LotteryContext'
import { useFlashMessage } from '../context/FlashMessageContext'
import { LotteryContract } from '../contracts/lottery'

export const PickWinnerForm = () => {
  const {
    lottery: { actions },
    web3: {
      state: { user },
      actions: web3Actions,
    },
  } = useLottery()
  const [inProgress, setInProgress] = useState<boolean>(false)
  const { showSuccess, showError } = useFlashMessage()

  const pickWinnerHandler = useCallback(
    async (e) => {
      e.preventDefault()
      try {
        setInProgress(true)
        const winner = await actions.pickWinner(user.address)
        console.log(winner) // eslint-disable-line
        showSuccess('Yeah!', `And the winner is: ${winner}`)
        await web3Actions.fetchBalance(LotteryContract.options.address)
      } catch (error) {
        showError(error as Error)
      } finally {
        setInProgress(false)
        await actions.fetch()
      }
    },
    [showSuccess, showError, actions, user.address, web3Actions],
  )

  return (
    <form
      className="my-5 flex flex-row items-center justify-center"
      onSubmit={pickWinnerHandler}
    >
      <button
        type="submit"
        className="bg-green-500 px-5 py-3 text-xl w-64 shadow-sm font-medium tracking-wider  text-red-100 rounded-full hover:shadow-2xl hover:bg-red-600 mx-2"
      >
        {inProgress && (
          <div className="flex flex-row items-center justify-center w-full">
            <Loading
              className="self-start"
              type={LoadingTypes.PLAIN}
              size={LoadingSizes.SMALL}
            />
            <span className="flex-grow">Picking Winner ...</span>
          </div>
        )}
        {!inProgress && 'Pick Winner'}
      </button>
    </form>
  )
}
