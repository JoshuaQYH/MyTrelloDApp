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

let taskjson;
let abi;
let bytecode;

fs.readFile('../compile/task.json', 'utf-8', (err, data)=>{
    if(err) throw err;
   // console.log(data);
    taskjson = JSON.parse(data);
    abi = taskjson.abi;
    bytecode = taskjson.bytecode;
});


// 托管函数
var deployTask = async(taskName, endTime)=>{
    try{
        console.log("to get the accounts.")
        var accounts = await web3.eth.getAccounts();
        console.log(accounts[0]);
        console.log("To deploy task contract.")
        var result = await new web3.eth.Contract(abi).deploy(
        {
            data: '0x' + bytecode,   /// 
            arguments: [taskName, endTime]  // 智能合约参数
        })
        .send({
            from: accounts[0],
            gas: '5000000' 
        });
        console.log("Sucessfully! Task address: " + result.options.address);
        return result;
    }
    catch(error){
        console.log("task 合约部署失败");
        console.error(error);
       // alert("Failed to deploy task contract");
    }
    
};

module.exports = deployTask;
