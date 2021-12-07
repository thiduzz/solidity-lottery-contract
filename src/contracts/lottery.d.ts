import { web3 } from '../clients/web3'

const address: string = ''

const abi: any = []

export default new web3.eth.Contract(abi, address)
