import { ChangeEvent, useCallback, useState } from 'react'
import { useFlashMessage } from '../context/FlashMessageContext'
import { useLottery } from '../context/LotteryContext'
import { Loading, LoadingSizes, LoadingTypes } from './Loading'

export const JoinForm = () => {
  const [ticketValue, setTicketValue] = useState<string>('')

  const { inProgress } = useLottery()
  const { showSuccess } = useFlashMessage()

  const joinHandler = useCallback(
    async (e) => {
      e.preventDefault()

      showSuccess(
        'Success Title',
        'Message text with a reason of why something happened',
      )
    },
    [showSuccess],
  )

  const ticketValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTicketValue(e.target.value)
  }

  return (
    <form
      className="my-5 flex flex-row items-center justify-center"
      onSubmit={joinHandler}
    >
      <div className="relative mx-2">
        <input
          id="name"
          name="name"
          autoComplete="off"
          data-lpignore="true"
          type="number"
          placeholder="Value"
          onChange={ticketValueChangeHandler}
          value={ticketValue}
          className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pl-2 pr-18 border-red-500"
        />

        <div className="absolute flex border border-transparent right-0 top-0 h-full w-16">
          <div className="flex items-center justify-center rounded-tl rounded-bl z-10 bg-gray-100 text-gray-600 text-lg h-full w-full">
            ether
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
            <span className="flex-grow">Joining ...</span>
          </div>
        )}
        {!inProgress && 'Join'}
      </button>
    </form>
  )
}
