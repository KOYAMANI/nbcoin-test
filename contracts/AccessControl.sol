//SDPX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./Context.sol";

abstract contract AccessControl is Context {
    address public admin;
    address public minter;
    address public burner;

    /**
     * @dev When the contract is deployed, this will automatically
     * set _msgSender() (aka the person who deployed it) to be admin.
     * Note: Minter and burner will still be the zero address.
     */
    constructor() {
        admin = _msgSender();
        minter = _msgSender();
    }

    /**
     * @dev This modifier allows an admin-only control mechanism
     * for functions inheriting from it.
     * Note: _; executes the rest of the function if the required
     * argument passes.
     */
    modifier onlyAdmin() {
        require(_msgSender() == admin);
        _;
    }

    /**
     * @dev This modifier allows a minter-only control mechanism
     * for functions inheriting from it.
     */
    modifier onlyMinter() {
        require(_msgSender() == minter);
        _;
    }

    /**
     * @dev This modifier allows a burner-only control mechanism
     * for functions inheriting from it.
     */
    modifier onlyBurner() {
        require(_msgSender() == burner);
        _;
    }

    /**
     * @dev This function sets a new admin and is ONLY accessible
     * if the person calling this function is the current admin.
     * Note: _newAdmin must NOT be the zero address, or else it throws an error.
     */
    function newAdmin(address _newAdmin) public onlyAdmin {
        require(_newAdmin != address(0));
        admin = _newAdmin;
    }

    /**
     * @dev This function sets a new minter and is ONLY accessible
     * if the person calling this function is the current admin.
     * Note: _newAdmin must NOT be the zero address, or else it throws an error.
     */
    function newMinter(address _newMinter) public onlyAdmin {
        require(_newMinter != address(0));
        minter = _newMinter;
    }

    /**
     * @dev This function sets a new burner and is ONLY accessible
     * if the person calling this function is the current admin.
     * Note: _newAdmin must NOT be the zero address, or else it throws an error.
     */
    function newBurner(address _newBurner) public onlyAdmin {
        require(_newBurner != address(0));
        burner = _newBurner;
    }
}
