import Web3 from 'web3';
import Dinstagram from '../abis/Dinstagram.json';

let selectedAccount, dinstagramContract;
let isInitialized = false;

export const init = async () => {

    let provider = window.ethereum;

    if (typeof provider !== 'undefined') {

        await provider.request({ method: 'eth_requestAccounts' })
            .then(accounts => {
                selectedAccount = accounts[0];
                // console.log(`Selected Account ${selectedAccount}`);
            })
            .catch(error => {
                console.log(`error ==> ${error}`);
                return;
            })

        window.ethereum.on('accountChanged', (accounts) => {
            selectedAccount = accounts[0];
            // console.log(`Selected Account Changed to ${selectedAccount}`);
        });

        // const web3 = new Web3(provider);

        // const networkId = await web3.eth.net.getId();

        // const gasPrice = await web3.eth.getGasPrice();

        // console.log(`selectedAccount ===> ${selectedAccount}`);
        // console.log(`networkId ===> ${networkId}`);
        // console.log(`gasPrice ===> ${gasPrice}`);

        isInitialized = true;

    }

    return selectedAccount;
};