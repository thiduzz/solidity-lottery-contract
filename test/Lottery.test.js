const ganache = require("ganache-core")
const Web3 = require('web3')
const web3 = new Web3(ganache.provider());
const compile = require('../compile')
const initialEntryFeeGwei = 10

let accounts
let lottery
let owner

beforeEach(async () => {
    const {Lottery} = await compile("Lottery.sol");
    accounts = await web3.eth.getAccounts()
    owner = accounts[0]
    lottery = await new web3.eth.Contract(Lottery.abi)
        .deploy({data: Lottery.evm.bytecode.object})
        .send({from: accounts[0], gas: '1000000'})
    await lottery.methods.setFee(initialEntryFeeGwei).send({from: owner, gas: '1000000'})
})

describe('Lottery', () => {

    it('deploys a contract', () => {
        expect(lottery.options.address).toBeTruthy()
    })

    it('owner can set default fee', async () => {
        const result = await lottery.methods.setFee(3).send({from: owner, gas: '1000000'})
        expect(await lottery.methods.gweiFee().call()).toEqual("3")
        expect(result.transactionHash).toBeTruthy()
    })

    it('not owner is restricted from setting default fee', async () => {
        try {
            await lottery.methods.setFee(3).send({from: accounts[1], gas: '1000000'})
            expect(true).toBe(false);
        } catch (e) {
            expect(e.message).toContain("This function is restricted to the contract's owner");
        }
    })

    it('not allow joins addresses with value different to default fee', async () => {
        try {
            await lottery.methods.join().send({from: accounts[1], gas: '1000000', value: convertFromGweiToWei(initialEntryFeeGwei - 1)})
            expect(true).toBe(false);
        } catch (e) {
            expect(e.message).toContain("Exception while processing transaction: revert Insufficient tx value");
        }
    })

    it('allow joins addresses with value equal to default fee', async () => {
        await lottery.methods.join().send({from: accounts[2], gas: '1000000', value: convertFromGweiToWei(initialEntryFeeGwei) })
        const players = await lottery.methods.getJoiners().call({from: accounts[2], gas: '1000000' })
        expect(players).toContain( accounts[2])
        expect(players).toHaveLength(1)
    })

    it('should increment lottery prize after joining', async () => {
        const lotteryInitialValue = await lottery.methods.getLotteryValue().call({from: accounts[2], gas: '1000000' })
        expect(lotteryInitialValue).toBe("0")
        await lottery.methods.join().send({from: accounts[2], gas: '1000000', value: convertFromGweiToWei(initialEntryFeeGwei) })
        const lotteryAfterValue = await lottery.methods.getLotteryValue().call({from: accounts[2], gas: '1000000' })
        expect(lotteryAfterValue).toBe(convertFromGweiToWei(initialEntryFeeGwei))
    })

    it('should allow multiple participants to join', async () => {
        await join(accounts[2])
        await join(accounts[3])
        await join(accounts[4])

        const players = await lottery.methods.getJoiners().call({from: accounts[2], gas: '1000000' })

        expect(players).toContain( accounts[2])
        expect(players).toContain( accounts[3])
        expect(players).toContain( accounts[4])
        expect(players).toHaveLength(3)
        const lotteryAfterValue = await lottery.methods.getLotteryValue().call({from: accounts[2], gas: '1000000' })
        expect(lotteryAfterValue).toBe(convertFromGweiToWei(initialEntryFeeGwei * 3) )
    })

    it('owner can randomly pick winner', async () => {
        await join(accounts[2])
        await lottery.methods.pickWinner().send({from: owner, gas: '1000000'})
        expect(await lottery.methods.getLotteryValue().call({from: accounts[2], gas: '1000000' })).toBe("0")
        expect(await lottery.methods.getJoiners().call({from: accounts[2], gas: '1000000' })).toHaveLength(0)
    })

    it('not owner is restricted from randomly picking winner', async () => {
        try {
            await join(accounts[2])
            const result = await lottery.methods.pickWinner().send({from: accounts[2], gas: '1000000'})
            expect(true).toBe(false);
        } catch (e) {
            expect(e.message).toContain("This function is restricted to the contract's owner");
        }
    })


    it('winner should get the prize', async () => {
        const value = await join(accounts[2])
        const initialBalance = await web3.eth.getBalance(accounts[2])
        await lottery.methods.pickWinner().send({from: owner, gas: '1000000'})
        const finalBalance = await web3.eth.getBalance(accounts[2])
        //gas is not considered
        const diff = web3.utils.toBN(finalBalance).sub(web3.utils.toBN(initialBalance))
        expect(diff.toString()).toBe(convertFromGweiToWei(initialEntryFeeGwei))

        web3.utils.toTwosComplement()
    })
})

async function join(account) {
    return await lottery.methods.join().send({
        from: account,
        gas: '1000000',
        value: convertFromGweiToWei(initialEntryFeeGwei)
    })
}

function convertFromGweiToWei(value){
    return Web3.utils.toWei(value.toString(),'gwei')
}
