import { ChangeEvent, useCallback, useState } from 'react'

interface ITicketState {
  value: string
  inProgress: boolean
}

export const JoinForm = () => {
  const [ticket, setTicket] = useState<ITicketState>({
    value: '',
    inProgress: false,
  })

  const join = useCallback(async () => {
    const i = 1 + 1
    return i
  }, [])

  const valueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTicket({ value: e.target.value, inProgress: false })
  }

  return (
    <div className="my-5 flex flex-row items-center justify-center">
      <div className="relative mx-2">
        <input
          id="name"
          name="name"
          autoComplete="off"
          data-lpignore="true"
          type="text"
          placeholder="Value"
          onChange={valueChangeHandler}
          value={ticket.value}
          className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pl-2 pr-18 border-red-500"
        />

        <div className="absolute flex border border-transparent right-0 top-0 h-full w-16">
          <div className="flex items-center justify-center rounded-tl rounded-bl z-10 bg-gray-100 text-gray-600 text-lg h-full w-full">
            ether
          </div>
        </div>
      </div>
      <button
        onClick={join}
        onKeyDown={join}
        type="button"
        className="bg-red-500 px-5 py-3 text-xl shadow-sm font-medium tracking-wider  text-red-100 rounded-full hover:shadow-2xl hover:bg-red-600 mx-2"
      >
        Join
      </button>
    </div>
  )
}