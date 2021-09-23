import './App.css';
import React, { useState } from 'react';
import { ethers } from 'ethers';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';
import Token from './artifacts/contracts/Token.sol/Token.json' ;
import { getJsonWalletAddress } from '@ethersproject/json-wallets';
import TestContract from './artifacts/contracts/TestContract.sol/TestContract.json' ;

const greeterAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const testContractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";



function App() {
  
  // store data in local state
  const [totalSupply, setTotalSupply] = useState('')
  const [owner, setOwner] = useState('')
  const [tokenName, setTokenName] = useState('')

  // store greeting in local state
  const [greeting, setGreetingValue] = useState()
  const [userAccount, setUserAccount] = useState()
  const [amount, setAmount] = useState(0)

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function getTotalSupply(){
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      console.log({provider})
      const contract = new ethers.Contract(testContractAddress, TestContract.abi, provider)
      console.log({contract})
      try {
        const data = await contract.getTotalSupply();  
        console.log('data: ', data)
        setTotalSupply(data)
      } catch (err) {      
        console.log("Error: ", err)
        return err
      }
    }
  }




  async function getOwner(){
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      console.log({provider})
      const contract = new ethers.Contract(testContractAddress, TestContract.abi, provider)
      console.log({contract})
      try {
        const data = await contract.getOwner();      
        console.log('data: ', data)
        setOwner(data)
      } catch (err) {       
        console.log("Error: ", err)
      }
    }
  }
  async function getTokenName(){
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      console.log({provider})
      const contract = new ethers.Contract(testContractAddress, TestContract.abi, provider)
      console.log({contract})
      try {
        const data = await contract.getTokenName();
        console.log('data: ', data)
        setTokenName(data)

      } catch (err) {
        console.log("Error: ", err)
        return err
      }
    }
  }

   // call the smart contract, read the current greeting value
   async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      console.log({provider})
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
      console.log({contract})
      try {
        const data = await contract.greet()
        console.log('data: ', data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }    
  }

  // call the smart contract, send an update
  async function setGreeting() {
    if (!greeting) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(greeting)
      await transaction.wait()
      fetchGreeting()
    }
  }

  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
      const balance = await contract.balanceOf(account);
      console.log("Balance: ", balance.toString());
    }
  }

  async function sendCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transaction = await contract.transfer(userAccount, amount);
      await transaction.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }




 




  return (
    <div className="App">
      <header className="App-header">
        <button onClick={getTotalSupply}>Get Total Supply</button>
        <p>{totalSupply}</p>
 
        <button onClick={getOwner}>Get Owner</button>
        <p>{owner}</p>
        <button onClick={getTokenName}>Get Token Name</button>
        <p>{tokenName}</p>
        
        


        {/* <br />
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input onChange={e => setGreetingValue(e.target.value)} placeholder="Set greeting" />
        
        <br />
        <button onClick={getBalance}>Get Balance</button>
        <button onClick={sendCoins}>Send Coins</button>
        <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
        <input onChange={e => setAmount(e.target.value)} placeholder="Amount" /> */}
      </header>
    </div>
  );
}

export default App;