// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Lottery {

    address public manager;
    address payable[] public players;
    uint public gweiFee;

    constructor() {
        manager = msg.sender;
    }

    modifier restrictedToManager() {
        require(
            msg.sender == manager,
            "This function is restricted to the contract's owner"
        );
        _;
    }


    modifier validateValue {
        require(
            msg.value == (1 gwei) * gweiFee,
            "Insufficient tx value"
        );
        _;
    }


    function join() public payable validateValue {
        players.push(payable(msg.sender));
    }

    function getJoiners() public view returns (address payable[] memory) {
        return players;
    }

    function setFee(uint _fee) public restrictedToManager {
        gweiFee = _fee;
    }


    function getLotteryValue() public view returns(uint) {
        return address(this).balance;
    }

    function pickWinner() public restrictedToManager returns(address) {
        uint randIndex = random() % players.length;
        address payable winner = players[randIndex];
        winner.transfer(getLotteryValue());
        players = new address payable[](0);
        return winner;
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

}