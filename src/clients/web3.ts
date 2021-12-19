import Web3 from 'web3'

window.ethereum.request({ method: 'eth_requestAccounts' })
export const web3 = new Web3(window.ethereum)

export interface IWeb3Client {
  getCurrentUserAccounts(): Promise<string[]>
  getContractBalance(address: string): Promise<string>
  convertFromEthToWei(value: string): string
  convertFromWeiToEth(value: string): string
  convertFromGweiToEth(value: string): string
  get client(): Web3
}

export default class Web3Client implements IWeb3Client {
  private readonly web3: Web3

  constructor() {
    this.web3 = web3
  }

  async getCurrentUserAccounts() {
    return this.client.eth.getAccounts()
  }

  async getContractBalance(address: string) {
    return this.client.eth.getBalance(address)
  }

  convertFromEthToWei(value: string): string {
    return this.client.utils.toWei(value, 'ether')
  }

  convertFromWeiToEth(value: string): string {
    return this.client.utils.fromWei(value, 'ether')
  }

  convertFromGweiToEth(value: string): string {
    return this.client.utils.fromWei(
      this.client.utils.toWei(value, 'gwei'),
      'ether',
    )
  }

  get client(): Web3 {
    return this.web3
  }
}
