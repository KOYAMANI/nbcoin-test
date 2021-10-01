//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract TestToken {
    //here in the constructor, notice how you can choose your
    //own name_ and symbol_, and once you set it, it will automatically
    //change the _name to whatever you put for name_ and _symbol to
    //whatever you put for symbol_.
    constructor(string memory name_, string memory symbol_) {
        name_ = _name;
        symbol_ = _symbol;
        // 300000 * 10 ** 18 wei = 300000 tokens
        _totalSupply = 300000 * 10**18;
        _decimals = 18;

        mint(msg.sender, _totalSupply);
    }

    //checks the token balance of an address (in wei)
    mapping(address => uint256) private _balances;

    //supply of token
    uint256 private _totalSupply;
    //name of token
    string private _name;
    //symbol of token
    string private _symbol;
    //decimals of token (default is 18)
    uint8 private _decimals;

    event Transfer(address indexed from, address indexed to, uint256 value);

    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    ) internal virtual {
        require(
            sender != address(0),
            "TestToken: transfer from the zero address"
        );
        require(
            recipient != address(0),
            "TestToken: transfer to the zero address"
        );

        uint256 senderBalance = _balances[sender];
        require(
            senderBalance >= amount,
            "TestToken: transfer amount exceeds balance"
        );
        unchecked {
            _balances[sender] = senderBalance - amount;
        }
        _balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
    }

    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "BEP20: Mint to the zero address");

        _totalSupply += amount;
        _balances[account] += amount;

        emit Transfer(address(0), account, amount);
    }

    function transfer(address recipient, uint256 amount) public returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }

    function mint(address to, uint256 amount) public returns (bool) {
        _mint(to, amount);
        return true;
    }
}
