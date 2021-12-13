import { Status } from '../Status'

export const GuestView = () => (
  <>
    <Status />
    <h1 className="text-5xl font-black text-white text-center mt-12">
      <span className="bg-gradient-to-r text-transparent bg-clip-text from-green-400 to-purple-500">
        Connect with your MetaMask
      </span>
    </h1>
  </>
)
