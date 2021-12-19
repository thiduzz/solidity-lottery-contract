import { useMemo } from 'react'
import { GuestView } from './views/GuestView'
import { UserView } from './views/UserView'
import { ManagerView } from './views/ManagerView'
import { useApp } from '../context/AppContext'
import { useLottery } from '../context/LotteryContext'

const ViewContainer = () => {
  const { currentUser } = useApp()
  const {
    state: { managerAddress },
  } = useLottery()
  const currentUserIsManager = useMemo(() => {
    if (currentUser.address === '' || managerAddress === '') {
      return false
    }
    return currentUser.address.toLowerCase() === managerAddress.toLowerCase()
  }, [currentUser.address, managerAddress])

  return (
    <div className="p-10 min-h-screen flex items-center justify-center bg-cool-gray-700 flex-col">
      {currentUser.address === '' && <GuestView />}
      {currentUser.address !== '' && !currentUserIsManager && <UserView />}
      {currentUser.address !== '' && currentUserIsManager && <ManagerView />}
    </div>
  )
}

export default ViewContainer
