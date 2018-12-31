var path =  require('path');
var fs = require('fs');
var solc =  require('solc');

// 获取智能合约的绝对路径
let contractPath = path.resolve('../', 'contracts', 'Team.sol');
//console.log("contracts absolute path: " + contractPath);

// 读取合约内容
let contractSource = fs.readFileSync(contractPath, 'utf-8');

let jsonContractSource = JSON.stringify({
    language: 'Solidity',
    sources: {
      'Team.sol': {
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
//console.log(output);
teamJson = {
  'abi': {},
  'bytecode': ''
};

// `output` here contains the JSON output as specified in the documentation
for (var contractName in output.contracts['Team.sol']) {
  //  console.log(output);
    module.exports.abi =  output.contracts['Team.sol'][contractName].abi;
    module.exports.bytecode = output.contracts['Team.sol'][contractName].evm.bytecode.object;
    teamJson.abi = output.contracts['Team.sol'][contractName].abi;
    teamJson.bytecode = output.contracts['Team.sol'][contractName].evm.bytecode.object;

}

console.log(teamJson);

fs.writeFile('team.json', JSON.stringify(teamJson), function(err){
    if(err)
      console.error(err);
    console.log("team contract compiled sucessfully.")
})