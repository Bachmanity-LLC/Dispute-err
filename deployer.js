//const Preferences = require("preferences");
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiled = require('./build/Dispute.json');
const provider = new HDWalletProvider(
    //Mnemonic
    "chair inch unusual slam lava present office position address easy valley junior",
    //Infura Rinkeby API Key
    'https://ropsten.infura.io/v3/22be87df8e694b33a0c0b7acf4d67e9d'
);

const web3 = new Web3(provider);

const deploy = (async() => {
    //Get a list of all accounts
    const accounts = await web3.eth.getAccounts();
    //console.log(accounts[0])
    //console.log(bytecode)
    const bytecode = compiled.bytecode;
    const interface = compiled.interface;

    var result = await new web3.eth.Contract(JSON.parse(interface)).deploy({ data: bytecode, arguments: [] }).send({ from: accounts[0], gas: '4700000' });

    console.log("Contract deployed at ", result.options.address);
    console.log("ABI: ",result.options.jsonInterface);
    // var prefs = new Preferences('cryptodoc');
    // prefs.address = result.options.address;
    // prefs.abi = JSON.stringify(result.options.jsonInterface);
})();