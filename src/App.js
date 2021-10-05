import './App.css';
import React, { useState } from 'react';
import { ethers } from 'ethers';
import NBCoin from './artifacts/contracts/NBCoin.sol/NBCoin.json';

const signerAddress = '0xCc73FAF26E6720bdb7489EED4B667200b44aE78f';
const nbCoinAddress = "0x0179F583E22409Aa13DD0235e94242a38cc84Bb0";


function App() {

  const [mintAmount, setMintAmount] = useState(0)
  const [burnAmount, setBurnAmount] = useState(0)
  const [userAddress, setUserAddress] = useState()


  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
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
      console.log({provider})
      const signer= provider.getSigner();
      console.log({signer})
      const contract = new ethers.Contract(nbCoinAddress, NBCoin.abi, signer);
      console.log({contract})

      const mint = await contract.mint(userAddress, mintAmount);
      await mint.wait();
      console.log(`${mintAmount} Coins minted from ${userAddress}`);
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
      const burn = await contract.burn(signerAddress, burnAmount);
      await burn.wait();
      console.log(`${burnAmount} Coins successfully burned from ${signerAddress}`);
    }
  }

 


  return (
    <div className="App">
      <header className="App-header">

        {/* Button to assign minter role to msgsender*/}
        <button onClick={assignMinterRole}>Assign Minter Role</button>
        
        {/* Button to mint coins*/}
        <button onClick={mintCoins}>Mint NB coin</button>

        {/* Input field to declare how many coins you want to mint */}
        <input onChange={e => setUserAddress(e.target.value)} placeholder="address" />
        <input onChange={e => setMintAmount(e.target.value)} placeholder="Mint Amount" />

        {/* Button to assign burner role to msgsender*/}
        <button onClick={assignBurnerRole}>Assign Burner Role</button>

        {/* Button to burn Coins */}
        <button onClick={burnCoins}>Burn Coins</button>

        {/* Input field to declare how many coins you want to burn */}
        <input onChange={e => setBurnAmount(e.target.value)} placeholder="Burn Amount" />
      
      </header>
    </div>
  );
}

export default App;