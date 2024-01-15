const HDWalletProvide = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { abi, evm } = require('./compiler');

require('dotenv').config();

const provider = new HDWalletProvide(
    //pneumonic(secret phrase)(example: word1 word2 word3 ... word12)
    `${process.env.MNEMONIC}`,
    //provider should connect to an infra node. (this lin get on infura)(example: )
    `${process.env.INFURA_URL}`
);

const web3 = new Web3(provider);

const deploy = async () => {
    const account = await web3.eth.getAccounts();

    console.log("Log deploy account", account[0]);

    //contract deployment
    const result = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object, arguments: ['Hi there'] })
        .send({ gas: '1000000', from: account[0] });

    console.log("contract deployed to", result.options.address);
    provider.engine.stop();//to prevent deployment from hanging in the terminal
};

deploy();