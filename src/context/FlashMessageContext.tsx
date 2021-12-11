import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

interface IFlashMessage {
  closeable: boolean
  title: string
  message: string
  type: string
  timerInSeconds?: number
}

interface IFlashMessageContextState {
  show: (message: IFlashMessage) => void
  showError: (error: Error | string) => void
  showSuccess: (title: string, message?: string) => void
  close: () => void
  visible: boolean
  current: IFlashMessage | null
}

export const FlashMessageContext = createContext<IFlashMessageContextState>({
  show: () => {},
  showError: () => {},
  showSuccess: () => {},
  close: () => {},
  visible: false,
  current: null,
})

export const FlashMessageProvider = ({
  children,
}: PropsWithChildren<Record<never, never>>) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [current, setCurrent] = useState<IFlashMessage | null>(null)

  const show = useCallback((message: IFlashMessage) => {
    setCurrent(message)
    setVisible(true)
  }, [])

  const showError = useCallback(
    (error: Error | string) => {
      show({
        message: error instanceof Error ? error.message : error,
        type: 'error',
        title: 'Whoops!',
        timerInSeconds: 5,
        closeable: true,
      })
    },
    [show],
  )
  const showSuccess = useCallback(
    (title: string, message?: string) => {
      show({
        message: message ?? '',
        type: 'success',
        title,
        timerInSeconds: 5,
        closeable: true,
      })
    },
    [show],
  )
  const close = useCallback(() => {
    setVisible(false)
    setCurrent(null)
  }, [])

  const state = useMemo(
    () => ({ show, showError, showSuccess, close, visible, current }),
    [show, showError, showSuccess, close, visible, current],
  )

  return (
    <FlashMessageContext.Provider value={state}>
      {children}
    </FlashMessageContext.Provider>
  )
}

export const useFlashMessage = () => useContext(FlashMessageContext)
