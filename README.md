## Dinstagram - Decenteralized Instagram 
Imagine you want your ReactJs frontend to talk to ethereum blockchain via MetaMask wallet. Here i have tried to put together web3 with reactjs alongwith dummy smart contract on ganache blockchain called Dinstagram.

### Web3 related Dependencies 

```bash
    1. Web3
    2. ipfs-http-client # for decentralized file storage
    3. chai and its related dependencies #for testing smart contracts
```

## What is covered here?

### User Uploads Image to blockchain
A user wants to upload his/her images on bloackchian rather conventional applications or websites like facebook or instagram. Since, you upload your images or data to blockchian, it is never owned by any single entity rather is made public. 

### User wants to tip an image if he/she likes it
Users visit the website which is based on blockchain and may want to tip you with ETH if they like it. 

So, basically, this repo covers two use cases such as posting image and tipping image.

nonetheless, all transactions (uploading images or tipping an image) here does have a cost associated with it, called gasFees. 

You don't have to worry about the gasFees since you will be trying on your local machine with ganache. 

## Here is frontend look

Post list from blockchian.
![PostList](/public/screen2.png) 

Pay gasFees for Posting image or tipping an image.
![PostList](/public/screen1.png)
## Prerequisite

### Ganache 
Ganache facilitates with local blockchian and gives 10 free account. You must have [ganache](https://trufflesuite.com/ganache/) installed on your machine. 

If you want to use cli version of ganache, you can download globally by running below command on your terminal;

```bash
npm install -g ganache-cli
```

### MetaMask 
Install [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) chrome extension.
## How to Install?

clone this repo to your local machine, navigate to the folder and run below command;

```bash
# npm
npm i

# yarn 
yarn
```

## Spin up Ganache Blockchian, deploy smartcontract and frontend

Launch Ganache desktop version and run below command in terminal while your are in project folder;

```bash

# for first time (deploys smart contract to ganache blockchain)
truffle migrate

# for re-migrating smart contract
truffle migrate --reset 
```

Once, smart contract is deployed on ganache locally, you can import account to MetaMask by copy account private key and paste in import field of MetaMask. Once done, connect your account with blockchain, connect option will be provided in MetaMask.

If everything till here went well, you can spin frontend by running below command in terminal;

```bash
npm run start
```


