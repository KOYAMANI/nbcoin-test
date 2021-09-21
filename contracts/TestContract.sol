//SPDX-License-Identifier: minutes
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract TestContract {
    uint16 public totalSupply;
    address public owner;
    string public tokenName;

    constructor() {
        totalSupply = 300;
        owner = address(msg.sender);
        tokenName = "Token Name";
    }

    function getTotalSupply() public view returns (uint16) {
        return totalSupply;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getTokenName() public view returns (string memory) {
        return tokenName;
    }
}
