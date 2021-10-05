import './App.css';
import React, { useState } from 'react';
import { ethers, utils } from 'ethers';
import NBCoin from './artifacts/contracts/NBCoin.sol/NBCoin.json';

const signerAddress = "0xCc73FAF26E6720bdb7489EED4B667200b44aE78f";
const nbCoinAddress = "0xe46849648B68D822Fb559684f07d8a07AaDf2CC8";


function App() {

  const [mintAmount, setMintAmount] = useState(0)
  const [burnAmount, setBurnAmount] = useState(0)
  const [mintAddress, setMintAddress] = useState()
  const [burnAddress, setBurnAddress] = useState()


  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function returnAdmin(){
    if (typeof window.ethereum !== 'undefined') {

      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({provider})
      const signer= provider.getSigner();
      console.log({signer})
      const contract = new ethers.Contract(nbCoinAddress, NBCoin.abi, signer);
      console.log({contract})
      try {
        const admin = await contract.admin()
        console.log('admin: ', admin)
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }

  //Function to assign minter role
  async function assignMinterRole(){
    if (typeof window.ethereum !== 'undefined') {

      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({provider})
      const signer= provider.getSigner();
      console.log({signer})
      const contract = new ethers.Contract(nbCoinAddress, NBCoin.abi, signer);
      console.log({contract})
      try {
        const data = await contract.newMinter(signerAddress)
        console.log('data: ', data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }

  async function mintCoins(){
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer= provider.getSigner();
      const contract = new ethers.Contract(nbCoinAddress, NBCoin.abi, signer);
      console.log({contract})

      const mint = await contract.mint(mintAddress, mintAmount);
      await mint.wait();
      console.log(`${mintAmount} Coins minted from ${mintAddress}`);
    }
  }

  async function returnBurner(){
    if (typeof window.ethereum !== 'undefined') {

      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({provider})
      const signer= provider.getSigner();
      console.log({signer})
      const contract = new ethers.Contract(nbCoinAddress, NBCoin.abi, signer);
      console.log({contract})

      try {
        const burner = await contract.burner()
        console.log('burner: ', burner)
      } catch (err) {
        console.log("Error: ", err)
      }
    }

  }


  //Function to assign burner role
  async function assignBurnerRole(){
    if (typeof window.ethereum !== 'undefined') {

      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({provider})
      const signer= provider.getSigner();
      console.log({signer})
      const contract = new ethers.Contract(nbCoinAddress, NBCoin.abi, signer);
      console.log({contract})
      try {
        const data = await contract.newBurner(signerAddress)
        console.log('data: ', data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }



  
  async function burnCoins(){
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer= provider.getSigner();
      const contract = new ethers.Contract(signerAddress, NBCoin.abi, signer);
      console.log({contract})

      const burn = await contract.burn(burnAddress, burnAmount);
      await burn.wait();
      console.log(`${burnAmount} Coins successfully burned from ${burnAddress}`);
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        {/* Admin Functions */}
        <button onClick={returnAdmin}>Show Admin</button>

        {/* Mint Functions */}
        <button onClick={assignMinterRole}>Assign Minter Role</button>
        
        <button onClick={mintCoins}>Mint NB coin</button>

        <input onChange={e => setMintAddress(e.target.value)} placeholder="address" />
        <input onChange={e => setMintAmount(e.target.value)} placeholder="Mint Amount" />

        {/* Burn Functions */}
        <button onClick={returnBurner}>Show Burner</button>

        <button onClick={assignBurnerRole}>Assign Burner Role</button>

        <button onClick={burnCoins}>Burn Coins</button>

        <input onChange={e => setBurnAddress(e.target.value)} placeholder="address" />
        <input onChange={e => setBurnAmount(e.target.value)} placeholder="Burn Amount" />
      
      </header>
    </div>
  );
}

export default App;