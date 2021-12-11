import { useFlashMessage } from '../context/FlashMessageContext'
import './FlashMessage.scss'

const FlashMessage = () => {
  const { visible, current } = useFlashMessage()

  if (!visible || !current) {
    return null
  }
  return (
    <div className={`flash-message ${current.type}`}>
      <div>
        <h3 className="">{current.title}</h3>
        {current.message && <span>{current.message}</span>}
      </div>
      <div>
        <button type="button">x</button>
      </div>
    </div>
  )
}

export default FlashMessage
