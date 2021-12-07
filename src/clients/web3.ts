import Web3 from 'web3'

window.ethereum.request({ method: 'eth_requestAccounts' })
export const web3 = new Web3(window.ethereum)

export default class Web3Client {
  private readonly web3: Web3

  constructor() {
    this.web3 = web3
  }

  async getAccounts() {
    return this.web3.eth.getAccounts()
  }

  get client(): Web3 {
    return this.web3
  }
}
