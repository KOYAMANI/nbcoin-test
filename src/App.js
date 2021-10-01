import './App.css';
import React, { useState } from 'react';
import { ethers } from 'ethers';
import NBCoin from './artifacts/contracts/NBCoin.sol/NBCoin.json';

const nbCoinAddress = "0x505f2527E01fd4025A318EE5Ad571965948162DA";


function App() {

  const [burnAmount, setBurnAmount] = useState(0)


  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  //Function to assign burner role
  async function assignBurnerRole(){
    if (typeof window.ethereum !== 'undefined') {
    }
  }

  //Function to burn coins
  async function burnCoins(){
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer= provider.getSigner();
      const contract = new ethers.Contract(nbCoinAddress, NBCoin.abi, signer);
      const burn = await contract.burn(nbCoinAddress, burnAmount);
      await burn.wait();
      console.log(`${burnAmount} Coins successfully burned from ${nbCoinAddress}`);
    }
  }

 


  return (
    <div className="App">
      <header className="App-header">

        {/* Button to assign burner role to msgsender*/}
        <button onClick={assignBurnerRole}>Assign Burner Role</button>

        {/* Button to burn Coins */}
        <button onClick={burnCoins}>Burn Coins</button>

        {/* Input field to declare how many coins you want to burn */}
        <input onChange={e => setBurnAmount(e.target.value)} placeholder="BurnAmount" />
      
      </header>
    </div>
  );
}

export default App;