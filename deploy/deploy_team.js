//var HDWalletProvider = require('truffle-hdwallet-provider');
//var mnemonic = "either guide hedgehog erosion buddy still match canal conduct property city limb";
//var provider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/8873a9f9d7424a6183dc9b4f2c242b79");
//var Web3 = require('web3');
//var web3 = new Web3(provider);

var ganache = require('ganache-cli');
var Web3 = require('web3');
var web3 = new Web3(ganache.provider());
var fs = require('fs');


// 获取json文件中的 abi  bytecode

var teamjson;
let abi;
let bytecode;
fs.readFile('../compile/team.json', 'utf-8', (err, data)=>{
    if(err) throw err;
    teamjson = JSON.parse(data);
    abi = teamjson.abi;
    bytecode = teamjson.bytecode;
});


var deployTeam = async(teamName, bossName, contact)=>{
    try{
        console.log("to get the accounts");
        var accounts = await web3.eth.getAccounts();
        console.log(accounts[0]);
        console.log("To deploy team contract.");
        var result = await new web3.eth.Contract(abi).deploy(
            {
                data: '0x' + bytecode,   
                arguments: [teamName, bossName, contact]  
            })
            .send({
                from: accounts[0],
                gas: '5000000' 
            });
        console.log("successfully! Team address: " + result.options.address);
        return result;
    }
    catch(error){
        console.log("team 合约部署失败");
        console.error(error);
       // alert(" Failed to deploy team contract");
    }
};
deployTeam('teamName', 'boss', '110');
module.exports = deployTeam;