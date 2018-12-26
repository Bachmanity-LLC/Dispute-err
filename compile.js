const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const ContractPath = path.resolve(__dirname, 'contracts', 'Dispute.sol');
const source = fs.readFileSync(ContractPath, 'utf8');

const buildPath = path.resolve(__dirname,'build');
fs.removeSync(buildPath);

var output = solc.compile(source, 1).contracts;

for (let contract  in output){
    fs.outputJsonSync( path.resolve(buildPath,contract.replace(":",'')+ '.json'),output[contract]);
}