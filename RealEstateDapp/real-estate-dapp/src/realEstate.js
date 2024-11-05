import Web3 from 'web3';
import RealEstateContract from './contracts/RealEstate.json';

let web3;
if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // Request account access
} else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
} else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
}

const initWeb3 = async () => {
    try {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = RealEstateContract.networks[networkId];

        if (!deployedNetwork) {
            throw new Error('RealEstate contract not deployed to detected network.');
        }

        return new web3.eth.Contract(
            RealEstateContract.abi,
            deployedNetwork.address,
        );
    } catch (error) {
        console.error('Failed to load web3, accounts, or contract. Check console for details.', error);
        throw error; // Rethrow the error so it can be caught in App.js
    }
};

export default initWeb3;
