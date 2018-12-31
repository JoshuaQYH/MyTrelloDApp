var path =  require('path');
var fs = require('fs');
var solc =  require('solc');

// 获取智能合约的绝对路径
let contractPath = path.resolve('../', 'contracts', 'Task.sol');
//console.log("contracts absolute path: " + contractPath);

// 读取合约内容
let contractSource = fs.readFileSync(contractPath, 'utf-8');
//console.log("contract content: \n" + contractSource);

let jsonContractSource = JSON.stringify({
    language: 'Solidity',
    sources: {
      'Task.sol': {
        content: contractSource,
      },
    },
    settings: {
        outputSelection: {
			'*': {
				'*': [ '*' ]
			}
		}
    },
  });

let output = JSON.parse(solc.compile(jsonContractSource));  
console.log(output)

taskJson = {
  'abi': {},
  'bytecode': ''
};

// `output` here contains the JSON output as specified in the documentation
for (var contractName in output.contracts['Task.sol']) {
    module.exports.abi =  output.contracts['Task.sol'][contractName].abi;
    module.exports.bytecode = output.contracts['Task.sol'][contractName].evm.bytecode.object;
    taskJson.abi = output.contracts['Task.sol'][contractName].abi;
    taskJson.bytecode = output.contracts['Task.sol'][contractName].evm.bytecode.object;
}

console.log(taskJson);

fs.writeFile('task.json', JSON.stringify(taskJson), function(err){
  if(err)
    console.error(err);
  console.log("task contract compiled sucessfully.")
})