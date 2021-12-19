import { ChangeEvent, useCallback, useState } from 'react'
import { Loading, LoadingSizes, LoadingTypes } from './ui/Loading'
import { useLottery } from '../context/LotteryContext'
import { useFlashMessage } from '../context/FlashMessageContext'

export const SetPriceForm = () => {
  const {
    lottery: { actions },
    web3: {
      state: { user },
    },
  } = useLottery()
  const [price, setPrice] = useState<string>('')
  const [inProgress, setInProgress] = useState<boolean>(false)
  const { showSuccess, showError } = useFlashMessage()

  const priceHandler = useCallback(
    async (e) => {
      e.preventDefault()
      try {
        setInProgress(true)
        await actions.setPrice(user.address, price)
        showSuccess('Yeah!', 'Price Updated!')
      } catch (error) {
        showError(error as Error)
      } finally {
        setInProgress(false)
        await actions.fetch()
      }
    },
    [showSuccess, showError, actions, user.address, price],
  )

  const priceValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value)
  }

  return (
    <form
      className="my-5 flex flex-row items-center justify-center"
      onSubmit={priceHandler}
    >
      <div className="relative mx-2">
        <input
          id="name"
          name="name"
          autoComplete="off"
          data-lpignore="true"
          type="number"
          placeholder="Price"
          onChange={priceValueChangeHandler}
          value={price}
          className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pl-2 pr-18 border-red-500"
        />

        <div className="absolute flex border border-transparent right-0 top-0 h-full w-16">
          <div className="flex items-center justify-center rounded-tl rounded-bl z-10 bg-gray-100 text-gray-600 text-lg h-full w-full">
            wei
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="bg-red-500 px-5 py-3 text-xl w-64 shadow-sm font-medium tracking-wider  text-red-100 rounded-full hover:shadow-2xl hover:bg-red-600 mx-2"
      >
        {inProgress && (
          <div className="flex flex-row items-center justify-center w-full">
            <Loading
              className="self-start"
              type={LoadingTypes.PLAIN}
              size={LoadingSizes.SMALL}
            />
            <span className="flex-grow">Updating ...</span>
          </div>
        )}
        {!inProgress && 'Update'}
      </button>
    </form>
  )
}
