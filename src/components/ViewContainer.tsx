import { FC, useMemo } from 'react'
import { GuestView } from './views/GuestView'
import { UserView } from './views/UserView'
import { ManagerView } from './views/ManagerView'
import { useLottery } from '../context/LotteryContext'

const ViewContainer: FC<{ loading: boolean }> = ({ loading }) => {
  const {
    web3: {
      state: { user },
    },
  } = useLottery()
  const {
    lottery: {
      state: { managerAddress },
    },
  } = useLottery()
  const currentUserIsManager = useMemo(() => {
    if (
      user.address === undefined ||
      user.address === '' ||
      managerAddress === ''
    ) {
      return false
    }
    return user.address.toLowerCase() === managerAddress.toLowerCase()
  }, [user.address, managerAddress])

  if (loading) {
    return <>Loading...</>
  }
  return (
    <div className="p-10 min-h-screen flex items-center justify-center bg-cool-gray-700 flex-col">
      {user.address === undefined && <GuestView />}
      {user.address !== undefined && !currentUserIsManager && <UserView />}
      {user.address !== undefined && currentUserIsManager && <ManagerView />}
    </div>
  )
}

export default ViewContainer
