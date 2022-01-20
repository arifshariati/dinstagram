import Web3 from 'web3';
import Dinstagram from '../abis/Dinstagram.json';



export const initWeb3 = async () => {

    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        window.alert('Non-Ethereum browser detected. You should consider using MetaMask!');
    }
}

export const loadBlockChainData = async () => {

    let res = {
        account: '',
        dinstagram: [],
        imageCount: 0,
        images: [],
        errors: ''
    };
    let images = [];

    const web3 = window.web3;

    // Load account
    const accounts = await web3.eth.getAccounts();
    res.account = accounts[0];

    // Network ID
    const networkId = await web3.eth.net.getId();

    const networkData = Dinstagram.networks[networkId];

    if (networkData) {
        const dinstagram = new web3.eth.Contract(Dinstagram.abi, networkData.address)
        res.dinstagram = dinstagram;

        const imagesCount = await dinstagram.methods.imageCount().call()
        res.imageCount = imagesCount;

        // Load images
        for (let i = 1; i <= imagesCount; i++) {
            const image = await dinstagram.methods.images(i).call()
            images = [...images, image]
        }

        // Sort images. Show highest tipped images first
        res.images = images.sort((a, b) => b.tipAmount - a.tipAmount)

    } else {
        res.errors = 'Dinstagram contract not deployed to detected network.';
    }

    return res;
};
