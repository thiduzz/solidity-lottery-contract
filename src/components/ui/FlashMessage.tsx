import { useEffect } from 'react'
import { IoCloseCircle } from 'react-icons/io5'
import { TransitionGroup, Transition } from 'react-transition-group'
import { useFlashMessage } from '../../context/FlashMessageContext'
import './FlashMessage.scss'

const FlashMessage = () => {
  const { visible, current, close } = useFlashMessage()

  useEffect(() => {
    if (current && current.timerInSeconds) {
      const interval = setInterval(close, 1000 * current.timerInSeconds)
      return () => clearInterval(interval)
    }
    return () => {}
  }, [current, close])

  const transitionStyles = {
    entering: { opacity: 0.01 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  }

  const messageType = current?.type ?? ''
  const shouldShow = visible && current !== null
  return (
    <TransitionGroup>
      {shouldShow && (
        <Transition timeout={{ enter: 300, exit: 300 }}>
          {(state) => (
            <div
              className={`flash-message ${messageType}`}
              style={{ ...transitionStyles[state] }}
            >
              {current != null && (
                <div className="flash-message-container">
                  <div>
                    <h3>{current.title}</h3>
                    {current && current.message && (
                      <span>{current.message}</span>
                    )}
                  </div>
                  {current && current.closeable && (
                    <div className="close-btn-container">
                      <button type="button" onClick={close}>
                        <IoCloseCircle />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </Transition>
      )}
    </TransitionGroup>
  )
}

export default FlashMessage
