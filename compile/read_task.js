var fs = require('fs');

var taskjson = {};

fs.readFile('task.json', (err, data) => {  
    if (err) throw err;
    taskjson = JSON.parse(data);
});

module.exports = taskjson;

//console.log(task.abi);
//console.log(task.bytecode);
