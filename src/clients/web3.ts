import Web3 from 'web3'

export default class Web3Client {
  private web3: Web3

  constructor() {
    window.ethereum.request({ method: 'eth_requestAccounts' })
    this.web3 = new Web3(window.ethereum)
  }

  async getAccounts() {
    return this.web3.eth.getAccounts()
  }
}
